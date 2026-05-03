import models from '../models/index.js';
import crypto from 'crypto';

export const cadastrarUsuario = async (req, res) => {
    try {
        const { nome, email, matricula, senha } = req.body;

        // Validação básica (o express-validator deve pegar antes, mas por segurança)
        if (!nome || !email || !matricula || !senha) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        // Verifica se o usuário já existe (e-mail ou matrícula)
        const usuarioExistente = await models.Pessoa.findOne({
            where: {
                [models.Sequelize.Op.or]: [{ email }, { matricula }]
            }
        });

        if (usuarioExistente) {
            return res.status(400).json({ error: "E-mail ou Matrícula já cadastrados" });
        }

        // Hash da senha (SHA-256)
        const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

        // Cria o novo usuário com perfil ALUNO por padrão
        const novoUsuario = await models.Pessoa.create({
            nome,
            email,
            matricula,
            senha: senhaHash,
            perfil: 'ALUNO'
        });

        // Remove a senha do retorno
        const { senha: _, ...userWithoutPassword } = novoUsuario.toJSON();

        return res.status(201).json({
            message: "Usuário cadastrado com sucesso",
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return res.status(500).json({ error: "Erro interno ao cadastrar usuário" });
    }
};
