import { createContext, useState, useEffect } from 'react';
import { getNotasRequest, createNotaRequest, getSeccionesCursosByDocenteRequest } from '../api/notas';

export const NotasContext = createContext();

export const NotasProvider = ({ children }) => {
  const [notas, setNotas] = useState([]);
  const [loadingNotas, setLoadingNotas] = useState(false);
  const [error, setError] = useState(null);
  const [secciones, setSecciones] = useState([]); // Nuevo estado para secciones
  const [cursos, setCursos] = useState([]); // Nuevo estado para cursos
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
    setLoadingSeccionesCursos(true);
    setError(null);
    try {
      const { data } = await getSeccionesCursosByDocenteRequest(docenteId);

      // Separar secciones y cursos
      const seccionesData = data.map(item => ({
        id: item.seccion._id,
        nombre: item.seccion.nombre,
      }));
      
      const cursosData = data.map(item => ({
        id: item.curso._id,
        nombre: item.curso.nombre,
      }));

      // Guardar datos en los estados correspondientes
      setSecciones(seccionesData);
      setCursos(cursosData);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar las secciones y cursos');
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
      secciones, // Exponemos las secciones individualmente
      cursos, // Exponemos los cursos individualmente
      loadingSeccionesCursos,
      getSeccionesCursosByDocente, }}>
      {children}
    </NotasContext.Provider>
  );
};