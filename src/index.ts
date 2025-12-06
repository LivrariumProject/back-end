import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";

// Rotas
import bookRoutes from "./routes/bookRoutes";
import userRoutes from "./routes/userRoutes";
import purchaseRoutes from "./routes/purchaseRoutes";
import rentalRoutes from "./routes/rentalRoutes";

// Middlewares
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
app.use(express.json());

// ==================== ROTAS ====================
app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/purchases", purchaseRoutes);
app.use("/rentals", rentalRoutes);

// ==================== MIDDLEWARE DE ERRO ====================
app.use(errorHandler);

// Sincronizar banco e subir servidor
const PORT = process.env.PORT || 3000;

sequelize
  .sync({ force: true }) // CUIDADO: apaga as tabelas toda vez que sobe!
  .then(() => {
    console.log("✅ Banco de dados conectado!");
    app.listen(PORT, () =>
      console.log(`🚀 Servidor rodando na porta ${PORT}`)
    );
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
  });
