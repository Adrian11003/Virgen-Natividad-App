import { createContext } from 'react';
import { createPagoRequest } from '../api/pagos';
import { getMatriculaByEstudianteIdRequest } from '../api/matricula';
import { getPensionesByEstudiantePeriodoRequest } from '../api/pension';

export const PagosContext = createContext();

export const PagosProvider = ({ children }) => {

  const createPago = async (anio) => {
    try {
      const { data } = await createPagoRequest(anio);
      return data
    } catch (error) {
      console.log(error)
      throw error
    } 
  };

  const getMatriculaByEstudianteId = async (estudianteId) => {
    try {
      const { data } = await getMatriculaByEstudianteIdRequest(estudianteId);
      return data
    } catch (error) {
      console.log(error)
      throw error
    } 
  };

  const getPensionesByEstudiantePeriodo = async (estudianteId, periodoId) => {
    try {
      const { data } = await getPensionesByEstudiantePeriodoRequest(estudianteId, periodoId);
      return data
    } catch (error) {
      console.log(error)
      throw error
    } 
  };

  return (
    <PeriodoContext.Provider 
      value={{ 
        createPago,
        getPensionesByEstudiantePeriodo,
        getMatriculaByEstudianteId
      }}
    >
      {children}
    </PeriodoContext.Provider>
  );
}