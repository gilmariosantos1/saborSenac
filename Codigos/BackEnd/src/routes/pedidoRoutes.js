import { Router } from 'express';
import {
  listarPedidos,
  getPedidoByNumero,
  atualizarStatusPedido
} from '../controllers/pedidoController.js';

const router = Router();

router.get('/', listarPedidos);
router.get('/:numero', getPedidoByNumero);
router.put('/:id/status', atualizarStatusPedido);

export default router;
