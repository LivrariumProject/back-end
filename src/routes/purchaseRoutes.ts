import { Router } from "express";
import { PurchaseController } from "../controllers/PurchaseController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/authorizeMiddleware";

const router = Router();
const purchaseController = new PurchaseController();

// ==================== ROTAS DE COMPRAS ====================

// ==================== ROTAS PÚBLICAS/PRIVADAS ====================
// Apenas admin vê todas as compras
router.get("/", authenticate, authorize('admin'), purchaseController.getAll);                                  // GET /purchases - Listar todas
router.get("/search", authenticate, authorize('admin'), purchaseController.search);                            // GET /purchases/search?... - Busca com filtros
router.get("/stats", authenticate, authorize('admin'), purchaseController.getStats);                          // GET /purchases/stats - Estatísticas

// Usuário vê apenas suas próprias compras (precisa verificar se userId do token = userId da rota)
router.get("/user/:userId", authenticate, purchaseController.getByUser); // + validação no controller         // GET /purchases/user/:userId - Por usuário
router.get("/check/:userId/:bookId", authenticate, purchaseController.checkUserPurchase);                   // GET /purchases/book/:bookId - Por livro

// Admin vê compras por livro/ID
router.get("/book/:bookId", authenticate, authorize('admin'), purchaseController.getByBook);                   // GET /purchases/check/:userId/:bookId - Verificar se comprou
router.get("/:id", authenticate, authorize('admin'), purchaseController.getById);                            // GET /purchases/:id - Por ID

// ==================== ROTAS DE CRIAÇÃO ====================
// Usuário pode criar compra para si mesmo
router.post("/", authenticate, purchaseController.create);                                 // POST /purchases - Criar compra

// ==================== ROTAS ADMIN APENAS ====================
// Apenas admin pode confirmar/falhar/reembolsar/deletar
router.patch("/:id/confirm", authenticate, authorize('admin'), purchaseController.confirmPayment);              // PATCH /purchases/:id/confirm - Confirmar pagamento
router.patch("/:id/fail", authenticate, authorize('admin'), purchaseController.failPayment);                   // PATCH /purchases/:id/fail - Marcar como falho
router.patch("/:id/refund", authenticate, authorize('admin'), purchaseController.refund);                     // PATCH /purchases/:id/refund - Reembolsar
router.delete("/:id", authenticate, authorize('admin'), purchaseController.delete);                          // DELETE /purchases/:id - Deletar

export default router;
