import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/footer";
import Header from '../components/header';
import styles from '../styles/Agendamento.module.css';
import imagem from "../assets/imagens/logo_sabor_senac.svg";
import { reservar } from "../services/homeService";

// Mock do usuário logado (substituir por AuthContext futuramente)
const ID_USUARIO_MOCK = 1;

const Agendamento = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itens = [], total = 0 } = location.state || {};
  const [agendado, setAgendado] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAgendar = async () => {
    if (itens.length === 0) {
        toast.warning("Não há itens para agendar.");
        return;
    }

    const confirmou = window.confirm(
      "Atenção: Seu pedido será cancelado automaticamente se não for retirado em até 10 minutos. Deseja confirmar o agendamento?"
    );

    if (!confirmou) return;

    setLoading(true);
    try {
      // Mapeia os itens do carrinho para o formato esperado pela API de reserva
      const itensReserva = itens.map(item => ({
        id_produto: item.id_produto,
        quantidade: item.quantidade,
        preco_unitario: item.preco_unitario
      }));

      const response = await reservar(ID_USUARIO_MOCK, itensReserva);

      if (response.status === 201) {
        setAgendado(true);
        toast.success("Agendamento realizado com sucesso!");
        
        setTimeout(() => {
          navigate("/consultapedido");
        }, 3000);
      }
    } catch (error) {
      console.error("Erro ao realizar agendamento:", error);
      const errorMsg = error.response?.data?.error || "Erro ao processar o agendamento.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.containerPrincipal}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.cardAgendamento}>
          
          {/* LADO ESQUERDO: LISTA DE ITENS E TOTAL */}
          <section className={styles.areaFormulario}>
            <h1 className={styles.titulo}>Seu Agendamento</h1>
            
            <div className={styles.listaItens}>
              {itens.length > 0 ? (
                itens.map((item, index) => (
                  <div key={index} className={styles.itemAgendamento}>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{item.nome || `Produto #${item.id_produto}`}</span>
                      <span className={styles.itemSub}>{item.quantidade}x R$ {Number(item.preco_unitario).toFixed(2)}</span>
                    </div>
                    <span className={styles.itemPreco}>R$ {(item.quantidade * item.preco_unitario).toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <p style={{opacity: 0.7}}>Nenhum item selecionado.</p>
              )}
            </div>

            <div className={styles.resumo}>
              <div className={styles.totalRow}>
                <span>Total a pagar na retirada:</span>
                <span className={styles.valorTotal}>R$ {Number(total).toFixed(2)}</span>
              </div>
            </div>

            <button 
              className={`${styles.botaoAgendar} ${agendado ? styles.sucesso : ""}`}
              onClick={handleAgendar}
              disabled={agendado || loading}
            >
              {loading ? "Processando..." : agendado ? "Agendado ✓" : "Confirmar Agendamento"}
            </button>
          </section>

          {/* LADO DIREITO: TIMER E MENSAGEM */}
          <section className={styles.areaImagem}>
            <div className={styles.timerCircle}>
              {agendado ? (
                <div className={styles.sucessoMsg}>
                   <h2 style={{fontSize: '60px', margin: 0}}>✓</h2>
                   <p style={{fontSize: '20px', fontWeight: 'bold'}}>Pronto!</p>
                </div>
              ) : (
                <>
                  <span className={styles.textoTimer}>Tempo para retirada</span>
                  <span className={styles.tempo}>10:00</span>
                </>
              )}
            </div>
            <div className={styles.instrucoes}>
               <p>Retire seu pedido no balcão dentro do tempo limite para evitar o cancelamento automático.</p>
            </div>
            <img className={styles.logoFundo} src={imagem} alt="Sabor Senac" />
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Agendamento;
