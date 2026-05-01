import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import '../styles/consultapedido.css'

const Consultapedido = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      
          <main className="consulta-container">
        <section className="consulta-box">
          <h3>Consultar Pedido</h3>

          <label>Número do Pedido</label>

          <input
            type="text"
            placeholder="000"
          />

          <div className="botoes">
            <button className="voltar" onClick={() => navigate(-1)}>
              Voltar
            </button>

            <button className="buscar" onClick={() => navigate('/confirmarpedido')}>
              Buscar
            </button>
          </div>
        </section>


        <section className="historico-box">
          <h4>Histórico de pedidos</h4>

          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Status</th>
                <th>Preço</th>
              </tr>
            </thead>

            <tbody>
              {[...Array(12)].map((_, i) => (
                <tr key={i}>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>

        </section>
      </main>

      <Footer />
    </>
  );
}

export default Consultapedido;