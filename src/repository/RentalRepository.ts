import { Op } from "sequelize";
import { Rental, PaymentStatus, RentalStatus, PaymentMethod } from "../models/Rental";
import { User } from "../models/User";
import { Book } from "../models/Book";
import { RentalFiltersDTO } from "../dtos/RentalDTO";

export class RentalRepository {
    // Criar um novo aluguel
    async create(data: {
        userId: number;
        bookId: number;
        rentalPrice: number;
        paymentMethod: PaymentMethod;
        dueDate: Date;
    }): Promise<Rental> {
        return await Rental.create(data);
    }

    // Listar todos os aluguéis
    async findAll(): Promise<Rental[]> {
        return await Rental.findAll({
            include: [
                { model: User, as: "user", attributes: ["id", "name", "email"] },
                { model: Book, as: "book", attributes: ["id", "title", "author", "isbn"] }
            ],
            order: [["rentalDate", "DESC"]]
        });
    }

    // Buscar aluguel por ID
    async findById(id: number): Promise<Rental | null> {
        return await Rental.findByPk(id, {
            include: [
                { model: User, as: "user", attributes: ["id", "name", "email"] },
                { model: Book, as: "book", attributes: ["id", "title", "author", "isbn", "rentalPrice"] }
            ]
        });
    }

    // Buscar aluguéis por usuário
    async findByUserId(userId: number): Promise<Rental[]> {
        return await Rental.findAll({
            where: { userId },
            include: [
                { model: Book, as: "book", attributes: ["id", "title", "author", "isbn", "rentalPrice"] }
            ],
            order: [["rentalDate", "DESC"]]
        });
    }

    // Buscar aluguéis por livro
    async findByBookId(bookId: number): Promise<Rental[]> {
        return await Rental.findAll({
            where: { bookId },
            include: [
                { model: User, as: "user", attributes: ["id", "name", "email"] }
            ],
            order: [["rentalDate", "DESC"]]
        });
    }

    // Buscar aluguéis ativos
    async findActive(): Promise<Rental[]> {
        return await Rental.findAll({
            where: { rentalStatus: "active" },
            include: [
                { model: User, as: "user", attributes: ["id", "name", "email"] },
                { model: Book, as: "book", attributes: ["id", "title", "author"] }
            ],
            order: [["dueDate", "ASC"]]
        });
    }

    // Buscar aluguéis atrasados
    async findOverdue(): Promise<Rental[]> {
        return await Rental.findAll({
            where: {
                rentalStatus: "active",
                dueDate: { [Op.lt]: new Date() }
            },
            include: [
                { model: User, as: "user", attributes: ["id", "name", "email"] },
                { model: Book, as: "book", attributes: ["id", "title", "author"] }
            ],
            order: [["dueDate", "ASC"]]
        });
    }

    // Buscar aluguéis por status
    async findByRentalStatus(status: RentalStatus): Promise<Rental[]> {
        return await Rental.findAll({
            where: { rentalStatus: status },
            include: [
                { model: User, as: "user", attributes: ["id", "name", "email"] },
                { model: Book, as: "book", attributes: ["id", "title", "author"] }
            ],
            order: [["rentalDate", "DESC"]]
        });
    }

    // Buscar aluguéis com filtros
    async findWithFilters(filters: RentalFiltersDTO): Promise<Rental[]> {
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

        if (filters.rentalStatus) {
            whereClause.rentalStatus = filters.rentalStatus;
        }

        if (filters.startDate || filters.endDate) {
            whereClause.rentalDate = {};
            if (filters.startDate) {
                whereClause.rentalDate[Op.gte] = filters.startDate;
            }
            if (filters.endDate) {
                whereClause.rentalDate[Op.lte] = filters.endDate;
            }
        }

        return await Rental.findAll({
            where: whereClause,
            include: [
                { model: User, as: "user", attributes: ["id", "name", "email"] },
                { model: Book, as: "book", attributes: ["id", "title", "author"] }
            ],
            order: [["rentalDate", "DESC"]]
        });
    }

    // Atualizar aluguel
    async update(id: number, data: {
        paymentStatus?: PaymentStatus;
        rentalStatus?: RentalStatus;
        dueDate?: Date;
        returnDate?: Date;
    }): Promise<Rental | null> {
        const rental = await Rental.findByPk(id);

        if (!rental) {
            return null;
        }

        await rental.update(data);
        return rental;
    }

    // Marcar como devolvido
    async markAsReturned(id: number): Promise<Rental | null> {
        const rental = await Rental.findByPk(id);

        if (!rental) {
            return null;
        }

        await rental.update({
            rentalStatus: "returned",
            returnDate: new Date()
        });

        return rental;
    }

    // Marcar como atrasado
    async markAsOverdue(id: number): Promise<Rental | null> {
        const rental = await Rental.findByPk(id);

        if (!rental) {
            return null;
        }

        await rental.update({ rentalStatus: "overdue" });
        return rental;
    }

    // Estender data de devolução
    async extendDueDate(id: number, newDueDate: Date): Promise<Rental | null> {
        const rental = await Rental.findByPk(id);

        if (!rental) {
            return null;
        }

        await rental.update({ dueDate: newDueDate });
        return rental;
    }

    // Deletar aluguel
    async delete(id: number): Promise<Rental | null> {
        const rental = await Rental.findByPk(id);

        if (!rental) {
            return null;
        }

        await rental.destroy();
        return rental;
    }

    // Contar total de aluguéis
    async count(): Promise<number> {
        return await Rental.count();
    }

    // Contar por status do aluguel
    async countByRentalStatus(status: RentalStatus): Promise<number> {
        return await Rental.count({ where: { rentalStatus: status } });
    }

    // Contar por status de pagamento
    async countByPaymentStatus(status: PaymentStatus): Promise<number> {
        return await Rental.count({ where: { paymentStatus: status } });
    }

    // Calcular receita total (pagamentos completados)
    async calculateTotalRevenue(): Promise<number> {
        const result = await Rental.sum("rentalPrice", {
            where: { paymentStatus: "completed" }
        });
        return result || 0;
    }

    // Verificar se usuário tem aluguel ativo de um livro
    async userHasActiveRental(userId: number, bookId: number): Promise<boolean> {
        const rental = await Rental.findOne({
            where: {
                userId,
                bookId,
                rentalStatus: "active"
            }
        });
        return rental !== null;
    }

    // Buscar aluguéis ativos de um usuário
    async findActiveByUserId(userId: number): Promise<Rental[]> {
        return await Rental.findAll({
            where: {
                userId,
                rentalStatus: "active"
            },
            include: [
                { model: Book, as: "book", attributes: ["id", "title", "author", "isbn"] }
            ],
            order: [["dueDate", "ASC"]]
        });
    }
}
