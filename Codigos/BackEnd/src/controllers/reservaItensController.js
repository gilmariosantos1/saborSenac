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
                const itens =
                    await reservaItensModel.listAll();

                return res.status(200).json(itens);
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
                const createdItem = await reservaItensModel.upsertItem(req.body);

                return res.status(201).json(createdItem);
            } catch (error) {
                return next(error);
            }
        },

        async update(req, res, next) {
            try {
                const updatedItem = await reservaItensModel.update(
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
                const removed = await reservaItensModel.remove(
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