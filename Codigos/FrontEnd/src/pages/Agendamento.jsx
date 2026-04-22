import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from '../components/header'
import './Agendamento.css';

const Agendamento = () => {
    const navigate = useNavigate();


    return (
        <>
            <Header />
            <div>
                <body>

<header className="topo">
  <img src="https://vscode.dev/github/gilmariosantos1/saborSenac/blob/branch_antonio%2326/Codigos/FrontEnd/src/assets/imagens/logo_sabor_senac.jpeg" alt="Sabor Senac" className="logo" />
  <h2>Senac - Agendamento</h2>
</header>

<main class="container">

  <section id="tela-agendamento">
    <h1>Escolha seu lanche!</h1>

    <div class="valor">R$6,00</div>

    <div class="form-group">
      <label>Comida</label>
      <select id="comida">
        <option value="">Escolha</option>
        <option>Sanduíche Natural</option>
        <option>Salgado</option>
        <option>Bolo</option>
      </select>
    </div>

    <div class="form-group">
      <label>Bebida</label>
      <select id="bebida">
        <option value="">Escolha</option>
        <option>H2O (Limão)</option>
        <option>Suco</option>
        <option>Refrigerante</option>
      </select>
    </div>

    <div class="form-group">
      <label>Pagamento</label>
      <select id="pagamento">
        <option value="">Escolha</option>
        <option>Pix</option>
        <option>Cartão</option>
        <option>Dinheiro</option>
      </select>
    </div>

    <div class="timer">
      Tempo para resgatar: <span id="tempo">10:00</span>
    </div>

    <button onclick="agendar()">Agendar</button>
  </section>



  <section id="tela-sucesso" class="hidden">
    <h1>Lanche Agendado!</h1>

    <p><strong>Comida:</strong> <span id="res-comida"></span></p>
    <p><strong>Bebida:</strong> <span id="res-bebida"></span></p>
    <p><strong>Pagamento:</strong> <span id="res-pagamento"></span></p>

    <div class="timer">
      Retire em até: <span id="tempo2">10:00</span>
    </div>

    <button onclick="voltar()">Novo Pedido</button>
  </section>

</main>


</body>
            </div>
            < Footer />
        </>
    )
}



export default Agendamento;