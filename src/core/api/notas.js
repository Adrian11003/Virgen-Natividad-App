import axios from './axios'

export const createNotaRequest = nota => axios.post('/notas', nota)

export const getNotaByEstudianteCursoBimestreSeccionTipoNotaRequest = (estudianteId, cursoId, bimestreId, seccionId, tipoNota) =>
  axios.get(`/notas/${estudianteId}/${cursoId}/${bimestreId}/${seccionId}/${tipoNota}`)

export const updateNotaRequest = (notaId, data) => axios.patch(`/notas/${notaId}`, data)

export const changeNotaStateProcessedRequest = (notaId) => axios.patch(`/notas/processed/${notaId}`)

export const changeNotaStateNullRequest = (notaId) => axios.patch(`/notas/remove/${notaId}`)

export const getCursoByEstudianteRequest = (estudianteId) => axios.get(`/estudiante-curso/estudiante/${estudianteId}`)



