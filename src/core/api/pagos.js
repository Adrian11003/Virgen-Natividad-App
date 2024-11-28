import axios from './axios'

export const createPagoRequest = (data) =>
  axios.post('/pago', data)