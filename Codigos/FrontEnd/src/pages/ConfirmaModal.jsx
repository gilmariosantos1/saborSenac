import React from 'react'
import emojiok from '../assets/imagens/emojiok.svg'


export default function ConfirmaModal({isOpen}) {
    if(isOpen){
        return (
        <div>
            <img src={emojiok} alt="" />
            
        </div>    
        )

    }

    return null

}
