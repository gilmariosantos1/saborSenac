import models from "../models/index.js";

const reservaItensModel = models.ReservaItens;
import { body, param, validationResult } from "express-validator";

export const reservaItensValidators = {
    id: [
        param("id")
            .isInt({ min: 1 })
            .withMessage("Id deve ser um número inteiro positivo."),
    ],

    create: [
        body("id_produto")
            .notEmpty()
            .withMessage("Produto é obrigatório.")
            .isInt({ min: 1 }),

        body("quantidade")
            .notEmpty()
            .withMessage("Quantidade é obrigatória.")
            .isInt({ min: 1 }),
    ],

    update: [
        body("quantidade")
            .optional()
            .isInt({ min: 1 }),
    ],
};

export function createReservaItensController(reservaItensModel) {
    return {
        async list(req, res, next) {
            try {
                const where = {};
                if (req.query.id_pessoa) {
                    where.id_pessoa = Number(req.query.id_pessoa);
                }

                const itens = await reservaItensModel.findAll({
                    where,
                    include: [
                        {
                            model: models.Produtos,
                            as: "produto",
                            attributes: ["nome", "imagem"],
                        },
                    ],
                });

                // Achata o resultado para facilitar o frontend
                const resultado = itens.map((item) => ({
                    ...item.toJSON(),
                    nome: item.produto?.nome,
                    imagem: item.produto?.imagem,
                }));

                return res.status(200).json(resultado);
            } catch (error) {
                return next(error);
            }
        },

        async getById(req, res, next) {
            try {
                const item = await reservaItensModel.findById(
                    Number(req.params.id)
                );

                if (!item) {
                    return res
                        .status(404)
                        .json({ message: "Item não encontrado." });
                }

                return res.status(200).json(item);
            } catch (error) {
                return next(error);
            }
        },

        async create(req, res, next) {
            try {
                const { id_pessoa, id_produto, quantidade, preco_unitario } = req.body;

                // 1. Buscar produto
                const produto = await models.Produtos.findByPk(id_produto);

                if (!produto) {
                    return res.status(404).json({
                        message: "Produto não encontrado"
                    });
                }

                // 2. Buscar se já existe no carrinho
                const existente = await reservaItensModel.findOne({
                    where: { id_pessoa, id_produto }
                });

                // 3. Calcular quantidade total
                const quantidadeAtual = existente ? existente.quantidade : 0;
                const quantidadeFinal = quantidadeAtual + quantidade;

                // 4. Validar estoque TOTAL
                if (quantidadeFinal > produto.estoque) {
                    return res.status(400).json({
                        message: `Estoque insuficiente. Disponível: ${produto.estoque}`
                    });
                }

                // 5. Atualizar OU criar
                if (existente) {
                    await existente.update({
                        quantidade: quantidadeFinal
                    });

                    return res.status(200).json(existente);
                }

                const novo = await reservaItensModel.create({
                    id_pessoa,
                    id_produto,
                    quantidade,
                    preco_unitario
                });

                return res.status(201).json(novo);

            } catch (error) {
                return next(error);
            }
        },

        async update(req, res, next) {
            try {
                const updatedItem = await reservaItensModel.updateItem(
                    Number(req.params.id),
                    req.body
                );

                if (!updatedItem) {
                    return res
                        .status(404)
                        .json({ message: "Item não encontrado." });
                }

                return res.status(200).json(updatedItem);
            } catch (error) {
                return next(error);
            }
        },

        async remove(req, res, next) {
            try {
                const removed = await reservaItensModel.removeItem(
                    Number(req.params.id)
                );

                if (!removed) {
                    return res
                        .status(404)
                        .json({ message: "Item não encontrado." });
                }

                return res.status(204).send();
            } catch (error) {
                return next(error);
            }
        },
    };
}