import { Router } from "express";
import {
  adicionarAoCarrinho
} from "../controllers/carrinhoController.js";

const router = Router();

// POST /api/carrinho
router.post("/", adicionarAoCarrinho);

export default router;