import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Cadastro from "../pages/Cadastro";
import Compra from "../pages/Compra";
import Pagamento from "../pages/Pagamento";
import Produtos from "../pages/Produtos";
import FormularioSapato from "../pages/FormularioSapato";
import ListaSapato from "../pages/ListaSapato";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Cadastro" element={<Cadastro />} />
      <Route path="/Compra" element={<Compra />} />
      <Route path="/Pagamento" element={<Pagamento />} />
      <Route path="/Produtos" element={<Produtos />} />
      <Route path="/sapatos" element={<ListaSapato />} />
      <Route path="/sapatos/novo" element={<FormularioSapato />} />
      <Route path="/sapatos/editar/:id" element={<FormularioSapato />} />
    </Routes>
  );
};

export default AppRoutes;
