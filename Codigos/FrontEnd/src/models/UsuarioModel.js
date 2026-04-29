export const UsuarioModel = {
  nome: '',
  email: '',
  matricula: '',
  senha: '',
  confirmarsenha: '',
};

export const createUsuario = (overrides = {}) => ({
  nome: '',
  email: '',
  matricula: '',
  senha: '',
  confirmarsenha: '',
  ...overrides,
});

export const validarUsuario = (usuario) => {
  const erros = [];

  if (!usuario.nome.trim()) {
    erros.push('Nome é obrigatório');
  }

  if (!usuario.email.trim() || !/^\S+@\S+\.\S+$/.test(usuario.email)) {
    erros.push('Email inválido');
  }

  if (!usuario.matricula.trim()) {
    erros.push('Matrícula é obrigatória');
  }

  if (!usuario.senha) {
    erros.push('Senha é obrigatória');
  }

  if (usuario.senha !== usuario.confirmarsenha) {
    erros.push('As senhas não conferem');
  }

  return erros;
};
