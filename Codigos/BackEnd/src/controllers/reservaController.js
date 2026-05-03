import models from '../models/index.js';

const timersReserva = new Map();

export const comprarImediato = async (req, res) => {
    const t = await models.sequelize.transaction();
    try {
        const { id_pessoa, itens } = req.body;

        if (!id_pessoa || !itens || itens.length === 0) {
            await t.rollback();
            return res.status(400).json({ error: 'Dados incompletos.' });
        }

        let valorTotal = 0;

        for (const item of itens) {
            const produto = await models.Produtos.findByPk(item.id_produto, { transaction: t, lock: true });
            if (!produto) {
                await t.rollback();
                return res.status(404).json({ error: `Produto ${item.id_produto} não encontrado.` });
            }
            if (produto.estoque < item.quantidade) {
                await t.rollback();
                return res.status(400).json({ error: `Estoque insuficiente para "${produto.nome}". Disponível: ${produto.estoque}` });
            }
            await produto.update({ estoque: produto.estoque - item.quantidade }, { transaction: t });
            valorTotal += Number(item.preco_unitario) * item.quantidade;
        }

        const reserva = await models.Reserva.create({
            id_pessoa,
            data_reserva: new Date(),
            status: 'PAGA',
        }, { transaction: t });

        for (const item of itens) {
            await models.ReservaItens.create({
                id_pessoa,
                id_reserva: reserva.id_reserva,
                id_produto: item.id_produto,
                quantidade: item.quantidade,
                preco_unitario: item.preco_unitario,
            }, { transaction: t });
        }

        await t.commit();

        return res.status(201).json({
            message: 'Compra realizada com sucesso!',
            id_reserva: reserva.id_reserva,
            valorTotal,
        });
    } catch (error) {
        await t.rollback();
        console.error('Erro na compra imediata:', error);
        return res.status(500).json({ error: 'Erro interno ao processar compra.' });
    }
};

export const criarReserva = async (req, res) => {
    const t = await models.sequelize.transaction();
    try {
        const { id_pessoa, itens } = req.body;

        if (!id_pessoa || !itens || itens.length === 0) {
            await t.rollback();
            return res.status(400).json({ error: 'Dados incompletos.' });
        }

        for (const item of itens) {
            const produto = await models.Produtos.findByPk(item.id_produto, { transaction: t, lock: true });
            if (!produto) {
                await t.rollback();
                return res.status(404).json({ error: `Produto ${item.id_produto} não encontrado.` });
            }
            if (produto.estoque < item.quantidade) {
                await t.rollback();
                return res.status(400).json({ error: `Estoque insuficiente para "${produto.nome}". Disponível: ${produto.estoque}` });
            }
            await produto.update({ estoque: produto.estoque - item.quantidade }, { transaction: t });
        }

        const reserva = await models.Reserva.create({
            id_pessoa,
            data_reserva: new Date(),
            status: 'ABERTA',
        }, { transaction: t });

        for (const item of itens) {
            await models.ReservaItens.create({
                id_pessoa,
                id_reserva: reserva.id_reserva,
                id_produto: item.id_produto,
                quantidade: item.quantidade,
                preco_unitario: item.preco_unitario,
            }, { transaction: t });
        }

        await t.commit();

        // Limpa o carrinho do usuário após a reserva ser criada
        await models.ReservaItens.destroy({
            where: {
                id_pessoa,
                id_reserva: null
            }
        });

        const timer = setTimeout(async () => {
            try {
                const reservaAtual = await models.Reserva.findByPk(reserva.id_reserva);
                if (reservaAtual && reservaAtual.status === 'ABERTA') {
                    for (const item of itens) {
                        const produto = await models.Produtos.findByPk(item.id_produto);
                        if (produto) {
                            await produto.update({ estoque: produto.estoque + item.quantidade });
                        }
                    }
                    await reservaAtual.update({ status: 'CANCELADA' });
                }
                timersReserva.delete(reserva.id_reserva);
            } catch (e) {
                console.error('Erro ao expirar reserva:', e);
            }
        }, 1 * 60 * 1000);

        timersReserva.set(reserva.id_reserva, timer);

        return res.status(201).json({
            message: 'Reserva criada!',
            id_reserva: reserva.id_reserva,
            expira_em: new Date(Date.now() + 1 * 60 * 1000),
        });
    } catch (error) {
        if (t) await t.rollback();
        console.error('Erro ao criar reserva:', error);
        return res.status(500).json({ error: 'Erro interno ao criar reserva.' });
    }
};

