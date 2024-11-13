import axios from './axios';

export const getSemanasRequest = () => axios.get(`/semanas`)

export const getSemanaByIdRequest = (id) => axios.get(`/semanas/${id}`)