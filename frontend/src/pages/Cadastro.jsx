import React, { useState } from "react";
import styles from "../styles/Cadastro.module.css";


export default function Cadastro() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    email: "",
    celular: "",
    endereco: "",
    bairro: "",
    cidade: "",
    cep: "",
    complemento: "",
    newsletter: true,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:3000/api/clientes/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setFormData({
          nomeCompleto: "",
          cpf: "",
          email: "",
          celular: "",
          endereco: "",
          bairro: "",
          cidade: "",
          cep: "",
          complemento: "",
          newsletter: true,
        });
      } else {
        alert("Erro: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar formulário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Cadastrar cliente</h1>

      {success && (
        <div className={styles.successMessage}>
          Cadastro realizado com sucesso! Você receberá um email de confirmação em breve.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.sectionTitle}>Informações Pessoais</div>

        <div className={styles.formGroup}>
          <label>Nome Completo *</label>
          <input
            type="text"
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>CPF *</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Celular *</label>
          <input
            type="tel"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.sectionTitle}>Informações de Entrega</div>

        <div className={styles.formGroup}>
          <label>Endereço *</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Bairro *</label>
          <input
            type="text"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Cidade *</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>CEP *</label>
          <input
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Complemento</label>
          <input
            type="text"
            name="complemento"
            value={formData.complemento}
            onChange={handleChange}
          />
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
          />
          <label className={styles.checkboxLabel}>
            Enviar por email ofertas e novidades das lojas da Digital Store.
          </label>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Cadastrar"}
        </button>

        {loading && <p className={styles.loading}>Processando seu cadastro...</p>}
      </form>
    </div>
  );
}
