import { createContext, useState, useEffect } from 'react';
import { getNotasRequest, getSeccionCursoDocenteByDocenteId } from '../api/notas';

export const NotasContext = createContext();

export const NotasProvider = ({ children }) => {
  const [notas, setNotas] = useState([]);
  const [seccionGradoDocente, setSeccionGradoDocente] = useState([]);
  const [loadingNotas, setLoadingNotas] = useState(false);
  const [error, setError] = useState(null);

  const getNotas = async () => {
    setLoadingNotas(true);
    setError(null);
    try {
      const { data } = await getNotasRequest();
      console.log("Notas recibidas:", data);
      setNotas(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar las notas');
    } finally {
      setLoadingNotas(false);
    }
  };

  const getSeccionCursoDocente = async (docenteId) => {
    setLoadingNotas(true);
    setError(null);
    try {
      const { data } = await getSeccionCursoDocenteByDocenteId(docenteId);
      console.log("Sección y curso recibidos:", data);
      setSeccionGradoDocente(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar las secciones y cursos');
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
    <NotasContext.Provider
      value={{
        notas,
        seccionGradoDocente,
        loadingNotas,
        error,
        getNotas,
        getSeccionCursoDocente, createNota
      }}
    >
      {children}
    </NotasContext.Provider>
  );
};
