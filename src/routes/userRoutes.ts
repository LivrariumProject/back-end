import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

// ==================== ROTAS DE USUÁRIOS ====================

// Rotas de busca/listagem
router.get("/", userController.getAll);                    // GET /users - Listar todos
router.get("/search", userController.search);              // GET /users/search?name=...&email=... - Busca com filtros
router.get("/stats", userController.getStats);             // GET /users/stats - Estatísticas
router.get("/email/:email", userController.getByEmail);    // GET /users/email/:email - Buscar por email
router.get("/name/:name", userController.getByName);       // GET /users/name/:name - Buscar por nome
router.get("/:id", userController.getById);                // GET /users/:id - Buscar por ID

// Rotas de criação/modificação
router.post("/", userController.create);                   // POST /users - Criar usuário
router.put("/:id", userController.update);                 // PUT /users/:id - Atualizar usuário
router.delete("/:id", userController.delete);              // DELETE /users/:id - Deletar usuário

export default router;
