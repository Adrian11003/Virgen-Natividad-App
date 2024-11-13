import axios from './axios';

export const createAsistenciaRequest = (data) =>
  axios.post('/asistencia', data);

export const updateAsistenciaRequest = (data) =>
  axios.put('/asistencia', data);

export const getAsistenciasBySeccionFechaRequest = (seccionId, fecha) => 
  axios.get(`/asistencia/seccion/${seccionId}?fecha=${fecha}`);

export const getResumenAsistenciaRequest = (seccionId, fecha) =>
  axios.get(`/asistencia/resumen/asistencia?fecha=${fecha}&seccion_id=${seccionId}`);