import axios from './axios'

export const createNotaRequest = nota => axios.post('/notas', nota)

export const getNotaByEstudianteCursoBimestreSeccionTipoNota = (estudianteId, cursoId, bimestreId, seccionId, tipoNota) =>
  axios.get(`/notas/${estudianteId}/${cursoId}/${bimestreId}/${seccionId}/${tipoNota}`)