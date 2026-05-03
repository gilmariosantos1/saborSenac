import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/Carrinho.module.css";

import { listarCarrinho, removerItem, atualizarItem } from "../services/carrinhoService";

const BASE_URL = "http://localhost:3000";

// ID da pessoa logada (fixo por enquanto, virá do contexto de autenticação no futuro)
const ID_PESSOA = 1;
const PERFIL_USUARIO = "ALUNO"; // Mock do perfil para teste (ALUNO ou FUNCIONARIO)

const Carrinho = () => {
    const navigate = useNavigate();

    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);

    // ----- Carrega itens ao montar -----
    useEffect(() => {
        carregarCarrinho();
    }, []);

    const carregarCarrinho = async () => {
        try {
            setLoading(true);
            const response = await listarCarrinho(ID_PESSOA);
            // Filtra somente os itens da pessoa logada (caso a API retorne todos)
            const itensPessoa = response.data.filter(
                (item) => item.id_pessoa === ID_PESSOA
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
        if (novaQtd < 1) {
            handleRemover(item.id_item);
            return;
        }
        try {
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
    const handleFinalizar = () => {
        if (itens.length === 0) {
            toast.warning("Seu carrinho está vazio!");
            return;
        }

        if (PERFIL_USUARIO === "ALUNO") {
            navigate("/agendamento", { state: { itens, total } });
        } else {
            navigate("/confirmarpedido");
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
                                {PERFIL_USUARIO === "ALUNO" ? "Confirmar Reserva →" : "Finalizar Pedido →"}
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
