import { createContext, useState, useEffect } from 'react';
import { getNotasRequest, createNotaRequest } from '../api/notas';

export const NotasContext = createContext();

export const NotasProvider = ({ children }) => {
  const [notas, setNotas] = useState([]);
  const [loadingNotas, setLoadingNotas] = useState(false);
  const [error, setError] = useState(null);

  const getNotas = async () => {
    setLoadingNotas(true);
    setError(null);
    try {
      const { data } = await getNotasRequest();
      setNotas(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar las notas');
    } finally {
      setLoadingNotas(false);
    }
  };

  const createNota = async (nota) => {
    try {
      const { data } = await createNotaRequest(nota);
      setNotas([...notas, data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la nota');
    }
  };

  useEffect(() => {
    getNotas();
  }, []);

  return (
    <NotasContext.Provider value={{ notas, loadingNotas, error, getNotas, createNota }}>
      {children}
    </NotasContext.Provider>
  );
};