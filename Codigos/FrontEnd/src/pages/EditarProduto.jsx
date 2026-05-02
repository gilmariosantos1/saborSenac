import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../styles/EditarProduto.module.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Modal from "../components/ModalEditarProduto.jsx";

import logo from "../assets/imagens/logo_sabor_senac.svg";


const EditarProduto = () => {
    const navigate = useNavigate();
    const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

    const handleCancelar = () => {
        setIsModalCancelOpen(true);
    }

    const confirmarCancelamento = () => {
        setIsModalCancelOpen(false);
        navigate("/controledeestoque");
    }

    const fecharModalCancel = () => {
        setIsModalCancelOpen(false);
    }

    const handleConfirmar = () => {
        setIsModalConfirmOpen(true);
    }

    const confirmarEdicao = () => {
        setIsModalConfirmOpen(false);
        //Inserir logica de salvamento no banco

        navigate("/controledeestoque");
    }

    const fecharModalConfirmar = () => {
        setIsModalConfirmOpen(false);
    }

    return (
        <>
            <Header />
            <div >
                <div className={Style.logo}>
                    <img src={logo} alt="Logo" />
                </div>
                <div className={Style.EditarProduto}>

                    <main className={Style.main}>
                        <div className={Style.card}>
                            <h2>Editar Produto</h2>

                            <label>Nome</label>
                            <input type="text" />

                            <label>Preço</label>
                            <input type="text" />

                            <label>Categoria</label>

                            <select className={Style.select}>
                                <option value="" disabled selected>Selecione uma categoria</option>
                                <option value="">Salgados</option>
                                <option value="">Doces</option>
                                <option value="">Bebidas</option>
                            </select>

                            <label>Imagem</label>
                            <input type="file" className={Style.upload} />

                            <div className={Style.buttons}>
                                <button className={Style.cancel} onClick={handleCancelar}>Cancelar</button>
                                <button className={Style.confirm} onClick={handleConfirmar}>Confirmar</button>
                            </div>
                        </div>
                    </main>

                </div>

            </div>
            <Footer />

            {/* Modais */}
            <Modal
                isOpen={isModalCancelOpen}
                title="Deseja realmente cancelar a edição?"
                onConfirm={confirmarCancelamento}
                onCancel={fecharModalCancel}
                confirmText="Sim, cancelar"
                cancelText="Não, continuar"
            />

            <Modal
                isOpen={isModalConfirmOpen}
                title="Deseja salvar as alterações?"
                onConfirm={confirmarEdicao}
                onCancel={fecharModalConfirmar}
                confirmText="Sim, salvar"
                cancelText="Voltar"

            />
        </>
    );
}
export default EditarProduto;