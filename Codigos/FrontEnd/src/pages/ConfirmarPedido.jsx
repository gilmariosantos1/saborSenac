import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/footer";
import Header from "../components/header";
import { getReservaById, confirmarReserva, cancelarReserva } from "../services/homeService";
import { listPedidos } from "../services/pedidoService";
import styles from '../styles/confirmarpedido.module.css';

import { useAuth } from "../contexts/AuthContext";

const ConfirmarPedido = () => {
  const navigate = useNavigate();
  const { user, signed } = useAuth();
  const [searchParams] = useSearchParams();
  const idReservaUrl = searchParams.get("id_reserva");

  const [reserva, setReserva] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tipoPagamento, setTipoPagamento] = useState("PIX");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (!signed) {
        navigate('/login');
        return;
    }
    
    if (user.perfil !== 'ADMIN' && user.perfil !== 'FUNCIONARIO') {
        toast.warning("Acesso restrito para finalização de pedidos.");
        navigate('/');
        return;
    }

    fetchData();
  }, [idReservaUrl, signed, user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const histResponse = await listPedidos();
      setPedidos(histResponse.data);

      if (idReservaUrl) {
        const resResponse = await getReservaById(idReservaUrl);
        setReserva(resResponse.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar detalhes.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (type) => {
    if (!reserva) return;

    try {
      if (type === "confirm") {
        await confirmarReserva(reserva.id_reserva, tipoPagamento);
        toast.success("✅ Reserva confirmada e paga!");
      } else {
        await cancelarReserva(reserva.id_reserva);
        toast.success("❌ Reserva cancelada.");
      }

      setShowCancelModal(false);
      setShowConfirmModal(false);

      setTimeout(() => {
        navigate('/painelAtendente');
      }, 2000);
    } catch (error) {
      toast.error("Erro ao processar ação");
    }
  };

  const totalReserva = reserva?.itens?.reduce(
    (acc, item) => acc + Number(item.preco_unitario) * item.quantidade,
    0
  ) || 0;

  if (loading) {
    return (
      <div className={styles.containerPrincipal}>
        <Header />
        <div style={{ color: '#fff' }}>Carregando detalhes da reserva...</div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className={styles.containerPrincipal}>
        <div className={styles.cardConfirmar}>

          {/* LADO ESQUERDO: DETALHES DA RESERVA */}
          <section className={styles.infoArea}>
            <h3>Detalhes da Reserva</h3>

            <label>ID da Reserva</label>
            <input type="text" value={`#${reserva?.id_reserva || "---"}`} readOnly />

            <label>Cliente</label>
            <input type="text" value={reserva?.pessoa?.nome || "---"} readOnly />

            <label>Produtos</label>
            <div className={styles.itensReserva}>
              {reserva?.itens?.map((item, idx) => (
                <div key={idx} className={styles.itemLinha}>
                  <span>{item.produto?.nome} (x{item.quantidade})</span>
                  <span style={{ fontWeight: 'bold' }}>R$ {(Number(item.preco_unitario) * item.quantidade).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <label>Forma de Pagamento</label>
            <select
              value={tipoPagamento}
              onChange={(e) => setTipoPagamento(e.target.value)}
              disabled={reserva?.status !== 'ABERTA'}
            >
              <option value="PIX">PIX</option>
              <option value="DINHEIRO">Dinheiro</option>
              <option value="DEBITO">Cartão de Débito</option>
              <option value="CREDITO">Cartão de Crédito</option>
            </select>

            <div className={styles.precoTotal}>
              Total: R$ {totalReserva.toFixed(2)}
            </div>

            <div className={styles.botoes}>
              {reserva?.status === 'ABERTA' ? (
                <>
                  <button className={styles.btnCancelar} onClick={() => setShowCancelModal(true)}>
                    Cancelar
                  </button>
                  <button className={styles.btnConfirmar} onClick={() => setShowConfirmModal(true)}>
                    Confirmar Pagamento
                  </button>
                </>
              ) : (
                <button className={styles.btnVoltar} onClick={() => navigate('/painelAtendente')}>
                  Voltar ao Painel
                </button>
              )}
            </div>
          </section>

          {/* LADO DIREITO: HISTÓRICO RECENTE */}
          <section className={styles.historicoArea}>
            <h4>Reservas Recentes</h4>
            <div className={styles.tabelaWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.slice(0, 8).map((p) => (
                    <tr key={p.id_reserva}>
                      <td>#{p.id_reserva}</td>
                      <td style={{
                        color: p.status === 'PAGA' ? '#2ecc71' : p.status === 'CANCELADA' ? '#e74c3c' : '#f1c40f',
                        fontWeight: 'bold'
                      }}>
                        {p.status}
                      </td>
                      <td>R$ {Number(p.valor_total || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>

        {/* MODAL DE CANCELAMENTO */}
        {showCancelModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h3>Deseja cancelar esta reserva?</h3>
              {/* <p>O estoque será devolvido para o cardápio.</p> */}
              <div className={styles.modalButtons}>
                <button className={styles.btnNao} onClick={() => setShowCancelModal(false)}>Não</button>
                <button className={styles.btnSim} onClick={() => handleAction("cancel")}>Sim, Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL DE CONFIRMAÇÃO */}
        {showConfirmModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h3>Confirmar Recebimento?</h3>
              <p>Confirme se o pagamento foi realizado via {tipoPagamento}.</p>
              <div className={styles.modalButtons}>
                <button className={styles.btnNao} onClick={() => setShowConfirmModal(false)}>Não</button>
                <button className={styles.btnSim} onClick={() => handleAction("confirm")}>Confirmar Pago</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default ConfirmarPedido;
