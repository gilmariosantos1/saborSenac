import axios from "axios";

import { API_URL } from "./api";

export const editarProduto = async (id, dados) => {
  try {
    const response = await axios.put(`${API_URL}produto/${id}`, dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar produto:", error);
    throw error;
  }
};