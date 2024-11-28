import axios from './axios'; // Usa tu instancia base de Axios

export const createPaymentIntentRequest = (data) =>
  axios.post('/stripe/react-native', data);