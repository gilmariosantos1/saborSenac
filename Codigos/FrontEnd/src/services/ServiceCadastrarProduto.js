import axios from "axios";

const API_URL = "http://localhost:3000";

const ServiceCadastrarProduto = async (dados) => {
  try {
    const formData = new FormData();

    formData.append("nome", dados.nome);
    formData.append("preco", dados.preco);
    formData.append("categoria_id_categoria", dados.categoria_id_categoria);

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