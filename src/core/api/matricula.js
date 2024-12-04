import axios from './axios'

export const createMatriculaRequest = (data) =>
  axios.post('/matricula', data)  

export const getMatriculaByEstudianteIdRequest = (estudianteId) =>
  axios.get(`/matricula/${estudianteId}`)