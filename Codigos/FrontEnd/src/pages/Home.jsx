import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Footer from "../components/footer";
import Header from '../components/header';
import styles from '../styles/home.module.css';

import banner from '../assets/imagens/banner.png';
import carrinhoImg from '../assets/imagens/carrinho_de_compras.png';
import logo from '../assets/imagens/logo_sabor_senac.svg';

import {listarProdutos} from "../services/homeService";
// import {listarProdutos, addCarrinho} from "../services/homeService";

const Home = () => {
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState("salgados")
    const [produtos, setProdutos] = useState([]);
    const [pessoa, setPessoa] = useState({
        id: 1,
        nome: 'Guilherme',
        perfil: 'user'
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
            const response = await listarProdutos(categoria);
            setProdutos(response.data.map((p) => ({
                ...p,
                quantidade_atual: p.quantidade > 0 ? 1 : 0
            })));
            setError(null);
        } catch (err) {
            console.error("Erro ao carregar produtos: ", err);
            setError("Erro ao carregar produtos");
        } finally {
            setLoading(false);
        }
    };

    async function adicionarAoCarrinho() {
        try {
            await addCarrinho(carrinho)
            console.log("Adicionado com sucesso");
        } catch(e) {
            console.error("Erro ao adicionar ao carrinho",e);
        }
    }
    async function reservarAdicionarAoCarrinho() {
        try {
            await addCarrinho(carrinho)
            console.log("Adicionado com sucesso");
            navigate("/carrinho");
        } catch(e) {
            console.error("Erro ao adicionar ao carrinho",e);
        }
    }

    const handleAddCarrinho = (produto) => {
        if (produto.quantidade === 0) return alert("Produto sem estoque!");

        const item = {
            idPessoa: pessoa.id,
            idProduto: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: produto.quantidade_atual
        };
        setCarrinho(item);
        // adicionarAoCarrinho(item);
    };

    const handleReservar = (produto) => {
        if (produto.quantidade === 0) return alert("Produto sem estoque!");

        const item = {
            idPessoa: pessoa.id,
            idProduto: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: produto.quantidade_atual
        };
        setCarrinho(item);
        // reservarAdicionarAoCarrinho(item);
    };

    async function onSubmit(e) {
        e.preventDefault();
    };

    function aumentarQuantidade(id) {
        setProdutos((prev) =>
        prev.map((produto) =>
        produto.id === id
            ? {
                ...produto,
                quantidade_atual:
                produto.quantidade_atual <
                produto.quantidade
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
        produto.id === id
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

        // return `${BASE_URL}/uploads/produtos/${imagem}`;
        return DEFAULT_IMAGE;  
    } catch (error) {
        return DEFAULT_IMAGE;
    }
    }   



    return (
        <>
            <Header />

            <div onClick={() => navigate("/carrinho")} className={styles.carrinho}>
                <img src={carrinhoImg} alt="carrinho de compras" />
            </div>

            <section className={styles.section}>
                <div className={styles.cardapio_title}>
                    <div>
                        <h1>Cardápio</h1>
                    </div>
                    <div>
                        <p>Reserve seu <span>sabor</span>, viva a experiência <span>Senac</span>.</p>
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
                            <form onSubmit={onSubmit} key={produto.id} className={`${produto.quantidade === 0 ? styles.item_sem_estoque : ""} ${styles.cardapio_item}`}>
                                <div className={styles.cardapio_item_head}>
                                    <div className={`${styles.cardapio_item_head_qtd} ${produto.quantidade === 0 ? styles.bg_sem_estoque : ""}`}>{produto.quantidade}</div>
                                    <img src={getImageUrl(produto.imagem)} alt={produto.nome} />
                                    <h4>{produto.nome}</h4>
                                </div>
                                <div className={styles.cardapio_item_mid}>
                                    <div>R$ {produto.preco},00</div>
                                    <div className={styles.cardapio_item_mid_qtd}>
                                        <div onClick={() => diminuirQuantidade(produto.id)} className={styles.cardapio_item_mid_seletores}>-</div>
                                            <input type="number" value={produto.quantidade_atual} readOnly disabled={produto.quantidade === 0}/>
                                        <div onClick={() => aumentarQuantidade(produto.id)} className={styles.cardapio_item_mid_seletores}>+</div>
                                    </div>
                                </div>
                                <div className={styles.cardapio_item_bottom}>
                                    <div onClick={() => handleAddCarrinho(produto)} className={`${styles.cardapio_item_bottom_add} ${produto.quantidade === 0 ? styles.cardapio_item_bottom_add_desativado : "" }`}>Adcionar ao carrinho</div>
                                    <button onClick={() => handleReservar(produto)} type="submit" className={styles.cardapio_item_bottom_reservar} disabled={produto.quantidade === 0}>Reservar</button>
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