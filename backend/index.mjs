import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// === Banco 1: SAPATOS ===
const poolSapatos = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_SAPATOS_USER,
  password: process.env.DB_SAPATOS_PASSWORD,
  database: process.env.DB_SAPATOS_DATABASE,
});

// === Banco 2: USUÁRIOS (CLIENTES) ===
const poolUsuarios = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USUARIOS_USER,
  password: process.env.DB_USUARIOS_PASSWORD,
  database: process.env.DB_USUARIOS_DATABASE,
});

// === Banco 3: FUNCIONÁRIOS ===
const poolFuncionarios = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_FUNCIONARIOS_USER,
  password: process.env.DB_FUNCIONARIOS_PASSWORD,
  database: process.env.DB_FUNCIONARIOS_DATABASE,
});

// === Inicializa tabela sapatos ===
async function initializeDatabase() {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS sapatos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        marca VARCHAR(255) NOT NULL,
        tamanho INT NOT NULL,
        cor VARCHAR(50) NOT NULL,
        preco DECIMAL(10, 2) NOT NULL,
        estoque BOOLEAN NOT NULL DEFAULT true,
        adicionado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_marca (marca),
        INDEX idx_tamanho (tamanho),
        INDEX idx_preco (preco)
      )`;

    await poolSapatos.query(createTableQuery);
    console.log("✅ Banco de sapatos conectado e tabela verificada.");
  } catch (error) {
    console.error("❌ Erro ao inicializar tabela sapatos:", error);
    process.exit(1);
  }
}

initializeDatabase();

// === ROTAS SAPATOS ===

app.get("/api/sapatos", async (req, res) => {
  try {
    const { marca, tamanho, cor, precoMin, precoMax } = req.query;
    let query = "SELECT * FROM sapatos WHERE 1=1";
    const params = [];

    if (marca) {
      query += " AND marca = ?";
      params.push(marca);
    }
    if (tamanho) {
      query += " AND tamanho = ?";
      params.push(Number(tamanho));
    }
    if (cor) {
      query += " AND cor = ?";
      params.push(cor);
    }
    if (precoMin) {
      query += " AND preco >= ?";
      params.push(Number(precoMin));
    }
    if (precoMax) {
      query += " AND preco <= ?";
      params.push(Number(precoMax));
    }

    query += " ORDER BY adicionado DESC";

    const [rows] = await poolSapatos.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar sapatos:", error);
    res.status(500).json({ error: "Erro interno ao buscar sapatos" });
  }
});

app.post("/api/sapatos", async (req, res) => {
  try {
    const { nome, marca, tamanho, cor, preco, estoque = true } = req.body;

    if (!nome || !marca || !tamanho || !cor || !preco) {
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
    }

    const query = `
      INSERT INTO sapatos (nome, marca, tamanho, cor, preco, estoque)
      VALUES (?, ?, ?, ?, ?, ?)`;

    const [result] = await poolSapatos.query(query, [
      nome, marca, Number(tamanho), cor, Number(preco), Boolean(estoque)
    ]);

    const [novoSapato] = await poolSapatos.query(
      "SELECT * FROM sapatos WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(novoSapato[0]);
  } catch (error) {
    console.error("Erro ao cadastrar sapato:", error);
    res.status(500).json({ error: "Erro interno ao cadastrar sapato." });
  }
});

app.put("/api/sapatos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, marca, tamanho, cor, preco, estoque } = req.body;

    const [existing] = await poolSapatos.query(
      "SELECT id FROM sapatos WHERE id = ?", [id]
    );
    if (!existing.length) {
      return res.status(404).json({ error: "Sapato não encontrado" });
    }

    const query = `
      UPDATE sapatos
      SET nome = ?, marca = ?, tamanho = ?, cor = ?, preco = ?, estoque = ?
      WHERE id = ?`;

    await poolSapatos.query(query, [
      nome, marca, Number(tamanho), cor, Number(preco), Boolean(estoque), id
    ]);

    const [updated] = await poolSapatos.query("SELECT * FROM sapatos WHERE id = ?", [id]);
    res.json(updated[0]);
  } catch (error) {
    console.error("Erro ao atualizar sapato:", error);
    res.status(500).json({ error: "Erro interno ao atualizar sapato." });
  }
});

app.delete("/api/sapatos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await poolSapatos.query(
      "SELECT id FROM sapatos WHERE id = ?", [id]
    );
    if (!existing.length) {
      return res.status(404).json({ error: "Sapato não encontrado" });
    }
    await poolSapatos.query("DELETE FROM sapatos WHERE id = ?", [id]);
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar sapato:", error);
    res.status(500).json({ error: "Erro interno ao deletar sapato." });
  }
});

// === ROTAS CLIENTES ===
// Cadastro de clientes (no banco `usuarios`)
app.post("/api/clientes/cadastro", async (req, res) => {
  try {
    const {
      nomeCompleto, cpf, email, celular,
      endereco, bairro, cidade, cep,
      complemento, newsletter
    } = req.body;

    if (!nomeCompleto || !cpf || !email || !celular || !endereco || !bairro || !cidade || !cep) {
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
    }

    const query = `
      INSERT INTO usuarios (
        nome_completo, cpf, email, celular, endereco, bairro,
        cidade, cep, complemento, newsletter
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await poolUsuarios.query(query, [
      nomeCompleto,
      cpf.replace(/\D/g, ""),
      email,
      celular.replace(/\D/g, ""),
      endereco,
      bairro,
      cidade,
      cep.replace(/\D/g, ""),
      complemento || null,
      newsletter === "1"
    ]);

    res.status(201).json({ success: true, message: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    res.status(500).json({ error: "Erro interno ao cadastrar cliente." });
  }
});

// === ROTAS FUNCIONÁRIOS ===
// Cadastro de funcionários
app.post("/api/users/cadastro", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Preencha nome, email e senha." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    await poolFuncionarios.query(query, [
      name,
      email,
      hashedPassword,
      role || 'user'
    ]);

    res.status(201).json({ success: true, message: "Funcionário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar funcionário:", error);
    res.status(500).json({ error: "Erro interno ao cadastrar funcionário." });
  }
});

// Login de funcionários
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Preencha email e senha." });
    }

    const [rows] = await poolFuncionarios.query(
      "SELECT * FROM users WHERE email = ?", [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Funcionário não encontrado." });
    }

    const user = rows[0];

    console.log("Digitada:", password);
    console.log("No banco:", user.password);

    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(401).json({ error: "Senha inválida." });
    }

    res.json({
      success: true,
      message: "Login bem-sucedido",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno no login." });
  }
});

// === Iniciar servidor ===
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

// Manipulador de erros globais
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Lista de clientes
app.get("/api/clientes", async (req, res) => {
  try {
    const [rows] = await poolUsuarios.query("SELECT * FROM usuarios ORDER BY nome_completo");
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    res.status(500).json({ error: "Erro interno ao buscar clientes." });
  }
});

// Rota para excluir cliente
app.delete("/api/clientes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await poolUsuarios.query(
      "SELECT id FROM usuarios WHERE id = ?", [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    await poolUsuarios.query("DELETE FROM usuarios WHERE id = ?", [id]);
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    res.status(500).json({ error: "Erro interno ao excluir cliente." });
  }
});