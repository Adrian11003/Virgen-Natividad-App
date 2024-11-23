import { createContext, useState } from 'react';
import { getPeriodoRequest, getPeriodoByAnioRequest } from '../api/periodo';

export const PeriodoContext = createContext();

export const PeriodoProvider = ({ children }) => {

  const fetchPeriodo = async () => {
    try {
      const { data } = await getPeriodoRequest();
      return data;
    } catch (error) {
      console.log(error)
    } 
  }
  const fetchPeriodoByAnio = async (anio) => {
    try {
      const { data } = await getPeriodoByAnioRequest(anio);
      return data
    } catch (error) {
      console.log(error)
    } 
  }
  ;


  return (
    <PeriodoContext.Provider 
      value={{ 
        fetchPeriodo,
        fetchPeriodoByAnio,
      }}
    >
      {children}
    </PeriodoContext.Provider>
  );
}