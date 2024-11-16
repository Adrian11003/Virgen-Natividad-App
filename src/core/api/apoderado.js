import axios from './axios';

export const getApoderadoByEstudianteId = (estudianteId) => 
  axios.get(`/apoderado/estudiante/${estudianteId}`);
