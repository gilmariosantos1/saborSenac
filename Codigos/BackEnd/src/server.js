import express from 'express';
import cors from 'cors';
import produtoRoutes from "./routes/produtoRoutes.js";
import carrinhoRoutes from './routes/carrinhoRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import reservaItensRoutes from './routes/reservaItensRoutes.js';
import reservaRoutes from './routes/reservaRoutes.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Middleware para servir as imagens
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ROTAS
app.use("/api/produtos", produtoRoutes);
app.use("/api/carrinho", carrinhoRoutes);
app.use("/api/reservaItens", reservaItensRoutes);
app.use("/api/reservas", reservaRoutes);
app.use("/api/pedidos", pedidoRoutes);

export default app;