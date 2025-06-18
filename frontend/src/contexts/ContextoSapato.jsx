import { createContext, useContext, useState, useEffect } from "react";
import { getSapatos } from "../services/api";

const ContextoSapato = createContext();

export const SapatoProvider = ({ children }) => {
  // Corrigido de Children para children
  const [sapatos, setSapatos] = useState([]); // Corrigido getSapatos para setSapatos
  const [loading, setLoading] = useState(true); // Corrigido usesate para useState
  const [error, setError] = useState("");

  const fetchSapatos = async () => {
    try {
      setLoading(true);
      const data = await getSapatos();
      setSapatos(data);
    } catch (err) {
      setError("Erro ao carregar os sapatos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSapatos();
  }, []);

  return (
    <ContextoSapato.Provider value={{ sapatos, loading, error, fetchSapatos }}>
      {children} {/* Corrigido de Children para children */}
    </ContextoSapato.Provider>
  );
};

export const useSapatos = () => useContext(ContextoSapato);
