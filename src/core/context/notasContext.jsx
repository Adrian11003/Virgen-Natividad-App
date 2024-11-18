import { createContext, useState } from 'react';
import { createNotaRequest, getNotaByEstudianteCursoBimestreSeccionTipoNota } from '../api/notas';
import { getBimestresRequest } from '../api/bimestre';
import { getSeccionesCursosByDocenteRequest } from '../api/seccion-curso-docente';

export const NotasContext = createContext();

export const NotasProvider = ({ children }) => {
  const [error, setError] = useState(null);
  
  const getBimestres = async () => {
    try {
      const { data } = await getBimestresRequest();
      return data
    } catch (error) {
      console.log(error)
      setError(error)
    }
  };

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
      return data
    } catch (error) {
      console.log(error)
      setError(error)
    }
  };

  const getNotasByEstudianteCursoBimestreSeccionTipoNota = async (
    estudianteId, cursoId, bimestreId, seccionId, tipoNota
  ) => {
    try {
      const { data } = await getNotaByEstudianteCursoBimestreSeccionTipoNota(
        estudianteId, cursoId, bimestreId, seccionId, tipoNota
      );
      return data
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  return (
    <NotasContext.Provider 
      value={{ 
        error,
        createNota,
        getBimestres,
        getSeccionesCursosByDocente
      }}
    >
      {children}
    </NotasContext.Provider>
  );
}
