import axios from './axios'

export const getMatriculaByEstudianteIdRequest = (estudianteId) =>
  axios.get(`/matricula/${estudianteId}`)