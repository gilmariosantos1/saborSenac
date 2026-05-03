import api from './api';

export const listarTodosProdutos = () => api.get('/produtos');
export const excluirProduto = (id) => api.delete(`/produtos/${id}`);
export const atualizarEstoque = (id, incremento) => api.patch(`/produtos/${id}/estoque`, { incremento });

// Reusando do ServiceEditarProduto se necessário, ou definindo aqui para centralizar
export const buscarProdutoPorId = (id) => api.get(`/produtos/${id}`);
export const editarProduto = (id, formData) => api.put(`/produtos/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const cadastrarProduto = (formData) => api.post('/produtos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
