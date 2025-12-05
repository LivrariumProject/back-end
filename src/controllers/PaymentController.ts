import { Request, Response, NextFunction } from "express";
import { PaymentService } from "../services/PaymentService";
import { CreatePaymentDTO, PaymentFiltersDTO, ProcessPaymentDTO } from "../dtos/PaymentDTO";
import { PaymentStatus, PaymentMethod, PaymentType } from "../models/Payment";
import { AppError } from "../errors/AppError";

export class PaymentController {
    private paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    // Criar pagamento
    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const createData: CreatePaymentDTO = {
                userId: req.body.userId,
                amount: req.body.amount,
                paymentMethod: req.body.paymentMethod,
                type: req.body.type
            };

            const payment = await this.paymentService.createPayment(createData);

            res.status(201).json({
                success: true,
                message: "Pagamento criado com sucesso",
                data: payment
            });
        } catch (error) {
            next(error);
        }
    };

    // Listar todos os pagamentos
    getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const payments = await this.paymentService.getAllPayments();

            res.status(200).json({
                success: true,
                count: payments.length,
                data: payments
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar pagamento por ID
    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const payment = await this.paymentService.getPaymentById(id);

            res.status(200).json({
                success: true,
                data: payment
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar pagamentos por usuário
    getByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = parseInt(req.params.userId, 10);

            if (isNaN(userId)) {
                throw new AppError("ID do usuário inválido", 400);
            }

            const payments = await this.paymentService.getPaymentsByUserId(userId);

            res.status(200).json({
                success: true,
                count: payments.length,
                data: payments
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar pagamentos por status
    getByStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const status = req.params.status as PaymentStatus;

            if (!["pending", "completed", "failed", "refunded"].includes(status)) {
                throw new AppError("Status inválido", 400);
            }

            const payments = await this.paymentService.getPaymentsByStatus(status);

            res.status(200).json({
                success: true,
                count: payments.length,
                data: payments
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar pagamentos com filtros
    search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const filters: PaymentFiltersDTO = {};

            if (req.query.userId) {
                filters.userId = parseInt(req.query.userId as string, 10);
            }

            if (req.query.status) {
                filters.status = req.query.status as PaymentStatus;
            }

            if (req.query.type) {
                filters.type = req.query.type as PaymentType;
            }

            if (req.query.paymentMethod) {
                filters.paymentMethod = req.query.paymentMethod as PaymentMethod;
            }

            if (req.query.startDate) {
                filters.startDate = new Date(req.query.startDate as string);
            }

            if (req.query.endDate) {
                filters.endDate = new Date(req.query.endDate as string);
            }

            const payments = await this.paymentService.getPaymentsByFilters(filters);

            res.status(200).json({
                success: true,
                count: payments.length,
                filters,
                data: payments
            });
        } catch (error) {
            next(error);
        }
    };

    // Processar pagamento
    process = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const processData: ProcessPaymentDTO = {
                paymentId: id,
                approve: req.body.approve !== false,
                transactionId: req.body.transactionId
            };

            const payment = await this.paymentService.processPayment(processData);

            res.status(200).json({
                success: true,
                message: payment.status === "completed" ? "Pagamento aprovado com sucesso" : "Pagamento recusado",
                data: payment
            });
        } catch (error) {
            next(error);
        }
    };

    // Reembolsar pagamento
    refund = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const payment = await this.paymentService.refundPayment(id);

            res.status(200).json({
                success: true,
                message: "Pagamento reembolsado com sucesso",
                data: payment
            });
        } catch (error) {
            next(error);
        }
    };

    // Obter estatísticas
    getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const stats = await this.paymentService.getPaymentStats();

            res.status(200).json({
                success: true,
                data: stats
            });
        } catch (error) {
            next(error);
        }
    };
}
