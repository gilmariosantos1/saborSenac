import api from './api';

export const listPedidos = (params = {}) => api.get('/pedidos', { params });
export const getPedidoByNumero = (numero) => api.get(`/pedidos/${numero}`);
export const updateStatusPedido = (id, status) => api.put(`/pedidos/${id}/status`, { status });
