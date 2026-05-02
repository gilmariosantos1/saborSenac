import { Router } from 'express';
import {
    comprarImediato,
    criarReserva,
    confirmarReserva,
    cancelarReserva,
    getReservaById,
} from '../controllers/reservaController.js';

const router = Router();

router.post('/comprar', comprarImediato);
router.post('/', criarReserva);
router.post('/confirmar', confirmarReserva);
router.get('/:id_reserva', getReservaById);
router.delete('/:id_reserva', cancelarReserva);

export default router;
