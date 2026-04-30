import { Router } from "express";
import {
  createReservaItensController,
  reservaItensValidators
} from "../controllers/reservaItensController.js";

import models from "../models/index.js";

const reservaItensModel = models.ReservaItens;
import { handleValidation } from "../middleware/handleValidation.js";

const router = Router();

const controller = createReservaItensController(reservaItensModel);

router.get("/", controller.list);

router.get(
  "/:id",
  [...reservaItensValidators.id],
  handleValidation,
  controller.getById
);

router.post(
  "/",
  [...reservaItensValidators.create],
  handleValidation,
  controller.create
);

router.put(
  "/:id",
  [...reservaItensValidators.id, ...reservaItensValidators.update],
  handleValidation,
  controller.update
);

router.delete(
  "/:id",
  [...reservaItensValidators.id],
  handleValidation,
  controller.remove
);

export default router;