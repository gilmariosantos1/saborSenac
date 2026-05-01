const Pessoa = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define(
    "Pessoa",
    {
      id_pessoas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      matricula: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      perfil: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
    },
    {
      tableName: "pessoas",
      timestamps: false,
    }
  );

  Pessoa.associate = (models) => {
    Pessoa.hasMany(models.Reserva, {
      foreignKey: "pessoas_id_pessoas",
      as: "reservas",
    });
  };

  return Pessoa;
};

export default Pessoa;
