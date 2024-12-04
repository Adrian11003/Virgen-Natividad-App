import { createContext } from 'react';
import { createPagoRequest } from '../api/pagos';
import { getMatriculaByEstudianteIdRequest } from '../api/matricula';
import { getPensionesByPeriodoEstudianteRequest } from '../api/pension';
import { createMatriculaRequest } from '../api/matricula';

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

  const createMatricula = async (dataMatricula) => {
    try {
      const { data } = await createMatriculaRequest(dataMatricula);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const getMatriculaByEstudianteId = async (estudianteId) => {
    try {
      const { data } = await getMatriculaByEstudianteIdRequest(estudianteId);
      return data
    } catch (error) {
      console.log(error)
      throw error
    } 
  };

  const getPensionesByPeriodoEstudiante = async (periodoId, estudianteId) => {
    try {
      const { data } = await getPensionesByPeriodoEstudianteRequest(periodoId, estudianteId);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <PagosContext.Provider 
      value={{ 
        createPago,
        createMatricula,
        getMatriculaByEstudianteId,
        getPensionesByPeriodoEstudiante
      }}
    >
      {children}
    </PagosContext.Provider>
  );
}