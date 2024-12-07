import axios from './axios'

export const getPensionesByPeriodoEstudianteRequest = (periodoId, estudianteId) =>
  axios.get(`/pension/${periodoId}/${estudianteId}`)

export const updatePensionPayRequest = (pensionId) =>
  axios.patch(`/pension/pagar/${pensionId}`)