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
