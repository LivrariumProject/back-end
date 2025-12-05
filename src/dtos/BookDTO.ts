// DTOs para operações com livros

// DTO para criação de livro
export interface CreateBookDTO {
    title: string;
    author: string;
    isbn: string;
    publishedYear: number;
    genre: string;
    price: number;
    rentalPrice: number;
    description?: string;
}

// DTO para atualização de livro (todos campos opcionais)
export interface UpdateBookDTO {
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

// DTO para resposta de livro (como o livro é retornado)
export interface BookResponseDTO {
    id: number;
    title: string;
    author: string;
    isbn: string;
    publishedYear: number;
    genre: string;
    price: number;
    rentalPrice: number;
    available: boolean;
    description?: string;
}

// DTO para filtros de busca
export interface BookFiltersDTO {
    genre?: string;
    author?: string;
    available?: boolean;
    minPrice?: number;
    maxPrice?: number;
    publishedYear?: number;
}
