const UsuarioController = {
  atualizar: async (dados) => {
    const response = await fetch('http://localhost:5173/usuarios', {
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
  },
};

export default UsuarioController;
