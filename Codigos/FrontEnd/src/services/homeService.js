import api from './api';

export const listarProdutos = (params = {}) => api.get('/produtos', { params });
export const adcionarAoCarrinho = (data) => api.post('/produtos', data);