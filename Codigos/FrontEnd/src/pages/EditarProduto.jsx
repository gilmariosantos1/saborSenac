import Style from "../styles/EditarProduto.module.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

import logo from "../assets/imagens/logo_sabor_senac.svg";


const EditarProduto = () => {

    return (
        <>
            <Header />
            <div >
                <div className={Style.logo}>
                    <img src={logo} alt="Logo" />
                </div>
                <div className={Style.EditarProduto}>

                    <main className={Style.main}>
                        <div className={Style.card}>
                            <h2>Atualizar Produto</h2>

                            <label>Nome</label>
                            <input type="text" />

                            <label>Preço</label>
                            <input type="text" />

                            <label>Categoria</label>

                            <select className={Style.select}>
                                <option value="" disabled selected>Selecione uma categoria</option>
                                <option value="">Salgados</option>
                                <option value="">Doces</option>
                                <option value="">Bebidas</option>
                            </select>

                            <label>Imagem</label>
                            <input type="file" className={Style.upload} />

                            <div className={Style.buttons}>
                                <button className={Style.confirm}>Atualizar</button>
                                <button className={Style.cancel}>Cancelar</button>
                            </div>
                        </div>
                    </main>

                </div>

            </div>
            <Footer />
        </>
    );
}
export default EditarProduto;