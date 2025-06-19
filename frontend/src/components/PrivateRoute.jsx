import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Se não estiver logado, redireciona para /login
    return <Navigate to="/login" />;
  }

  // Se estiver logado, renderiza o conteúdo protegido
  return children;
}
