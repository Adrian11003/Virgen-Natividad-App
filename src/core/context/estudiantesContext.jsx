import { createContext, useState } from 'react';
import { getEstudiantesBySeccionRequest, getEstudianteByIdRequest } from '../api/estudiantes';

export const EstudiantesContext = createContext();

export const EstudiantesProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const getEstudiantesBySeccion = async (seccionId) => {
    try {
      const { data } = await getEstudiantesBySeccionRequest(seccionId);
      const estudiantesOrdenados = data.sort((a, b) => 
        a.apellido.localeCompare(b.apellido)
      );
      return estudiantesOrdenados // Actualiza el estado de estudiantes con los datos obtenidos
      return estudiantesOrdenados
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const getEstudianteById = async (id) => {
    try {
      const { data } = await getEstudianteByIdRequest(id);
      return data
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  return (
    <EstudiantesContext.Provider 
      value={{ 
        getEstudiantesBySeccion, 
        getEstudianteById,
        error
      }}
    >
      {children}
    </EstudiantesContext.Provider>
  );
};