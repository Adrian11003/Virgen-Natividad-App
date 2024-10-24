import axios from './axios';

export const getHorariosByDocenteRequest = (docenteId) => 
  axios.get(`/horario/docente/${docenteId}`);

export const getHorariosBySeccionGradoRequest = (seccionId, gradoId) =>
  axios.get(`/horario/seccion/${seccionId}/grado/${gradoId}`);