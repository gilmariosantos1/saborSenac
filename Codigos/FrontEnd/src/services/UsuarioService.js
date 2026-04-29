export const cadastrarUsuario = async (dados) => {
  const response = await fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    throw new Error('Erro ao cadastrar usuário');
  }

  return response.json();
};

export const atualizarUsuario = async (dados) => {
  const response = await fetch('http://localhost:3000/usuarios', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar usuário');
  }

  return response.json();
};
