import { useState } from 'react';
import styles from '../styles/AdicionarProduto.module.css';
import Header from '../components/header';
import Footer from '../components/footer';

export default function AdicionarProduto() {
    const [formData, setFormData] = useState({
        nomeProduto: '',
        quantidade: ''
    });
    const [mostrarPopup, setMostrarPopup] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancelar = () => {
        setFormData({
            nomeProduto: '',
            quantidade: ''
        });
        window.history.back();
    };

    const handleConfirmar = (e) => {
        e.preventDefault();
        setMostrarPopup(true);
    };

    const handleConfirmarPopup = () => {
        // Lógica para confirmar adição do produto
        console.log('Produto adicionado:', formData);
        // Aqui você pode enviar os dados para a API
        alert('Produto adicionado com sucesso!');
        setFormData({
            nomeProduto: '',
            quantidade: ''
        });
        setMostrarPopup(false);
    };

    const handleCancelarPopup = () => {
        setMostrarPopup(false);
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <h1 className={styles.titulo}>Adicionar produto ao estoque</h1>
                    
                    <form onSubmit={handleConfirmar}>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                name="nomeProduto"
                                placeholder="Nome do produto"
                                value={formData.nomeProduto}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="number"
                                name="quantidade"
                                placeholder="Quantidade"
                                value={formData.quantidade}
                                onChange={handleChange}
                                required
                                min="1"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                onClick={handleCancelar}
                                className={styles.btnCancelar}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className={styles.btnConfirmar}
                            >
                                Confirmar
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {mostrarPopup && (
                <div className={styles.overlay}>
                    <div className={styles.popup}>
                        <h2 className={styles.popupTitulo}>Confirmação</h2>
                        <p className={styles.popupMensagem}>
                            Tem certeza que deseja adicionar este produto?
                        </p>
                        <p className={styles.popupDetalhes}>
                            <strong>Produto:</strong> {formData.nomeProduto}<br />
                            <strong>Quantidade:</strong> {formData.quantidade}
                        </p>
                        <div className={styles.popupButtonGroup}>
                            <button
                                onClick={handleCancelarPopup}
                                className={styles.popupBtnNao}
                            >
                                Não
                            </button>
                            <button
                                onClick={handleConfirmarPopup}
                                className={styles.popupBtnSim}
                            >
                                Sim
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}