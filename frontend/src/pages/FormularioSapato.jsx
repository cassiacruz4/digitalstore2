import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSapatos } from "../contexts/ContextoSapato";
import { createSapato, updateSapato, getSapatos } from "../services/api";

const FormularioSapato = () => {
  const { id } = useParams();
  const { fetchSapatos } = useSapatos();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    marca: "",
    tamanho: "",
    cor: "",
    preco: "",
    estoque: true,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSapatoById = async () => {
      try {
        const response = await getSapatos(); // ou use um getSapatoById no futuro
        const sapatoEdit = response.find((s) => s.id === parseInt(id));
        if (sapatoEdit) setFormData(sapatoEdit);
      } catch (error) {
        setError("Erro ao carregar dados do sapato.");
      }
    };

    if (id) fetchSapatoById();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = {
        ...formData,
        tamanho: parseInt(formData.tamanho),
        preco: parseFloat(formData.preco),
      };

      if (id) {
        await updateSapato(id, data);
      } else {
        await createSapato(data);
      }

      fetchSapatos();
      navigate("/sapatos");
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao salvar sapato");
    }
  };

  return (
    <div className="container my-5">
      <h2>{id ? "Editar Sapato" : "Adicionar Sapato"}</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-4">
        {/* Campos do formulário */}
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="estoque"
            checked={formData.estoque}
            onChange={handleChange}
          />
          <label className="form-check-label">Disponível em estoque</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Marca</label>
          <input
            type="text"
            className="form-control"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tamanho</label>
          <input
            type="number"
            className="form-control"
            name="tamanho"
            value={formData.tamanho}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cor</label>
          <input
            type="text"
            className="form-control"
            name="cor"
            value={formData.cor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Preço</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {id ? "Atualizar" : "Cadastrar"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/sapatos")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default FormularioSapato;
