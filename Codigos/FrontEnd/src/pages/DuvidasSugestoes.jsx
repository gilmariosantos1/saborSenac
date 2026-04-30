import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from '../components/header'
import './DuvidasSugestoes.css';
import Modal from "./Modal";
import { useState } from "react";

const DuvidasSugestoes = () => {
  const navigate = useNavigate();

    const handleSugestoesConfirmação = () => {
        navigate('./SugestoesConfirmação');
    }
    const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Header />
      <div className="container">

        {/* ABA */}
        <div className="tab">
          DÚVIDAS, SUGESTÕES E RECLAMAÇÕES
        </div>

        {/* FORM */}
        <div className="form-box">
          <button className="back">←</button>

          <label>Nome completo:</label>
          <input type="text" />

          <label>Contato:</label>
          <input type="text" />

          <label>Digite aqui sua dúvida, sugestão ou reclamação:</label>
          <textarea rows="6"></textarea>

          <button className="submit" onClick={handleSugestoesConfirmação}>ENVIAR</button>
        </div>

        {/* ÍCONES LATERAIS */}
        <div className="social">
          <div className="icon instagram">IG</div>
          <div className="icon whatsapp">WA</div>
        </div>

        <button onClick={() => setOpenModal(true)}> Abrir modal</button>

        <Modal isOpen={openModal} setModalOpen={( ) => setOpenModal(!openModal)}>
          Conteúdo do Modal
        </Modal>

      </div>

      < Footer />
    </>


  )
}



export default DuvidasSugestoes;