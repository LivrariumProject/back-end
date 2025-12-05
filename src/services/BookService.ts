import { BookRepository } from "../repository/BookRepository";
import { CreateBookDTO, UpdateBookDTO, BookFiltersDTO, BookResponseDTO } from "../dtos/BookDTO";
import { Book } from "../models/Book";
import {
    BookNotFoundError,
    DuplicateIsbnError,
    InvalidBookDataError,
    BookNotAvailableError
} from "../errors/AppError";

export class BookService {
    private bookRepository: BookRepository;

    constructor() {
        this.bookRepository = new BookRepository();
    }

    // Converter modelo para DTO de resposta
    private toResponseDTO(book: Book): BookResponseDTO {
        return {
            id: book.id,
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            publishedYear: book.publishedYear,
            genre: book.genre,
            price: Number(book.price),
            rentalPrice: Number(book.rentalPrice),
            available: book.available,
            description: book.description
        };
    }

    // Validar dados de criação
    private validateCreateData(data: CreateBookDTO): void {
        if (!data.title || data.title.trim() === "") {
            throw new InvalidBookDataError("O título é obrigatório");
        }

        if (!data.author || data.author.trim() === "") {
            throw new InvalidBookDataError("O autor é obrigatório");
        }

        if (!data.isbn || data.isbn.trim() === "") {
            throw new InvalidBookDataError("O ISBN é obrigatório");
        }

        if (!data.publishedYear || data.publishedYear < 0) {
            throw new InvalidBookDataError("O ano de publicação deve ser válido");
        }

        if (!data.genre || data.genre.trim() === "") {
            throw new InvalidBookDataError("O gênero é obrigatório");
        }

        if (data.price === undefined || data.price < 0) {
            throw new InvalidBookDataError("O preço deve ser um valor válido");
        }

        if (data.rentalPrice === undefined || data.rentalPrice < 0) {
            throw new InvalidBookDataError("O preço de aluguel deve ser um valor válido");
        }
    }

    // Criar novo livro
    async createBook(data: CreateBookDTO): Promise<BookResponseDTO> {
        // Validar dados
        this.validateCreateData(data);

        // Verificar se ISBN já existe
        const existingBook = await this.bookRepository.findByIsbn(data.isbn);
        if (existingBook) {
            throw new DuplicateIsbnError(data.isbn);
        }

        const book = await this.bookRepository.create(data);
        return this.toResponseDTO(book);
    }

    // Listar todos os livros
    async getAllBooks(): Promise<BookResponseDTO[]> {
        const books = await this.bookRepository.findAll();
        return books.map(book => this.toResponseDTO(book));
    }

    // Buscar livro por ID
    async getBookById(id: number): Promise<BookResponseDTO> {
        const book = await this.bookRepository.findById(id);

        if (!book) {
            throw new BookNotFoundError(id);
        }

        return this.toResponseDTO(book);
    }

    // Buscar livro por ISBN
    async getBookByIsbn(isbn: string): Promise<BookResponseDTO> {
        const book = await this.bookRepository.findByIsbn(isbn);

        if (!book) {
            throw new BookNotFoundError();
        }

        return this.toResponseDTO(book);
    }

    // Buscar livros por autor
    async getBooksByAuthor(author: string): Promise<BookResponseDTO[]> {
        const books = await this.bookRepository.findByAuthor(author);
        return books.map(book => this.toResponseDTO(book));
    }

    // Buscar livros por gênero
    async getBooksByGenre(genre: string): Promise<BookResponseDTO[]> {
        const books = await this.bookRepository.findByGenre(genre);
        return books.map(book => this.toResponseDTO(book));
    }

    // Buscar livros por título
    async getBooksByTitle(title: string): Promise<BookResponseDTO[]> {
        const books = await this.bookRepository.findByTitle(title);
        return books.map(book => this.toResponseDTO(book));
    }

    // Buscar livros disponíveis
    async getAvailableBooks(): Promise<BookResponseDTO[]> {
        const books = await this.bookRepository.findAvailable();
        return books.map(book => this.toResponseDTO(book));
    }

    // Buscar livros com filtros
    async getBooksByFilters(filters: BookFiltersDTO): Promise<BookResponseDTO[]> {
        const books = await this.bookRepository.findWithFilters(filters);
        return books.map(book => this.toResponseDTO(book));
    }

    // Atualizar livro
    async updateBook(id: number, data: UpdateBookDTO): Promise<BookResponseDTO> {
        // Verificar se livro existe
        const existingBook = await this.bookRepository.findById(id);
        if (!existingBook) {
            throw new BookNotFoundError(id);
        }

        // Se está atualizando ISBN, verificar se já existe outro livro com esse ISBN
        if (data.isbn && data.isbn !== existingBook.isbn) {
            const isbnExists = await this.bookRepository.isbnExists(data.isbn, id);
            if (isbnExists) {
                throw new DuplicateIsbnError(data.isbn);
            }
        }

        const book = await this.bookRepository.update(id, data);
        return this.toResponseDTO(book!);
    }

    // Marcar livro como disponível
    async markAsAvailable(id: number): Promise<BookResponseDTO> {
        const book = await this.bookRepository.updateAvailability(id, true);

        if (!book) {
            throw new BookNotFoundError(id);
        }

        return this.toResponseDTO(book);
    }

    // Marcar livro como indisponível
    async markAsUnavailable(id: number): Promise<BookResponseDTO> {
        const book = await this.bookRepository.updateAvailability(id, false);

        if (!book) {
            throw new BookNotFoundError(id);
        }

        return this.toResponseDTO(book);
    }

    // Verificar disponibilidade do livro
    async checkAvailability(id: number): Promise<boolean> {
        const book = await this.bookRepository.findById(id);

        if (!book) {
            throw new BookNotFoundError(id);
        }

        return book.available;
    }

    // Deletar livro
    async deleteBook(id: number): Promise<BookResponseDTO> {
        const book = await this.bookRepository.delete(id);

        if (!book) {
            throw new BookNotFoundError(id);
        }

        return this.toResponseDTO(book);
    }

    // Obter estatísticas de livros
    async getBookStats(): Promise<{ total: number; available: number; unavailable: number }> {
        const total = await this.bookRepository.count();
        const available = await this.bookRepository.countAvailable();

        return {
            total,
            available,
            unavailable: total - available
        };
    }
}
