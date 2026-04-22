import app from './src/server.js';
import models from './src/models/index.js';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await models.sequelize.sync({ force: false }); // force: true para recriar tabelas
    console.log('Banco de dados sincronizado.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao sincronizar banco:', error);
  }
})();