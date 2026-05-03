import logo from '../assets/imagens/logo_sabor_senac.svg'
import fundo from '../assets/fundo.svg'
import styles from '../styles/Login.module.css';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.warning('Preencha todos os campos!');
      return;
    }

    setIsLoggingIn(true);
    const result = await login(email, password);
    setIsLoggingIn(false);

    if (result.success) {
      toast.success('Bem-vindo ao Sabor Senac!');
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };


  return (
    <>
      <Header />
      <main className={styles['auth-page']}>
        <div className={styles['login-left']} />
        <div className={styles['login-container']}>
          <div className={styles['login-left']} >
          </div>
          <div className={styles['login-right']}>
            <section className={styles['login-card']}>
              <div className={styles['login-logo-wrapper']}>
                <img className={styles['login-logo']} src={logo} alt="logo_sabor_senac" />
              </div>

              <h1>Entre em sua conta</h1>
              <p className={styles['login-subtitle']}>Acesse para pedir seu lanche</p>

              <form className={styles['login-form']} onSubmit={handleLogin}>
                <div className={styles['form-group']}>
                  <label htmlFor="email">E-mail</label>
                  <div className={styles['input-icon-group']}>
                    <span className={styles['input-icon']} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 6h16v12H4z" />
                        <polyline points="4 6 12 13 20 6" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      className={styles['form-control']}
                      id="email"
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoggingIn}
                    />
                  </div>
                </div>

                <div className={styles['form-group']}>
                  <label htmlFor="password">Senha</label>
                  <div className={styles['input-icon-group']}>
                    <span className={styles['input-icon']} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                    </span>
                    <input
                      type="password"
                      className={styles['form-control']}
                      id="password"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoggingIn}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={styles['btn-login']}
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? 'ENTRANDO...' : 'ENTRAR AGORA'}
                </button>
              </form>

              <p className={styles['login-footer']}>
                Não tem conta? <span onClick={() => navigate('/cadastro')} style={{ color: '#1d5bbf', fontWeight: '800', cursor: 'pointer' }}>Crie</span>
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