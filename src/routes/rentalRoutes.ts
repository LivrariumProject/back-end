import { Router } from "express";
import { RentalController } from "../controllers/RentalController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/authorizeMiddleware";

const router = Router();
const rentalController = new RentalController();

// ==================== ROTAS DE ALUGUÉIS ====================

// ==================== ROTAS ADMIN APENAS ====================
router.get("/", authenticate, authorize('admin'), rentalController.getAll);                                    // GET /rentals - Listar todos
router.get("/search", authenticate, authorize('admin'), rentalController.search);                            // GET /rentals/search?... - Busca com filtros
router.get("/stats", authenticate, authorize('admin'), rentalController.getStats);                           // GET /rentals/stats - Estatísticas
router.get("/active", authenticate, authorize('admin'), rentalController.getActive);                           // GET /rentals/active - Listar ativos
router.get("/overdue", authenticate, authorize('admin'), rentalController.getOverdue);                        // GET /rentals/overdue - Listar atrasados
router.get("/book/:bookId", authenticate, authorize('admin'), rentalController.getByBook);                    // GET /rentals/book/:bookId - Por livro
router.get("/:id", authenticate, authorize('admin'), rentalController.getById);                                // GET /rentals/:id - Por ID
router.patch("/:id/return", authenticate, authorize('admin'), rentalController.return);                        // PATCH /rentals/:id/return - Devolver livro
router.patch("/:id/confirm", authenticate, authorize('admin'), rentalController.confirmPayment);                // PATCH /rentals/:id/confirm - Confirmar pagamento
router.patch("/:id/renew", authenticate, authorize('admin'), rentalController.renew);                          // PATCH /rentals/:id/renew - Renovar aluguel
router.delete("/:id", authenticate, authorize('admin'), rentalController.delete);                            // DELETE /rentals/:id - Deletar

// ==================== ROTAS USUÁRIO AUTENTICADO ====================
router.get("/user/:userId", authenticate, rentalController.getByUser);                       // GET /rentals/user/:userId - Por usuário
router.get("/user/:userId/active", authenticate, rentalController.getActiveByUser);        // GET /rentals/user/:userId/active - Ativos por usuário
router.post("/", authenticate, rentalController.create);                                   // POST /rentals - Criar aluguel

export default router;
