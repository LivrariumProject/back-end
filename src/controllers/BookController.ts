import { Request, Response, NextFunction } from "express";
import { BookService } from "../services/BookService";
import { CreateBookDTO, UpdateBookDTO, BookFiltersDTO } from "../dtos/BookDTO";
import { AppError } from "../errors/AppError";

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    // Criar livro
    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const createData: CreateBookDTO = {
                title: req.body.title,
                author: req.body.author,
                isbn: req.body.isbn,
                publishedYear: req.body.publishedYear,
                genre: req.body.genre,
                price: req.body.price,
                rentalPrice: req.body.rentalPrice,
                description: req.body.description
            };

            const book = await this.bookService.createBook(createData);

            res.status(201).json({
                success: true,
                message: "Livro criado com sucesso",
                data: book
            });
        } catch (error) {
            next(error);
        }
    };

    // Listar todos os livros
    getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const books = await this.bookService.getAllBooks();

            res.status(200).json({
                success: true,
                count: books.length,
                data: books
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar livro por ID
    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const book = await this.bookService.getBookById(id);

            res.status(200).json({
                success: true,
                data: book
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar livro por ISBN
    getByIsbn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { isbn } = req.params;
            const book = await this.bookService.getBookByIsbn(isbn);

            res.status(200).json({
                success: true,
                data: book
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar livros por autor
    getByAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { author } = req.params;
            const books = await this.bookService.getBooksByAuthor(author);

            res.status(200).json({
                success: true,
                count: books.length,
                data: books
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar livros por gênero
    getByGenre = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { genre } = req.params;
            const books = await this.bookService.getBooksByGenre(genre);

            res.status(200).json({
                success: true,
                count: books.length,
                data: books
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar livros por título
    getByTitle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { title } = req.query;

            if (!title || typeof title !== 'string') {
                throw new AppError("Título é obrigatório", 400);
            }

            const books = await this.bookService.getBooksByTitle(title);

            res.status(200).json({
                success: true,
                count: books.length,
                data: books
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar livros disponíveis
    getAvailable = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const books = await this.bookService.getAvailableBooks();

            res.status(200).json({
                success: true,
                count: books.length,
                data: books
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar livros com filtros (query params)
    search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const filters: BookFiltersDTO = {};

            if (req.query.genre) {
                filters.genre = req.query.genre as string;
            }

            if (req.query.author) {
                filters.author = req.query.author as string;
            }

            if (req.query.available !== undefined) {
                filters.available = req.query.available === 'true';
            }

            if (req.query.minPrice) {
                filters.minPrice = parseFloat(req.query.minPrice as string);
            }

            if (req.query.maxPrice) {
                filters.maxPrice = parseFloat(req.query.maxPrice as string);
            }

            if (req.query.publishedYear) {
                filters.publishedYear = parseInt(req.query.publishedYear as string, 10);
            }

            const books = await this.bookService.getBooksByFilters(filters);

            res.status(200).json({
                success: true,
                count: books.length,
                filters: filters,
                data: books
            });
        } catch (error) {
            next(error);
        }
    };

    // Atualizar livro
    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const updateData: UpdateBookDTO = {};

            // Só inclui campos que foram enviados
            if (req.body.title !== undefined) updateData.title = req.body.title;
            if (req.body.author !== undefined) updateData.author = req.body.author;
            if (req.body.isbn !== undefined) updateData.isbn = req.body.isbn;
            if (req.body.publishedYear !== undefined) updateData.publishedYear = req.body.publishedYear;
            if (req.body.genre !== undefined) updateData.genre = req.body.genre;
            if (req.body.price !== undefined) updateData.price = req.body.price;
            if (req.body.rentalPrice !== undefined) updateData.rentalPrice = req.body.rentalPrice;
            if (req.body.available !== undefined) updateData.available = req.body.available;
            if (req.body.description !== undefined) updateData.description = req.body.description;

            const book = await this.bookService.updateBook(id, updateData);

            res.status(200).json({
                success: true,
                message: "Livro atualizado com sucesso",
                data: book
            });
        } catch (error) {
            next(error);
        }
    };

    // Marcar livro como disponível
    markAvailable = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const book = await this.bookService.markAsAvailable(id);

            res.status(200).json({
                success: true,
                message: "Livro marcado como disponível",
                data: book
            });
        } catch (error) {
            next(error);
        }
    };

    // Marcar livro como indisponível
    markUnavailable = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const book = await this.bookService.markAsUnavailable(id);

            res.status(200).json({
                success: true,
                message: "Livro marcado como indisponível",
                data: book
            });
        } catch (error) {
            next(error);
        }
    };

    // Verificar disponibilidade
    checkAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const available = await this.bookService.checkAvailability(id);

            res.status(200).json({
                success: true,
                data: { id, available }
            });
        } catch (error) {
            next(error);
        }
    };

    // Deletar livro
    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const book = await this.bookService.deleteBook(id);

            res.status(200).json({
                success: true,
                message: "Livro deletado com sucesso",
                data: book
            });
        } catch (error) {
            next(error);
        }
    };

    // Obter estatísticas
    getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const stats = await this.bookService.getBookStats();

            res.status(200).json({
                success: true,
                data: stats
            });
        } catch (error) {
            next(error);
        }
    };
}
