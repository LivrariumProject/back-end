import { Router } from "express";
import { PurchaseController } from "../controllers/PurchaseController";

const router = Router();
const purchaseController = new PurchaseController();

// ==================== ROTAS DE COMPRAS ====================

// Rotas de busca/listagem
router.get("/", purchaseController.getAll);                                    // GET /purchases - Listar todas
router.get("/search", purchaseController.search);                              // GET /purchases/search?... - Busca com filtros
router.get("/stats", purchaseController.getStats);                             // GET /purchases/stats - Estatísticas
router.get("/user/:userId", purchaseController.getByUser);                     // GET /purchases/user/:userId - Por usuário
router.get("/book/:bookId", purchaseController.getByBook);                     // GET /purchases/book/:bookId - Por livro
router.get("/check/:userId/:bookId", purchaseController.checkUserPurchase);    // GET /purchases/check/:userId/:bookId - Verificar se comprou
router.get("/:id", purchaseController.getById);                                // GET /purchases/:id - Por ID

// Rotas de criação
router.post("/", purchaseController.create);                                   // POST /purchases - Criar compra

// Rotas de atualização de status
router.patch("/:id/confirm", purchaseController.confirmPayment);               // PATCH /purchases/:id/confirm - Confirmar pagamento
router.patch("/:id/fail", purchaseController.failPayment);                     // PATCH /purchases/:id/fail - Marcar como falho
router.patch("/:id/refund", purchaseController.refund);                        // PATCH /purchases/:id/refund - Reembolsar

// Rota de deleção
router.delete("/:id", purchaseController.delete);                              // DELETE /purchases/:id - Deletar

export default router;
