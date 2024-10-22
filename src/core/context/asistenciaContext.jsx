import { createContext, useState, useEffect } from 'react';
import { getSemanasRequest } from '../api/semanas';

export const AsistenciaContext = createContext();

export const AsistenciaProvider = ({ children }) => {
  const [semanas, setSemanas] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchSemanas();
  }, [])

  const fetchSemanas = async () => {
    try {
      const response = await getSemanasRequest();
      setSemanas(response.data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false); 
    }
  };

  const ordenarSemanas = (semanas) => {
    return semanas.sort((a, b) => {
      const numeroA = parseInt(a.nombre.match(/\d+/)[0], 10);
      const numeroB = parseInt(b.nombre.match(/\d+/)[0], 10);
      return numeroA - numeroB;
    });
  };

  return (
    <AsistenciaContext.Provider 
      value={{ 
        loading,
        semanas: ordenarSemanas(semanas),
        fetchSemanas 
      }}
    >
      {children}
    </AsistenciaContext.Provider>
  )
}