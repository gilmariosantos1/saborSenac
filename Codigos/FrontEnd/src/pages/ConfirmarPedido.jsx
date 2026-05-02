import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/footer";
import Header from "../components/header";
import { getReservaById, confirmarReserva, cancelarReserva } from "../services/homeService";
import { listPedidos } from "../services/pedidoService";
import '../styles/confirmarpedido.css';

const ConfirmarPedido = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idReservaUrl = searchParams.get("id_reserva");

  const [reserva, setReserva] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, [idReservaUrl]);

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
        await confirmarReserva(reserva.id_reserva, "PIX");
        toast.success("✅ Pedido confirmado!");
      } else {
        await cancelarReserva(reserva.id_reserva);
        toast.success("❌ Pedido cancelado.");
      }

      setShowCancelModal(false);
      setShowConfirmModal(false);

      setTimeout(() => {
        navigate('/');
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
          <>
            <Header />
            <div style={{ padding: "100px", textAlign: "center" }}>Carregando...</div>
            <Footer />
          </>
      );
  }

  return (
    <>
      <Header />

      <main className="consulta-container">
        <section className="consulta-box">
          <h3>Confirmar Reserva</h3>

          <label>ID da Reserva</label>
          <input type="text" value={`#${reserva?.id_reserva || "---"}`} readOnly />

          <label>Cliente</label>
          <input type="text" value={reserva?.pessoa?.nome || "---"} readOnly />

          <div className="itens-reserva" style={{ marginTop: '15px' }}>
            <label>Produtos Reservados</label>
            {reserva?.itens?.map((item, idx) => (
                <div key={idx} className="item-linha" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', background: '#f9f9f9', padding: '8px', borderRadius: '5px' }}>
                    <span>{item.produto?.nome} (x{item.quantidade})</span>
                    <span style={{ fontWeight: 'bold' }}>R$ {(Number(item.preco_unitario) * item.quantidade).toFixed(2)}</span>
                </div>
            ))}
          </div>

          <label style={{ marginTop: '15px' }}>Total a Pagar</label>
          <div className="preco-total">
            <input type="text" value={`R$ ${totalReserva.toFixed(2)}`} readOnly />
          </div>

          {reserva?.status === 'ABERTA' ? (
              <div className="botoes-confirmar">
                <button className="btn-cancelar" onClick={() => setShowCancelModal(true)}>
                  Cancelar
                </button>
                <button className="btn-confirmar" onClick={() => setShowConfirmModal(true)}>
                  Confirmar
                </button>
              </div>
          ) : (
              <div style={{ textAlign: 'center', padding: '15px', color: reserva?.status === 'PAGA' ? 'green' : 'red', fontWeight: 'bold' }}>
                  Reserva já está {reserva?.status}
              </div>
          )}

          <button className="btn-voltar" onClick={() => navigate('/')}>
            Voltar ao Cardápio
          </button>
        </section>

        <section className="historico-box">
          <h4>Seus Pedidos</h4>
          <table>
            <thead>
              <tr>
                <th>Reserva</th>
                <th>Status</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length > 0 ? (
                pedidos.map((p) => (
                  <tr key={p.id_reserva}>
                    <td>#{p.id_reserva}</td>
                    <td style={{ color: p.status === 'PAGA' ? 'green' : p.status === 'CANCELADA' ? 'red' : 'orange' }}>{p.status}</td>
                    <td>R$ {Number(p.valor_total || 0).toFixed(2)}</td>
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

        {showCancelModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Deseja realmente cancelar esta reserva?</h3>
              <p>O estoque será liberado para outros clientes.</p>
              <div className="modal-buttons">
                <button className="btn-nao" onClick={() => setShowCancelModal(false)}>Não</button>
                <button className="btn-sim" onClick={() => handleAction("cancel")}>Sim, Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {showConfirmModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirmar pagamento?</h3>
              <p>O pedido será enviado para a cozinha.</p>
              <div className="modal-buttons">
                <button className="btn-nao" onClick={() => setShowConfirmModal(false)}>Não</button>
                <button className="btn-sim" onClick={() => handleAction("confirm")}>Sim, Confirmar</button>
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
