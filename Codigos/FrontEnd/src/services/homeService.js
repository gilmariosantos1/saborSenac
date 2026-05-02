import api from './api.js';

export const listarProdutos = (categoriaId) =>
    api.get(`/produtos?categoria=${categoriaId}`);

export const adicionarAoCarrinho = (id_pessoa, id_produto, quantidade, preco_unitario) =>
    api.post('/reservaItens', { id_pessoa, id_produto, quantidade, preco_unitario });

export const reservar = (id_pessoa, itens) =>
    api.post('/reservas', { id_pessoa, itens });

export const getReservaById = (id_reserva) =>
    api.get(`/reservas/${id_reserva}`);

export const confirmarReserva = (id_reserva, tipo_pagamento = 'PIX') =>
    api.post('/reservas/confirmar', { id_reserva, tipo_pagamento });

export const cancelarReserva = (id_reserva) =>
    api.delete(`/reservas/${id_reserva}`);