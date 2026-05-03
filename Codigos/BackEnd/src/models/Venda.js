const Venda = (sequelize, DataTypes) => {
  const Venda = sequelize.define(
    "Venda",
    {
      id_venda: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_reserva: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tipo_pagamento: {
        type: DataTypes.ENUM('DINHEIRO', 'CREDITO', 'DEBITO', 'PIX'),
        allowNull: false,
      },
      valor_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      data_venda: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    },
    {
      tableName: "vendas",
      timestamps: false,
    }
  );

  Venda.associate = (models) => {
    Venda.belongsTo(models.Reserva, {
      foreignKey: "id_reserva",
      as: "reserva",
    });
  };

  return Venda;
};

export default Venda;
