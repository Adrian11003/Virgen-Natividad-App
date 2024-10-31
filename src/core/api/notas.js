import axios from './axios'

export const getNotasRequest = () => axios.get(`/notas`)

export const createNotaRequest = nota => axios.post('/notas', nota)

export const getSeccionesCursosByDocenteRequest = (docenteId) =>  
  axios.get(`/seccion-curso-docente/docente/${docenteId}`);