const Reserva = (sequelize, DataTypes) => {
  const Reserva = sequelize.define(
    "Reserva",
    {
      id_reserva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_pessoa: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      data_reserva: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.ENUM('ABERTA', 'PAGA', 'CANCELADA'),
        allowNull: false,
        defaultValue: 'ABERTA',
      },
    },
    {
      tableName: "reservas",
      timestamps: false,
    }
  );

  Reserva.associate = (models) => {
    Reserva.belongsTo(models.Pessoa, {
      foreignKey: "id_pessoa",
      as: "pessoa",
    });
    Reserva.hasMany(models.ReservaItens, {
      foreignKey: "id_reserva",
      as: "itens",
    });
  };

  return Reserva;
};

export default Reserva;
