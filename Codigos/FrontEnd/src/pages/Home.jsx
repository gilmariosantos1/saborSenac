import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Footer from "../components/footer";
import Header from '../components/header';
import styles from '../styles/home.module.css';

import banner from '../assets/imagens/banner.png';
import coxinha from '../assets/imagens/coxinha.png';
import carrinho from '../assets/imagens/carrinho_de_compras.png'

// import {listarProdutos} from "../services/homeService";

const Home = () => {
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState("salgados")
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        carregarProdutos();
        console.log(produtos);
    }, []);

    const carregarProdutos = async () => {
        try {
            setLoading(true);
            const response = await listarProdutos();
            setColaboradores(response.data);
            setError(null);
        } catch (err) {
            console.error("Erro ao carregar produtos: ", err);
            setError("Erro ao carregar produtos");
        } finally {
            setLoading(false);
        }
    };

    async function onSubmit(e) {
        e.preventDefault();
        console.log("submitou")
    };


    // const [produtos, setProduto] = useState([])

    // function adicionarAoCarrinho(produto) {
    // setProdutos((prev) => {
    //     const produtoExistente = prev.find(
    //         (p) => p.id === produto.id
    //     )

    //     if (produtoExistente) {
    //         return prev.map((p) =>
    //             p.id === produto.id
    //                 ? {
    //                       ...p,
    //                       quantidade: p.quantidade + 1
    //                   }
    //                 : p
    //         )
    //     }

    //     return [
    //         ...prev,
    //         { ...produto, quantidade: 1 }
    //     ]
    // })
    //}


    if(categoria == 'doces') {
        const ativo = '${styles.ativo}';
    }

    return (
        <>
            <Header />

            <div className={styles.carrinho}>
                <img src={carrinho} alt="carrinho de compras" />
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
                    <img src={banner} alt="Cozinheiros do senac" />
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

                {loading && <div>Carregando...</div>}
                {error && <div>{error}</div>}

                {!loading && produtos.length === 0 && (
                    <div>Nenhum produto cadastrado!</div>
                )}

                

                {categoria === "salgados" &&
                    <div className={styles.cardapio}>

                        <form onSubmit={onSubmit} className={styles.cardapio_item}>
                            <div className={styles.cardapio_item_head}>
                                <div className={`${styles.cardapio_item_head_qtd}`}>0</div>
                                <img src={coxinha} alt="Imagem de um coxinha em cima de um prato branco" />
                                <h4>Coxinha de frango</h4>
                            </div>
                            <div className={styles.cardapio_item_mid}>
                                <div>R$ 6,00</div>
                                <div className={styles.cardapio_item_mid_qtd}>
                                    <div className={styles.cardapio_item_mid_seletores}>-</div>
                                        <input type="number" value={0} />
                                    <div className={styles.cardapio_item_mid_seletores}>+</div>
                                </div>
                            </div>
                            <div className={styles.cardapio_item_bottom}>
                                <button className={styles.cardapio_item_bottom_add}>Adcionar ao carrinho</button>
                                <button type="submit" className={styles.cardapio_item_bottom_reservar}>Reservar</button>
                            </div>
                        </form>

                    </div>

                }
                {categoria === "doces" && 
                <div className={styles.cardapio}>
                    <h2>Lista de Doces</h2>
                </div>
                }
                {categoria === "bebidas" &&
                <div className={styles.cardapio}>
                    <h2>Lista de bebidas</h2>
                </div>
                }

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