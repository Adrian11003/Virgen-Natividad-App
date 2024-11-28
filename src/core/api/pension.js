import axios from './axios'

export const getPensionesByEstudiantePeriodoRequest = (estudianteId, periodoId) =>
  axios.get(`/pension/${estudianteId}/${periodoId}`)