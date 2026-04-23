import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from '../components/header'
// import './Home.css';

const Login = () => {
    const navigate = useNavigate();


      return (
      <>
        <Header />
        <main className="auth-page">  
<div><img src="./assents/fundo.svg" alt="" /></div>
          <form className="auth-form">
            <div className="auth-input-group">
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    placeholder="exemplo@email.com">
                </input>
                    <br></br>
                <label htmlFor="password">Senha</label>
                <input
                    type="password"
                    id="password"
                    required
                  />
                </div>
                <button type="submit" > ENTRAR AGORA</button>
            </form>
                <p><a class="Não tem conta?" href="#">Crie </a></p>
           </main>
              < Footer />
    
      </>
    )
  }
      




  export default Login;