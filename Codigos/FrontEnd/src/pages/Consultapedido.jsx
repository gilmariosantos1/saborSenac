import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import { listPedidos } from "../services/pedidoService";
import '../styles/consultapedido.css'

const Consultapedido = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [numeroBusca, setNumeroBusca] = useState("");

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await listPedidos();
        setPedidos(response.data);
      } catch (error) {
        console.error("Erro ao buscar histórico de pedidos:", error);
      }
    };
    fetchPedidos();
  }, []);

  const handleBuscar = () => {
    if (numeroBusca) {
      navigate('/confirmarpedido', { state: { numeroPedido: numeroBusca } });
    }
  };

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
            value={numeroBusca}
            onChange={(e) => setNumeroBusca(e.target.value)}
          />

          <div className="botoes">
            <button className="voltar" onClick={() => navigate(-1)}>
              Voltar
            </button>

            <button className="buscar" onClick={handleBuscar}>
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
              {pedidos.length > 0 ? (
                pedidos.map((pedido) => (
                  <tr key={pedido.id_reserva}>
                    <td>{pedido.pedido}</td>
                    <td>{pedido.status}</td>
                    <td>R$: {pedido.produto?.preco?.toFixed(2) || "0.00"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Nenhum pedido encontrado</td>
                </tr>
              )}
            </tbody>
          </table>

        </section>
      </main>

      <Footer />
    </>
  );
}

export default Consultapedido;