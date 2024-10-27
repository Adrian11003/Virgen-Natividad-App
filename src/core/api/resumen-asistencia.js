import axios from './axios';

export const createResumenAsistenciaRequest = (data) =>
  axios.post('/resumen-asistencia', data);

export const getResumenAsistenciaBySeccionRequest = (seccionId) => 
  axios.get(`/resumen-asistencia/seccion/${seccionId}`);

export const getResumenAsistenciaByIdRequest = (id) =>
  axios.get(`/resumen-asistencia/${id}`);

export const updateResumenAsistenciaRequest = (id, data) =>
  axios.put(`/resumen-asistencia/${id}`, data);

export const deleteResumenAsistenciaRequest = (id) =>
  axios.delete(`/resumen-asistencia/${id}`);