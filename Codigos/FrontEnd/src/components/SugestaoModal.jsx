import { useState } from "react";
import ConfirmaModal from './ConfirmaModal';
import Style from '../styles/SugestoesModal.module.css';

export default function Modal({ isOpen, setModalOpen, children }) {
    const [openConfirmaModal, setOpenConfirmaModal] = useState(false);

    if (!isOpen) return null;

    const handleConfirmar = () => {
        setOpenConfirmaModal(true);
        // Aqui poderíamos adicionar a lógica de envio para o backend futuramente
    };

    return (
        <div className={Style.overlay}>
            <div className={Style.modal}>
                <div>
                    {children}
                </div>

                <div className={Style.buttonContainer}>
                    <button onClick={setModalOpen} className={Style.cancelarButton}>
                        Cancelar
                    </button>
                    <button onClick={handleConfirmar} className={Style.confirmarButton}>
                        Sim, Confirmar
                    </button>
                </div>

                <ConfirmaModal isOpen={openConfirmaModal} />
            </div>
        </div>
    );
}