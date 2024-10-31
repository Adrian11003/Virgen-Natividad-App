import { createContext, useState, useEffect } from 'react';
import { getNotasRequest, createNotaRequest, 
        getSeccionesCursosByDocenteRequest, // JUAN
        getSeccionCursoDocenteByDocenteId // ADRIAN
       } from '../api/notas';

export const NotasContext = createContext();

export const NotasProvider = ({ children }) => {
  const [notas, setNotas] = useState([]);
  const [seccionGradoDocente, setSeccionGradoDocente] = useState([]); // ADRIAN
  const [loadingNotas, setLoadingNotas] = useState(false);
  const [error, setError] = useState(null);
  const [secciones, setSecciones] = useState([]); // JUAN
  const [cursos, setCursos] = useState([]); // JUAN
  const [loadingSeccionesCursos, setLoadingSeccionesCursos] = useState(false);
  
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

  // ADRIAN
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

  // JUAN
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
    <NotasContext.Provider 
      value={{ 
        notas,
        loadingNotas,
        error,
        getNotas,
        seccionGradoDocente // adrian
        createNota,
        secciones, // juan
        cursos, // juan
        loadingSeccionesCursos,
        getSeccionCursoDocente // ADRIAN
        getSeccionesCursosByDocente
      }}
    >
      {children}
    </NotasContext.Provider>
  );
};
