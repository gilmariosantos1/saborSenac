import React, { Children } from 'react'

const BLACKGROUND_STYLE = {
    position:'fixed',
    top: '0',
    botton: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgb(0,0,0, 0.7)',
    zIndex: '1000'
}
const MODAL_STYLE = {
    position:'fixed',
    top:'25%',
    left:'35%',
    tranform:'translate(-50%,-50%)',
    padding: '150px',
    backgroundColor: '#fff',
    border: '1px solid #000000',
    Color: 'Black'
}

export default function Modal({ isOpen, children }) {
    if(isOpen) {
        return(
            <div style={BLACKGROUND_STYLE}>
                <div style={MODAL_STYLE}>
                    <div>
                        {children}
                    </div>
                    <button onClick={setModelOpen}>Fechar</button>
                </div>

            </div>
        )
    }
    
    return null
}