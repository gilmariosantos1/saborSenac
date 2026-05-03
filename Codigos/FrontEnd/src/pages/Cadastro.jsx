import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import styles from '../styles/Login.module.css';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import logo from '../assets/imagens/logo_sabor_senac.svg';

const Cadastro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        matricula: '',
        senha: '',
        confirmarSenha: ''
    });
    const [isRegistering, setIsRegistering] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleCadastro = async (e) => {
        e.preventDefault();
        
        if (formData.senha !== formData.confirmarSenha) {
            return toast.error("As senhas não coincidem!");
        }

        if (formData.senha.length < 6) {
            return toast.error("A senha deve ter pelo menos 6 caracteres!");
        }

        try {
            setIsRegistering(true);
            const response = await api.post('/usuarios', {
                nome: formData.nome,
                email: formData.email,
                matricula: formData.matricula,
                senha: formData.senha
            });

            toast.success("Conta criada com sucesso! Faça login para continuar.");
            navigate('/login');
        } catch (error) {
            const msg = error.response?.data?.error || "Erro ao criar conta. Tente novamente.";
            toast.error(msg);
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <>
            <Header />
            <main className={styles['auth-page']}>
                <div className={styles['login-container']}>
                    <div className={styles['login-left']} />
                    <div className={styles['login-right']}>
                        <section className={styles['login-card']}>
                            <div className={styles['login-logo-wrapper']}>
                                <img className={styles['login-logo']} src={logo} alt="logo_sabor_senac" />
                            </div>

                            <h1 style={{ color: '#033061', fontWeight: '800', fontSize: '2.5rem' }}>Crie sua conta</h1>
                            <p className={styles['login-subtitle']}>Crie sua conta para pedir seu lanche</p>

                            <form className={styles['login-form']} onSubmit={handleCadastro}>
                                <div className={styles['form-group']}>
                                    <label htmlFor="nome">Nome Completo</label>
                                    <div className={styles['input-icon-group']}>
                                        <span className={styles['input-icon']}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            id="nome"
                                            className={styles['form-control']}
                                            placeholder="Digite seu nome"
                                            value={formData.nome}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles['form-group']}>
                                    <label htmlFor="email">E-mail</label>
                                    <div className={styles['input-icon-group']}>
                                        <span className={styles['input-icon']}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                <polyline points="22,6 12,13 2,6" />
                                            </svg>
                                        </span>
                                        <input
                                            type="email"
                                            id="email"
                                            className={styles['form-control']}
                                            placeholder="Seuemail@exemplo.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles['form-group']}>
                                    <label htmlFor="matricula">Matrícula</label>
                                    <div className={styles['input-icon-group']}>
                                        <span className={styles['input-icon']}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="4" width="18" height="16" rx="2" />
                                                <circle cx="9" cy="10" r="2" />
                                                <line x1="15" y1="8" x2="19" y2="8" />
                                                <line x1="15" y1="12" x2="19" y2="12" />
                                                <line x1="7" y1="16" x2="17" y2="16" />
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            id="matricula"
                                            className={styles['form-control']}
                                            placeholder="2026.12345"
                                            value={formData.matricula}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles['form-group']}>
                                    <label htmlFor="senha">Senha</label>
                                    <div className={styles['input-icon-group']}>
                                        <span className={styles['input-icon']}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                        </span>
                                        <input
                                            type="password"
                                            id="senha"
                                            className={styles['form-control']}
                                            placeholder="Crie uma senha forte"
                                            value={formData.senha}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles['form-group']}>
                                    <label htmlFor="confirmarSenha">Confirme sua senha</label>
                                    <div className={styles['input-icon-group']}>
                                        <span className={styles['input-icon']}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                        </span>
                                        <input
                                            type="password"
                                            id="confirmarSenha"
                                            className={styles['form-control']}
                                            placeholder="Repita sua senha"
                                            value={formData.confirmarSenha}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className={styles['btn-login']}
                                    disabled={isRegistering}
                                    style={{ marginTop: '1rem' }}
                                >
                                    {isRegistering ? 'CRIANDO CONTA...' : 'CRIAR CONTA'}
                                </button>
                            </form>

                            <p className={styles['login-footer']}>
                                já tem conta? <span onClick={() => navigate('/login')} style={{ color: '#1d5bbf', fontWeight: '800', cursor: 'pointer' }}>ENTRE</span>
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Cadastro;
