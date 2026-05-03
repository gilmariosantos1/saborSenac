import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import { listPedidos } from "../services/pedidoService";
import styles from '../styles/consultapedido.module.css';

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
      navigate(`/confirmarpedido?id_reserva=${numeroBusca}`);
    }
  };

  return (
    <>
      <Header />

      <main className={styles.containerPrincipal}>
        <div className={styles.cardConsultar}>

          {/* LADO ESQUERDO: BUSCA */}
          <section className={styles.buscaArea}>
            <h3>Consultar Pedido</h3>

            <label>Número do Pedido</label>
            <input
              type="text"
              placeholder="Ex: 123"
              value={numeroBusca}
              onChange={(e) => setNumeroBusca(e.target.value)}
            />

            <div className={styles.botoes}>
              <button className={styles.btnVoltar} onClick={() => navigate(-1)}>
                Voltar
              </button>

              <button className={styles.btnBuscar} onClick={handleBuscar}>
                Buscar
              </button>
            </div>
          </section>

          {/* LADO DIREITO: HISTÓRICO */}
          <section className={styles.historicoArea}>
            <h4>Histórico de Pedidos</h4>

            <div className={styles.tabelaWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Status do agendamento</th>
                    <th>Data do agendamento</th>
                  </tr>
                </thead>

                <tbody>
                  {pedidos.length > 0 ? (
                    pedidos.map((pedido) => (
                      <tr key={pedido.id_reserva}>
                        <td>#{pedido.pedido || pedido.id_reserva}</td>
                        <td>
                          <span className={
                            pedido.status?.toLowerCase() === 'paga' ? styles.status_paga :
                              pedido.status?.toLowerCase() === 'pendente' ? styles.status_pendente :
                                styles.status_cancelada
                          }>
                            {pedido.status}
                          </span>
                        </td>
                        <td>
                          {new Date(pedido.data_reserva).toLocaleString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ padding: '30px', opacity: 0.6 }}>
                        Nenhum pedido encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Consultapedido;