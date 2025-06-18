import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const PORT = 3000;

// Configurações do app
app.use(cors());
app.use(express.json());
dotenv.config();

// Configuração do banco de dados
const DB_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Cria pool de conexões
const pool = mysql.createPool(DB_CONFIG);

// Verifica conexão e cria tabela se não existir
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

    await pool.query(createTableQuery);
    console.log("Banco de dados conectado e tabela 'sapatos' verificada");
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
    throw error;
  }
}

// Inicializa o banco de dados
initializeDatabase().catch((error) => {
  console.error("Falha na inicialização do banco:", error);
  process.exit(1);
});

// Rota GET para listar sapatos com filtros
app.get("/api/sapatos", async (req, res) => {
  try {
    const { marca, tamanho, cor, precoMin, precoMax } = req.query;
    let query = "SELECT * FROM sapatos WHERE 1=1";
    const params = [];

    // Adiciona filtros dinamicamente
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

    // Ordena por data de cadastro mais recente
    query += " ORDER BY adicionado DESC";

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar sapatos:", error);
    res.status(500).json({ error: "Erro interno ao buscar sapatos" });
  }
});

// Rota POST para cadastrar novo sapato
app.post("/api/sapatos", async (req, res) => {
  try {
    const { nome, marca, tamanho, cor, preco, estoque = true } = req.body;

    // Validação dos dados
    if (!nome || !marca || !tamanho || !cor || !preco) {
      return res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    const query = `
      INSERT INTO sapatos (nome, marca, tamanho, cor, preco, estoque)
      VALUES (?, ?, ?, ?, ?, ?)`;

    const [result] = await pool.query(query, [
      nome,
      marca,
      Number(tamanho),
      cor,
      Number(preco),
      Boolean(estoque),
    ]);

    // Retorna o sapato recém-criado
    const [novoSapato] = await pool.query(
      "SELECT * FROM sapatos WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(novoSapato[0]);
  } catch (error) {
    console.error("Erro ao cadastrar sapato:", error);
    res.status(500).json({ error: "Erro interno ao cadastrar sapato" });
  }
});

// Rota PUT para atualizar sapato existente
app.put("/api/sapatos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, marca, tamanho, cor, preco, estoque } = req.body;

    // Verifica se o sapato existe
    const [existing] = await pool.query("SELECT id FROM sapatos WHERE id = ?", [
      id,
    ]);

    if (!existing.length) {
      return res.status(404).json({ error: "Sapato não encontrado" });
    }

    const query = `
      UPDATE sapatos
      SET nome = ?, marca = ?, tamanho = ?, cor = ?, preco = ?, estoque = ?
      WHERE id = ?`;

    await pool.query(query, [
      nome,
      marca,
      Number(tamanho),
      cor,
      Number(preco),
      Boolean(estoque),
      id,
    ]);

    // Retorna o sapato atualizado
    const [updated] = await pool.query("SELECT * FROM sapatos WHERE id = ?", [
      id,
    ]);

    res.json(updated[0]);
  } catch (error) {
    console.error("Erro ao atualizar sapato:", error);
    res.status(500).json({ error: "Erro interno ao atualizar sapato" });
  }
});

// Rota DELETE para remover sapato
app.delete("/api/sapatos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o sapato existe
    const [existing] = await pool.query("SELECT id FROM sapatos WHERE id = ?", [
      id,
    ]);

    if (!existing.length) {
      return res.status(404).json({ error: "Sapato não encontrado" });
    }

    await pool.query("DELETE FROM sapatos WHERE id = ?", [id]);
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar sapato:", error);
    res.status(500).json({ error: "Erro interno ao deletar sapato" });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});

// Manipulador de erros não capturados
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
