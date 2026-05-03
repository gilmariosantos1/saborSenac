import React from 'react';
import emojiok from '../assets/imagens/emojiok.svg';
import Style from '../styles/ConfirmaModal.module.css';

export default function ConfirmaModal({ isOpen }) {
    if (!isOpen) return null;

    return (
        <div className={Style.overlay}>
            <div className={Style.modal}>
                <h5 className={Style.text}>COMENTÁRIO ENVIADO COM SUCESSO</h5>
                <img className={Style.image} src={emojiok} alt="Confirmado" />
            </div>
        </div>
    );
}