import axios from './axios';

export const getAsistenciasBySeccionGradoPeriodoRequest = (seccionId, gradoId, periodoId) => 
  axios.get(`/estudiante/seccion/${seccionId}/grado/${gradoId}/periodo/${periodoId}`);

export const createAsistenciaRequest = (data) =>
  axios.post('/asistencia', data);

export const updateAsistenciaRequest = (data) =>
  axios.put('/asistencia', data);

export const getAsistenciasByFechaRequest = (fecha) =>
  axios.get(`/asistencia/fechas/${fecha}`);

export const getResumenAsistenciaRequest = (seccionId, fecha) =>
  axios.get(`/asistencia/resumen/asistencia?fecha=${fecha}&seccion_id=${seccionId}`);