import { Op } from 'sequelize';
import models from '../models/index.js';

const Usuario = models.Usuario;

const validarUsuario = (dados) => {
  const erros = [];

  if (!dados.nome || !dados.nome.trim()) {
    erros.push('Nome é obrigatório');
  }

  if (!dados.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
    erros.push('Email inválido');
  }

  if (!dados.matricula || !dados.matricula.trim()) {
    erros.push('Matrícula é obrigatória');
  }

  if (!dados.senha || dados.senha.length < 6) {
    erros.push('Senha deve ter pelo menos 6 caracteres');
  }

  return erros;
};

export const cadastrarUsuario = async (req, res) => {
  const { nome, email, matricula, senha } = req.body;
  const erros = validarUsuario({ nome, email, matricula, senha });

  if (erros.length) {
    return res.status(400).json({ errors: erros });
  }

  try {
    const usuarioExiste = await Usuario.findOne({
      where: {
        [Op.or]: [{ email }, { matricula }],
      },
    });

    if (usuarioExiste) {
      return res.status(409).json({
        error: 'Já existe um usuário com este email ou matrícula',
      });
    }

    const usuario = await Usuario.create({
      nome,
      email,
      matricula,
      senha,
      perfil: 'USER',
    });

    const { senha: _, ...dadosUsuario } = usuario.toJSON();
    return res.status(201).json(dadosUsuario);
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    return res
      .status(500)
      .json({ error: 'Erro interno ao cadastrar usuário' });
  }
};

export const atualizarUsuario = async (req, res) => {
  const { nome, email, matricula, senha } = req.body;
  const erros = validarUsuario({ nome, email, matricula, senha });

  if (erros.length) {
    return res.status(400).json({ errors: erros });
  }

  try {
    const usuario = await Usuario.findOne({ where: { matricula } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (usuario.email !== email) {
      const emailDuplicado = await Usuario.findOne({
        where: {
          email,
          id: { [Op.ne]: usuario.id },
        },
      });

      if (emailDuplicado) {
        return res.status(409).json({ error: 'Email já está em uso' });
      }
    }

    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = senha;

    await usuario.save();

    const { senha: _, ...dadosUsuario } = usuario.toJSON();
    return res.status(200).json(dadosUsuario);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return res
      .status(500)
      .json({ error: 'Erro interno ao atualizar usuário' });
  }
};
