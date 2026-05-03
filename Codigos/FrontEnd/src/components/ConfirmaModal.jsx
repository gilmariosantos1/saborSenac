import emojiok from '../assets/imagens/emojiok.png'
import Style from '../styles/ConfirmaModal.module.css'

export default function ConfirmaModal({ isOpen }) {
    if (!isOpen) return null;

    return (
        <div className={Style.containerModal}>
            <div className={Style.modalMain}>
                <div className={Style.confModal}>
                    <h5 className={Style.confTexto}>COMENTÁRIO ENVIADO COM SUCESSO</h5>
                    <img className={Style.imgEmojiok} src={emojiok} alt="Confirmado" />
                </div>
            </div>
        </div>
    );
}