import { baseUrl } from '../helpers/baseURL';
import axios from 'axios';


export const listarHorariosPorSeccionGrado = async (seccionId, gradoId) => {
  try {
    const response = await axios.get(`${baseUrl}/horario/seccion/${seccionId}/grado/${gradoId}`);
    return response.data;
  } catch (error) {
    console.error('xd', error);
    throw error;
  }
};
