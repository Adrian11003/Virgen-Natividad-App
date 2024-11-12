import { createContext, useState, useEffect } from 'react';
import { getNotasRequest, createNotaRequest, getSeccionesCursosByDocenteRequest,getBimestresRequest} from '../api/notas';


export const NotasContext = createContext();

export const NotasProvider = ({ children }) => {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seccionCursoDocente, setSeccionCursoDocente] = useState([]);
  const [bimestres, setBimestres] = useState([]); // JUAN
  

  const getBimestres = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getBimestresRequest();
      console.log("Bimestres recibidos:", data);
      setBimestres(data);
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false);
    }
  };


  
  const getNotas = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getNotasRequest();
      console.log("Notas recibidas:", data);
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
    try {
      const { data } = await getSeccionesCursosByDocenteRequest(docenteId);
      return data
    } catch (error) {
      console.log(error)
      setError(error)
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
        bimestres, // JUAN
        error,
        getNotas,
        createNota,
        getBimestres,
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
