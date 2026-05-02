import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import models from './models/index.js';
import produtoRoutes from "./routes/produtoRoutes.js";
import carrinhoRoutes from './routes/carrinhoRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';

dotenv.config({
    path: '../.env'
})

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ROTAS
app.use("/api/reservaItens", reservaItensRoutes);
app.use("/api/produtos", produtoRoutes);

        app.listen(PORT, () => {
            console.log('Servidor rodando na porta', PORT)
        })

    } catch (error) {
        console.error('Erro ao conectar no banco:', error.message);
    }
}

testConnection();