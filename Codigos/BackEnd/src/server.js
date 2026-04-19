import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import models from './models/index.js';

dotenv.config({
    path: '../.env'
})

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

async function testConnection() {
    try {
        await models.sequelize.authenticate()
        console.log('Banco conectado com sucesso! server.js');

        app.listen(3000, () => {
            console.log('Servidor rodando na porta', PORT)
        })

    } catch (error) {
        console.error('Erro ao conectar no banco:', error.message);
    }
}

testConnection();