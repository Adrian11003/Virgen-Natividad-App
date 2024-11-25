import { createContext } from 'react';
import { createPaymentIntentRequest } from '../api/payment';

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

  return (
    <PaymentContext.Provider value={{ createPaymentIntent }}>
      {children}
    </PaymentContext.Provider>
  );
};