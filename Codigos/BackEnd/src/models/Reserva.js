const Reserva = (sequelize, DataTypes) => {
  const Reserva = sequelize.define(
    "Reserva",
    {
      id_reserva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      data_reserva: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      tipo_pagamento: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      pessoas_id_pessoas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
      },
      produtos_id_produtos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
      },
    },
    {
      tableName: "reservas",
      timestamps: false,
    }
  );

  Reserva.associate = (models) => {
    Reserva.belongsTo(models.Pessoa, {
      foreignKey: "pessoas_id_pessoas",
      as: "pessoa",
    });
    Reserva.belongsTo(models.Produto, {
      foreignKey: "produtos_id_produtos",
      as: "produto",
    });
  };

  return Reserva;
};

export default Reserva;
