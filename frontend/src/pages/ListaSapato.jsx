import React from "react";
import { Link } from "react-router-dom";
import { useSapatos } from "../contexts/ContextoSapato";
import { deleteSapato } from "../services/api";

const ListaSapato = () => {
  const { sapatos, loading, error, fetchSapatos } = useSapatos();

  if (loading) return <div className="text-center my-5">Carregando...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista de Sapatos</h2>
        <Link to="/sapatos/novo" className="btn btn-primary">
          Adicionar Novo Sapato
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Marca</th>
              <th>Tamanho</th>
              <th>Cor</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {sapatos.map((sapato) => (
              <tr key={sapato.id}>
                <td>{sapato.nome}</td>
                <td>{sapato.marca}</td>
                <td>{sapato.tamanho}</td>
                <td>{sapato.cor}</td>
                <td>
                  R${" "}
                  {Number.isFinite(parseFloat(sapato.preco))
                    ? parseFloat(sapato.preco).toFixed(2)
                    : "0.00"}
                </td>
                <td>
                  <Link
                    to={`/sapatos/editar/${sapato.id}`}
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={async () => {
                      const confirmarExclusao = window.confirm(
                        `Deseja realmente excluir o sapato: "${sapato.nome}" ?`
                      );
                      if (confirmarExclusao) {
                        try {
                          await deleteSapato(sapato.id);
                          fetchSapatos();
                        } catch (error) {
                          alert(" Erro ao deletar o sapato ");
                          console.log(error);
                        }
                      }
                    }}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaSapato;
