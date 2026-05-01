import { DataTypes } from "sequelize";

export default (sequelize) => {
  const ReservaItens = sequelize.define(
    "ReservaItens",
    {
      id_item: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      id_pessoa: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      id_reserva: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      preco_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: "reserva_itens",

      indexes: [
        {
          unique: true,
          fields: ["id_pessoa", "id_produto"],
        },
      ],
    }
  );

  ReservaItens.upsertItem = async function (data) {
    const { id_pessoa, id_produto, quantidade } = data;

    const item = await this.findOne({
      where: { id_pessoa, id_produto },
    });

    if (item) {
      item.quantidade += quantidade;
      return await item.save();
    }

    return await this.create(data);
  };

  // LISTAR
  ReservaItens.listAll = async function () {
    return await this.findAll();
  };

  // BUSCAR POR ID
  ReservaItens.findById = async function (id) {
    return await this.findByPk(id);
  };

  // CRIAR (simples - depois vamos melhorar)
  ReservaItens.createItem = async function (data) {
    return await this.create(data);
  };

  // UPDATE
  ReservaItens.updateItem = async function (id, data) {
    const item = await this.findByPk(id);
    if (!item) return null;

    return await item.update(data);
  };

  // DELETE
  ReservaItens.removeItem = async function (id) {
    const item = await this.findByPk(id);
    if (!item) return false;

    await item.destroy();
    return true;
  };

  return ReservaItens;
};