import axios from './axios';

export const getHorariosByDocenteAndCursoRequest = (docenteId, cursoId) => 
  axios.get(`/horario/docente/${docenteId}/curso/${cursoId}`);