import { createContext, useState } from 'react';
import { getEstudiantesBySeccionRequest } from '../api/estudiantes';

export const EstudiantesContext = createContext();

export const EstudiantesProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [estudiantes, setEstudiantes] = useState([]); // Agrega el estado de estudiantes

  const getEstudiantesBySeccion = async (seccionId) => {
    try {
      const { data } = await getEstudiantesBySeccionRequest(seccionId);
      const estudiantesOrdenados = data.sort((a, b) => 
        a.apellido.localeCompare(b.apellido)
      );
      setEstudiantes(estudiantesOrdenados); // Actualiza el estado de estudiantes con los datos obtenidos
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <EstudiantesContext.Provider 
      value={{ 
        estudiantes,         // Asegúrate de pasar estudiantes en el contexto
        getEstudiantesBySeccion, 
        error
      }}
    >
      {children}
    </EstudiantesContext.Provider>
  );
};