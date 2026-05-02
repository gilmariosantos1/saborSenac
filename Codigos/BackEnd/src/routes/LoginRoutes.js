import { Router } from 'express';
import { createLoginController, LoginValidators } from '../controllers/LoginController.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = Router();

router.post(
  '/',
  LoginValidators.create,
  validateRequest,
  createLoginController
);

export default router;