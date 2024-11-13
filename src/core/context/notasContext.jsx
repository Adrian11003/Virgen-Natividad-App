import { createContext, useState, useEffect } from 'react';
import { getNotasRequest, createNotaRequest, getSeccionesCursosByDocenteRequest,} from '../api/notas';

export const NotasContext = createContext();

export const NotasProvider = ({ children }) => {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seccionCursoDocente, setSeccionCursoDocente] = useState([]);
  // const [secciones, setSecciones] = useState([]);
  // const [cursos, setCursos] = useState([]); // JUAN
  
  const getNotas = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getNotasRequest();
      setNotas(data);
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false);
    }
  };

  // JUAN
  const getSeccionesCursosByDocente = async (docenteId) => {
    setLoading(true);
    try {
      const { data } = await getSeccionesCursosByDocenteRequest(docenteId);
      setSeccionCursoDocente(data)
      // // Separar secciones y cursos
      // const seccionesData = data.map(item => ({
      //   id: item.seccion._id,
      //   nombre: item.seccion.nombre,
      // }));
      
      // const cursosData = data.map(item => ({
      //   id: item.curso._id,
      //   nombre: item.curso.nombre,
      // }));

      // // Guardar datos en los estados correspondientes
      // setSecciones(seccionesData);
      // setCursos(cursosData);
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false);
    }
  };

  const createNota = async (nota) => {
    try {
      const { data } = await createNotaRequest(nota);
      setNotas([...notas, data]);
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <NotasContext.Provider 
      value={{ 
        notas,
        error,
        getNotas,
        createNota,
        // secciones, // juan
        // cursos, // juan
        loading,
        getSeccionesCursosByDocente,
        seccionCursoDocente
      }}
    >
      {children}
    </NotasContext.Provider>
  );
};
