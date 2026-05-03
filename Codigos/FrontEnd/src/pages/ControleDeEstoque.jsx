import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from '../styles/ControleDeEstoque.module.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { listarTodosProdutos, excluirProduto } from '../services/estoqueService';

import icon1 from '../assets/Edit.png';
import icon2 from '../assets/add_circle.png';
import icon3 from '../assets/Trash.png';

const ITENS_POR_PAGINA = 8;

export default function ControleDeEstoque() {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(null);

    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = async () => {
        try {
            setLoading(true);
            const response = await listarTodosProdutos();
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            toast.error("Erro ao carregar estoque.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await excluirProduto(id);
            toast.success("Produto excluído com sucesso!");
            setProdutos(produtos.filter(p => p.id_produto !== id));
            setShowDeleteModal(null);
        } catch (error) {
            toast.error("Erro ao excluir produto.");
        }
    };

    const totalPaginas = Math.ceil(produtos.length / ITENS_POR_PAGINA);
    const indiceInicial = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const produtosPaginados = produtos.slice(indiceInicial, indiceInicial + ITENS_POR_PAGINA);

    const irParaPagina = (numeroPagina) => {
        if (numeroPagina > 0 && numeroPagina <= totalPaginas) {
            setPaginaAtual(numeroPagina);
        }
    };

    const getCategoriaNome = (id) => {
        const cats = { 1: 'Salgado', 2: 'Doces', 3: 'Bebidas' };
        return cats[id] || 'Outros';
    };

    return (
        <>
            <Header />
            <main style={{ minHeight: '80vh', padding: '40px 20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h1 style={{ color: '#fff', fontSize: '2.5rem' }}>Controle de Estoque</h1>
                        <button 
                            onClick={() => navigate('/cadastrar-produto')} 
                            style={{ background: '#DD9933', color: '#033061', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}
                        >
                            + Novo Produto
                        </button>
                    </div>

                    {loading ? (
                        <div style={{ color: '#fff', textAlign: 'center' }}>Carregando estoque...</div>
                    ) : (
                        <div className={styles.tabela}>
                            <div className={styles.header}>
                                <span>Nome:</span>
                                <span>Quantidade:</span>
                                <span>Categoria</span>
                                <span>Valor:</span>
                                <span style={{ textAlign: 'right' }}>Ações:</span>
                            </div>

                            {produtosPaginados.map((p) => (
                                <div key={p.id_produto} className={styles.row}>
                                    <span style={{ fontWeight: 'bold' }}>{p.nome}</span>
                                    <span style={{ color: p.estoque < 10 ? '#ff4d4d' : '#2ecc71', fontWeight: 'bold' }}>
                                        {p.estoque} unidades
                                    </span>
                                    <span>{getCategoriaNome(p.id_categoria)}</span>
                                    <span>R$ {Number(p.preco).toFixed(2)}</span>

                                    <div className={styles.actions} style={{ justifyContent: 'flex-end' }}>
                                        <Link to={`/EditarProduto/${p.id_produto}`} title="Editar Produto">
                                            <img src={icon1} alt="Editar" />
                                        </Link>

                                        <Link to={`/adicionar-estoque/${p.id_produto}`} title="Repor Estoque">
                                            <img src={icon2} alt="Adicionar" />
                                        </Link>

                                        <button 
                                            onClick={() => setShowDeleteModal(p)} 
                                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                            title="Excluir Produto"
                                        >
                                            <img src={icon3} alt="Deletar" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {produtos.length === 0 && (
                                <div style={{ padding: '40px', textAlign: 'center', color: '#fff', opacity: 0.6 }}>
                                    Nenhum produto cadastrado no sistema.
                                </div>
                            )}
                        </div>
                    )}

                    {!loading && totalPaginas > 1 && (
                        <div className={styles.paginacao} style={{ marginTop: '30px' }}>
                            <button
                                className={styles.botao}
                                onClick={() => irParaPagina(paginaAtual - 1)}
                                disabled={paginaAtual === 1}
                            >
                                ← Anterior
                            </button>

                            <div className={styles.numeroPaginas}>
                                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numero) => (
                                    <button
                                        key={numero}
                                        className={`${styles.numeroPagina} ${paginaAtual === numero ? styles.ativo : ''}`}
                                        onClick={() => irParaPagina(numero)}
                                    >
                                        {numero}
                                    </button>
                                ))}
                            </div>

                            <button
                                className={styles.botao}
                                onClick={() => irParaPagina(paginaAtual + 1)}
                                disabled={paginaAtual === totalPaginas}
                            >
                                Próximo →
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* MODAL DE EXCLUSÃO */}
            {showDeleteModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
                        <h3 style={{ color: '#033061', marginBottom: '15px' }}>Excluir Produto?</h3>
                        <p style={{ color: '#666', marginBottom: '25px' }}>
                            Tem certeza que deseja excluir <strong>{showDeleteModal.nome}</strong>? Esta ação não pode ser desfeita.
                        </p>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button 
                                onClick={() => setShowDeleteModal(null)}
                                style={{ padding: '10px 20px', borderRadius: '6px', border: '1px solid #ccc', cursor: 'pointer' }}
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={() => handleDelete(showDeleteModal.id_produto)}
                                style={{ background: '#e74c3c', color: '#fff', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                            >
                                Sim, Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    )
}