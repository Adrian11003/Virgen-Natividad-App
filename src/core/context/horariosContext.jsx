import { createContext, useState, useEffect } from 'react';
import { getHorariosByDocenteAndCursoRequest } from '../api/horarios';

export const HorarioContext = createContext();

export const HorarioProvider = ({ children, docenteId, cursoId }) => {
  const [horarios, setHorarios] = useState([]);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [error, setError] = useState(null);

  const getHorariosByDocenteAndCurso = async (docenteId, cursoId) => {
    setLoadingHorarios(true);
    setError(null);
    try {
      const { data } = await getHorariosByDocenteAndCursoRequest(docenteId, cursoId);
      setHorarios(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar los horarios');
    } finally {
      setLoadingHorarios(false);
    }
  };

  useEffect(() => {
    if (docenteId && cursoId) {
      getHorariosByDocenteAndCurso(docenteId, cursoId);
    }
  }, [docenteId, cursoId]);

  return (
    <HorarioContext.Provider value={{ horarios, loadingHorarios, error, getHorariosByDocenteAndCurso }}>
      {children}
    </HorarioContext.Provider>
  );
};