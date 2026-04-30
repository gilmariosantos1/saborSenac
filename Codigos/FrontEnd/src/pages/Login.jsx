import logo from '../assets/imagens/logo_sabor_senac.svg'
import fundo from '../assets/fundo.svg'
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
            <div className="login-left" >  
            </div>            
            <div className="login-right">
              <section className="login-card">
                <div className="login-logo-wrapper">
                  <img className="login-logo" src={logo} alt="logo_sabor_senac" />
                </div>

                <h1>Entre em sua conta</h1>
                <p className="login-subtitle">Acesse para pedir seu lanche</p>

                <form className="login-form">
                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <div className="input-icon-group">
                      <span className="input-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 6h16v12H4z" />
                          <polyline points="4 6 12 13 20 6" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="seuemail@exemplo.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <div className="input-icon-group">
                      <span className="input-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="11" width="14" height="10" rx="2" />
                          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                        </svg>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Digite sua senha"
                      />
                    </div>
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