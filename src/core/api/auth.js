import axios from './axios'; 

export const loginRequest = async (identificador, contrasena) => {
  try {
    const { data } = await axios.post('/auth/login', { identificador, contrasena });
    return { ...data };
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Error de inicio de sesión");
  }
};