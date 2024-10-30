import { createContext, useState, useEffect } from 'react';
import { getNotasRequest, createNotaRequest, getSeccionesCursosByDocenteRequest } from '../api/notas';

export const NotasContext = createContext();

export const NotasProvider = ({ children }) => {
  const [notas, setNotas] = useState([]);
  const [loadingNotas, setLoadingNotas] = useState(false);
  const [error, setError] = useState(null);
  const [seccionesCursos, setSeccionesCursos] = useState([]);
  const [loadingSeccionesCursos, setLoadingSeccionesCursos] = useState(false);
  
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

  const getSeccionesCursosByDocente = async (docenteId) => {
    console.log('Llamando a getSeccionesCursosByDocente con ID:', docenteId); 
    setLoadingSeccionesCursos(true);
    setError(null);
    try {
      const { data } = await getSeccionesCursosByDocenteRequest(docenteId);
      console.log('Datos obtenidos para secciones y cursos:', data); // Verifica los datos
      if (data && data.length > 0) {
        setSeccionesCursos(data);
      } else {
        console.log('No se recibieron datos para secciones y cursos.');
      }
    } catch (err) {
      console.error('Error al cargar secciones y cursos:', err);
      console.error('Detalles del error:', err.response); // Añade este log
      setError(err.response?.data?.message || 'Error al cargar secciones y cursos');
    } finally {
      setLoadingSeccionesCursos(false);
    }
  };

  useEffect(() => {
    getNotas();
  }, []);

  return (
    <NotasContext.Provider value={{ 
      notas,
      loadingNotas,
      error,
      getNotas,
      createNota,
      seccionesCursos,
      loadingSeccionesCursos,
      getSeccionesCursosByDocente, }}>
      {children}
    </NotasContext.Provider>
  );
};