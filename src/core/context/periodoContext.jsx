import { createContext } from 'react';
import { 
  getPeriodoRequest,
  getPeriodoByAnioRequest,
  getPeriodoByIdRequest
} from '../api/periodo';

export const PeriodoContext = createContext();

export const PeriodoProvider = ({ children }) => {

  const fetchPeriodo = async () => {
    try {
      const { data } = await getPeriodoRequest();
      return data;
    } catch (error) {
      console.log(error)
      throw error
    } 
  }

  const fetchPeriodoByAnio = async (anio) => {
    try {
      const { data } = await getPeriodoByAnioRequest(anio);
      return data
    } catch (error) {
      console.log(error)
      throw error
    } 
  };

  const getPeriodoById = async (periodoId) => {
    try {
      const { data } = await getPeriodoByIdRequest(periodoId);
      return data
    } catch (error) {
      console.log(error)
      throw error
    } 
  };

  return (
    <PeriodoContext.Provider 
      value={{ 
        fetchPeriodo,
        fetchPeriodoByAnio,
        getPeriodoById
      }}
    >
      {children}
    </PeriodoContext.Provider>
  );
}