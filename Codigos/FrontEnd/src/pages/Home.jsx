import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Footer from "../components/footer";
import Header from '../components/header';
import styles from '../styles/home.module.css';

import banner from '../assets/imagens/banner.png';
import carrinhoImg from '../assets/imagens/carrinho_de_compras.png';
import logo from '../assets/imagens/logo_sabor_senac.svg';

import { listarProdutos, adicionarAoCarrinho, reservar } from "../services/homeService";

const Home = () => {
    const navigate = useNavigate();

    const categoriasMap = {
        salgados: 1,
        doces: 2,
        bebidas: 3
    };


    const [categoria, setCategoria] = useState("salgados")
    const [produtos, setProdutos] = useState([]);
    const [pessoa, setPessoa] = useState({
        id: 1,
        nome: 'Guilherme',
        perfil: 'ALUNO'
    })
    const [carrinho, setCarrinho] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        carregarProdutos();
    }, [categoria]);

    const carregarProdutos = async () => {
        try {
            setLoading(true);
            const categoriaId = categoriasMap[categoria];
            const response = await listarProdutos(categoriaId);

            setProdutos(
                response.data.map((p) => ({
                    ...p,
                    quantidade_atual: p.estoque > 0 ? 1 : 0
                }))
            );

            setError(null);
        } catch (err) {
            console.error("Erro ao carregar produtos: ", err);
            setError("Erro ao carregar produtos");
        } finally {
            setLoading(false);
        }
    };

    const handleAddCarrinho = async (produto) => {
        if (produto.estoque === 0) return toast.warning("Produto sem estoque");
        if (produto.quantidade_atual < 1) return toast.warning("Selecione ao menos 1 unidade");

        try {
            await adicionarAoCarrinho(
                pessoa.id,
                produto.id_produto,
                produto.quantidade_atual,
                produto.preco
            );
            toast.success(`🛒 "${produto.nome}" adicionado ao carrinho!`);
        } catch (e) {
            const msg = e.response?.data?.error || e.response?.data?.message || "Erro ao adicionar ao carrinho";
            toast.error(msg);
        }
    };

    const handleReservar = async (produto) => {
        if (produto.estoque === 0) return toast.warning("Produto sem estoque");
        if (produto.quantidade_atual < 1) return toast.warning("Selecione ao menos 1 unidade");

        try {
            const itensPedido = [{
                id_produto: produto.id_produto,
                quantidade: produto.quantidade_atual,
                preco_unitario: produto.preco,
            }];
            const response = await reservar(pessoa.id, itensPedido);
            const { id_reserva, expira_em } = response.data;
            const expira = new Date(expira_em).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            toast.success(`⏳ "${produto.nome}" reservado até ${expira}!`);

            setProdutos(prev => prev.map(p =>
                p.id_produto === produto.id_produto
                    ? { ...p, estoque: p.estoque - produto.quantidade_atual, quantidade_atual: p.estoque - produto.quantidade_atual > 0 ? 1 : 0 }
                    : p
            ));

            navigate('/agendamento');
        } catch (e) {
            const msg = e.response?.data?.error || "Erro ao criar reserva";
            toast.error(msg);
        }
    };

    async function onSubmit(e) {
        e.preventDefault();
    };

    function aumentarQuantidade(id) {
        setProdutos((prev) =>
            prev.map((produto) =>
                produto.id_produto === id
                    ? {
                        ...produto,
                        quantidade_atual:
                            produto.quantidade_atual <
                                produto.estoque
                                ? produto.quantidade_atual + 1
                                : produto.quantidade_atual
                    }
                    : produto
            )
        );
    }
    function diminuirQuantidade(id) {
        setProdutos((prevProdutos) =>
            prevProdutos.map((produto) =>
                produto.id_produto === id
                    ? {
                        ...produto,
                        quantidade_atual:
                            produto.quantidade_atual > 0
                                ? produto.quantidade_atual - 1
                                : 0
                    }
                    : produto
            )
        );
    }

    const BASE_URL = "http://localhost:3000"; // backend
    const DEFAULT_IMAGE = logo;

    function getImageUrl(imagem) {
        try {
            if (!imagem || imagem.trim() === "") {
                return DEFAULT_IMAGE;
            }

            return `${BASE_URL}/${imagem}`;
        } catch (error) {
            return DEFAULT_IMAGE;
        }
    }



    return (
        <>
            <Header />


            <section className={styles.section}>
                <div className={styles.cardapio_title}>
                    <div>
                        <h1>Cardápio</h1>
                    </div>
                    <div>
                        <p>Reserve seu <span>sabor,</span> viva a experiência <span>Senac.</span></p>
                    </div>
                </div>
                <div className={styles.banner}>
                    <img src={banner} alt="Foto da frente do Sabor Senac" />
                </div>
            </section>
            <main>
                <div className={styles.categorias}>
                    <div>
                        <div onClick={() => setCategoria("salgados")} className={`${styles.categorias_itens_ponta_esquerda} ${categoria === "salgados" ? styles.ativo : ""}`}>Salgados</div>
                        <div onClick={() => setCategoria("doces")} className={`${styles.categorias_itens} ${categoria === "doces" ? styles.ativo : ""}`}>Doces</div>
                        <div onClick={() => setCategoria("bebidas")} className={`${styles.categorias_itens_ponta_direita} ${categoria === "bebidas" ? styles.ativo : ""}`}>Bebidas</div>
                    </div>
                </div>

                {loading && <div className={styles.carregando}>Carregando...</div>}
                {error && <div className={styles.carregando}>{error}</div>}

                {!loading && produtos.length === 0 && (
                    <div>Nenhum produto cadastrado!</div>
                )}
                {!loading && produtos.length > 0 && (
                    <div className={styles.cardapio}>
                        {produtos.map((produto) => (
                            <form onSubmit={onSubmit} key={produto.id_produto} className={`${produto.estoque === 0 ? styles.item_sem_estoque : ""} ${styles.cardapio_item}`}>
                                <div className={styles.cardapio_item_head}>
                                    <div className={`${styles.cardapio_item_head_qtd} ${produto.estoque === 0 ? styles.bg_sem_estoque : ""}`}>{produto.estoque}</div>
                                    <img src={getImageUrl(produto.imagem)} alt={produto.nome} />
                                    <h4>{produto.nome}</h4>
                                </div>
                                <div className={styles.cardapio_item_mid}>
                                    <div>
                                        R$ {Number(produto.preco).toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </div>
                                    <div className={styles.cardapio_item_mid_qtd}>
                                        <div onClick={() => diminuirQuantidade(produto.id_produto)} className={styles.cardapio_item_mid_seletores}>-</div>
                                        <input type="number" value={produto.quantidade_atual ?? 0} readOnly disabled={produto.estoque === 0} />
                                        <div onClick={() => aumentarQuantidade(produto.id_produto)} className={styles.cardapio_item_mid_seletores}>+</div>
                                    </div>
                                </div>
                                <div className={styles.cardapio_item_bottom}>
                                    <div onClick={() => handleAddCarrinho(produto)} className={`${styles.cardapio_item_bottom_add} ${produto.estoque === 0 ? styles.cardapio_item_bottom_add_desativado : ""}`}>Add ao carrinho</div>
                                    {pessoa.perfil !== 'ALUNO' && (
                                        <button onClick={() => handleReservar(produto)} type="submit" className={styles.cardapio_item_bottom_reservar} disabled={produto.estoque === 0}>Reservar</button>
                                    )}
                                </div>
                            </form>
                        ))}

                    </div>
                )}

                <div className={styles.paginacao}>

                    <div className={styles.paginacao_ativa}>1</div>
                    <div>{">"}</div>


                </div>
            </main>
            < Footer />
        </>
    )
}
export default Home;