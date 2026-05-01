import express from "express";
import cors from "cors";
import produtoRoutes from "./routes/produtoRoutes.js";

import reservaItensRoutes from "./routes/reservaItensRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(produtoRoutes);

// ROTAS
app.use("/api/reservaItens", reservaItensRoutes);
app.use("/api/produtos", produtoRoutes);

app.use((err, req, res, next) => {
  console.error("ERRO:", err);

  return res.status(500).json({
    message: "Erro interno do servidor",
    error: err.message
  });
});

export default app;