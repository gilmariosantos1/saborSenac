import models from "../models/index.js";

export const cadastrarProduto = async (req, res) => {
  try {
    const { nome, preco, categoria_id_categoria } = req.body;

    // Caminho da imagem salvo pelo multer
    const imagem = req.file ? `uploads/produtos/${req.file.filename}` : null;

    // Validações básicas
    if (!nome || !preco || !categoria_id_categoria) {
      return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios." });
    }

    const novoProduto = await models.Produto.create({
      nome,
      preco: parseFloat(preco),
      categoria_id_categoria: parseInt(categoria_id_categoria),
      imagem,
    });

    return res.status(201).json({
      mensagem: "Produto cadastrado com sucesso!",
      produto: novoProduto,
    });

  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};
