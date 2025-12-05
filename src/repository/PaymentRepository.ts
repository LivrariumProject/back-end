import { Op } from "sequelize";
import { Payment, PaymentStatus } from "../models/Payment";
import { User } from "../models/User";
import { CreatePaymentDTO, UpdatePaymentDTO, PaymentFiltersDTO } from "../dtos/PaymentDTO";

export class PaymentRepository {
    // Criar um novo pagamento
    async create(data: CreatePaymentDTO): Promise<Payment> {
        return await Payment.create(data);
    }

    // Listar todos os pagamentos
    async findAll(): Promise<Payment[]> {
        return await Payment.findAll({
            include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
            order: [["createdAt", "DESC"]]
        });
    }

    // Buscar pagamento por ID
    async findById(id: number): Promise<Payment | null> {
        return await Payment.findByPk(id, {
            include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }]
        });
    }

    // Buscar pagamentos por usuário
    async findByUserId(userId: number): Promise<Payment[]> {
        return await Payment.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]]
        });
    }

    // Buscar pagamentos por status
    async findByStatus(status: PaymentStatus): Promise<Payment[]> {
        return await Payment.findAll({
            where: { status },
            include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
            order: [["createdAt", "DESC"]]
        });
    }

    // Buscar pagamentos com filtros
    async findWithFilters(filters: PaymentFiltersDTO): Promise<Payment[]> {
        const whereClause: any = {};

        if (filters.userId) {
            whereClause.userId = filters.userId;
        }

        if (filters.status) {
            whereClause.status = filters.status;
        }

        if (filters.type) {
            whereClause.type = filters.type;
        }

        if (filters.paymentMethod) {
            whereClause.paymentMethod = filters.paymentMethod;
        }

        if (filters.startDate || filters.endDate) {
            whereClause.createdAt = {};
            if (filters.startDate) {
                whereClause.createdAt[Op.gte] = filters.startDate;
            }
            if (filters.endDate) {
                whereClause.createdAt[Op.lte] = filters.endDate;
            }
        }

        return await Payment.findAll({
            where: whereClause,
            include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
            order: [["createdAt", "DESC"]]
        });
    }

    // Atualizar pagamento
    async update(id: number, data: UpdatePaymentDTO): Promise<Payment | null> {
        const payment = await Payment.findByPk(id);

        if (!payment) {
            return null;
        }

        await payment.update(data);
        return payment;
    }

    // Processar pagamento (atualizar status e data)
    async processPayment(id: number, status: PaymentStatus, transactionId?: string): Promise<Payment | null> {
        const payment = await Payment.findByPk(id);

        if (!payment) {
            return null;
        }

        const updateData: any = { status };

        if (status === "completed") {
            updateData.paymentDate = new Date();
        }

        if (transactionId) {
            updateData.transactionId = transactionId;
        }

        await payment.update(updateData);
        return payment;
    }

    // Contar pagamentos por status
    async countByStatus(status: PaymentStatus): Promise<number> {
        return await Payment.count({ where: { status } });
    }

    // Somar valor total por status
    async sumAmountByStatus(status: PaymentStatus): Promise<number> {
        const result = await Payment.sum("amount", { where: { status } });
        return result || 0;
    }

    // Contar total de pagamentos
    async count(): Promise<number> {
        return await Payment.count();
    }
}
