import express from 'express';
import { cadastrarUsuario, atualizarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/', cadastrarUsuario);
router.put('/', atualizarUsuario);

export default router;
