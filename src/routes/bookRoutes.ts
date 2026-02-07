import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/authorizeMiddleware";

const router = Router();
const bookController = new BookController();

// ==================== ROTAS DE LIVROS ====================

// ==================== ROTAS PÚBLICAS ====================
// Qualquer pessoa pode acessar (sem autenticação)
router.get("/", bookController.getAll);                          // GET /books - Listar todos
router.get("/search", bookController.search);                    // GET /books/search?genre=...&author=... - Busca com filtros
router.get("/available", bookController.getAvailable);           // GET /books/available - Listar disponíveis
router.get("/isbn/:isbn", bookController.getByIsbn);             // GET /books/isbn/:isbn - Buscar por ISBN
router.get("/author/:author", bookController.getByAuthor);       // GET /books/author/:author - Buscar por autor
router.get("/genre/:genre", bookController.getByGenre);          // GET /books/genre/:genre - Buscar por gênero
router.get("/:id", bookController.getById);                      // GET /books/:id - Buscar por ID
router.get("/:id/availability", bookController.checkAvailability); // GET /books/:id/availability - Verificar disponibilidade

// ==================== ROTAS PROTEGIDAS (ADMIN APENAS) ====================
// Apenas admin pode criar, atualizar, deletar
router.post("/", authenticate, authorize('admin'), bookController.create);                        // POST /books - Criar livro
router.put("/:id", authenticate, authorize('admin'), bookController.update);                      // PUT /books/:id - Atualizar livro
router.patch("/:id/available", authenticate, authorize('admin'), bookController.markAvailable);   // PATCH /books/:id/available - Marcar como disponível
router.patch("/:id/unavailable", authenticate, authorize('admin'), bookController.markUnavailable); // PATCH /books/:id/unavailable - Marcar como indisponível
router.delete("/:id", authenticate, authorize('admin'), bookController.delete);                   // DELETE /books/:id - Deletar livro
router.get("/stats", authenticate, authorize('admin'), bookController.getStats);                 // GET /books/stats - Estatísticas

export default router;
