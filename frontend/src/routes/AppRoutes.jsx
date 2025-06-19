import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Cadastro from "../pages/Cadastro";
import Compra from "../pages/Compra";
import Pagamento from "../pages/Pagamento";
import Produtos from "../pages/Produtos";
import FormularioSapato from "../pages/FormularioSapato";
import ListaSapato from "../pages/ListaSapato";
import ListaClientes from "../pages/ListaClientes"; // ✅ Clientes
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* ✅ Cadastro de cliente protegido */}
      <Route
        path="/Cadastro"
        element={
          <PrivateRoute>
            <Cadastro />
          </PrivateRoute>
        }
      />

      {/* ✅ Compra protegida */}
      <Route
        path="/Compra"
        element={
          <PrivateRoute>
            <Compra />
          </PrivateRoute>
        }
      />

      {/* ✅ Pagamento protegido */}
      <Route
        path="/Pagamento"
        element={
          <PrivateRoute>
            <Pagamento />
          </PrivateRoute>
        }
      />

      {/* Produtos público */}
      <Route path="/Produtos" element={<Produtos />} />

      {/* ✅ Sapatos protegidos */}
      <Route
        path="/sapatos"
        element={
          <PrivateRoute>
            <ListaSapato />
          </PrivateRoute>
        }
      />
      <Route
        path="/sapatos/novo"
        element={
          <PrivateRoute>
            <FormularioSapato />
          </PrivateRoute>
        }
      />
      <Route
        path="/sapatos/editar/:id"
        element={
          <PrivateRoute>
            <FormularioSapato />
          </PrivateRoute>
        }
      />

      {/* ✅ Clientes protegidos */}
      <Route
        path="/clientes"
        element={
          <PrivateRoute>
            <ListaClientes />
          </PrivateRoute>
        }
      />

      {/* Login público */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
