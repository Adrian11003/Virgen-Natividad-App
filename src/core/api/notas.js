import axios from './axios'

export const createNotaRequest = nota => axios.post('/notas', nota)

export const updateNotaRequest = (notaId, data) => axios.patch(`/notas/${notaId}`, data)

export const getNotaByEstudianteCursoBimestrePeriodoRequest = (estudianteId, cursoId, bimestreId, periodoId) =>
  axios.get(`/notas/${estudianteId}/${cursoId}/${bimestreId}/${periodoId}`)

export const getNotaByEstudianteCursoBimestreSeccionTipoNotaRequest = (estudianteId, cursoId, bimestreId, seccionId, tipoNota) =>
  axios.get(`/notas/${estudianteId}/${cursoId}/${bimestreId}/${seccionId}/${tipoNota}`)

export const changeNotaStateProcessedRequest = (notaId) => axios.patch(`/notas/processed/${notaId}`)

export const changeNotaStateNullRequest = (notaId) => axios.patch(`/notas/remove/${notaId}`)