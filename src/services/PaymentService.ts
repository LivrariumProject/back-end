import { PaymentRepository } from "../repository/PaymentRepository";
import { UserRepository } from "../repository/UserRepository";
import {
    CreatePaymentDTO,
    UpdatePaymentDTO,
    PaymentFiltersDTO,
    PaymentResponseDTO,
    PaymentWithUserDTO,
    ProcessPaymentDTO
} from "../dtos/PaymentDTO";
import { Payment, PaymentStatus } from "../models/Payment";
import {
    PaymentNotFoundError,
    PaymentAlreadyProcessedError,
    PaymentFailedError,
    InvalidPaymentDataError,
    UserNotFoundError
} from "../errors/AppError";

export class PaymentService {
    private paymentRepository: PaymentRepository;
    private userRepository: UserRepository;

    constructor() {
        this.paymentRepository = new PaymentRepository();
        this.userRepository = new UserRepository();
    }

    // Converter modelo para DTO de resposta
    private toResponseDTO(payment: Payment): PaymentResponseDTO {
        return {
            id: payment.id,
            userId: payment.userId,
            amount: Number(payment.amount),
            paymentMethod: payment.paymentMethod,
            status: payment.status,
            type: payment.type,
            transactionId: payment.transactionId,
            paymentDate: payment.paymentDate,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt
        };
    }

    // Converter modelo para DTO com usuário
    private toFullResponseDTO(payment: Payment): PaymentWithUserDTO {
        const response = this.toResponseDTO(payment) as PaymentWithUserDTO;

        if ((payment as any).user) {
            response.user = {
                id: (payment as any).user.id,
                name: (payment as any).user.name,
                email: (payment as any).user.email
            };
        }

        return response;
    }

    // Validar dados de criação
    private validateCreateData(data: CreatePaymentDTO): void {
        if (!data.userId) {
            throw new InvalidPaymentDataError("O ID do usuário é obrigatório");
        }

        if (data.amount === undefined || data.amount <= 0) {
            throw new InvalidPaymentDataError("O valor deve ser maior que zero");
        }

        if (!data.paymentMethod) {
            throw new InvalidPaymentDataError("O método de pagamento é obrigatório");
        }

        if (!data.type) {
            throw new InvalidPaymentDataError("O tipo de pagamento é obrigatório");
        }
    }

    // Criar novo pagamento
    async createPayment(data: CreatePaymentDTO): Promise<PaymentResponseDTO> {
        // Validar dados
        this.validateCreateData(data);

        // Verificar se usuário existe
        const user = await this.userRepository.findById(data.userId);
        if (!user) {
            throw new UserNotFoundError(data.userId);
        }

        const payment = await this.paymentRepository.create(data);
        return this.toResponseDTO(payment);
    }

    // Listar todos os pagamentos
    async getAllPayments(): Promise<PaymentWithUserDTO[]> {
        const payments = await this.paymentRepository.findAll();
        return payments.map(payment => this.toFullResponseDTO(payment));
    }

    // Buscar pagamento por ID
    async getPaymentById(id: number): Promise<PaymentWithUserDTO> {
        const payment = await this.paymentRepository.findById(id);

        if (!payment) {
            throw new PaymentNotFoundError(id);
        }

        return this.toFullResponseDTO(payment);
    }

    // Buscar pagamentos por usuário
    async getPaymentsByUserId(userId: number): Promise<PaymentResponseDTO[]> {
        // Verificar se usuário existe
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new UserNotFoundError(userId);
        }

        const payments = await this.paymentRepository.findByUserId(userId);
        return payments.map(payment => this.toResponseDTO(payment));
    }

    // Buscar pagamentos por status
    async getPaymentsByStatus(status: PaymentStatus): Promise<PaymentWithUserDTO[]> {
        const payments = await this.paymentRepository.findByStatus(status);
        return payments.map(payment => this.toFullResponseDTO(payment));
    }

    // Buscar pagamentos com filtros
    async getPaymentsByFilters(filters: PaymentFiltersDTO): Promise<PaymentWithUserDTO[]> {
        const payments = await this.paymentRepository.findWithFilters(filters);
        return payments.map(payment => this.toFullResponseDTO(payment));
    }

    // Processar pagamento (simula gateway de pagamento)
    async processPayment(data: ProcessPaymentDTO): Promise<PaymentResponseDTO> {
        const payment = await this.paymentRepository.findById(data.paymentId);

        if (!payment) {
            throw new PaymentNotFoundError(data.paymentId);
        }

        if (payment.status !== "pending") {
            throw new PaymentAlreadyProcessedError(data.paymentId);
        }

        // Simula processamento do gateway
        const status: PaymentStatus = data.approve ? "completed" : "failed";
        const transactionId = data.transactionId || `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const updatedPayment = await this.paymentRepository.processPayment(
            data.paymentId,
            status,
            data.approve ? transactionId : undefined
        );

        if (!updatedPayment) {
            throw new PaymentFailedError();
        }

        return this.toResponseDTO(updatedPayment);
    }

    // Reembolsar pagamento
    async refundPayment(id: number): Promise<PaymentResponseDTO> {
        const payment = await this.paymentRepository.findById(id);

        if (!payment) {
            throw new PaymentNotFoundError(id);
        }

        if (payment.status !== "completed") {
            throw new InvalidPaymentDataError("Apenas pagamentos completados podem ser reembolsados");
        }

        const updatedPayment = await this.paymentRepository.update(id, { status: "refunded" });

        if (!updatedPayment) {
            throw new PaymentFailedError("Falha ao processar o reembolso");
        }

        return this.toResponseDTO(updatedPayment);
    }

    // Obter estatísticas de pagamentos
    async getPaymentStats(): Promise<{
        total: number;
        pending: number;
        completed: number;
        failed: number;
        refunded: number;
        totalAmount: number;
    }> {
        const [total, pending, completed, failed, refunded, totalAmount] = await Promise.all([
            this.paymentRepository.count(),
            this.paymentRepository.countByStatus("pending"),
            this.paymentRepository.countByStatus("completed"),
            this.paymentRepository.countByStatus("failed"),
            this.paymentRepository.countByStatus("refunded"),
            this.paymentRepository.sumAmountByStatus("completed")
        ]);

        return {
            total,
            pending,
            completed,
            failed,
            refunded,
            totalAmount
        };
    }
}
