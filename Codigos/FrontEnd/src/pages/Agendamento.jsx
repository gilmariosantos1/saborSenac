import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from '../components/header'
import './Agendamento.css';
import imagem from "../assets/imagens/logo_sabor_senac.svg"; 

const Agendamento = () => {
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
        {/* LADO ESQUERDO */}
        <div className="area-imagem">
          <img src={imagem} alt="Logo Sabor Senac" />
        </div>

        {/* LADO DIREITO */}
        <section className="area-formulario">
          <h1>Escolha seu lanche!</h1>

          {/* VALOR */}
          <div className="container-valor">
            <span className="badge-valor">Valor</span>
            <div className="valor">R$6,00</div>
          </div>

          {/* LINHA COMIDA + BEBIDA */}
          <div className="linha-dupla">
            <div className="form-group">
              <label>Comida</label>
              <select defaultValue="">
                <option value="" disabled>Escolha</option>
                <option>Sanduíche Natural</option>
                <option>Salgado</option>
                <option>Bolo</option>
              </select>
            </div>

            <div className="form-group">
              <label>Bebida</label>
              <select defaultValue="">
                <option value="" disabled>Escolha</option>
                <option>H2O</option>
                <option>Suco</option>
                <option>Refrigerante</option>
              </select>
            </div>
          </div>

          {/* PAGAMENTO */}
          <div className="form-group">
            <label>Escolha a forma de pagamento</label>
            <select defaultValue="">
              <option value="" disabled>Escolha</option>
              <option>Pix</option>
              <option>Cartão</option>
              <option>Dinheiro</option>
            </select>
          </div>

          {/* TIMER */}
<div className="timer">
  <span className="titulo-timer">
    Tempo para resgatar o lanche:
  </span>

  <small className="texto-timer">
    (Se o tempo for excedido, o pedido será automaticamente cancelado.)
  </small>

  <strong className="tempo">10:00</strong>
</div>

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