import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Footer from "../components/footer";
import Header from '../components/header';
import styles from '../styles/home.module.css';

import banner from '../assets/imagens/banner.png';
import coxinha from '../assets/imagens/coxinha.png';
import carrinhoImg from '../assets/imagens/carrinho_de_compras.png'

import {listarProdutos} from "../services/homeService";

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
            setProdutos(response.data);
            setError(null);
        } catch (err) {
            console.error("Erro ao carregar produtos: ", err);
            setError("Erro ao carregar produtos");
        } finally {
            setLoading(false);
        }
    };

    async function adcionarAoCarrinho() {
        try {
            await addCarrinho(carrinho)
            console.log("Adicionado com sucesso");
        } catch(e) {
            console.error("Erro ao adicionar ao carrinho",e);
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        try {
            await addCarrinho(carrinho);
            console.log("Reservado com sucesso!");
            navigate("/carrinho");
        } catch(e) {
            console.error("Erro ao reservar: ",e)
        }
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

                {loading && <div className={styles.carregando}>Carregando...</div>}
                {error && <div className={styles.carregando}>{error}</div>}

                {!loading && produtos.length === 0 && (
                    <div>Nenhum produto cadastrado!</div>
                )}

                {!loading && produtos.length > 0 && (
                    <div>
                        {categoria === "salgados" &&
                    <div className={styles.cardapio}>

                        {produtos.map((produto) => (
                            <form onSubmit={onSubmit} className={styles.cardapio_item}>
                            <div className={styles.cardapio_item_head}>
                                <div className={`${styles.cardapio_item_head_qtd}`}>{produto.quantidade}</div>
                                <img src={coxinha} alt="Imagem de um coxinha em cima de um prato branco" />
                                <h4>{produto.nome}</h4>
                            </div>
                            <div className={styles.cardapio_item_mid}>
                                <div>R$ {produto.preco},00</div>
                                <div className={styles.cardapio_item_mid_qtd}>
                                    <div onClick={() => diminuirQuantidade(produto.id)} className={styles.cardapio_item_mid_seletores}>-</div>
                                        <input type="number" value={produto.quantidade_atual} />
                                    <div onClick={() => aumentarQuantidade(produto.id)} className={styles.cardapio_item_mid_seletores}>+</div>
                                </div>
                            </div>
                            <div className={styles.cardapio_item_bottom}>
                                <div onClick={() => setCarrinho({idPessoa: pessoa.id ,idProduto: produto.id, nome: produto.nome, preco: produto.preco, quantidade: produto.quantidade_atual}), () => adcionarAoCarrinho()} className={styles.cardapio_item_bottom_add}>Adcionar ao carrinho</div>
                                <button onClick={() => setCarrinho({idPessoa: pessoa.id ,idProduto: produto.id, nome: produto.nome, preco: produto.preco, quantidade: produto.quantidade_atual})} type="submit" className={styles.cardapio_item_bottom_reservar}>Reservar</button>
                            </div>
                        </form>
                        ))}

                    </div>

                }
                {categoria === "doces" && 
                <div className={styles.cardapio}>
                    <div className={styles.cardapio}>

                        {produtos.map((produto) => (
                            <form onSubmit={onSubmit} className={styles.cardapio_item}>
                            <div className={styles.cardapio_item_head}>
                                <div className={`${styles.cardapio_item_head_qtd}`}>{produto.quantidade}</div>
                                <img src={coxinha} alt="Imagem de um coxinha em cima de um prato branco" />
                                <h4>{produto.nome}</h4>
                            </div>
                            <div className={styles.cardapio_item_mid}>
                                <div>R$ {produto.preco},00</div>
                                <div className={styles.cardapio_item_mid_qtd}>
                                    <div onClick={() => diminuirQuantidade(produto.id)} className={styles.cardapio_item_mid_seletores}>-</div>
                                        <input type="number" value={produto.quantidade_atual} />
                                    <div onClick={() => aumentarQuantidade(produto.id)} className={styles.cardapio_item_mid_seletores}>+</div>
                                </div>
                            </div>
                            <div className={styles.cardapio_item_bottom}>
                                <div onClick={() => setCarrinho({idPessoa: pessoa.id ,idProduto: produto.id, nome: produto.nome, preco: produto.preco, quantidade: produto.quantidade_atual}), () => adcionarAoCarrinho()} className={styles.cardapio_item_bottom_add}>Adcionar ao carrinho</div>
                                <button onClick={() => setCarrinho({idPessoa: pessoa.id ,idProduto: produto.id, nome: produto.nome, preco: produto.preco, quantidade: produto.quantidade_atual})} type="submit" className={styles.cardapio_item_bottom_reservar}>Reservar</button>
                            </div>
                        </form>
                        ))}

                    </div>
                </div>
                }
                {categoria === "bebidas" &&
                <div className={styles.cardapio}>
                    <div className={styles.cardapio}>

                        {produtos.map((produto) => (
                            <form onSubmit={onSubmit} className={styles.cardapio_item}>
                            <div className={styles.cardapio_item_head}>
                                <div className={`${styles.cardapio_item_head_qtd}`}>{produto.quantidade}</div>
                                <img src={coxinha} alt="Imagem de um coxinha em cima de um prato branco" />
                                <h4>{produto.nome}</h4>
                            </div>
                            <div className={styles.cardapio_item_mid}>
                                <div>R$ {produto.preco},00</div>
                                <div className={styles.cardapio_item_mid_qtd}>
                                    <div onClick={() => diminuirQuantidade(produto.id)} className={styles.cardapio_item_mid_seletores}>-</div>
                                        <input type="number" value={produto.quantidade_atual} />
                                    <div onClick={() => aumentarQuantidade(produto.id)} className={styles.cardapio_item_mid_seletores}>+</div>
                                </div>
                            </div>
                            <div className={styles.cardapio_item_bottom}>
                                <div onClick={() => setCarrinho({idPessoa: pessoa.id ,idProduto: produto.id, nome: produto.nome, preco: produto.preco, quantidade: produto.quantidade_atual}), () => adcionarAoCarrinho()} className={styles.cardapio_item_bottom_add}>Adcionar ao carrinho</div>
                                <button onClick={() => setCarrinho({idPessoa: pessoa.id ,idProduto: produto.id, nome: produto.nome, preco: produto.preco, quantidade: produto.quantidade_atual})} type="submit" className={styles.cardapio_item_bottom_reservar}>Reservar</button>
                            </div>
                        </form>
                        ))}

                    </div>
                </div>
                }
                    </div>
                )}

{console.log(carrinho)}
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