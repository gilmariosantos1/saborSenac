import { useNavigate } from "react-router-dom";
import logo from '../assets/imagens/logo_sabor_senac.svg'
import sugestoes from '../assets/imagens/sugestoes.svg'
import perfil from '../assets/imagens/perfil.svg'
import '../styles/header.css'



const Header = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/')
    }
    const handleSugestoes = () => {
        navigate('/sugestoes');
    }
    const handleLogin = () => {
        navigate('/login');
    }
    const handleCadastro = () => {
        navigate('/cadastro');
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
                    <div className="perfil">
                        <img src={perfil} alt="perfil" />
                        <p>Exemplo Exemplo</p>
                        <div className="adm">ADM</div>
                    </div>
                    <div className="login_cadastro">
                        <p onClick={handleLogin}>Login</p>
                        <span></span>
                        <p onClick={handleCadastro}>Cadastro</p>
                    </div>
                </nav>
            </header>
        </>
    )

}

export default Header;