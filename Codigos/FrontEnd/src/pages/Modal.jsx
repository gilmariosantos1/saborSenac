import React, { Children } from 'react'
import { useState } from "react";
import ConfirmaModal from './ConfirmaModal';
import './Modal.css'

export default function Modal({ isOpen, setModalOpen, children }) {
    if (isOpen) {

        const [openConfirmaModal, setOpenConfirmaModal] = useState(false)

        return (
            <div className='overlay'>

                <div className='BLACKGROUND_STYLE'>
                    <div className='MODAL_STYLE'>
                        <div>
                            {children}
                        </div>

                        <div className='buttonContainer'>
                            <div >
                                <button onClick={setModalOpen} className='yesButton'>Cancelar</button>
                            </div>

                            <div>
                                <button onClick={() => setOpenConfirmaModal(true)} className='noButton'>Confirma</button>
                            </div>

                        </div>

                        <ConfirmaModal isOpen={openConfirmaModal}/>

                    </div>

                </div>
            </div>

        )
    }

    return null
}