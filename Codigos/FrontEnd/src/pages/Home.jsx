import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from '../components/header'
import styles from '../styles/home.module.css';

import banner from '../assets/imagens/banner.png'

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
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <div>Coxinha de frango</div>
                        <div>R$6,00</div>
                        <div>- <span></span> +</div>
                        <div>Adcionar ao carrinho</div>
                        <div>Reservar</div>
                    </div>
                </div>
                <div className={styles.paginacao}>

                </div>
            </main>
            < Footer />
        </>
    )
}



export default Home;