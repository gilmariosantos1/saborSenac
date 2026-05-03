import models from '../models/index.js';
import crypto from 'crypto';
import { body } from 'express-validator';

export const LoginValidators = {
    create: [
        body('email').isEmail().withMessage('E-mail inválido'),
        body('senha').notEmpty().withMessage('A senha é obrigatória')
    ]
};

export const createLoginController = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Buscar usuário pelo e-mail
        const usuario = await models.Pessoa.findOne({
            where: { email }
        });

        if (!usuario) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
        }

        // Hashear a senha fornecida usando SHA-256 (para bater com o banco de dados)
        const senhaHasheada = crypto.createHash('sha256').update(senha).digest('hex');

        // Comparar os hashes
        if (senhaHasheada !== usuario.senha) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
        }

        // Se estiver tudo ok, retornar os dados do usuário (exceto a senha)
        const { senha: _, ...userWithoutPassword } = usuario.toJSON();

        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Erro no LoginController:', error);
        return res.status(500).json({ error: 'Erro interno ao processar login.' });
    }
};
