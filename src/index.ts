import express, { Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";

// Rotas
import bookRoutes from "./routes/bookRoutes";

// Middlewares
import { errorHandler } from "./middlewares/errorHandler";

// Repositórios (ainda usado para usuários - pode ser migrado depois)
import { UserRepository } from "./repository/UserRepository";

dotenv.config();

const app = express();
app.use(express.json());

const userRepo = new UserRepository();

// ==================== ROTAS DE USUÁRIOS ====================
// (Mantidas aqui temporariamente - podem ser migradas para controllers/services depois)

// Rota para criar usuário
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await userRepo.createUser(name, email, password);
    return res.status(201).json(user);
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao criar o usuário", error: error.message });
  }
});

// Rota para listar usuários
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await userRepo.getAllUsers();
    return res.json(users);
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao obter os usuários", error: error.message });
  }
});

// Rota para buscar usuário por ID
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userRepo.getUserById(Number(id));

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.json(user);
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao buscar o usuário", error: error.message });
  }
});

// Rota para atualizar usuário
app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await userRepo.updateUser(Number(id), {
      name,
      email,
      password
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.json(user);
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao atualizar o usuário", error: error.message });
  }
});

// Rota para deletar usuário
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userRepo.deleteUser(Number(id));

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.json({ message: "Usuário deletado com sucesso", user });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao deletar o usuário", error: error.message });
  }
});

// ==================== ROTAS DE LIVROS (Nova Arquitetura) ====================
app.use("/books", bookRoutes);

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
