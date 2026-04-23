import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100svh",
  },
  main: {
    flex: 1,
    background: "#1855A5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 16px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "8px",
    padding: "36px 40px 40px",
    width: "100%",
    maxWidth: "460px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
  },
  title: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "28px",
    fontFamily: "'Open Sans', sans-serif",
  },
  fieldGroup: {
    marginBottom: "18px",
  },
  label: {
    display: "block",
    fontSize: "15px",
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: "6px",
    fontFamily: "'Open Sans', sans-serif",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1.5px solid #c8cdd6",
    borderRadius: "6px",
    padding: "10px 12px",
    fontSize: "15px",
    fontFamily: "'Open Sans', sans-serif",
    color: "#333",
    outline: "none",
    transition: "border-color 0.2s",
    background: "#fafafa",
  },
  select: {
    width: "100%",
    boxSizing: "border-box",
    border: "1.5px solid #c8cdd6",
    borderRadius: "6px",
    padding: "10px 12px",
    fontSize: "15px",
    fontFamily: "'Open Sans', sans-serif",
    color: "#333",
    outline: "none",
    transition: "border-color 0.2s",
    background: "#fafafa",
    appearance: "none",
    cursor: "pointer",
  },
  uploadBox: {
    width: "100%",
    boxSizing: "border-box",
    border: "1.5px solid #c8cdd6",
    borderRadius: "6px",
    padding: "12px",
    minHeight: "110px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    background: "#fafafa",
    cursor: "pointer",
    position: "relative",
    gap: "8px",
  },
  uploadTrigger: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    color: "#555",
    fontFamily: "'Open Sans', sans-serif",
    cursor: "pointer",
  },
  uploadIcon: {
    fontSize: "20px",
    lineHeight: 1,
  },
  previewImg: {
    maxWidth: "100%",
    maxHeight: "80px",
    borderRadius: "4px",
    objectFit: "cover",
    marginTop: "4px",
  },
  fileName: {
    fontSize: "12px",
    color: "#777",
    fontFamily: "'Open Sans', sans-serif",
    wordBreak: "break-all",
  },
  hiddenInput: {
    display: "none",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "28px",
    gap: "12px",
  },
  btnCancelar: {
    flex: 1,
    padding: "11px 0",
    border: "none",
    borderRadius: "6px",
    background: "#e53935",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    fontFamily: "'Open Sans', sans-serif",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.1s",
  },
  btnConfirma: {
    flex: 1,
    padding: "11px 0",
    border: "none",
    borderRadius: "6px",
    background: "#2e7d32",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    fontFamily: "'Open Sans', sans-serif",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.1s",
  },
  errorMsg: {
    color: "#c62828",
    fontSize: "12px",
    marginTop: "4px",
    fontFamily: "'Open Sans', sans-serif",
  },
  successBanner: {
    background: "#e8f5e9",
    border: "1px solid #a5d6a7",
    borderRadius: "6px",
    color: "#2e7d32",
    padding: "10px 14px",
    fontSize: "14px",
    fontFamily: "'Open Sans', sans-serif",
    marginBottom: "18px",
    textAlign: "center",
  },
};

const CATEGORIAS = [
  "Selecione uma categoria",
  "Lanches",
  "Refeições",
  "Bebidas",
  "Sobremesas",
  "Saladas",
  "Snacks",
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

export default CadastrarProduto;
