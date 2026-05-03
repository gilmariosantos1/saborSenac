import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from '../assets/imagens/logo_sabor_senac.svg'
import sugestoes from '../assets/imagens/sugestoes.svg'
import perfil from '../assets/imagens/perfil.svg'
import logout_icon from '../assets/imagens/logout_icon.svg'
import '../styles/header.css'

const Header = () => {
    const navigate = useNavigate();
    const { user, signed, logout } = useAuth();

    const handleHome = () => {
        navigate('/')
    }
    const handleSugestoes = () => {
        navigate('/DuvidasSugestoes');
    }
    const handleLogin = () => {
        navigate('/login');
    }
    const handleCadastro = () => {
        navigate('/cadastro');
    }
    const handlePainelAtendente = () => {
        navigate('/painelatendente');
    }
    const handleSair = () => {
        logout();
        navigate('/login');
    }
    const handleAgendamentos = () => {
        navigate('/meus-agendamentos');
    }
    const handleCarrinho = () => {
        navigate('/carrinho');
    }
    const openDrop = () => {
        const drop = document.getElementById("menu_drop");
        drop.classList.toggle("ativo");
    }
    

    return (
        <>
            <header>
                <div onClick={handleHome} className="logo">
                    <img src={logo} alt="Logo sabor senac"/>
                </div>
                <nav>
                    <div onClick={handleHome} className="cardapio nav_itens">
                        <h3>Cardapio</h3>
                    </div>
                    <div onClick={handleSugestoes} className="sugestoes nav_itens">
                        <h3>Sugestões</h3>
                        <img src={sugestoes} alt="sugestoes" />
                    </div>
                    {signed && (
                        <div onClick={handleAgendamentos} className="nav_itens">
                            <h3>Meus Agendamentos</h3>
                        </div>
                    )}
                    <div onClick={handleCarrinho} className="nav_itens cart_destaque">
                        <h3>Carrinho</h3>
                    </div>
                    {signed ? (
                        <div onClick={openDrop} className="perfil">
                            <img src={perfil} alt="perfil" />
                            <p>{user.nome}</p>
                            <div className="adm">{user.perfil}</div>
                        </div>
                    ) : (
                        <div className="login_cadastro">
                            <p onClick={handleLogin}>Login</p>
                            <span></span>
                            <p onClick={handleCadastro}>Cadastro</p>
                        </div>
                    )}
                </nav>
                <div id="menu_drop">
                    {(user?.perfil === 'ADMIN' || user?.perfil === 'FUNCIONARIO') && (
                        <div onClick={handlePainelAtendente} className="menu_drop_item">
                            <img src={logout_icon} alt="" />
                            <div>Painel do Atendente</div>
                        </div>
                    )}
                    <div onClick={handleSair} className="menu_drop_item">
                        <img src={logout_icon} alt="" />
                        <div>Sair da Conta</div>
                    </div>
                </div>
            </header>
        </>
    )

}

export default Header;
