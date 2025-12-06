import { PaymentMethod, PaymentStatus, RentalStatus } from "../models/Rental";
import { BookResponseDTO } from "./BookDTO";
import { UserResponseDTO } from "./UserDTO";

// DTO para criação de aluguel
export interface CreateRentalDTO {
    userId: number;
    bookId: number;
    paymentMethod: PaymentMethod;
    rentalDays: number; // Quantidade de dias do aluguel
}

// DTO para atualização de aluguel
export interface UpdateRentalDTO {
    paymentStatus?: PaymentStatus;
    rentalStatus?: RentalStatus;
    dueDate?: Date;
}

// DTO para resposta de aluguel
export interface RentalResponseDTO {
    id: number;
    userId: number;
    bookId: number;
    rentalPrice: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    rentalStatus: RentalStatus;
    rentalDate: Date;
    dueDate: Date;
    returnDate?: Date;
    daysRemaining?: number;
    isOverdue?: boolean;
    user?: UserResponseDTO;
    book?: BookResponseDTO;
}

// DTO para filtros de busca
export interface RentalFiltersDTO {
    userId?: number;
    bookId?: number;
    paymentStatus?: PaymentStatus;
    rentalStatus?: RentalStatus;
    startDate?: Date;
    endDate?: Date;
}

// DTO para estatísticas de aluguéis
export interface RentalStatsDTO {
    total: number;
    active: number;
    returned: number;
    overdue: number;
    pendingPayment: number;
    completedPayment: number;
    totalRevenue: number;
}

// DTO para devolução de livro
export interface ReturnRentalDTO {
    rentalId: number;
}

// DTO para renovação de aluguel
export interface RenewRentalDTO {
    rentalId: number;
    additionalDays: number;
    paymentMethod: PaymentMethod;
}