export const confirmarReserva = async (req, res) => {
    const t = await models.sequelize.transaction();
    try {
        const { id_reserva, tipo_pagamento } = req.body;

        const reserva = await models.Reserva.findByPk(id_reserva, { transaction: t, lock: true });

        if (!reserva) {
            await t.rollback();
            return res.status(404).json({ error: 'Reserva não encontrada.' });
        }
        if (reserva.status !== 'ABERTA') {
            await t.rollback();
            return res.status(400).json({ error: `Reserva já está ${reserva.status.toLowerCase()}.` });
        }

        if (timersReserva.has(id_reserva)) {
            clearTimeout(timersReserva.get(id_reserva));
            timersReserva.delete(id_reserva);
        }

        const itens = await models.ReservaItens.findAll({ where: { id_reserva }, transaction: t });
        const valorTotal = itens.reduce(
            (acc, i) => acc + Number(i.preco_unitario) * i.quantidade,
            0
        );

        await reserva.update({ status: 'PAGA' }, { transaction: t });

        await t.commit();

        return res.status(200).json({
            message: 'Reserva confirmada!',
            id_reserva,
            tipo_pagamento: tipo_pagamento || 'NAO_INFORMADO',
            valorTotal,
        });
    } catch (error) {
        await t.rollback();
        console.error('Erro ao confirmar reserva:', error);
        return res.status(500).json({ error: 'Erro ao confirmar reserva.' });
    }
};

export const cancelarReserva = async (req, res) => {
    const t = await models.sequelize.transaction();
    try {
        const { id_reserva } = req.params;
        const reserva = await models.Reserva.findByPk(id_reserva, { transaction: t, lock: true });

        if (!reserva) {
            await t.rollback();
            return res.status(404).json({ error: 'Reserva não encontrada.' });
        }
        if (reserva.status !== 'ABERTA') {
            await t.rollback();
            return res.status(400).json({ error: `Reserva já está ${reserva.status.toLowerCase()}.` });
        }

        if (timersReserva.has(Number(id_reserva))) {
            clearTimeout(timersReserva.get(Number(id_reserva)));
            timersReserva.delete(Number(id_reserva));
        }

        const itens = await models.ReservaItens.findAll({ where: { id_reserva }, transaction: t });
        for (const item of itens) {
            const produto = await models.Produtos.findByPk(item.id_produto, { transaction: t });
            if (produto) {
                await produto.update({ estoque: produto.estoque + item.quantidade }, { transaction: t });
            }
        }

        await reserva.update({ status: 'CANCELADA' }, { transaction: t });
        await t.commit();

        return res.status(200).json({ message: 'Reserva cancelada.' });
    } catch (error) {
        await t.rollback();
        console.error('Erro ao cancelar reserva:', error);
        return res.status(500).json({ error: 'Erro ao cancelar reserva.' });
    }
};

export const getReservaById = async (req, res) => {
    try {
        const { id_reserva } = req.params;
        const reserva = await models.Reserva.findByPk(id_reserva, {
            include: [
                {
                    model: models.Pessoa,
                    as: 'pessoa',
                    attributes: ['nome']
                },
                {
                    model: models.ReservaItens,
                    as: 'itens',
                    include: [
                        {
                            model: models.Produtos,
                            as: 'produto',
                            attributes: ['nome', 'preco', 'imagem']
                        }
                    ]
                }
            ]
        });

        if (!reserva) {
            return res.status(404).json({ error: 'Reserva não encontrada.' });
        }

        return res.status(200).json(reserva);
    } catch (error) {
        console.error('Erro ao buscar reserva:', error);
        return res.status(500).json({ error: 'Erro ao buscar reserva.' });
    }
};
