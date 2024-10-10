import axios from './axios';

export const getEstudiantesBySeccionGradoPeriodoRequest = (seccionId, gradoId, periodoId) => 
  axios.get(`/estudiante/seccion/${seccionId}/grado/${gradoId}/periodo/${periodoId}`);