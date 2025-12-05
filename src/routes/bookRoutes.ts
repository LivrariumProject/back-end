import { Router } from "express";
import { BookController } from "../controllers/BookController";

const router = Router();
const bookController = new BookController();

// ==================== ROTAS DE LIVROS ====================

// Rotas de busca/listagem
router.get("/", bookController.getAll);                          // GET /books - Listar todos
router.get("/search", bookController.search);                    // GET /books/search?genre=...&author=... - Busca com filtros
router.get("/available", bookController.getAvailable);           // GET /books/available - Listar disponíveis
router.get("/stats", bookController.getStats);                   // GET /books/stats - Estatísticas
router.get("/isbn/:isbn", bookController.getByIsbn);             // GET /books/isbn/:isbn - Buscar por ISBN
router.get("/author/:author", bookController.getByAuthor);       // GET /books/author/:author - Buscar por autor
router.get("/genre/:genre", bookController.getByGenre);          // GET /books/genre/:genre - Buscar por gênero
router.get("/:id", bookController.getById);                      // GET /books/:id - Buscar por ID
router.get("/:id/availability", bookController.checkAvailability); // GET /books/:id/availability - Verificar disponibilidade

// Rotas de criação/modificação
router.post("/", bookController.create);                         // POST /books - Criar livro
router.put("/:id", bookController.update);                       // PUT /books/:id - Atualizar livro
router.patch("/:id/available", bookController.markAvailable);    // PATCH /books/:id/available - Marcar como disponível
router.patch("/:id/unavailable", bookController.markUnavailable); // PATCH /books/:id/unavailable - Marcar como indisponível
router.delete("/:id", bookController.delete);                    // DELETE /books/:id - Deletar livro

export default router;
