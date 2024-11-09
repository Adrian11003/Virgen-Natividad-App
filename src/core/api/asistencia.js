import axios from './axios';

export const createAsistenciaRequest = (data) =>
  axios.post('/asistencia', data);

export const updateAsistenciaRequest = (id, data) =>
  axios.put(`/asistencia/${id}`, data);

export const getAsistenciasBySeccionFechaRequest = (seccionId, fecha) => 
  axios.get(`/asistencia/seccion/${seccionId}?fecha=${fecha}`);

export const getResumenAsistenciaRequest = (seccionId, fecha) =>
  axios.get(`/asistencia/resumen/asistencia?fecha=${fecha}&seccion_id=${seccionId}`);

export const getAsistenciasByMesRequest = (estudianteId,periodoId) =>
  axios.get(`/asistencia/meses-unicos?estudianteId=${estudianteId}&periodoId=${periodoId}`);

export const deleteAsistenciasByFechaSeccionRequest = (fecha, seccionId) =>
  axios.delete(`/asistencia/eliminar/${fecha}/${seccionId}`);
