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

// Erros específicos para livros
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
