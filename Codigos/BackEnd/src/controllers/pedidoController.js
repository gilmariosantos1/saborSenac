import models from '../models/index.js';

export const listarPedidos = async (req, res) => {
  try {
    const pedidos = await models.Reserva.findAll({
      include: [
        { model: models.Pessoa, as: 'pessoa', attributes: ['nome'] },
        { model: models.Produto, as: 'produto', attributes: ['nome', 'preco'] }
      ],
      order: [['data_reserva', 'DESC']]
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPedidoByNumero = async (req, res) => {
  try {
    const { numero } = req.params;
    const pedido = await models.Reserva.findOne({
      where: { pedido: numero },
      include: [
        { model: models.Pessoa, as: 'pessoa', attributes: ['nome'] },
        { model: models.Produto, as: 'produto', attributes: ['nome', 'preco'] }
      ]
    });

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const atualizarStatusPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'O campo status é obrigatório' });
    }

    const pedido = await models.Reserva.findOne({
      where: { id_reserva: id }
    });

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    pedido.status = status;
    await pedido.save();

    res.json({ message: `Pedido ${status.toLowerCase()} com sucesso`, pedido });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
