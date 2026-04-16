import React from "react";
import "./FooterSenac.css";
import logo from "../assets/logo-fecomercio.png";

const FooterSenac = () => {
  return (
    <footer className="footer">
      <div className="footer-top-container">
        <div className="footer-top">
          
          {/* ESQUERDA */}
          <div className="footer-left">
            <img src={logo} alt="Fecomércio SE" className="logo" />

            <p className="subtitle">
              CNC Sesc Senac <br />
              Sindicatos | Instituto Fecomércio
            </p>
          </div>

          {/* DIREITA */}
          <div className="footer-right">
            <h3>N.S. GLÓRIA</h3>
            <div className="divider" />

            <p>
              Rua Manoel Francisco de Andrade, nº 100 <br />
              Bairro Silvio I, N.S. Glória <br />
              CEP: 49.680-000 <br />
              (79) 3411-4400 <br />
              Whatsapp (79) 99867-3337
            </p>
          </div>
        </div>

        {/* TEXTO CENTRAL PEQUENO */}
        <div className="footer-note">
          Site desenvolvido pela turma de 2025 do curso técnico em TI Senac/SE -
          Nossa Senhora da Glória
        </div>
      </div>

      {/* PARTE PRETA */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>
            Serviço Nacional de Aprendizagem Comercial - Departamento Regional
            de Sergipe. (c) 2018 | NCME | <span>Política de Privacidade</span>
          </p>

          <div className="footer-icons">
            <div className="icon">f</div>
            <div className="icon">x</div>
            <div className="icon">◎</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSenac;