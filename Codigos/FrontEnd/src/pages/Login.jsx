import logo from '../assets/imagens/logo_sabor_senac.svg'
import './Login.css';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';

const Login = () => {


    return (
      <>
      <Header />
        <main className="auth-page">
          <div className="login-left" />
          <div className="login-container">            
            <div className="login-right">
              <section className="login-card">
                <img className="login-logo" src={logo} alt="logo_sabor_senac" />
                <h1>Entre em sua conta</h1>
                <p className="login-subtitle">Acesse para pedir seu lanche</p>

                <form className="login-form">
                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Seu email@exemplo.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Digite sua senha"
                    />
                  </div>

                  <button type="submit" className="btn btn-login">
                    ENTRAR AGORA
                  </button>
                </form>

                <p className="login-footer">
                  Não tem conta? <a href="#">Crie</a>
                </p>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </>          
      
    )
  }
      

  export default Login;