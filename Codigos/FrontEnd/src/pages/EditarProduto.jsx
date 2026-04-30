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

                </div>
                <div className={Style.EditarProduto}>

                    <main className={Style.main}>
                        <div className={Style.card}>
                            <h2>Editar produto</h2>

                            <label>Nome</label>
                            <input type="text" />

                            <label>Preço</label>
                            <input type="text" />

                            <label>Categoria</label>
                            <input type="text" />

                            <label>Imagem</label>
                            <div className={Style.upload}>Add file 📄</div>

                            <div className={Style.buttons}>
                                <button className={Style.cancel}>Cancelar</button>
                                <button className={Style.confirm}>Confirmar</button>
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