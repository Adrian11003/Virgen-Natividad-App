import axios from './axios';

export const loginRequest = (data) => 
  axios.post('/auth/login', data);