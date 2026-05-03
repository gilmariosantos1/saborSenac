import models from "../models/index.js";

const produtoModel = models.Produto;
import { body, param } from "express-validator";

export const produtoValidators = {
  id: [
    param("id")
      .isInt({ min: 1 })
      .withMessage("Id deve ser um número inteiro positivo."),
  ],

  create: [
    body("nome")
      .notEmpty()
      .withMessage("Nome é obrigatório.")
      .matches(/^(?=.*[a-zA-ZÀ-ÿ]).+$/)
      .withMessage("O nome deve conter letras válidas."),

    body("preco")
      .notEmpty()
      .withMessage("Preço é obrigatório.")
      .isFloat({ min: 0 }),

    body("estoque")
      .notEmpty()
      .withMessage("Estoque é obrigatório.")
      .isInt({ min: 0 }),

    body("id_categoria")
      .notEmpty()
      .withMessage("Categoria é obrigatória.")
      .isInt({ min: 1 }),
  ],

  update: [
    body("nome").optional(),

    body("preco")
      .optional()
      .isFloat({ min: 0 }),

    body("estoque")
      .optional()
      .isInt({ min: 0 }),

    body("id_categoria")
      .optional()
      .isInt({ min: 1 }),
  ],
};



export function createProdutoController(produtoModel) {
  return {

    async list(req, res, next) {
      try {
        const { categoria } = req.query;
        console.log("===> Buscando produtos. Categoria recebida:", categoria);

        let produtos;

        if (categoria && categoria !== 'undefined') {
          produtos = await produtoModel.findAll({
            where: { id_categoria: Number(categoria) }
          });
        } else {
          produtos = await produtoModel.findAll();
        }

        return res.status(200).json(produtos);
      } catch (error) {
        console.error("!!! ERRO AO LISTAR PRODUTOS:", error);
        return res.status(500).json({ error: error.message, details: error });
      }
    },

    async getById(req, res, next) {
      try {
        const produto = await produtoModel.findById(
          Number(req.params.id)
        );

        if (!produto) {
          return res
            .status(404)
            .json({ message: "Produto não encontrado." });
        }

        return res.status(200).json(produto);
      } catch (error) {
        return next(error);
      }
    },

    async create(req, res, next) {
      try {
        const { nome, preco, estoque, id_categoria } = req.body;

        const imagem = req.file
          ? `uploads/produtos/${req.file.filename}`
          : null;

        // 🔎 verifica se já existe
        const produtoExistente = await produtoModel.findOne({
          where: { nome }
        });

        if (produtoExistente) {
          return res.status(400).json({
            message: "Produto já cadastrado"
          });
        }

        const createdProduto = await produtoModel.createItem({
          nome,
          preco: parseFloat(preco),
          estoque: parseInt(estoque),
          id_categoria: parseInt(id_categoria),
          imagem,
        });

        return res.status(201).json(createdProduto);

      } catch (error) {

        // 🔥 tratamento do erro UNIQUE do banco
        if (error.name === "SequelizeUniqueConstraintError") {
          return res.status(400).json({
            message: "Produto já cadastrado (duplicado)"
          });
        }

        return next(error);
      }
    },

    async update(req, res, next) {
      try {
        const { nome, preco, estoque, id_categoria } = req.body;

        const produtoExistente = await produtoModel.findByPk(req.params.id);

        if (!produtoExistente) {
          return res.status(404).json({ message: "Produto não encontrado" });
        }

        // 🔥 validações
        if (!nome || !preco || estoque === undefined || !id_categoria) {
          return res.status(400).json({ message: "Campos obrigatórios." });
        }

        if (estoque < 0) {
          return res.status(400).json({ message: "Estoque inválido." });
        }

        if (preco <= 0) {
          return res.status(400).json({ message: "Preço inválido." });
        }

        // 🔥 nome duplicado
        const existente = await produtoModel.findOne({ where: { nome } });

        if (existente && existente.id_produto !== Number(req.params.id)) {
          return res.status(400).json({
            message: "Já existe um produto com esse nome."
          });
        }

        const imagem = req.file
          ? `uploads/produtos/${req.file.filename}`
          : produtoExistente.imagem;

        const updated = await produtoModel.updateItem(req.params.id, {
          nome,
          preco: parseFloat(preco),
          estoque: parseInt(estoque),
          id_categoria: parseInt(id_categoria),
          imagem,
        });

        return res.status(200).json(updated);

      } catch (error) {
        return next(error);
      }
    },
    async remove(req, res, next) {
      try {
        const removed = await produtoModel.removeItem(
          Number(req.params.id)
        );

        if (!removed) {
          return res
            .status(404)
            .json({ message: "Produto não encontrado." });
        }

        return res.status(204).send();
      } catch (error) {
        return next(error);
      }
    },
  };
}