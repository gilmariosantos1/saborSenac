import api from './api.js';

// Busca todos os itens do carrinho de uma pessoa
export const listarCarrinho = (id_pessoa) =>
    api.get(`/reservaItens?id_pessoa=${id_pessoa}`);

// Adiciona ou atualiza um item no carrinho
export const adicionarItem = (data) =>
    api.post('/reservaItens', data);

// Remove um item do carrinho pelo id_item
export const removerItem = (id_item) =>
    api.delete(`/reservaItens/${id_item}`);

// Atualiza a quantidade de um item
export const atualizarItem = (id_item, data) =>
    api.put(`/reservaItens/${id_item}`, data);
