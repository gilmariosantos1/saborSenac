import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import ServiceCadastrarProduto from "../services/ServiceCadastrarProduto";

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

  /* ─── Handlers ─── */
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

  const handleConfirmar = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // TODO: integrar com a API do back-end
    // await api.post('/produtos', formData);
    setSubmitted(true);
    setTimeout(() => {
      navigate("/");
    }, 1800);
  };

  const handleCancelar = () => {
    navigate("/");
  };

  /* ─── Focus border helper ─── */
  const focusStyle = { borderColor: "#1855A5" };

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.title}>Cadastrar produto</h2>

          {submitted && (
            <div style={styles.successBanner}>
              ✅ Produto cadastrado com sucesso! Redirecionando…
            </div>
          )}

          {/* Nome */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="nome">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={form.nome}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#1855A5")}
              onBlur={(e) => (e.target.style.borderColor = "#c8cdd6")}
              placeholder=""
              autoComplete="off"
            />
            {errors.nome && <p style={styles.errorMsg}>{errors.nome}</p>}
          </div>

          {/* Preço */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="preco">
              Preço
            </label>
            <input
              id="preco"
              name="preco"
              type="number"
              min="0"
              step="0.01"
              value={form.preco}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#1855A5")}
              onBlur={(e) => (e.target.style.borderColor = "#c8cdd6")}
              placeholder=""
            />
            {errors.preco && <p style={styles.errorMsg}>{errors.preco}</p>}
          </div>

          {/* Categoria */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="categoria">
              Categoria
            </label>
            <div style={{ position: "relative" }}>
              <select
                id="categoria"
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                style={styles.select}
                onFocus={(e) => (e.target.style.borderColor = "#1855A5")}
                onBlur={(e) => (e.target.style.borderColor = "#c8cdd6")}
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
              {/* custom chevron */}
              <span
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "#666",
                  fontSize: "12px",
                }}
              >
                ▾
              </span>
            </div>
            {errors.categoria && (
              <p style={styles.errorMsg}>{errors.categoria}</p>
            )}
          </div>

          {/* Imagem */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Imagem</label>
            <div
              style={styles.uploadBox}
              onClick={() => fileInputRef.current.click()}
            >
              <div style={styles.uploadTrigger}>
                <span style={styles.uploadIcon}>🖼️</span>
                <span>Add file</span>
              </div>
              {form.imagem && (
                <>
                  {preview && (
                    <img src={preview} alt="preview" style={styles.previewImg} />
                  )}
                  <span style={styles.fileName}>{form.imagem.name}</span>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={styles.hiddenInput}
              onChange={handleFileChange}
            />
            {errors.imagem && <p style={styles.errorMsg}>{errors.imagem}</p>}
          </div>

          {/* Botões */}
          <div style={styles.actions}>
            <button
              style={styles.btnCancelar}
              onClick={handleCancelar}
              onMouseOver={(e) => (e.target.style.background = "#c62828")}
              onMouseOut={(e) => (e.target.style.background = "#e53935")}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              Cancelar
            </button>
            <button
              style={styles.btnConfirma}
              onClick={handleConfirmar}
              onMouseOver={(e) => (e.target.style.background = "#1b5e20")}
              onMouseOut={(e) => (e.target.style.background = "#2e7d32")}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              Confirma
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const styles = {
  page: { display: "flex", flexDirection: "column", minHeight: "100vh" },
  main: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "32px 16px", background: "#f4f6f9" },
  card: { background: "#fff", borderRadius: "12px", padding: "36px 32px", width: "100%", maxWidth: "480px", boxShadow: "0 2px 16px rgba(0,0,0,0.10)" },
  title: { fontSize: "22px", fontWeight: 700, marginBottom: "24px", color: "#1855A5" },
  fieldGroup: { marginBottom: "18px" },
  label: { display: "block", fontWeight: 600, marginBottom: "6px", color: "#333", fontSize: "14px" },
  input: { width: "100%", padding: "10px 12px", borderRadius: "7px", border: "1.5px solid #c8cdd6", fontSize: "15px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" },
  select: { width: "100%", padding: "10px 12px", borderRadius: "7px", border: "1.5px solid #c8cdd6", fontSize: "15px", outline: "none", appearance: "none", background: "#fff", boxSizing: "border-box" },
  uploadBox: { border: "2px dashed #c8cdd6", borderRadius: "8px", padding: "18px", cursor: "pointer", textAlign: "center", color: "#666", transition: "border-color 0.2s" },
  uploadTrigger: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "15px" },
  uploadIcon: { fontSize: "22px" },
  previewImg: { maxWidth: "100%", maxHeight: "160px", borderRadius: "6px", marginTop: "10px" },
  fileName: { display: "block", fontSize: "12px", color: "#888", marginTop: "6px" },
  hiddenInput: { display: "none" },
  errorMsg: { color: "#e53935", fontSize: "12px", marginTop: "4px" },
  successBanner: { background: "#e8f5e9", color: "#2e7d32", borderRadius: "7px", padding: "12px 16px", marginBottom: "18px", fontWeight: 600 },
  actions: { display: "flex", gap: "12px", marginTop: "28px", justifyContent: "flex-end" },
  btnCancelar: { padding: "10px 24px", borderRadius: "7px", border: "none", background: "#e53935", color: "#fff", fontWeight: 700, fontSize: "15px", cursor: "pointer", transition: "background 0.2s" },
  btnConfirma: { padding: "10px 24px", borderRadius: "7px", border: "none", background: "#2e7d32", color: "#fff", fontWeight: 700, fontSize: "15px", cursor: "pointer", transition: "background 0.2s" },
};

export default CadastrarProduto;
