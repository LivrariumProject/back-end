import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import sequelize from "./config/database";
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

// ==================== ROTAS PERSONALIZADAS DO INDEX ====================

// Rota protegida de exemplo
app.get('/protected', authenticate, (req: Request, res: Response) => {
  res.status(200).json({
    message: 'You have access to this protected route',
    user: (req as any).user
  });
});

// Rota de registro manual (caso queira manter aqui além do authRoutes)
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

// ==================== IMPORTAÇÃO DE ROTAS ====================
// Rotas públicas (sem autenticação)
app.use('/auth', authRoutes);

// Rotas protegidas (com autenticação)
// OBS: Se bookRoutes tiver rotas públicas (GET), o authenticate aqui bloqueia tudo.
// O ideal é colocar o authenticate DENTRO do bookRoutes nas rotas específicas de admin.
// Mas manterei conforme seu código original por enquanto:
app.use("/books", bookRoutes); 
app.use("/users", authenticate, userRoutes);
app.use("/purchases", authenticate, purchaseRoutes);
app.use("/rentals", authenticate, rentalRoutes);

// ==================== MIDDLEWARE DE ERRO ====================
app.use(errorHandler);

// ==================== INICIALIZAÇÃO DO SERVIDOR ====================

// AQUI ESTÁ O AJUSTE IMPORTANTE:
// Só inicia o servidor se NÃO estiver rodando testes.
if (process.env.NODE_ENV !== 'test') {
  
  const PORT = process.env.PORT || 3000;

  sequelize
    .sync({ force: true }) // CUIDADO: force: true apaga o banco ao reiniciar (bom para dev, perigoso para prod)
    .then(async () => {
      console.log("✅ Banco de dados conectado!");
      
      // Criar admin padrão se não existir
      const adminEmail = 'admin@livrarium.com';
      try {
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
      } catch (err) {
        console.error("⚠️ Erro ao verificar/criar admin:", err);
      }
      
      app.listen(PORT, () =>
        console.log(`🚀 Servidor rodando na porta ${PORT}`)
      );
    })
    .catch((error) => {
      console.error("❌ Erro ao conectar ao banco de dados:", error);
    });
}

export default app;