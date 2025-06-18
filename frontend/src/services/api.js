import axios from "axios";

// Correção 1: Adicione as barras após "http" (faltando "//")
const urlBanco = "http://localhost:3000/api/sapatos";

const API = axios.create({
  baseURL: urlBanco,
  timeout: 10000,
  headers: {
    // Correção 2: Typo em "application/json"
    "Content-Type": "application/json",
  },
});

// Opção: Adicione interceptors para tratamento global de erros
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na requisição:", error);
    throw error;
  }
);

export const getSapatos = async (filters = {}) => {
  try {
    const response = await API.get("/", { params: filters });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os sapatos:", error);
    throw error;
  }
};

// Correção 3: Padronize o nome da função (createSapato no singular)
export const createSapato = async (sapatoData) => {
  try {
    const response = await API.post("/", sapatoData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar um novo sapato:", error);
    throw error;
  }
};

// Correção 4: Padronize o nome da função (updateSapato no singular)
export const updateSapato = async (id, sapatoData) => {
  try {
    const response = await API.put(`/${id}`, sapatoData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar o sapato ID ${id}:`, error);
    throw error;
  }
};

// Correção 5: Padronize o nome da função (deleteSapato no singular)
export const deleteSapato = async (id) => {
  try {
    await API.delete(`/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar o sapato ID ${id}:`, error);
    throw error;
  }
};

// Exporte a instância do axios caso precise usar diretamente
export default API;
