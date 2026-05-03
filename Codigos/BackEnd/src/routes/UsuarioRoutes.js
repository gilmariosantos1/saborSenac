import express from 'express';
import { body } from 'express-validator';
import { cadastrarUsuario } from '../controllers/usuarioController.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

router.post(
    '/',
    [
        body('nome').notEmpty().withMessage('O nome é obrigatório'),
        body('email').isEmail().withMessage('E-mail inválido'),
        body('matricula').notEmpty().withMessage('A matrícula é obrigatória'),
        body('senha').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
    ],
    validateRequest,
    cadastrarUsuario
);

export default router;
