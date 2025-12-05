import { Book } from "../models/Book";

export class BookRepository {
    // Criar um novo livro
    async createBook(
        title: string,
        author: string,
        isbn: string,
        publishedYear: number,
        genre: string,
        price: number,
        rentalPrice: number,
        description?: string
    ) {
        const book = await Book.create({
            title,
            author,
            isbn,
            publishedYear,
            genre,
            price,
            rentalPrice,
            description
        });

        return book;
    }

    // Listar todos os livros
    async getAllBooks() {
        return await Book.findAll();
    }

    // Buscar livro por ID
    async getBookById(id: number) {
        return await Book.findByPk(id);
    }

    // Atualizar livro
    async updateBook(
        id: number,
        data: {
            title?: string;
            author?: string;
            isbn?: string;
            publishedYear?: number;
            genre?: string;
            price?: number;
            rentalPrice?: number;
            available?: boolean;
            description?: string;
        }
    ) {
        const book = await Book.findByPk(id);

        if (!book) {
            return null;
        }

        await book.update(data);
        return book;
    }

    // Deletar livro
    async deleteBook(id: number) {
        const book = await Book.findByPk(id);

        if (!book) {
            return null;
        }

        await book.destroy();
        return book;
    }
}
