//import express from "express";
import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import sequelize from "./config/database";
import { UserRepository } from './repository/UserRepository';
import { hashPassword } from "./utils/auth";
import { User } from './models/User';

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

// Rota de registro (aceita role)
app.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword,
      role: 'user' // Valor padrão
    });
    
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao criar usuário", error: error.message });
  }
});

// ==================== ROTAS ====================
// Rotas públicas (sem autenticação)
app.use('/auth', authRoutes);

// Rotas protegidas (com autenticação)
app.use("/books", authenticate, bookRoutes);
app.use("/users", authenticate, userRoutes);
app.use("/purchases", authenticate, purchaseRoutes);
app.use("/rentals", authenticate, rentalRoutes);

// ==================== MIDDLEWARE DE ERRO ====================
app.use(errorHandler);

// Sincronizar banco e subir servidor
const PORT = process.env.PORT || 3000;

sequelize
  .sync({ force: true })
  .then(async () => {
    console.log("✅ Banco de dados conectado!");
    
    // Criar admin padrão se não existir
    const adminEmail = 'admin@livrarium.com';
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    
    if (!existingAdmin) {
      const hashedPassword = await hashPassword('admin123');
      await User.create({
        name: 'Administrador',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('👑 Usuário admin criado: admin@livrarium.com / admin123');
    }
    
    app.listen(PORT, () =>
      console.log(`🚀 Servidor rodando na porta ${PORT}`)
    );
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
  });
  