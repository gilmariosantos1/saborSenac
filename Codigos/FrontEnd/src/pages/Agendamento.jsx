import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from '../components/header'
import './Agendamento.css';
import imagem from "../assets/imagens/logo_sabor_senac.svg"; 

const Agendamento = () => {
    const navigate = useNavigate();
    const [agendado, setAgendado] = useState(false);

    const handleAgendar = () => {
        const confirmou = window.confirm(
            "Atenção: Seu pedido será cancelado automaticamente se não for retirado em até 10 minutos. Deseja confirmar o agendamento?"
        );

        if (confirmou) {
            setAgendado(true);
            
            setTimeout(() => {
                alert("Agendamento realizado com sucesso!");
            }, 500);
        }
    };
    
      return (
        <>
            <Header />

<main className="container-principal">

    {/* IMAGEM ESQUERDA */}
    <div className="area-imagem">
        <img src={imagem} alt="Logo Sabor Senac" />
    </div>

    {/* FORMULÁRIO DIREITA */}
    <section className="area-formulario">
        <h1>Escolha seu lanche!</h1>

       {/* SEÇÃO DO VALOR COM ETIQUETA */}
    <div className="container-valor">
    <span className="badge-valor">Valor</span>
    <div className="valor">R$6,00</div>
</div>

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

                    {/* TIMER (igual da imagem) */}
                    <div className="timer">
                        Tempo para resgatar o lanche:<br />
                        <strong>10:00</strong>
                    </div>
                        {/* MENSAGEM DE ACORDO */}
                    <p style={{ 
                    fontSize: '13px', 
                    color: '#ffffff', 
                    textAlign: 'center', 
                    marginBottom: '10px',
                    padding: '0 10px',
                    lineHeight: '1.4'
                }}>
    Ao clicar em agendar, você declara estar ciente de que o pedido será cancelado se não for retirado no tempo previsto.
</p>
                    

                    {/* BOTÃO */}
                    <button 
                        onClick={handleAgendar}
                        className={agendado ? "sucesso" : ""}
                    >
                        {agendado ? "AGENDADO!" : "Agendar"}

        </button>
    </section>

</main>

            <Footer />
        </>
    );
};

export default Agendamento;