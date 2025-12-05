import { Router } from "express";
import { RentalController } from "../controllers/RentalController";

const router = Router();
const rentalController = new RentalController();

// ==================== ROTAS DE ALUGUÉIS ====================

// Rotas de busca/listagem
router.get("/", rentalController.getAll);                                      // GET /rentals - Listar todos
router.get("/search", rentalController.search);                                // GET /rentals/search?... - Busca com filtros
router.get("/stats", rentalController.getStats);                               // GET /rentals/stats - Estatísticas
router.get("/active", rentalController.getActive);                             // GET /rentals/active - Listar ativos
router.get("/overdue", rentalController.getOverdue);                           // GET /rentals/overdue - Listar atrasados
router.get("/user/:userId", rentalController.getByUser);                       // GET /rentals/user/:userId - Por usuário
router.get("/user/:userId/active", rentalController.getActiveByUser);          // GET /rentals/user/:userId/active - Ativos por usuário
router.get("/book/:bookId", rentalController.getByBook);                       // GET /rentals/book/:bookId - Por livro
router.get("/:id", rentalController.getById);                                  // GET /rentals/:id - Por ID

// Rotas de criação
router.post("/", rentalController.create);                                     // POST /rentals - Criar aluguel

// Rotas de atualização de status
router.patch("/:id/return", rentalController.return);                          // PATCH /rentals/:id/return - Devolver livro
router.patch("/:id/confirm", rentalController.confirmPayment);                 // PATCH /rentals/:id/confirm - Confirmar pagamento
router.patch("/:id/renew", rentalController.renew);                            // PATCH /rentals/:id/renew - Renovar aluguel

// Rota de deleção
router.delete("/:id", rentalController.delete);                                // DELETE /rentals/:id - Deletar

export default router;
