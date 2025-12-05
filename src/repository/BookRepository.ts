import { Op } from "sequelize";
import { Book } from "../models/Book";
import { CreateBookDTO, UpdateBookDTO, BookFiltersDTO } from "../dtos/BookDTO";

export class BookRepository {
    // Criar um novo livro
    async create(data: CreateBookDTO): Promise<Book> {
        return await Book.create(data);
    }

    // Listar todos os livros
    async findAll(): Promise<Book[]> {
        return await Book.findAll();
    }

    // Buscar livro por ID
    async findById(id: number): Promise<Book | null> {
        return await Book.findByPk(id);
    }

    // Buscar livro por ISBN
    async findByIsbn(isbn: string): Promise<Book | null> {
        return await Book.findOne({ where: { isbn } });
    }

    // Buscar livros por autor
    async findByAuthor(author: string): Promise<Book[]> {
        return await Book.findAll({
            where: {
                author: {
                    [Op.iLike]: `%${author}%`
                }
            }
        });
    }

    // Buscar livros por gênero
    async findByGenre(genre: string): Promise<Book[]> {
        return await Book.findAll({
            where: {
                genre: {
                    [Op.iLike]: `%${genre}%`
                }
            }
        });
    }

    // Buscar livros disponíveis
    async findAvailable(): Promise<Book[]> {
        return await Book.findAll({
            where: { available: true }
        });
    }

    // Buscar livros com filtros avançados
    async findWithFilters(filters: BookFiltersDTO): Promise<Book[]> {
        const whereClause: any = {};

        if (filters.genre) {
            whereClause.genre = { [Op.iLike]: `%${filters.genre}%` };
        }

        if (filters.author) {
            whereClause.author = { [Op.iLike]: `%${filters.author}%` };
        }

        if (filters.available !== undefined) {
            whereClause.available = filters.available;
        }

        if (filters.publishedYear) {
            whereClause.publishedYear = filters.publishedYear;
        }

        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
            whereClause.price = {};
            if (filters.minPrice !== undefined) {
                whereClause.price[Op.gte] = filters.minPrice;
            }
            if (filters.maxPrice !== undefined) {
                whereClause.price[Op.lte] = filters.maxPrice;
            }
        }

        return await Book.findAll({ where: whereClause });
    }

    // Buscar livros por título (busca parcial)
    async findByTitle(title: string): Promise<Book[]> {
        return await Book.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${title}%`
                }
            }
        });
    }

    // Atualizar livro
    async update(id: number, data: UpdateBookDTO): Promise<Book | null> {
        const book = await Book.findByPk(id);

        if (!book) {
            return null;
        }

        await book.update(data);
        return book;
    }

    // Atualizar disponibilidade do livro
    async updateAvailability(id: number, available: boolean): Promise<Book | null> {
        const book = await Book.findByPk(id);

        if (!book) {
            return null;
        }

        await book.update({ available });
        return book;
    }

    // Deletar livro
    async delete(id: number): Promise<Book | null> {
        const book = await Book.findByPk(id);

        if (!book) {
            return null;
        }

        await book.destroy();
        return book;
    }

    // Verificar se ISBN já existe (excluindo um ID específico - útil para update)
    async isbnExists(isbn: string, excludeId?: number): Promise<boolean> {
        const whereClause: any = { isbn };

        if (excludeId) {
            whereClause.id = { [Op.ne]: excludeId };
        }

        const book = await Book.findOne({ where: whereClause });
        return book !== null;
    }

    // Contar total de livros
    async count(): Promise<number> {
        return await Book.count();
    }

    // Contar livros disponíveis
    async countAvailable(): Promise<number> {
        return await Book.count({ where: { available: true } });
    }
}
