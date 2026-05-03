import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from '../components/header'
import Style from '../styles/DuvidasSugestoes.module.css'
import { useState } from "react";
import Modal from "../components/SugestaoModal";
import { toast } from "react-toastify";

const DuvidasSugestoes = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  // Estados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    tipo: "",
    mensagem: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEnviarClick = () => {
    // Validação de campos obrigatórios
    if (!formData.nome || !formData.tipo || !formData.mensagem) {
      toast.warning("Por favor, preencha todos os campos obrigatórios (*)");
      return;
    }
    setOpenModal(true);
  };

  return (
    <>
      <Header />
      <div className={Style.container}>

        {/* ABA */}
        <div className={Style.tab}>
          DÚVIDAS, SUGESTÕES E RECLAMAÇÕES
        </div>

        {/* FORM */}
        <div className={Style.formBox}>
          <button className={Style.back} onClick={() => navigate('/')}>←</button>

          <label>Nome completo: *</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Digite seu nome completo"
          />

          <div className={Style.fieldGroup}>
            <div className={Style.fieldItem}>
              <label>E-mail: (opcional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
              />
            </div>
            <div className={Style.fieldItem}>
              <label>Telefone: (opcional)</label>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <label>Tipo de Contribuição: *</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
          >
            <option value="">Selecione uma opção</option>
            <option value="SUGESTAO">Sugestão</option>
            <option value="DUVIDA">Dúvida</option>
            <option value="RECLAMACAO">Reclamação</option>
          </select>

          <label>Digite aqui sua dúvida, sugestão ou reclamação: *</label>
          <textarea
            name="mensagem"
            value={formData.mensagem}
            onChange={handleInputChange}
            rows="6"
            placeholder="Escreva sua mensagem aqui..."
          ></textarea>

          <button className={Style.submit} onClick={handleEnviarClick}>
            ENVIAR
          </button>
        </div>

        {/* ÍCONES LATERAIS */}
        <div className={Style.social}>
          <div className={`${Style.icon} ${Style.instagram}`}>IG</div>
          <div className={`${Style.icon} ${Style.whatsapp}`}>WA</div>
        </div>

        <Modal isOpen={openModal} setModalOpen={() => setOpenModal(false)}>
          <h5 style={{ color: '#fff', fontWeight: 'bold' }}>REALMENTE DESEJA ENVIAR ESSE COMENTÁRIO?</h5>
        </Modal>

      </div>

      <Footer />
    </>
  )
}

export default DuvidasSugestoes;