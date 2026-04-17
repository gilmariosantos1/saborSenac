import React from "react";
import logo from "../assets/logo-fecomercio.png";
import "../styles/footer.css"
import icon1 from "../assets/icon-insta.png";
import icon2 from "../assets/Facebook.png";
import icon3 from "../assets/icon-X.png";
const Footer = () => {
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
              Bairro Silo | N.S. Glória <br />
              CEP: 49.680-000 <br />
              (79) 3411-4400 <br />
              Whatsapp (79) 99867-3337
            </p>
          </div>
        </div>

        {/* TEXTO CENTRAL PEQUENO */}
        <div className="footer-note">
          Desenvolvido pelas turmas de TI (2025) e Assist. Administrativo (2026) — Senac/SE, N. Sra. da Glória
        </div>
      </div>

      {/* PARTE PRETA */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>
            Serviço Nacional de Aprendizagem Comercial - Departamento Regional
            de Sergipe. (c) 2018 | NCME | <span><a href="https://www.se.senac.br/wpautoterms/privacy-policy/" target="_blank" > Política de Privacidade</a></span>
            
          </p>

          <div className="footer-icons">
            <div className="icon"><a href="https://www.facebook.com/people/Senac-Sergipe/61578779873777/" target="_blank" >< img src={icon2} alt="icone do facebook"/></a></div>
            <div className="icon"><a href="https://x.com/senacsergipe" target="_blank" >< img src={icon3} alt="icone do X"/></a></div>
            <div className="icon"><a href="https://www.instagram.com/senacse" target="_blank" >< img src={icon1} alt="icone do instagram"/></a></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;