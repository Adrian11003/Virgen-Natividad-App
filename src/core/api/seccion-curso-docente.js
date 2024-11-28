import axios from './axios'

export const getSeccionesCursosByDocenteRequest = (docenteId) =>  
  axios.get(`/seccion-curso-docente/docente/${docenteId}`);