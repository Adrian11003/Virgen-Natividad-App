import { createContext, useState } from 'react';
import { getEstudiantesBySeccionRequest } from '../api/estudiantes';

export const EstudiantesContext = createContext();

export const EstudiantesProvider = ({ children }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loadingEstudiantes, setLoadingEstudiantes] = useState(false);
  const [error, setError] = useState(null);

  const getEstudiantesBySeccion = async (seccionId) => {
    setLoadingEstudiantes(true);
    try {
      const { data } = await getEstudiantesBySeccionRequest(seccionId);
      const estudiantesOrdenados = data.sort((a, b) => 
        a.apellido.localeCompare(b.apellido)
      );
      setEstudiantes(estudiantesOrdenados);
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoadingEstudiantes(false);
    }
  };

  return (
    <EstudiantesContext.Provider 
      value={{ 
        estudiantes, 
        getEstudiantesBySeccion, 
        loadingEstudiantes, 
        error
      }}
    >
      {children}
    </EstudiantesContext.Provider>
  );
};