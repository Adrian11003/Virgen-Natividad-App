import axios from './axios';

export const loginRequest = (identificador, contrasena) => 
  axios.post('/auth/login', { identificador, contrasena });