//import express from "express";
import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import sequelize from "./config/database";
import { UserRepository } from './repository/UserRepository';
import { hashPassword } from "./utils/auth";

// Rotas
import bookRoutes from "./routes/bookRoutes";
import userRoutes from "./routes/userRoutes";
import purchaseRoutes from "./routes/purchaseRoutes";
import rentalRoutes from "./routes/rentalRoutes";
import authRoutes from './routes/authRoutes';

// Middlewares
import { errorHandler } from "./middlewares/errorHandler";
import { authenticate } from './middlewares/authMiddleware';

dotenv.config();

const app = express();
app.use(express.json());

// Rota protegida de exemplo
app.get('/protected', authenticate, (req: Request, res: Response) => {
  res.status(200).json({ 
    message: 'You have access to this protected route',
    user: (req as any).user 
  });
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userRepo = new UserRepository();

    // Criptografa a senha
    const hashedPassword = await hashPassword(password);
    
    const user = await userRepo.create({ 
      name, 
      email, 
      password:hashedPassword   
    });
    
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: "Erro ao criar usuário" });
  }
});

// ==================== ROTAS ====================
// Rotas públicas (sem autenticação)
app.use('/auth', authRoutes);

// Rotas protegidas (com autenticação)
app.use("/books", authenticate, bookRoutes);
//app.use("/users", authenticate, userRoutes);
app.use("/purchases", authenticate, purchaseRoutes);
app.use("/rentals", authenticate, rentalRoutes);

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
