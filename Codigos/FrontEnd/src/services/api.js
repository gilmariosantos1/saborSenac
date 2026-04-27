import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',  // Ajuste a porta se necessário
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;