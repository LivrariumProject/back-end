// DTOs para operações com usuários

// DTO para criação de usuário
export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
}

// DTO para atualização de usuário (todos campos opcionais)
export interface UpdateUserDTO {
    name?: string;
    email?: string;
    password?: string;
}

// DTO para resposta de usuário (sem senha por segurança)
export interface UserResponseDTO {
    id: number;
    name: string;
    email: string;
}

// DTO para resposta completa (uso interno, com senha)
export interface UserFullDTO {
    id: number;
    name: string;
    email: string;
    password: string;
}

// DTO para filtros de busca
export interface UserFiltersDTO {
    name?: string;
    email?: string;
}

// DTO para login (futuro)
export interface LoginDTO {
    email: string;
    password: string;
}
