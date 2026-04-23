import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from '../components/header'
import './DuvidasSugestoes.css';

const DuvidasSugestoes = () => {
    const navigate = useNavigate();


    return (
        <>
            <Header />
            <div className="container"><h1 className="TituloPagina">DÚVIDAS, SUGESTÕES E RECLAMAÇÕES</h1></div>
            <div className="Main">
                <h2>1</h2>
            </div>
            < Footer />
        </>
    )
}



export default DuvidasSugestoes;