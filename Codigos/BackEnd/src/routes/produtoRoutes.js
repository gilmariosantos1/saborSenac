import express from "express";
import multer from "multer";
import path from "path";
import { cadastrarProduto } from "../controllers/produtoController.js";

const router = express.Router();

// Configuração do multer — salva imagem na pasta uploads/produtos/
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

// POST /cadastrarProduto
router.post("/cadastrarProduto", upload.single("imagem"), cadastrarProduto);

export default router;
