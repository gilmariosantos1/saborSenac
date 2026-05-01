import axios from "axios";

const API_URL = "http://localhost:3000/produtos";

export const editarProduto = async (id, dados) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar produto:", error);
    throw error;
  }
};