import api from './api.js';

export const listarProdutos = (categoriaId) => {
  return api.get(`/produtos?categoria=${categoriaId}`);
};

export const addCarrinho = (data) => api.post('/reservaItens', data);