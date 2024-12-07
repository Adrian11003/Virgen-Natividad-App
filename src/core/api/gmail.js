import axios from './axios';

export const sendEmailPdf = (id, gmail) =>
  axios.patch(`/gmail/send-email/${id}`,gmail)