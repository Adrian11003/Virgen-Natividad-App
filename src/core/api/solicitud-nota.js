import axios from './axios';

export const createSolicitudNotaRequest = nota => 
  axios.post('/solicitud-notas', nota)

export const getSolicitudNotaRequest = (docenteId, estudianteId, cursoId, seccionId, bimestreId, tipoNota) =>
  axios.get(`/solicitud-notas/${docenteId}/${estudianteId}/${cursoId}/${seccionId}/${bimestreId}/${tipoNota}`)

export const deleteSolicitudNotaRequest = (notaId) => axios.delete(`/solicitud-notas/${notaId}`)