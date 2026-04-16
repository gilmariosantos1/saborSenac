import { useNavigate } from "react-router-dom";
import logo from '../assets/imagens/logo_sabor_senac.svg'
import sugestoes from '../assets/imagens/sugestoes.svg'
import perfil from '../assets/imagens/perfil.svg'
import '../styles/header.css'



const Header = () => {
    const navigate = useNavigate();

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
                <div className="logo">
                    <img src={logo} alt="Logo sabor senac"/>
                </div>
                <nav>
                    <div onClick={handleSugestoes} className="sugestoes">
                        <h3>Sugestões</h3>
                        <img src={sugestoes} alt="sugestoes" />
                    </div>
                    <div className="perfil">
                        <img src={perfil} alt="perfil" />
                        <p>Exemplo Exemplo</p>
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