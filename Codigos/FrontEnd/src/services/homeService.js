import api from './api';

export const listarProdutos = (categoria) => {
  return api.get(`/produtos?categoria=${categoria}`);
};
export const addCarrinho = (data) => api.post('/reservaItens', data);