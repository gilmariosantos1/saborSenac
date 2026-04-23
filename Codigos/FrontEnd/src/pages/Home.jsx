import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from '../components/header'
import styles from '../styles/home.module.css';


import banner from '../assets/imagens/banner.png'
import coxinha from '../assets/imagens/coxinha.png'

const Home = () => {
    const navigate = useNavigate();


    return (
        <>
            <Header />
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
                        <div className={`${styles.categorias_itens_ponta_esquerda} ${styles.ativo}`}>Salgados</div>
                        <div className={`${styles.categorias_itens}`}>Doces</div>
                        <div className={`${styles.categorias_itens_ponta_direita}`}>Bebidas</div>
                    </div>
                </div>

                <div className={styles.cardapio}>

                    <div className={styles.cardapio_item}>
                        <div className={styles.cardapio_item_head}>
                            <div className={`${styles.cardapio_item_head_qtd}`}>0</div>
                            <img src={coxinha} alt="Imagem de um coxinha em cima de um prato branco"/>
                            <h4>Coxinha de frango</h4>
                        </div>
                        <div className={styles.cardapio_item_mid}>
                            <div>R$ 6,00</div>
                            <div className={styles.cardapio_item_mid_qtd}>
                                <div className={styles.cardapio_item_mid_seletores}>-</div>
                                <span>1</span>
                                <div className={styles.cardapio_item_mid_seletores}>+</div>
                            </div>
                        </div>
                        <div className={styles.cardapio_item_bottom}>
                            <div className={styles.cardapio_item_bottom_add}>Adcionar ao carrinho</div>
                            <div className={styles.cardapio_item_bottom_reservar}>Reservar</div>
                        </div>  
                    </div>                   

                </div>

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