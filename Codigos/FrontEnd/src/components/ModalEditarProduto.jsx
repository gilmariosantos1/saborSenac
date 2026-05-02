import Style from '../styles/Modal.module.css';

const Modal = ({ isOpen, title, onConfirm, onCancel, confirmText, cancelText, confirmColor }) => {
    if (!isOpen) return null;

    return (
        <div className={Style.modalOverlay}>
            <div className={Style.modalContent}>
                <h3>{title}</h3>
                <div className={Style.modalButtons}>
                    <button
                        className={Style.btnSim}
                        style={confirmColor ? { backgroundColor: confirmColor } : {}}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                    <button className={Style.btnNao} onClick={onCancel}>
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
