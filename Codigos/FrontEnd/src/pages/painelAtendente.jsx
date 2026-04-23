import { Link } from 'react-router-dom'
import styles from '../styles/PainelAtendente.module.css'
import Header from '../components/header'
import Footer from '../components/footer'
import icon1 from '../assets/reservation.png'
import icon2 from '../assets/add.png'
import icon3 from '../assets/complain.png'
import icon4 from '../assets/in-stock.png'


export default function PainelAtentende() {
    return (
        <>
            <Header />
            <div className={styles.container}>

                <div className={styles.funcionalidades}>

                    <h3>Funcionalidades</h3>

                    <div className={styles.section}>

                        <div className={styles.inputs}>

                            <div className={styles.icons}>
                                <Link to="#" className={styles.icon}>
                                    <img src={icon1} alt='Icone de consultar' />
                                </Link>
                                <Link to="#" className={styles.icon}>
                                    <img src={icon2} alt='Icone de consultar' />
                                </Link>
                                <Link to="#" className={styles.icon}>
                                    <img src={icon4} alt='Icone de consultar' />
                                </Link>
                                <Link to="#" className={styles.icon}>
                                    <img src={icon3} alt='Icone de consultar' />
                                </Link>
                            </div>


                        </div>

                        <div className={styles.descricao}>

                        </div>

                    </div>

                </div>


            </div>
            <Footer />
        </>
    )
}