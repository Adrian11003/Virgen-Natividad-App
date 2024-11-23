import axios from './axios';

export const getPeriodoRequest = () =>
  axios.get('/periodo-escolar'); 

export const getPeriodoByAnioRequest = (anio) =>
  axios.get(`/periodo-escolar/anio/${anio}`);
