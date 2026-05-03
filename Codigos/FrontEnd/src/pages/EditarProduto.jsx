import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Style from "../styles/EditarProduto.module.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Modal from "../components/ModalEditarProduto.jsx";
import { toast } from "react-toastify";

import { buscarProdutoPorId, editarProduto } from "../services/ServiceEditarProduto.js";

import logo from "../assets/imagens/logo_sabor_senac.svg";


const EditarProduto = () => {
    const navigate = useNavigate();
    const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
    const [form, setForm] = useState({
        nome: "",
        preco: "",
        estoque: "",
        categoria: "",
        imagem: null
    })

    const { id } = useParams();
    const produtoId = Number(id);

    const BASE_URL = "http://localhost:3000/";

    if (isNaN(produtoId)) {
        // id inválido
        console.error("ID inválido");
    }

    const handleCancelar = () => {
        setIsModalCancelOpen(true);
    }

    const confirmarCancelamento = () => {
        setIsModalCancelOpen(false);
        navigate("/controledeestoque");
    }

    const fecharModalCancel = () => {
        setIsModalCancelOpen(false);
    }

    const handleConfirmar = () => {
        setIsModalConfirmOpen(true);
    }

    const confirmarEdicao = async () => {
        setIsModalConfirmOpen(false);

        try {
            const formData = new FormData();

            formData.append("nome", form.nome);
            formData.append("preco", form.preco);
            formData.append("estoque", form.estoque);
            formData.append("id_categoria", form.categoria);

            if (form.imagem) {
                formData.append("imagem", form.imagem);
            }

            await editarProduto(produtoId, formData);

            toast.success("Produto atualizado com sucesso!");
            navigate("/controledeestoque");

        } catch (e) {
            const msg = e.response?.data?.message || "Erro ao editar produto";
            toast.error(msg);
        }
    };

    const fecharModalConfirmar = () => {
        setIsModalConfirmOpen(false);
    }

    const categorias = [
        { id: 1, nome: "Salgados" },
        { id: 2, nome: "Doces" },
        { id: 3, nome: "Bebidas" }
    ];

    useEffect(() => {
        if (!produtoId) return;
        carregarProduto();
    }, [produtoId]);

    const carregarProduto = async () => {
        try {
            const response = await buscarProdutoPorId(produtoId);

            setForm({
                nome: response.data.nome,
                preco: response.data.preco,
                estoque: response.data.estoque,
                categoria: response.data.id_categoria,
                imagem: null,
                imagem_atual: response.data.imagem
            });


        } catch (error) {
            if (error.response?.status === 404) {
                alert("Produto não encontrado");
            } else {
                alert("Erro ao carregar produto");
            }
        }
    };



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
                            <h2>Editar Produto</h2>

                            <label>Nome</label>
                            <input
                                type="text"
                                value={form.nome}
                                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                            />

                            <label>Preço</label>
                            <input
                                type="number"
                                value={form.preco}
                                onChange={(e) => setForm({ ...form, preco: e.target.value })}
                            />

                            <label>Categoria</label>

                            <select
                                className={Style.select}
                                value={form.categoria}
                                onChange={(e) => setForm({ ...form, categoria: Number(e.target.value) })}
                            >
                                <option value="">Selecione uma categoria</option>

                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nome}
                                    </option>
                                ))}
                            </select>

                            <label>Imagem</label>

                            {form.imagem_atual && (
                                <img
                                    src={`${BASE_URL}${form.imagem_atual}`}
                                    alt="Imagem atual"
                                    style={{ width: "120px", marginBottom: "10px" }}
                                />
                            )}

                            <input
                                type="file"
                                className={Style.upload}
                                onChange={(e) =>
                                    setForm({ ...form, imagem: e.target.files[0] })
                                }
                            />

                            <div className={Style.buttons}>
                                <button className={Style.cancel} onClick={handleCancelar}>Cancelar</button>
                                <button className={Style.confirm} onClick={handleConfirmar}>Confirmar</button>
                            </div>
                        </div>
                    </main>

                </div>

            </div>
            <Footer />

            {/* Modais */}
            <Modal
                isOpen={isModalCancelOpen}
                title="Deseja realmente cancelar a edição?"
                onConfirm={confirmarCancelamento}
                onCancel={fecharModalCancel}
                confirmText="Sim, cancelar"
                cancelText="Não, continuar"
            />

            <Modal
                isOpen={isModalConfirmOpen}
                title="Deseja salvar as alterações?"
                onConfirm={confirmarEdicao}
                onCancel={fecharModalConfirmar}
                confirmText="Sim, salvar"
                cancelText="Voltar"

            />
        </>
    );
}
export default EditarProduto;