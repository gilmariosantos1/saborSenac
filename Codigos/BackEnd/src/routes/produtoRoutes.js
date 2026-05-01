import { Router } from "express";
import multer from "multer";
import path from "path";

import {
  createProdutoController,
  produtoValidators,
} from "../controllers/produtoController.js";

import models from "../models/index.js";
import { handleValidation } from "../middleware/handleValidation.js";

const router = Router();

const produtoModel = models.Produto;
const controller = createProdutoController(produtoModel);

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/produtos/");
  },
  filename: (req, file, cb) => {
    const nomeUnico = Date.now() + path.extname(file.originalname);
    cb(null, nomeUnico);
  },
});

const upload = multer({ storage });

// LISTAR
router.get("/", controller.list);

// BUSCAR POR ID
router.get(
  "/:id",
  [...produtoValidators.id],
  handleValidation,
  controller.getById
);

// CRIAR (com imagem)
router.post(
  "/",
  upload.single("imagem"),
  [...produtoValidators.create],
  handleValidation,
  controller.create
);

// ATUALIZAR (com imagem opcional)
router.put(
  "/:id",
  upload.single("imagem"),
  [...produtoValidators.id, ...produtoValidators.update],
  handleValidation,
  controller.update
);

// DELETAR
router.delete(
  "/:id",
  [...produtoValidators.id],
  handleValidation,
  controller.remove
);

export default router;