import { Op } from "sequelize";
import { Purchase, PaymentStatus, PaymentMethod } from "../models/Purchase";
import { User } from "../models/User";
import { Book } from "../models/Book";
import { PurchaseFiltersDTO } from "../dtos/PurchaseDTO";

export class PurchaseRepository {
    // Criar uma nova compra
    async create(data: {
        userId: number;
        bookId: number;
        price: number;
        paymentMethod: PaymentMethod;
    }): Promise<Purchase> {
        return await Purchase.create(data);
    }

    // Listar todas as compras
    async findAll(): Promise<Purchase[]> {
        return await Purchase.findAll({
            include: [
                { model: User, as: "user", attributes: ["id", "name", "email"] },
                { model: Book, as: "book", attributes: ["id", "title", "author", "isbn"] }
            ],
            order: [["purchaseDate", "DESC"]]
        });
    }

    // Buscar compra por ID
    async findById(id: number): Promise<Purchase | null> {
        return await Purchase.findByPk(id, {
            include: [
                { model: User, as: "user", attributes: ["id", "name", "email"] },
                { model: Book, as: "book", attributes: ["id", "title", "author", "isbn", "price"] }
            ]
        });
    }

    // Buscar compras por usuário
    async findByUserId(userId: number): Promise<Purchase[]> {
        return await Purchase.findAll({
            where: { userId },
            include: [
                { model: Book, as: "book", attributes: ["id", "title", "author", "isbn", "price"] }
            ],
            order: [["purchaseDate", "DESC"]]
        });
    }

    // Buscar compras por livro
    async findByBookId(bookId: number): Promise<Purchase[]> {
        return await Purchase.findAll({
            where: { bookId },
            include: [
                { model: User, as: "user", attributes: ["id", "name", "email"] }
            ],
            order: [["purchaseDate", "DESC"]]
        });
    }

    // Buscar compras por status de pagamento
    async findByPaymentStatus(status: PaymentStatus): Promise<Purchase[]> {
        return await Purchase.findAll({
            where: { paymentStatus: status },
            include: [
                { model: User, as: "user", attributes: ["id", "name", "email"] },
                { model: Book, as: "book", attributes: ["id", "title", "author"] }
            ],
            order: [["purchaseDate", "DESC"]]
        });
    }

    // Buscar compras com filtros
    async findWithFilters(filters: PurchaseFiltersDTO): Promise<Purchase[]> {
        const whereClause: any = {};

        if (filters.userId) {
            whereClause.userId = filters.userId;
        }

        if (filters.bookId) {
            whereClause.bookId = filters.bookId;
        }

        if (filters.paymentStatus) {
            whereClause.paymentStatus = filters.paymentStatus;
        }

        if (filters.paymentMethod) {
            whereClause.paymentMethod = filters.paymentMethod;
        }

        if (filters.startDate || filters.endDate) {
            whereClause.purchaseDate = {};
            if (filters.startDate) {
                whereClause.purchaseDate[Op.gte] = filters.startDate;
            }
            if (filters.endDate) {
                whereClause.purchaseDate[Op.lte] = filters.endDate;
            }
        }

        return await Purchase.findAll({
            where: whereClause,
            include: [
                { model: User, as: "user", attributes: ["id", "name", "email"] },
                { model: Book, as: "book", attributes: ["id", "title", "author"] }
            ],
            order: [["purchaseDate", "DESC"]]
        });
    }

    // Atualizar status do pagamento
    async updatePaymentStatus(id: number, status: PaymentStatus): Promise<Purchase | null> {
        const purchase = await Purchase.findByPk(id);

        if (!purchase) {
            return null;
        }

        await purchase.update({ paymentStatus: status });
        return purchase;
    }

    // Deletar compra
    async delete(id: number): Promise<Purchase | null> {
        const purchase = await Purchase.findByPk(id);

        if (!purchase) {
            return null;
        }

        await purchase.destroy();
        return purchase;
    }

    // Contar total de compras
    async count(): Promise<number> {
        return await Purchase.count();
    }

    // Contar compras por status
    async countByStatus(status: PaymentStatus): Promise<number> {
        return await Purchase.count({ where: { paymentStatus: status } });
    }

    // Calcular receita total (compras completadas)
    async calculateTotalRevenue(): Promise<number> {
        const result = await Purchase.sum("price", {
            where: { paymentStatus: "completed" }
        });
        return result || 0;
    }

    // Verificar se usuário já comprou um livro específico
    async userHasPurchasedBook(userId: number, bookId: number): Promise<boolean> {
        const purchase = await Purchase.findOne({
            where: {
                userId,
                bookId,
                paymentStatus: "completed"
            }
        });
        return purchase !== null;
    }
}
