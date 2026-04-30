import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import ServiceCadastrarProduto from "../services/ServiceCadastrarProduto";
import "../pages/CadastroProduto.css";

const CATEGORIAS = [
  "Selecione uma categoria",
  "Salgados",
  "Doces",
  "Bebidas",
];

const CadastrarProduto = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    preco: "",
    categoria: "",
    imagem: null,
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, imagem: file }));
    setErrors((prev) => ({ ...prev, imagem: "" }));
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório.";
    if (!form.preco || isNaN(form.preco) || Number(form.preco) <= 0)
      newErrors.preco = "Informe um preço válido.";
    if (!form.categoria || form.categoria === "Selecione uma categoria")
      newErrors.categoria = "Selecione uma categoria.";
    if (!form.imagem) newErrors.imagem = "Adicione uma imagem do produto.";
    return newErrors;
  };

  const handleConfirmar = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      await ServiceCadastrarProduto({
        nome: form.nome,
        preco: form.preco,
        categoria_id_categoria: form.categoria,
        imagem: form.imagem,
      });

      setSubmitted(true);
      setTimeout(() => navigate("/"), 1800);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      setErrors({ geral: "Erro ao cadastrar produto. Tente novamente." });
    }
  };

  const handleCancelar = () => navigate("/");

  return (
    <div className="page">
      <Header />

      <main>
        <div className="card">
          <h2 className="title">Cadastrar produto</h2>

          {submitted && (
            <div className="successBanner">
              ✅ Produto cadastrado com sucesso! Redirecionando…
            </div>
          )}

          {errors.geral && (
            <div className="errorBanner">{errors.geral}</div>
          )}

          {/* Nome */}
          <div className="fieldGroup">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={form.nome}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.nome && <p className="errorMsg">{errors.nome}</p>}
          </div>

          {/* Preço */}
          <div className="fieldGroup">
            <label htmlFor="preco">Preço</label>
            <input
              id="preco"
              name="preco"
              type="number"
              min="0"
              step="0.01"
              value={form.preco}
              onChange={handleChange}
            />
            {errors.preco && <p className="errorMsg">{errors.preco}</p>}
          </div>

          {/* Categoria */}
          <div className="fieldGroup">
            <label htmlFor="categoria">Categoria</label>
            <select
              id="categoria"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
            >
              {CATEGORIAS.map((cat) => (
                <option
                  key={cat}
                  value={cat === "Selecione uma categoria" ? "" : cat}
                  disabled={cat === "Selecione uma categoria"}
                >
                  {cat}
                </option>
              ))}
            </select>
            {errors.categoria && <p className="errorMsg">{errors.categoria}</p>}
          </div>

          {/* Imagem */}
          <div className="fieldGroup">
            <label>Imagem</label>
            <div className="uploadBox" onClick={() => fileInputRef.current.click()}>
              <span>🖼️ Add file</span>
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  style={{ maxWidth: "100%", maxHeight: "120px", borderRadius: "6px" }}
                />
              )}
              {form.imagem && (
                <span style={{ fontSize: "12px", color: "#888" }}>{form.imagem.name}</span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {errors.imagem && <p className="errorMsg">{errors.imagem}</p>}
          </div>

          {/* Botões */}
          <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
            <button className="btnCancelar" onClick={handleCancelar}>
              Cancelar
            </button>
            <button className="btnConfirma" onClick={handleConfirmar}>
              Confirma
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CadastrarProduto;
