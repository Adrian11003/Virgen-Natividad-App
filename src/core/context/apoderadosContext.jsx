import { createContext, useState } from 'react';
import { getApoderadoByEstudianteId } from '../api/apoderado';

export const ApoderadosContext = createContext();

export const ApoderadosProvider = ({ children }) => {
  const [apoderadosByEstudiante, setApoderadosByEstudiante] = useState([]);
  const [loadingApoderados, setLoadingApoderados] = useState(false);
  const [error, setError] = useState(null);

  const getApoderado = async (estudianteId) => {
    setLoadingApoderados(true);
    setError(null);
    try {
      const { data } = await getApoderadoByEstudianteId(estudianteId);
      setApoderadosByEstudiante(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al cargar el apoderado');
    } finally {
      setLoadingApoderados(false);
    }
  };

  return (
    <ApoderadosContext.Provider
      value={{
        getApoderado,
        apoderadosByEstudiante, 
        loadingApoderados,
        error,
      }}
    >
      {children}
    </ApoderadosContext.Provider>
  );
};
