import { PaymentMethod, PaymentStatus } from "../models/Purchase";
import { BookResponseDTO } from "./BookDTO";
import { UserResponseDTO } from "./UserDTO";

// DTO para criação de compra
export interface CreatePurchaseDTO {
    userId: number;
    bookId: number;
    paymentMethod: PaymentMethod;
}

// DTO para atualização de compra (principalmente status de pagamento)
export interface UpdatePurchaseDTO {
    paymentStatus?: PaymentStatus;
}

// DTO para resposta de compra
export interface PurchaseResponseDTO {
    id: number;
    userId: number;
    bookId: number;
    price: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    purchaseDate: Date;
    user?: UserResponseDTO;
    book?: BookResponseDTO;
}

// DTO para filtros de busca
export interface PurchaseFiltersDTO {
    userId?: number;
    bookId?: number;
    paymentStatus?: PaymentStatus;
    paymentMethod?: PaymentMethod;
    startDate?: Date;
    endDate?: Date;
}

// DTO para estatísticas de compras
export interface PurchaseStatsDTO {
    total: number;
    pending: number;
    completed: number;
    failed: number;
    refunded: number;
    totalRevenue: number;
}

// DTO para processar pagamento
export interface ProcessPaymentDTO {
    purchaseId: number;
    status: PaymentStatus;
}
