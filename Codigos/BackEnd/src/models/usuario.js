export default (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_pessoas',
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
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
      defaultValue: 'USER',
    },
  }, {
    tableName: 'pessoas',
    underscored: true,
    timestamps: true,
  });

  return Usuario;
};
