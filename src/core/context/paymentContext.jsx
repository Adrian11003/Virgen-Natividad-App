import { createContext } from 'react';
import { createPaymentIntentRequest } from '../api/payment';
import { getPensionesByPeriodoEstudianteRequest } from '../api/pension';
import { createMatriculaRequest } from '../api/matricula';

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const createPaymentIntent = async (paymentData) => {
    try {
      const { data } = await createPaymentIntentRequest(paymentData);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
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
    <PaymentContext.Provider 
      value={{ 
        createPaymentIntent,
        createMatricula,
        getPensionesByPeriodoEstudiante
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};