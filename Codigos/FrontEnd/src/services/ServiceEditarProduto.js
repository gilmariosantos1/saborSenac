import api from "./api";

import { API_URL } from "./api";

export const editarProduto = async (id, formData) => {
  const response = await api.put(
    `/produtos/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
export const buscarProdutoPorId = (id) => {
  return api.get(`produtos/${id}`);
};