import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import { listPedidos } from "../services/pedidoService";
import styles from '../styles/consultapedido.module.css';
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const ConsultarReservaAdmin = () => {
  const navigate = useNavigate();
  const { user, signed } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [numeroBusca, setNumeroBusca] = useState("");

  useEffect(() => {
    if (!signed) {
        toast.info("Por favor, faça login.");
        navigate('/login');
        return;
    }

    if (user.perfil !== 'ADMIN' && user.perfil !== 'FUNCIONARIO') {
        toast.warning("Acesso restrito ao Painel Administrativo.");
        navigate('/');
        return;
    }

    const fetchPedidos = async () => {
      try {
        // Admin/Funcionário vêem todos os pedidos do sistema por padrão
        const response = await listPedidos(); 
        setPedidos(response.data);
      } catch (error) {
        console.error("Erro ao buscar histórico de pedidos:", error);
      }
    };
    fetchPedidos();
  }, [signed, user, navigate]);

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

          {/* LADO ESQUERDO: BUSCA (APENAS ADMIN) */}
          <section className={styles.buscaArea}>
            <h3>Localizar Reserva</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '20px' }}>
                Digite o número da reserva para processar o pagamento ou cancelamento.
            </p>

            <label>Número do Pedido</label>
            <input
              type="text"
              placeholder="Ex: 123"
              value={numeroBusca}
              onChange={(e) => setNumeroBusca(e.target.value)}
            />

            <div className={styles.botoes}>
              <button className={styles.btnVoltar} onClick={() => navigate('/painelAtendente')}>
                Voltar
              </button>

              <button className={styles.btnBuscar} onClick={handleBuscar}>
                Buscar Reserva
              </button>
            </div>
          </section>

          {/* LADO DIREITO: HISTÓRICO GERAL */}
          <section className={styles.historicoArea}>
            <h4>Todas as Reservas Recentes</h4>

            <div className={styles.tabelaWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Cliente</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {pedidos.length > 0 ? (
                    pedidos.map((pedido) => (
                      <tr key={pedido.id_reserva} onClick={() => navigate(`/confirmarpedido?id_reserva=${pedido.id_reserva}`)} style={{ cursor: 'pointer' }}>
                        <td>#{pedido.id_reserva}</td>
                        <td>{pedido.pessoa?.nome}</td>
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
                            R$ {Number(pedido.valor_total || 0).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ padding: '30px', opacity: 0.6 }}>
                        Nenhuma reserva encontrada no sistema.
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

export default ConsultarReservaAdmin;
