import { PaymentMethod, PaymentStatus, PaymentType } from "../models/Payment";

// DTO para criação de pagamento
export interface CreatePaymentDTO {
    userId: number;
    amount: number;
    paymentMethod: PaymentMethod;
    type: PaymentType;
}

// DTO para atualização de pagamento
export interface UpdatePaymentDTO {
    status?: PaymentStatus;
    transactionId?: string;
    paymentDate?: Date;
}

// DTO para resposta de pagamento
export interface PaymentResponseDTO {
    id: number;
    userId: number;
    amount: number;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
    type: PaymentType;
    transactionId?: string;
    paymentDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

// DTO para resposta com dados do usuário
export interface PaymentWithUserDTO extends PaymentResponseDTO {
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

// DTO para filtros de busca
export interface PaymentFiltersDTO {
    userId?: number;
    status?: PaymentStatus;
    type?: PaymentType;
    paymentMethod?: PaymentMethod;
    startDate?: Date;
    endDate?: Date;
}

// DTO para processar pagamento (simula gateway)
export interface ProcessPaymentDTO {
    paymentId: number;
    approve: boolean;
    transactionId?: string;
}
