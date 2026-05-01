const Venda = (sequelize, DataTypes) => {
  const Venda = sequelize.define(
    "Venda",
    {
      id_vendas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      preco: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      quantidade_saida: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      reservas_id_reserva: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
      },
      reservas_pessoas_id_pessoas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
      },
      reservas_produtos_id_produtos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
      },
    },
    {
      tableName: "vendas",
      timestamps: false,
    }
  );

  Venda.associate = (models) => {
    Venda.belongsTo(models.Reserva, {
      foreignKey: "reservas_id_reserva",
      as: "reserva",
    });
  };

  return Venda;
};

export default Venda;
