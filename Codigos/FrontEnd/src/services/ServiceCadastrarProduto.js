import ServiceCadastrarProduto from "../services/ServiceCadastrarProduto";
import axios from "axios";

const API_URL = "http://localhost:3000";

const ServiceCadastrarProduto = async (dados) => {
  try {
    const formData = new FormData();

    formData.append("nome", dados.nome);
    formData.append("descricao", dados.descricao);
    formData.append("preco", dados.preco);
    formData.append("categoria", dados.categoria);
    formData.append("quantidade", dados.quantidade);

    // Arquivo de imagem (campo do tipo <input type="file">)
    if (dados.imagem) {
      formData.append("imagem", dados.imagem);
    }

    const response = await axios.post(
      `${API_URL}/cadastrarProduto`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    throw error;
  }
};

export default ServiceCadastrarProduto;
