import { Router } from "express";
import {
  createCarrinhoController,
  carrinhoValidators
} from "../controllers/carrinhoController.js";

import carrinhoModel from "../models/carrinhoModel.js";

const router = Router();

const controller = createCarrinhoController(carrinhoModel);

// GET /api/carrinho
router.get("/", controller.list);

// GET /api/carrinho/:id
router.get("/:id", carrinhoValidators.id, controller.getById);

// POST /api/carrinho
router.post("/", carrinhoValidators.create, controller.create);

// PUT /api/carrinho/:id
router.put(
  "/:id",
  [...carrinhoValidators.id, ...carrinhoValidators.update],
  controller.update
);

// DELETE /api/carrinho/:id
router.delete("/:id", carrinhoValidators.id, controller.remove);

export default router;