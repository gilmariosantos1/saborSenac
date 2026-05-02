const Pessoa = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define(
    "Pessoa",
    {
      id_pessoa: {
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
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      perfil: {
        type: DataTypes.ENUM('ALUNO', 'FUNCIONARIO', 'ADMIN'),
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
      foreignKey: "id_pessoa",
      as: "reservas",
    });
  };

  return Pessoa;
};

export default Pessoa;
