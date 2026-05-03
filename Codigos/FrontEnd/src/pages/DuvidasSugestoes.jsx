import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from '../components/header';
import Style from '../styles/DuvidasSugestoes.module.css';
import { useState } from "react";
import Modal from "../components/SugestaoModal";
import { toast } from "react-toastify";

const DuvidasSugestoes = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  // Estados do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipo, setTipo] = useState("duvida");
  const [mensagem, setMensagem] = useState("");

  const handleVerificarEnvio = () => {
    if (!nome.trim() || !mensagem.trim()) {
      toast.warning("Por favor, preencha seu nome e sua mensagem.");
      return;
    }
    setOpenModal(true);
  };

  return (
    <>
      <Header />
      <div className={Style.container}>

        {/* ABA SUPERIOR */}
        <div className={Style.tab}>
          DÚVIDAS, SUGESTÕES E RECLAMAÇÕES
        </div>

        {/* FORMULÁRIO */}
        <div className={Style.formBox}>
          <button className={Style.back} onClick={() => navigate('/')}>←</button>

          <label>Nome completo: <span style={{color: 'red'}}>*</span></label>
          <input 
            type="text" 
            placeholder="Seu nome aqui..." 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label>E-mail: (Opcional)</label>
          <input 
            type="email" 
            placeholder="exemplo@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Telefone: (Opcional)</label>
          <input 
            type="text" 
            placeholder="(00) 00000-0000" 
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <label>Tipo de Solicitação: <span style={{color: 'red'}}>*</span></label>
          <select 
            className={Style.selectField}
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="duvida">Dúvida</option>
            <option value="sugestao">Sugestão</option>
            <option value="reclamacao">Reclamação</option>
          </select>

          <label>Sua Mensagem: <span style={{color: 'red'}}>*</span></label>
          <textarea 
            rows="6" 
            placeholder="Escreva sua mensagem aqui..." 
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          ></textarea>

          <button className={Style.submit} onClick={handleVerificarEnvio}>
            ENVIAR MENSAGEM
          </button>
        </div>

        {/* REDES SOCIAIS LATERAIS */}
        <div className={Style.social}>
          <div className={`${Style.icon} ${Style.instagram}`}>IG</div>
          <div className={`${Style.icon} ${Style.whatsapp}`}>WA</div>
        </div>

        <Modal isOpen={openModal} setModalOpen={() => setOpenModal(false)}>
          <div className={Style.textModal}>REALMENTE DESEJA ENVIAR ESSE COMENTÁRIO?</div>
        </Modal>

      </div>

      <Footer />
    </>
  );
}

export default DuvidasSugestoes;