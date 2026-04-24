import "./CadastroUsuario.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuarioController from '../controllers/UsuarioController';

const Usuario = () =>{
  const[Usuario, setUsuario] = useState({
    nome:"",
    email:"",
    matricula:"",
    senha:"",
    confirmarsenha:"",
  })
}
    
 const navigate = useNavigate();
  
 const handleBackToHome = () => {
    navigate("/");
  };

  async function onSubmit(e) {

    e.preventDefault();
    try {
      await createUsuario(usuario);      
      alert("Usuario cadastrado com sucesso!");
      navigate("/HomeMenu");
    } catch (error) {
      console.error("Erro ao cadastrar usuario:", error);
      alert("Ocorreu um erro ao cadastrar o usuario. Por favor, tente novamente.");
    }
  }

  return (
    <div className="container">
      <header className="header">
        <button className="back-button" onClick={handleBackToHome}>
          ←
        </button>
        <h1>Cadastro Usuario</h1>
      </header>

      <form onSubmit={onSubmit}>
        <div className="form-container">
          <div className="column">
            <div className="field">
              <label htmlFor="nome">Nome Completo</label>
              <input id="nome" type="text" placeholder="Digite seu nome completo" value={usuario.nome} onChange={(e) => setUsuario({...usuario, nome: e.target.value})} />
            </div>
    
          <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Digite seu email" value={usuario.email} onChange={(e) => setUsuario({...usuario, email: e.target.value})} />
          </div>

           <div className="field">
              <label htmlFor="matricula">Matrícula</label>
              <input id="matricula" type="text" placeholder="Digite sua matricula" value={usuario.matricula} onChange={(e) => setUsuario({...usuario, matricula: e.target.value})} />
            </div>
          </div>
        </div>

            <div className="senha">
              <label htmlFor="senha">Senha</label>
              <input id="senha" type="password" placeholder="Digite sua senha" value={usuario.senha} onChange={(e) => setUsuario({...usuario, senha: e.target.value})}/>
            </div>
          </div>
       </div>

        <div className="confirma senha">
          <label htmlFor="confirma senha">Confirma senha</label>
          <input id="confirma senha" type="password" placeholder="Confirme sua senha" value={usuario.senha} onChange={(e)=> setUsuario({...usuario,senha: e.target.value})}/>
        </div>
      </div>
    </div>

        <button type="submit" className="submit-button">Criar conta</button>
     </form>
   </div>
  );
};

export default CadastroUsuario;
 




            