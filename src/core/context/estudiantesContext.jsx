import { createContext, useState } from 'react';
import { getEstudiantesBySeccionRequest } from '../api/estudiantes';

export const EstudiantesContext = createContext();

export const EstudiantesProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const getEstudiantesBySeccion = async (seccionId) => {
    try {
      const { data } = await getEstudiantesBySeccionRequest(seccionId);
      return estudiantesOrdenados = data.sort((a, b) => 
        a.apellido.localeCompare(b.apellido)
      );
    } catch (error) {
      console.log(error)
      setError(error)
    }
  };

  return (
    <EstudiantesContext.Provider 
      value={{ 
        getEstudiantesBySeccion, 
        error
      }}
    >
      {children}
    </EstudiantesContext.Provider>
  );
};