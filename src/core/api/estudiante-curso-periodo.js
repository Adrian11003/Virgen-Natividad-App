import axios from './axios';

export const getEstudianteCursoPeriodoByIdRequest = (id) =>
  axios.get(`/estudiante-curso-periodo/${id}`);

export const getEstudianteCursoPeriodoByEstudiantePeriodoRequest = (estudianteId, periodoId) => 
  axios.get(`/estudiante-curso-periodo/${estudianteId}/${periodoId}`);

export const getPeriodosByEstudianteRequest = (estudianteId) => 
  axios.get(`/estudiante-curso-periodo/periodos/${estudianteId}`);