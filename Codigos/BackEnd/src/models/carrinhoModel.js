// src/models/carrinhoModel.js

import models from "./index.js";

const Carrinho = models.Carrinho;

const carrinhoModel = {
  async listAll() {
    return await Carrinho.findAll();
  },

  async findById(id) {
    return await Carrinho.findByPk(id);
  },

  async create(data) {
    return await Carrinho.create(data);
  },

  async update(id, data) {
    const item = await Carrinho.findByPk(id);

    if (!item) return null;

    await item.update(data);

    return item;
  },

  async remove(id) {
    const item = await Carrinho.findByPk(id);

    if (!item) return false;

    await item.destroy();

    return true;
  },
};

export default carrinhoModel;