import React from 'react'
import emojiok from '../assets/imagens/emojiok.svg'
import './ConfirmaModal.css'


export default function ConfirmaModal({ isOpen }) {
    if (isOpen) {
        return (
            <div className='ConatinerModal'>
                <div className='ModalMain'>
                    <div className='ConfModal'>
                        <h5 className="ConfTexto">COMENTÁRIO ENVIADO COM SUCESSO</h5>
                        <img className='imgEmojiok' src={emojiok} alt="Confirmado" />
                    </div>
                </div>
            </div>


        )

    }

    return null

}