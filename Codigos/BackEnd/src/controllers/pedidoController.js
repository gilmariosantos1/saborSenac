import models from '../models/index.js';

export const listarPedidos = async (req, res) => {
  try {
    const { id_pessoa } = req.query;
    const where = {};
    if (id_pessoa) where.id_pessoa = id_pessoa;

    const pedidos = await models.Reserva.findAll({
      where,
      include: [
        { model: models.Pessoa, as: 'pessoa', attributes: ['nome'] },
        { 
          model: models.ReservaItens, 
          as: 'itens',
          include: [{ model: models.Produtos, as: 'produto', attributes: ['nome', 'preco'] }]
        }
      ],
      order: [['data_reserva', 'DESC']]
    });

    const resultado = pedidos.map(p => {
        const total = p.itens?.reduce((acc, item) => acc + (Number(item.preco_unitario) * item.quantidade), 0) || 0;
        return {
            ...p.toJSON(),
            valor_total: total
        };
    });

    res.json(resultado);
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getPedidoByNumero = async (req, res) => {
  try {
    const { numero } = req.params;
    const pedido = await models.Reserva.findByPk(numero, {
      include: [
        { model: models.Pessoa, as: 'pessoa', attributes: ['nome'] },
        { 
          model: models.ReservaItens, 
          as: 'itens',
          include: [{ model: models.Produtos, as: 'produto', attributes: ['nome', 'preco'] }]
        }
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

    const pedido = await models.Reserva.findByPk(id);

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
