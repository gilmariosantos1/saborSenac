import models from '../models/index.js';

export const adicionarAoCarrinho = async (req, res, next) => {
    try {
        const { id_pessoa, id_produto, quantidade, preco_unitario } = req.body;
        
        // Verifica se os campos obrigatórios foram enviados
        if (!id_pessoa || !id_produto || !quantidade || !preco_unitario) {
            return res.status(400).json({ error: "Campos incompletos para o carrinho" });
        }

        // Salva na tabela ReservaItens (carrinho)
        const novoItem = await models.ReservaItens.upsertItem({
            id_pessoa,
            id_produto,
            quantidade,
            preco_unitario
        });

        return res.status(201).json(novoItem);
    } catch (error) {
        console.error("Erro ao adicionar ao carrinho:", error);
        return res.status(500).json({ error: "Erro interno ao adicionar ao carrinho" });
    }
};
