import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from '../styles/AdicionarProduto.module.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { buscarProdutoPorId, atualizarEstoque } from '../services/estoqueService';

export default function ReporEstoque() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProduto] = useState(null);
    const [quantidade, setQuantidade] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchProduto();
        }
    }, [id]);

    const fetchProduto = async () => {
        try {
            const response = await buscarProdutoPorId(id);
            setProduto(response.data);
        } catch (error) {
            toast.error("Erro ao carregar dados do produto.");
            navigate('/controledeestoque');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmar = async (e) => {
        e.preventDefault();
        
        if (!quantidade || isNaN(quantidade) || Number(quantidade) <= 0) {
            return toast.warning("Informe uma quantidade válida.");
        }

        try {
            await atualizarEstoque(id, Number(quantidade));
            toast.success(`Sucesso! Foram adicionadas ${quantidade} unidades ao estoque de ${produto.nome}.`);
            navigate('/controledeestoque');
        } catch (error) {
            toast.error("Erro ao atualizar estoque.");
        }
    };

    if (loading) return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Carregando...</div>;

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <h1 className={styles.titulo}>Repor Estoque</h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px', textAlign: 'center' }}>
                        Adicione novas unidades ao estoque do produto selecionado.
                    </p>
                    
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '8px', marginBottom: '25px', textAlign: 'center' }}>
                        <span style={{ color: '#DD9933', fontWeight: 'bold', fontSize: '1.2rem' }}>{produto?.nome}</span>
                        <br />
                        <span style={{ color: '#fff', fontSize: '0.9rem' }}>Estoque atual: {produto?.estoque} unidades</span>
                    </div>

                    <form onSubmit={handleConfirmar}>
                        <div className={styles.inputGroup}>
                            <label style={{ color: '#fff', display: 'block', marginBottom: '10px' }}>Quantidade a ADICIONAR:</label>
                            <input
                                type="number"
                                placeholder="Ex: 50"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                                required
                                min="1"
                                className={styles.input}
                                autoFocus
                            />
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                onClick={() => navigate('/controledeestoque')}
                                className={styles.btnCancelar}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className={styles.btnConfirmar}
                            >
                                Confirmar Adição
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}