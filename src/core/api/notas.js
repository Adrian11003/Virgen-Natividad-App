import axios from './axios'

export const getNotasRequest = () => axios.get(`/notas`)

export const createNotaRequest = nota => axios.post('/notas', nota)