// Classe de erro customizada para a aplicação
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        // Captura o stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

// ==================== ERROS DE LIVROS ====================

export class BookNotFoundError extends AppError {
    constructor(id?: number) {
        super(id ? `Livro com ID ${id} não encontrado` : "Livro não encontrado", 404);
    }
}

export class DuplicateIsbnError extends AppError {
    constructor(isbn: string) {
        super(`Já existe um livro com o ISBN ${isbn}`, 409);
    }
}

export class InvalidBookDataError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class BookNotAvailableError extends AppError {
    constructor(id: number) {
        super(`O livro com ID ${id} não está disponível`, 400);
    }
}

// ==================== ERROS DE USUÁRIOS ====================

export class UserNotFoundError extends AppError {
    constructor(id?: number) {
        super(id ? `Usuário com ID ${id} não encontrado` : "Usuário não encontrado", 404);
    }
}

export class DuplicateEmailError extends AppError {
    constructor(email: string) {
        super(`Já existe um usuário com o email ${email}`, 409);
    }
}

export class InvalidUserDataError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class InvalidCredentialsError extends AppError {
    constructor() {
        super("Email ou senha inválidos", 401);
    }
}

// ==================== ERROS DE COMPRA ====================

export class PurchaseNotFoundError extends AppError {
    constructor(id?: number) {
        super(id ? `Compra com ID ${id} não encontrada` : "Compra não encontrada", 404);
    }
}

export class InvalidPurchaseDataError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class PaymentFailedError extends AppError {
    constructor(message: string = "Falha no processamento do pagamento") {
        super(message, 402);
    }
}

export class PurchaseAlreadyCompletedError extends AppError {
    constructor(id: number) {
        super(`A compra com ID ${id} já foi completada`, 400);
    }
}

export class PurchaseAlreadyRefundedError extends AppError {
    constructor(id: number) {
        super(`A compra com ID ${id} já foi reembolsada`, 400);
    }
}

export class InvalidPaymentMethodError extends AppError {
    constructor(method: string) {
        super(`Método de pagamento '${method}' inválido. Use: credit_card, debit_card, pix ou boleto`, 400);
    }
}

// ==================== ERROS DE ALUGUEL ====================

export class RentalNotFoundError extends AppError {
    constructor(id?: number) {
        super(id ? `Aluguel com ID ${id} não encontrado` : "Aluguel não encontrado", 404);
    }
}

export class InvalidRentalDataError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class RentalAlreadyReturnedError extends AppError {
    constructor(id: number) {
        super(`O aluguel com ID ${id} já foi devolvido`, 400);
    }
}

export class RentalOverdueError extends AppError {
    constructor(id: number, daysOverdue: number) {
        super(`O aluguel com ID ${id} está atrasado há ${daysOverdue} dia(s)`, 400);
    }
}

export class InvalidRentalPeriodError extends AppError {
    constructor(minDays: number, maxDays: number) {
        super(`O período de aluguel deve ser entre ${minDays} e ${maxDays} dias`, 400);
    }
}

export class RentalNotActiveError extends AppError {
    constructor(id: number) {
        super(`O aluguel com ID ${id} não está ativo`, 400);
    }
}

export class CannotRenewRentalError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}
