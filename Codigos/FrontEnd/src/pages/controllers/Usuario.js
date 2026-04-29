import { cadastrarUsuario, atualizarUsuario } from '../../services/UsuarioService';

const UsuarioController = {
  cadastrar: (dados) => cadastrarUsuario(dados),

  atualizar: (dados) => atualizarUsuario(dados),
};

export default UsuarioController;
