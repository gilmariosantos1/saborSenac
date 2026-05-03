import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import { listPedidos } from "../services/pedidoService";
import styles from '../styles/consultapedido.module.css';
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const MeusAgendamentos = () => {
  const navigate = useNavigate();
  const { user, signed } = useAuth();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    if (!signed) {
        toast.info("Por favor, faça login para ver seus agendamentos.");
        navigate('/login');
        return;
    }

    const fetchPedidos = async () => {
      try {
        // Alunos e funcionários vêem apenas os seus. 
        // Admin pode ver o histórico pessoal aqui também.
        const response = await listPedidos({ id_pessoa: user.id_pessoa });
        setPedidos(response.data);
      } catch (error) {
        console.error("Erro ao buscar histórico de pedidos:", error);
      }
    };
    fetchPedidos();
  }, [signed, user, navigate]);

  return (
    <>
      <Header />

      <main className={styles.containerPrincipal}>
        <div className={styles.cardConsultar} style={{ justifyContent: 'center' }}>

          {/* APENAS HISTÓRICO PARA O ALUNO */}
          <section className={styles.historicoArea} style={{ width: '100%', maxWidth: '900px' }}>
            <h3 style={{ marginBottom: '20px', color: '#fff', textAlign: 'center' }}>Meus Agendamentos</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: '30px' }}>
                Confira abaixo o histórico de seus pedidos e reservas realizados no Sabor Senac.
            </p>

            <div className={styles.tabelaWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {pedidos.length > 0 ? (
                    pedidos.map((pedido) => (
                      <tr key={pedido.id_reserva}>
                        <td>#{pedido.id_reserva}</td>
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
                        <td style={{ fontWeight: 'bold' }}>
                            R$ {Number(pedido.valor_total || 0).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ padding: '30px', opacity: 0.6, color: '#fff' }}>
                        Nenhum pedido encontrado no seu histórico.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <button 
                    className={styles.btnVoltar} 
                    onClick={() => navigate('/')}
                    style={{ background: '#DD9933', color: '#033061', padding: '10px 30px' }}
                >
                    Voltar para o Cardápio
                </button>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default MeusAgendamentos;
