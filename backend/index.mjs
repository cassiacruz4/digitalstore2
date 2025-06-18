import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";

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

// === Banco 2: USUÁRIOS ===
const poolUsuarios = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USUARIOS_USER,
  password: process.env.DB_USUARIOS_PASSWORD,
  database: process.env.DB_USUARIOS_DATABASE,
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

// === PUT e DELETE sapatos igual ao seu ===

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

// === ROTAS USUÁRIOS ===

app.post("/api/cadastro", async (req, res) => {
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

    res.status(201).json({ success: true, message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ error: "Erro interno ao cadastrar usuário." });
  }
});

// === Iniciar servidor ===
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

// Manipulador de erros não capturados
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
