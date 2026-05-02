import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import { getPedidoByNumero, updateStatusPedido, listPedidos } from "../services/pedidoService";
import '../styles/confirmarpedido.css'

const ConfirmarPedido = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pedido, setPedido] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const numeroPedido = location.state?.numeroPedido;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const histResponse = await listPedidos();
        setPedidos(histResponse.data);

        if (numeroPedido) {
          const pedResponse = await getPedidoByNumero(numeroPedido);
          setPedido(pedResponse.data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, [numeroPedido]);

  const handleCancelClick = () => setShowCancelModal(true);
  const handleConfirmClick = () => setShowConfirmModal(true);

  const handleModalClose = () => {
    setShowCancelModal(false);
    setShowConfirmModal(false);
    setSuccessMessage("");
  };

  const handleActionConfirm = async (type) => {
    if (!pedido) return;

    try {
      const status = type === "cancel" ? "Cancelado" : "Confirmado";
      await updateStatusPedido(pedido.id_reserva, status);

      setSuccessMessage(`Pedido ${status.toLowerCase()} com sucesso ✅`);

      // Atualiza o pedido localmente para refletir a mudança (se necessário)
      setPedido({ ...pedido, status });

      // Atualiza o histórico
      const histResponse = await listPedidos();
      setPedidos(histResponse.data);

      setShowCancelModal(false);
      setShowConfirmModal(false);

      setTimeout(() => {
        setSuccessMessage("");
        navigate('/Consultapedido');
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      setSuccessMessage("Erro ao atualizar pedido");
      setTimeout(() => {
        setSuccessMessage("");
        navigate('/Consultapedido');
      }, 2000);
    }
  };

  return (
    <>
      <Header />

      <main className="consulta-container">
        <section className="consulta-box">
          <h3>Consultar pedido</h3>

          <label>Número do Pedido</label>
          <input type="text" value={pedido?.pedido || "---"} readOnly />

          <label>Nome</label>
          <input type="text" value={pedido?.pessoa?.nome || "---"} readOnly />

          <div className="row">
            <div>
              <label>Produto</label>
              <input type="text" value={pedido?.produto?.nome || "---"} readOnly />
            </div>
            <div>
              <label>Quantidade</label>
              <input type="text" value="1" readOnly />
            </div>
          </div>

          <label>Preço total</label>
          <div className="preco-total">
            <input type="text" value={`R$: ${pedido?.produto?.preco?.toFixed(2) || "0.00"}`} readOnly />
          </div>

          <div className="botoes-confirmar">
            <button className="btn-cancelar" onClick={handleCancelClick} disabled={!pedido}>
              Cancelar
            </button>
            <button className="btn-confirmar" onClick={handleConfirmClick} disabled={!pedido}>
              Confirma
            </button>
          </div>

          <button className="btn-voltar" onClick={() => navigate(-1)}>
            Volta
          </button>
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
                pedidos.map((p) => (
                  <tr key={p.id_reserva}>
                    <td>{p.pedido}</td>
                    <td>{p.status}</td>
                    <td>R$: {p.produto?.preco?.toFixed(2) || "0.00"}</td>
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
              <h3>Tem certeza que cancelar pedido?</h3>
              <div className="modal-buttons">
                <button className="btn-nao" onClick={handleModalClose}>Não</button>
                <button className="btn-sim" onClick={() => handleActionConfirm("cancel")}>Sim</button>
              </div>
            </div>
          </div>
        )}

        {showConfirmModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Tem certeza que confirmar pedido?</h3>
              <div className="modal-buttons">
                <button className="btn-nao" onClick={handleModalClose}>Não</button>
                <button className="btn-sim" onClick={() => handleActionConfirm("confirm")}>Sim</button>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p className="success-message">{successMessage}</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}


export default ConfirmarPedido;
