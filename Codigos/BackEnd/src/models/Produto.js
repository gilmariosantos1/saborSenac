const Produto = (sequelize, DataTypes) => {
  const Produto = sequelize.define(
    "Produto",
    {
      id_produtos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      preco: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      imagem: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      categoria_id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "produtos",
      timestamps: false,
    }
  );

  return Produto;
};

export default Produto;
