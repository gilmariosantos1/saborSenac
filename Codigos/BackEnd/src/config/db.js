import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({
    path: '../.env'
})

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: process.env.DB_LOGGING === 'true' ? console.log : false, define: {
            underscored: true,
            timestamps: true,
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
)

sequelize.authenticate()
  .then(() => {
    console.log('✓ Conectado ao MySQL com sucesso!');
  })
  .catch(err => {
    console.error('✗ Erro ao conectar ao MySQL:', err.message);
    process.exit(1);
  });

export default sequelize;