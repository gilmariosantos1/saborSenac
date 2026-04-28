import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import UsuarioController from './controllers/UsuarioController';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import './EditarCadastroUsuario.css';

const EditarUsuario = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    matricula: '',
    senha: '',
    confirmasenha: ''
  });

  const handleBackToHome = () => {
    navigate('/');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do usuário para o backend
    // Por exemplo, usando o UsuarioController para atualizar as informações do usuário
    // UsuarioController.atualizarUsuario(usuario);
    
    // Após a atualização, você pode redirecionar o usuário de volta para a página inicial ou outra página
    navigate('/');
  };
  return (
     <>
      <Header />
      <div className="container">
       
        <header className="header">
          <button className="back-button" onClick={handleBackToHome}>
            ←
          </button>
          <h1>Editar Usuario</h1>
        </header>

          <form onSubmit={onSubmit}>
              <div className="form-container">
                <div className="column">
                  <div className="field">
                    <label htmlFor="nome">Nome Completo</label>
                    <input 
                      id="nome" 
                      type="text" 
                      placeholder="Digite seu nome completo" 
                      value={usuario.nome} 
                      onChange={(e) => setUsuario({...usuario, nome: e.target.value})} 
                  />
                  </div>
          
            <div className="field">
                <label htmlFor="email">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="Digite seu email" 
                  value={usuario.email} 
                  onChange={(e) => setUsuario({...usuario, email: e.target.value})} 
                />
            </div>

              <div className="divider" />

              <div className="field">
                <label htmlFor="matricula">Matrícula</label>
                <input 
                  id="matricula" 
                  type="text" 
                  placeholder="Digite sua matricula" 
                  value={usuario.matricula} 
                  onChange={(e) => setUsuario({...usuario, matricula: e.target.value})} 
                />
              </div>
          
              <div className="field">
                <label htmlFor="senha">Senha</label>
                <input 
                  id="senha" 
                  type="password"
                  placeholder="Digite sua senha"
                  value={usuario.senha} 
                  onChange={(e) => setUsuario({...usuario, senha: e.target.value})} 
                />
              </div> 

              <div className="field">
                <label htmlFor="confirma senha"> Confirma Senha</label>
                <input 
                  id="confirma senha" 
                  type="password"
                  placeholder="Confirme sua senha"
                  value={usuario.senha} 
                  onChange={(e) => setUsuario({...usuario, confirmasenha: e.target.value})} 
                />
              </div> 
            </div>
          </div>

            <button type="submit" className="submit-button">Salvar Alterações</button>
        </form>
        
    </div>
     <Footer />
  </>       
  );
};

export default EditarUsuario;

