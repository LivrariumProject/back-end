import { Request, Response, NextFunction } from "express";
import { RentalService } from "../services/RentalService";
import { CreateRentalDTO, RentalFiltersDTO, RenewRentalDTO } from "../dtos/RentalDTO";
import { AppError } from "../errors/AppError";

export class RentalController {
    private rentalService: RentalService;

    constructor() {
        this.rentalService = new RentalService();
    }

    // Criar aluguel
    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const createData: CreateRentalDTO = {
                userId: req.body.userId,
                bookId: req.body.bookId,
                paymentMethod: req.body.paymentMethod,
                rentalDays: req.body.rentalDays
            };

            const rental = await this.rentalService.createRental(createData);

            res.status(201).json({
                success: true,
                message: "Aluguel realizado com sucesso",
                data: rental
            });
        } catch (error) {
            next(error);
        }
    };

    // Listar todos os aluguéis
    getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const rentals = await this.rentalService.getAllRentals();

            res.status(200).json({
                success: true,
                count: rentals.length,
                data: rentals
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar aluguel por ID
    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const rental = await this.rentalService.getRentalById(id);

            res.status(200).json({
                success: true,
                data: rental
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar aluguéis por usuário
    getByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = parseInt(req.params.userId, 10);

            if (isNaN(userId)) {
                throw new AppError("ID do usuário inválido", 400);
            }

            const rentals = await this.rentalService.getRentalsByUser(userId);

            res.status(200).json({
                success: true,
                count: rentals.length,
                data: rentals
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar aluguéis ativos de um usuário
    getActiveByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = parseInt(req.params.userId, 10);

            if (isNaN(userId)) {
                throw new AppError("ID do usuário inválido", 400);
            }

            const rentals = await this.rentalService.getActiveRentalsByUser(userId);

            res.status(200).json({
                success: true,
                count: rentals.length,
                data: rentals
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar aluguéis por livro
    getByBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bookId = parseInt(req.params.bookId, 10);

            if (isNaN(bookId)) {
                throw new AppError("ID do livro inválido", 400);
            }

            const rentals = await this.rentalService.getRentalsByBook(bookId);

            res.status(200).json({
                success: true,
                count: rentals.length,
                data: rentals
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar aluguéis ativos
    getActive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const rentals = await this.rentalService.getActiveRentals();

            res.status(200).json({
                success: true,
                count: rentals.length,
                data: rentals
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar aluguéis atrasados
    getOverdue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const rentals = await this.rentalService.getOverdueRentals();

            res.status(200).json({
                success: true,
                count: rentals.length,
                data: rentals
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar aluguéis com filtros
    search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const filters: RentalFiltersDTO = {};

            if (req.query.userId) {
                filters.userId = parseInt(req.query.userId as string, 10);
            }

            if (req.query.bookId) {
                filters.bookId = parseInt(req.query.bookId as string, 10);
            }

            if (req.query.paymentStatus) {
                filters.paymentStatus = req.query.paymentStatus as any;
            }

            if (req.query.rentalStatus) {
                filters.rentalStatus = req.query.rentalStatus as any;
            }

            if (req.query.startDate) {
                filters.startDate = new Date(req.query.startDate as string);
            }

            if (req.query.endDate) {
                filters.endDate = new Date(req.query.endDate as string);
            }

            const rentals = await this.rentalService.getRentalsByFilters(filters);

            res.status(200).json({
                success: true,
                count: rentals.length,
                filters: filters,
                data: rentals
            });
        } catch (error) {
            next(error);
        }
    };

    // Devolver livro
    return = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const rental = await this.rentalService.returnRental(id);

            res.status(200).json({
                success: true,
                message: "Livro devolvido com sucesso",
                data: rental
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

            const rental = await this.rentalService.confirmPayment(id);

            res.status(200).json({
                success: true,
                message: "Pagamento confirmado com sucesso",
                data: rental
            });
        } catch (error) {
            next(error);
        }
    };

    // Renovar aluguel
    renew = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const renewData: RenewRentalDTO = {
                rentalId: id,
                additionalDays: req.body.additionalDays,
                paymentMethod: req.body.paymentMethod
            };

            const rental = await this.rentalService.renewRental(renewData);

            res.status(200).json({
                success: true,
                message: "Aluguel renovado com sucesso",
                data: rental
            });
        } catch (error) {
            next(error);
        }
    };

    // Deletar aluguel
    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const rental = await this.rentalService.deleteRental(id);

            res.status(200).json({
                success: true,
                message: "Aluguel deletado com sucesso",
                data: rental
            });
        } catch (error) {
            next(error);
        }
    };

    // Obter estatísticas
    getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const stats = await this.rentalService.getRentalStats();

            res.status(200).json({
                success: true,
                data: stats
            });
        } catch (error) {
            next(error);
        }
    };
}
