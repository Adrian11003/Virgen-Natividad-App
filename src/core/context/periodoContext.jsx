import { createContext } from 'react';
import { getPeriodoRequest } from '../api/periodo';

export const PeriodoContext = createContext();

export const PeriodoProvider = ({ children }) => {
  const fetchPeriodo = async () => {
    try {
      const { data } = await getPeriodoRequest();
      return data;
    } catch (error) {
      console.log(error)
    } 
  };

  return (
    <PeriodoContext.Provider 
      value={{ 
        fetchPeriodo
      }}
    >
      {children}
    </PeriodoContext.Provider>
  );
}