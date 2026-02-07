import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/authorizeMiddleware";

const router = Router();
const bookController = new BookController();

// ==================== ROTAS DE LIVROS ====================

// --- 1. ROTAS PÚBLICAS ESTÁTICAS (Devem vir primeiro) ---
router.get("/", bookController.getAll);                          // GET /books
router.get("/search", bookController.search);                    // GET /books/search
router.get("/available", bookController.getAvailable);           // GET /books/available

// --- 2. ROTAS ESPECÍFICAS/ADMIN (Devem vir antes de /:id) ---
// MOVIDO PARA CÁ: Stats é uma palavra fixa, se ficar depois do :id, o express confunde.
router.get("/stats", authenticate, authorize('admin'), bookController.getStats); // GET /books/stats

// --- 3. ROTAS PARAMETRIZADAS (ISBN, Autor, Gênero) ---
router.get("/isbn/:isbn", bookController.getByIsbn);             // GET /books/isbn/:isbn
router.get("/author/:author", bookController.getByAuthor);       // GET /books/author/:author
router.get("/genre/:genre", bookController.getByGenre);          // GET /books/genre/:genre

// --- 4. ROTAS DE ID (Genéricas - Devem ser as últimas dos GETs) ---
router.get("/:id", bookController.getById);                      // GET /books/:id
router.get("/:id/availability", bookController.checkAvailability); // GET /books/:id/availability

// ==================== ROTAS PROTEGIDAS (AÇÕES DE ESCRITA) ====================
router.post("/", authenticate, authorize('admin'), bookController.create);                        // POST /books
router.put("/:id", authenticate, authorize('admin'), bookController.update);                      // PUT /books/:id
router.patch("/:id/available", authenticate, authorize('admin'), bookController.markAvailable);   // PATCH /books/:id/available
router.patch("/:id/unavailable", authenticate, authorize('admin'), bookController.markUnavailable); // PATCH /books/:id/unavailable
router.delete("/:id", authenticate, authorize('admin'), bookController.delete);                   // DELETE /books/:id

export default router;