import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/Carrinho.module.css";

import { listarCarrinho, removerItem, atualizarItem } from "../services/carrinhoService";
import { comprarImediato } from "../services/homeService";

import { useAuth } from "../contexts/AuthContext";

const BASE_URL = "http://localhost:3000";

const Carrinho = () => {
    const navigate = useNavigate();
    const { user, signed } = useAuth();

    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);

    // ----- Carrega itens ao montar -----
    useEffect(() => {
        carregarCarrinho();
    }, [signed]);

    const carregarCarrinho = async () => {
        try {
            setLoading(true);
            
            if (!signed) {
                // Carrega do LocalStorage se for visitante
                const localCart = JSON.parse(localStorage.getItem('@SaborSenac:localCart') || '[]');
                setItens(localCart);
                setLoading(false);
                return;
            }

            const response = await listarCarrinho(user.id_pessoa);
            // Filtra somente os itens da pessoa logada (caso a API retorne todos)
            const itensPessoa = response.data.filter(
                (item) => item.id_pessoa === user.id_pessoa
            );
            setItens(itensPessoa);
        } catch (error) {
            console.error("Erro ao carregar carrinho:", error);
            toast.error("Erro ao carregar carrinho.");
        } finally {
            setLoading(false);
        }
    };

    // ----- Remover item -----
    const handleRemover = async (id_item) => {
        try {
            if (!signed) {
                const localCart = JSON.parse(localStorage.getItem('@SaborSenac:localCart') || '[]');
                const filteredCart = localCart.filter((i) => i.id_produto !== id_item);
                localStorage.setItem('@SaborSenac:localCart', JSON.stringify(filteredCart));
                setItens(filteredCart);
                toast.success("Item removido do carrinho local.");
                return;
            }

            await removerItem(id_item);
            setItens((prev) => prev.filter((i) => i.id_item !== id_item));
            toast.success("Item removido do carrinho.");
        } catch (error) {
            console.error("Erro ao remover item:", error);
            toast.error("Erro ao remover item.");
        }
    };

    // ----- Alterar quantidade -----
    const handleQuantidade = async (item, delta) => {
        const novaQtd = item.quantidade + delta;
        
        // id_identificador depende se é local (id_produto) ou banco (id_item)
        const id_identificador = signed ? item.id_item : item.id_produto;

        if (novaQtd < 1) {
            handleRemover(id_identificador);
            return;
        }

        try {
            if (!signed) {
                const localCart = JSON.parse(localStorage.getItem('@SaborSenac:localCart') || '[]');
                const updatedCart = localCart.map(i => 
                    i.id_produto === item.id_produto ? { ...i, quantidade: novaQtd } : i
                );
                localStorage.setItem('@SaborSenac:localCart', JSON.stringify(updatedCart));
                setItens(updatedCart);
                return;
            }

            await atualizarItem(item.id_item, { quantidade: novaQtd });
            setItens((prev) =>
                prev.map((i) =>
                    i.id_item === item.id_item ? { ...i, quantidade: novaQtd } : i
                )
            );
        } catch (error) {
            console.error("Erro ao atualizar quantidade:", error);
            toast.error("Erro ao atualizar quantidade.");
        }
    };

    // ----- Cálculo do total -----
    const total = itens.reduce(
        (acc, item) => acc + Number(item.preco_unitario) * item.quantidade,
        0
    );

    // ----- URL da imagem -----
    const getImageUrl = (imagem) => {
        if (!imagem) return null;
        return `${BASE_URL}/${imagem}`;
    };

    // ----- Finalizar pedido -----
    const handleFinalizar = async () => {
        if (itens.length === 0) {
            toast.warning("Seu carrinho está vazio!");
            return;
        }

        if (!signed) {
            toast.info("Por favor, faça login para finalizar seu pedido.");
            navigate("/login");
            return;
        }

        try {
            if (user.perfil === "ALUNO") {
                navigate("/agendamento", { state: { itens, total } });
            } else {
                // Venda Direta (Admin/Funcionário) - Abate estoque e finaliza
                const itensFormatados = itens.map(item => ({
                    id_produto: item.id_produto,
                    quantidade: item.quantidade,
                    preco_unitario: item.preco_unitario
                }));

                await comprarImediato(user.id_pessoa, itensFormatados);
                toast.success("✅ Venda finalizada com sucesso! Estoque atualizado.");
                navigate("/admin/consultar-pedidos");
            }
        } catch (error) {
            console.error("Erro ao finalizar pedido:", error);
            const msg = error.response?.data?.error || "Erro ao finalizar pedido.";
            toast.error(msg);
        }
    };

    return (
        <div className={styles.page}>
            <Header />

            <div className={styles.container}>
                <h1 className={styles.titulo}>🛒 Meu Carrinho</h1>

                {loading && (
                    <div className={styles.loading}>Carregando seu carrinho...</div>
                )}

                {!loading && itens.length === 0 && (
                    <div className={styles.vazio}>
                        <div className={styles.vazioIcone}>🛍️</div>
                        <div className={styles.vazioTexto}>Seu carrinho está vazio</div>
                        <div className={styles.vazioSub}>
                            Adicione produtos do cardápio para continuar.
                        </div>
                        <button
                            className={styles.btnVoltarVazio}
                            onClick={() => navigate("/")}
                        >
                            Ver Cardápio
                        </button>
                    </div>
                )}

                {!loading && itens.length > 0 && (
                    <>
                        <div className={styles.lista}>
                            {itens.map((item) => (
                                <div key={item.id_item} className={styles.item}>
                                    <img
                                        src={getImageUrl(item.imagem) || "/placeholder.png"}
                                        alt={item.nome || "Produto"}
                                        className={styles.itemImagem}
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                        }}
                                    />

                                    <div className={styles.itemInfo}>
                                        <div className={styles.itemNome}>
                                            {item.nome || `Produto #${item.id_produto}`}
                                        </div>
                                        <div className={styles.itemPreco}>
                                            R${" "}
                                            {Number(item.preco_unitario).toLocaleString("pt-BR", {
                                                minimumFractionDigits: 2,
                                            })}{" "}
                                            cada
                                        </div>
                                    </div>

                                    {/* Controle de quantidade */}
                                    <div className={styles.qtdControle}>
                                        <button
                                            className={styles.btnQtd}
                                            onClick={() => handleQuantidade(item, -1)}
                                        >
                                            −
                                        </button>
                                        <span className={styles.qtdValor}>{item.quantidade}</span>
                                        <button
                                            className={styles.btnQtd}
                                            onClick={() => handleQuantidade(item, +1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Subtotal */}
                                    <div style={{ minWidth: 80, textAlign: "right", fontWeight: 700, color: "#033061" }}>
                                        R${" "}
                                        {(Number(item.preco_unitario) * item.quantidade).toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                        })}
                                    </div>

                                    {/* Remover */}
                                    <button
                                        className={styles.btnRemover}
                                        onClick={() => handleRemover(item.id_item)}
                                        title="Remover item"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Resumo */}
                        <div className={styles.resumo}>
                            <div className={styles.resumoLinha}>
                                <span>{itens.length} {itens.length === 1 ? "item" : "itens"}</span>
                                <span>
                                    R${" "}
                                    {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className={styles.resumoTotal}>
                                <span>Total</span>
                                <span>
                                    R${" "}
                                    {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>

                        {/* Botões */}
                        <div className={styles.acoes}>
                            <button
                                className={styles.btnVoltar}
                                onClick={() => navigate("/")}
                            >
                                ← Continuar Comprando
                            </button>
                            <button
                                className={styles.btnFinalizar}
                                onClick={handleFinalizar}
                            >
                                {(!signed || user?.perfil === "ALUNO") ? "Confirmar Reserva →" : "Finalizar Pedido →"}
                            </button>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Carrinho;
