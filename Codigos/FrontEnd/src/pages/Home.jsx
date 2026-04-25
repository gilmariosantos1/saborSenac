import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Footer from "../components/footer";
import Header from '../components/header';
import styles from '../styles/home.module.css';

import banner from '../assets/imagens/banner.png';
import coxinha from '../assets/imagens/coxinha.png';
import carrinho from '../assets/imagens/carrinho_de_compras.png'

// import {listarProdutos, adcionarAoCarrinho} from "../services/homeService";

const Home = () => {
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState("salgados")
    const [produtos, setProdutos] = useState([
  {
    id: 1,
    nome: "Coxinha de frango",
    preco: 6,
    quantidade_atual: 1,
    quantidade: 10
  },
  {
    id: 2,
    nome: "Pastel de carne",
    preco: 7,
    quantidade_atual: 1,
    quantidade: 15
  },
  {
    id: 3,
    nome: "Empada de frango",
    preco: 6,
    quantidade_atual: 1,
    quantidade: 12
  },
  {
    id: 4,
    nome: "Kibe",
    preco: 5,
    quantidade_atual: 1,
    quantidade: 20
  },
  {
    id: 5,
    nome: "Enroladinho de salsicha",
    preco: 4,
    quantidade_atual: 1,
    quantidade: 18
  },
  {
    id: 6,
    nome: "Esfirra de carne",
    preco: 6,
    quantidade_atual: 1,
    quantidade: 14
  },
  {
    id: 7,
    nome: "Suco de laranja",
    preco: 5,
    quantidade_atual: 1,
    quantidade: 25
  },
  {
    id: 8,
    nome: "Refrigerante lata",
    preco: 6,
    quantidade_atual: 1,
    quantidade: 30
  },
  {
    id: 9,
    nome: "Água mineral",
    preco: 3,
    quantidade_atual: 1,
    quantidade: 40
  },
  {
    id: 10,
    nome: "Bolo de chocolate",
    preco: 8,
    quantidade_atual: 1,
    quantidade: 10
  }
]);
    const [pessoa, setPessoa] = useState({
        id: 1,
        nome: 'Guilherme',
        perfil: 'user'
    })
    const [carrinho, setCarrinho] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        carregarProdutos();
    }, []);

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

    async function onSubmit(idPessoa, idProduto, nome, preco, qt_atual, e) {
        e.preventDefault();
        console.log("submitou")
    };

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

                {!loading && produtos.length > 0 && (
                    <div>
                        {categoria === "salgados" &&
                    <div className={styles.cardapio}>

                        {produtos.map((produto) => (
                            <form onSubmit={onSubmit(pessoa.id, produto.id, produto.nome, produto.preco, produto.quantidade_atual)} className={styles.cardapio_item}>
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
                                <div onClick={() => setCarrinho({idPessoa: pessoa.id ,idProduto: produto.id, nome: produto.nome, preco: produto.preco, quantidade: produto.quantidade_atual})} className={styles.cardapio_item_bottom_add}>Adcionar ao carrinho</div>
                                <button onSubmit={onSubmit} type="submit" className={styles.cardapio_item_bottom_reservar}>Reservar</button>
                            </div>
                        </form>
                        ))}

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