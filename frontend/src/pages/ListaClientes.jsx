import React, { useEffect, useState } from "react";

export default function ListaClientes() {
  const [clientes, setClientes] = useState([]);

  const fetchClientes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/clientes");
      const data = await res.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/clientes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Cliente excluído com sucesso!");
        fetchClientes(); // Atualiza lista
      } else {
        alert("Erro ao excluir cliente.");
      }
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Clientes Cadastrados</h2>
      {clientes.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Celular</th>
              <th>Cidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome_completo}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.email}</td>
                <td>{cliente.celular}</td>
                <td>{cliente.cidade}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(cliente.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
