import { Request, Response, NextFunction } from "express";
import { PurchaseService } from "../services/PurchaseService";
import { CreatePurchaseDTO, PurchaseFiltersDTO } from "../dtos/PurchaseDTO";
import { AppError } from "../errors/AppError";

export class PurchaseController {
    private purchaseService: PurchaseService;

    constructor() {
        this.purchaseService = new PurchaseService();
    }

    // Criar compra
    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const createData: CreatePurchaseDTO = {
                userId: req.body.userId,
                bookId: req.body.bookId,
                paymentMethod: req.body.paymentMethod
            };

            const purchase = await this.purchaseService.createPurchase(createData);

            res.status(201).json({
                success: true,
                message: "Compra realizada com sucesso",
                data: purchase
            });
        } catch (error) {
            next(error);
        }
    };

    // Listar todas as compras
    getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const purchases = await this.purchaseService.getAllPurchases();

            res.status(200).json({
                success: true,
                count: purchases.length,
                data: purchases
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar compra por ID
    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const purchase = await this.purchaseService.getPurchaseById(id);

            res.status(200).json({
                success: true,
                data: purchase
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar compras por usuário
    getByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = parseInt(req.params.userId, 10);

            if (isNaN(userId)) {
                throw new AppError("ID do usuário inválido", 400);
            }

            const purchases = await this.purchaseService.getPurchasesByUser(userId);

            res.status(200).json({
                success: true,
                count: purchases.length,
                data: purchases
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar compras por livro
    getByBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bookId = parseInt(req.params.bookId, 10);

            if (isNaN(bookId)) {
                throw new AppError("ID do livro inválido", 400);
            }

            const purchases = await this.purchaseService.getPurchasesByBook(bookId);

            res.status(200).json({
                success: true,
                count: purchases.length,
                data: purchases
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar compras com filtros
    search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const filters: PurchaseFiltersDTO = {};

            if (req.query.userId) {
                filters.userId = parseInt(req.query.userId as string, 10);
            }

            if (req.query.bookId) {
                filters.bookId = parseInt(req.query.bookId as string, 10);
            }

            if (req.query.paymentStatus) {
                filters.paymentStatus = req.query.paymentStatus as any;
            }

            if (req.query.paymentMethod) {
                filters.paymentMethod = req.query.paymentMethod as any;
            }

            if (req.query.startDate) {
                filters.startDate = new Date(req.query.startDate as string);
            }

            if (req.query.endDate) {
                filters.endDate = new Date(req.query.endDate as string);
            }

            const purchases = await this.purchaseService.getPurchasesByFilters(filters);

            res.status(200).json({
                success: true,
                count: purchases.length,
                filters: filters,
                data: purchases
            });
        } catch (error) {
            next(error);
        }
    };

    // Confirmar pagamento
    confirmPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const purchase = await this.purchaseService.confirmPayment(id);

            res.status(200).json({
                success: true,
                message: "Pagamento confirmado com sucesso",
                data: purchase
            });
        } catch (error) {
            next(error);
        }
    };

    // Marcar pagamento como falho
    failPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const purchase = await this.purchaseService.failPayment(id);

            res.status(200).json({
                success: true,
                message: "Pagamento marcado como falho",
                data: purchase
            });
        } catch (error) {
            next(error);
        }
    };

    // Reembolsar compra
    refund = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const purchase = await this.purchaseService.refundPurchase(id);

            res.status(200).json({
                success: true,
                message: "Compra reembolsada com sucesso",
                data: purchase
            });
        } catch (error) {
            next(error);
        }
    };

    // Verificar se usuário já comprou um livro
    checkUserPurchase = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = parseInt(req.params.userId, 10);
            const bookId = parseInt(req.params.bookId, 10);

            if (isNaN(userId) || isNaN(bookId)) {
                throw new AppError("IDs inválidos", 400);
            }

            const hasPurchased = await this.purchaseService.userHasPurchased(userId, bookId);

            res.status(200).json({
                success: true,
                data: {
                    userId,
                    bookId,
                    hasPurchased
                }
            });
        } catch (error) {
            next(error);
        }
    };

    // Deletar compra
    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const purchase = await this.purchaseService.deletePurchase(id);

            res.status(200).json({
                success: true,
                message: "Compra deletada com sucesso",
                data: purchase
            });
        } catch (error) {
            next(error);
        }
    };

    // Obter estatísticas
    getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const stats = await this.purchaseService.getPurchaseStats();

            res.status(200).json({
                success: true,
                data: stats
            });
        } catch (error) {
            next(error);
        }
    };
}
