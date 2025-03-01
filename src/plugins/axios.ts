import axios from 'axios';

export const backendUrl = `${import.meta.env.VITE_BACKEND}`;

const api = axios.create({
  baseURL: backendUrl,
  timeout: 5000,
});

export default api;
