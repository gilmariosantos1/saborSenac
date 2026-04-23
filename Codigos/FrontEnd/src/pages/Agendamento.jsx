import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from '../components/header'
import './Agendamento.css';
import imagem from "../assets/imagens"; 

const Agendamento = () => {
    const navigate = useNavigate();


      return (
        <>
            <Header />

            <main className="container">
                <div className="row">

                    {/* COLUNA 1*/}
                    <div className="col-6">
                        <section id="tela-agendamento">
                            <h1>Escolha seu lanche!</h1>

                            <div className="valor">R$6,00</div>

                            <div className="form-group">
                                <label>Comida</label>
                                <select>
                                    <option>Escolha</option>
                                    <option>Sanduíche Natural</option>
                                    <option>Salgado</option>
                                    <option>Bolo</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Bebida</label>
                                <select>
                                    <option>Escolha</option>
                                    <option>H2O</option>
                                    <option>Suco</option>
                                    <option>Refrigerante</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Pagamento</label>
                                <select>
                                    <option>Escolha</option>
                                    <option>Pix</option>
                                    <option>Cartão</option>
                                    <option>Dinheiro</option>
                                </select>
                            </div>

                            <button>Agendar</button>
                        </section>
                    </div>

                    {/* COLUNA 2*/}
                    <div className="col-6 imagem-coluna">
                        <img src={imagem} alt="Logo Sabor Senac" className="imagem" />
                    </div>

                </div>
            </main>

            <Footer />
        </>
    );
};

export default Agendamento;