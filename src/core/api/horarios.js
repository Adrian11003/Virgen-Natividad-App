import axios from './axios';

export const getHorariosByDocenteCursoRequest = (docenteId, cursoId) => 
  axios.get(`/horario/docente/${docenteId}/curso/${cursoId}`);

export const getHorariosBySeccionGradoRequest = (seccionId, gradoId) =>
  axios.get(`/horario/seccion/${seccionId}/grado/${gradoId}`);