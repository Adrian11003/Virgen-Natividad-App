import axios from 'axios';
import { baseUrl } from '../helpers/baseURL';

const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true
});

export default instance;