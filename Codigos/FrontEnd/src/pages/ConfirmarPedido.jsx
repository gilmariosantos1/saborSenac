import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import '../styles/confirmarpedido.css'

const ConfirmarPedido = () => {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCancelClick = () => setShowCancelModal(true);
  const handleConfirmClick = () => setShowConfirmModal(true);

  const handleModalClose = () => {
    setShowCancelModal(false);
    setShowConfirmModal(false);
    setSuccessMessage("");
  };

  const handleActionConfirm = (type) => {
    if (type === "cancel") {
      setSuccessMessage("Pedido cancelado com sucesso ✅");
    } else {
      setSuccessMessage("Pedido confirmado com sucesso ✅");
    }

    setShowCancelModal(false);
    setShowConfirmModal(false);

    setTimeout(() => {
        setSuccessMessage("");
    }, 2000);
  };

  return (
    <>
      <Header />
      
      <main className="consulta-container">
        <section className="consulta-box">
          <h3>Consultar pedido</h3>

          <label>Número do Pedido</label>
          <input type="text" placeholder="000" readOnly />

          <label>Nome</label>
          <input type="text" placeholder="Value" readOnly />

          <div className="row">
            <div>
              <label>Produto</label>
              <input type="text" placeholder="Salgado" readOnly />
            </div>
            <div>
              <label>Quantidade</label>
              <input type="text" placeholder="0" readOnly />
            </div>
          </div>

          <label>Preço total</label>
          <div className="preco-total">
            <input type="text" placeholder="R$: 0" readOnly />
          </div>

          <div className="botoes-confirmar">
            <button className="btn-cancelar" onClick={handleCancelClick}>
              Cancelar
            </button>
            <button className="btn-confirmar" onClick={handleConfirmClick}>
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
