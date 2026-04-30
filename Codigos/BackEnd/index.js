import app from "./src/server.js";
import models from "./src/models/index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;



(async () => {
  try {
    await models.sequelize.authenticate();
    console.log("Banco conectado com sucesso!");

    await models.sequelize.sync({ force: false });
    console.log("Banco de dados sincronizado.");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
  }
})();