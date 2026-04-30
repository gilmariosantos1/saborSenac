import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import models from './models/index.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

dotenv.config({
    path: '../.env'
})

const app = express();

app.use(cors());
app.use(express.json());
app.use('/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;

async function testConnection() {
    try {
        await models.sequelize.authenticate()
        console.log('Banco conectado com sucesso! server.js');

        app.listen(PORT, () => {
            console.log('Servidor rodando na porta', PORT)
        })

    } catch (error) {
        console.error('Erro ao conectar no banco:', error.message);
    }
}

testConnection();