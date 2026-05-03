import { useState } from "react";
import ConfirmaModal from './ConfirmaModal';
import Style from '../styles/SugestoesModal.module.css';

export default function Modal({ isOpen, setModalOpen, children }) {
    const [openConfirmaModal, setOpenConfirmaModal] = useState(false);

    if (!isOpen && !openConfirmaModal) return null;

    const handleConfirmar = () => {
        // Aqui no futuro você pode adicionar a chamada para a API
        setOpenConfirmaModal(true);
    };

    const fecharTudo = () => {
        setOpenConfirmaModal(false);
        setModalOpen();
    };

    if (openConfirmaModal) {
        return (
            <div className={Style.overlay} onClick={fecharTudo}>
                <ConfirmaModal isOpen={true} />
            </div>
        );
    }

    return (
        <div className={Style.overlay}>
            <div className={Style.modal}>
                <div>
                    {children}
                </div>

                <div className={Style.buttonContainer}>
                    <button onClick={setModalOpen} className={Style.cancelarButton}>
                        CANCELAR
                    </button>
                    <button onClick={handleConfirmar} className={Style.confirmarButton}>
                        CONFIRMAR
                    </button>
                </div>
            </div>
        </div>
    );
}