import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/authorizeMiddleware";

const router = Router();
const userController = new UserController();

// ==================== ROTAS DE USUÁRIOS ====================

// Rotas de busca/listagem (APENAS ADMIN)
router.get("/", authenticate, authorize('admin'), userController.getAll);                   // GET /users - Listar todos
router.get("/search", authenticate, authorize('admin'), userController.search);            // GET /users/search?name=...&email=... - Busca com filtros
router.get("/stats", authenticate, authorize('admin'), userController.getStats);         // GET /users/stats - Estatísticas
router.get("/email/:email", authenticate, authorize('admin'), userController.getByEmail);     // GET /users/email/:email - Buscar por email
router.get("/name/:name", authenticate, authorize('admin'), userController.getByName);         // GET /users/name/:name - Buscar por nome

// Rotas de usuário autenticado (pode acessar apenas seus próprios dados)
router.get("/:id", authenticate, userController.getById);                // GET /users/:id - Buscar por ID
router.put("/:id", authenticate, userController.update);                   // PUT /users/:id - Atualizar usuário
router.delete("/:id", authenticate, userController.delete);               // DELETE /users/:id - Deletar usuário

// NOTA: Criação de usuário via POST /register (rota pública no index.ts)
// NOTA: Criação de usuário por admin via POST /users (se implementado)

export default router;
