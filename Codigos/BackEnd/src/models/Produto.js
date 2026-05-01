import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Produtos = sequelize.define(
    "Produtos",
    {
      id_produto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "produtos",
    }
  );

  Produtos.decrementStock = async function (id_produto, quantidade) {
    const produto = await this.findByPk(id_produto);
    if (!produto) return null;

    if (produto.estoque < quantidade) {
      throw new Error("Estoque insuficiente");
    }

    produto.estoque -= quantidade;
    return await produto.save();
  };

  // LISTAR
  Produtos.listAll = async function () {
    return await this.findAll();
  };

  // BUSCAR POR ID
  Produtos.findById = async function (id) {
    return await this.findByPk(id);
  };

  // CRIAR
  Produtos.createItem = async function (data) {
    return await this.create(data);
  };

  // UPDATE
  Produtos.updateItem = async function (id, data) {
    const produto = await this.findByPk(id);
    if (!produto) return null;

    return await produto.update(data);
  };

  // DELETE
  Produtos.removeItem = async function (id) {
    const produto = await this.findByPk(id);
    if (!produto) return false;

    await produto.destroy();
    return true;
  };

  return Produtos;
};