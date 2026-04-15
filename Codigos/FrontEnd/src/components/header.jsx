import { useNavigate } from "react-router-dom";
import '../styles/header.css'

const Header = () => {
    const navigate = useNavigate();

    return (
        <>
            <header>
                <div>
                    <img src="../assets/imagens/logo_sabor_senac.jpeg" alt="" />
                </div>
                <div>

                </div>
            </header>
        </>
    )

}

export default Header;