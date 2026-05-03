import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Style from "../styles/EditarProduto.module.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Modal from "../components/ModalEditarProduto.jsx";
import { toast } from "react-toastify";

import { buscarProdutoPorId, editarProduto } from "../services/estoqueService.js";

import logo from "../assets/imagens/logo_sabor_senac.svg";


import { useAuth } from "../contexts/AuthContext";

const EditarProduto = () => {
    const navigate = useNavigate();
    const { user, signed } = useAuth();
    const { id } = useParams();
    const produtoId = Number(id);

    const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({
        nome: "",
        preco: "",
        estoque: "",
        categoria: "",
        imagem: null,
        imagem_atual: ""
    })

    const BASE_URL = "http://localhost:3000/";

    useEffect(() => {
        if (!signed) {
            navigate("/login");
            return;
        }
        if (user?.perfil === "ALUNO") {
            toast.warning("Acesso restrito.");
            navigate("/");
            return;
        }

        if (produtoId) {
            carregarProduto();
        }
    }, [produtoId, signed, user]);

    const carregarProduto = async () => {
        try {
            const response = await buscarProdutoPorId(produtoId);
            const p = response.data;
            setForm({
                nome: p.nome,
                preco: p.preco,
                estoque: p.estoque,
                categoria: p.id_categoria,
                imagem: null,
                imagem_atual: p.imagem
            });
        } catch (error) {
            toast.error("Erro ao carregar produto.");
            navigate("/controledeestoque");
        }
    };

    const handleCancelar = () => setIsModalCancelOpen(true);
    const fecharModalCancel = () => setIsModalCancelOpen(false);
    const confirmarCancelamento = () => {
        setIsModalCancelOpen(false);
        navigate("/controledeestoque");
    };

    const handleConfirmar = () => setIsModalConfirmOpen(true);
    const fecharModalConfirmar = () => setIsModalConfirmOpen(false);

    const categorias = [
        { id: 1, nome: "Salgados" },
        { id: 2, nome: "Doces" },
        { id: 3, nome: "Bebidas" }
    ];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, imagem: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const confirmarEdicao = async () => {
        setIsModalConfirmOpen(false);

        try {
            const formData = new FormData();
            formData.append("nome", form.nome);
            formData.append("preco", Number(form.preco));
            formData.append("estoque", Number(form.estoque));
            formData.append("id_categoria", Number(form.categoria));

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

                            <label>Imagem do Produto</label>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '15px 0', gap: '10px' }}>
                                {preview ? (
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontSize: '12px', color: '#DD9933', marginBottom: '5px' }}>Nova Imagem:</p>
                                        <img src={preview} alt="Preview" style={{ width: "150px", height: "100px", objectFit: 'cover', borderRadius: '8px', border: '2px solid #DD9933' }} />
                                    </div>
                                ) : form.imagem_atual ? (
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontSize: '12px', color: '#fff', opacity: 0.7, marginBottom: '5px' }}>Imagem Atual:</p>
                                        <img src={`${BASE_URL}${form.imagem_atual}`} alt="Atual" style={{ width: "150px", height: "100px", objectFit: 'cover', borderRadius: '8px' }} />
                                    </div>
                                ) : (
                                    <div style={{ width: '150px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '12px', color: '#fff', opacity: 0.5 }}>Sem Imagem</span>
                                    </div>
                                )}
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                className={Style.upload}
                                onChange={handleFileChange}
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