import axios from 'axios';

export const backendUrl = `https://app.ftoyd.com/fronttemp-service`;

const api = axios.create({
  baseURL: backendUrl,
  timeout: 5000,
});

export default api;
