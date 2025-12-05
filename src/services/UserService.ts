import { UserRepository } from "../repository/UserRepository";
import { CreateUserDTO, UpdateUserDTO, UserFiltersDTO, UserResponseDTO } from "../dtos/UserDTO";
import { User } from "../models/User";
import {
    UserNotFoundError,
    DuplicateEmailError,
    InvalidUserDataError
} from "../errors/AppError";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    // Converter modelo para DTO de resposta (sem senha)
    private toResponseDTO(user: User): UserResponseDTO {
        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }

    // Validar email
    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validar dados de criação
    private validateCreateData(data: CreateUserDTO): void {
        if (!data.name || data.name.trim() === "") {
            throw new InvalidUserDataError("O nome é obrigatório");
        }

        if (data.name.trim().length < 2) {
            throw new InvalidUserDataError("O nome deve ter pelo menos 2 caracteres");
        }

        if (!data.email || data.email.trim() === "") {
            throw new InvalidUserDataError("O email é obrigatório");
        }

        if (!this.isValidEmail(data.email)) {
            throw new InvalidUserDataError("O email informado não é válido");
        }

        if (!data.password || data.password === "") {
            throw new InvalidUserDataError("A senha é obrigatória");
        }

        if (data.password.length < 6) {
            throw new InvalidUserDataError("A senha deve ter pelo menos 6 caracteres");
        }
    }

    // Validar dados de atualização
    private validateUpdateData(data: UpdateUserDTO): void {
        if (data.name !== undefined && data.name.trim() === "") {
            throw new InvalidUserDataError("O nome não pode ser vazio");
        }

        if (data.name !== undefined && data.name.trim().length < 2) {
            throw new InvalidUserDataError("O nome deve ter pelo menos 2 caracteres");
        }

        if (data.email !== undefined && data.email.trim() === "") {
            throw new InvalidUserDataError("O email não pode ser vazio");
        }

        if (data.email !== undefined && !this.isValidEmail(data.email)) {
            throw new InvalidUserDataError("O email informado não é válido");
        }

        if (data.password !== undefined && data.password === "") {
            throw new InvalidUserDataError("A senha não pode ser vazia");
        }

        if (data.password !== undefined && data.password.length < 6) {
            throw new InvalidUserDataError("A senha deve ter pelo menos 6 caracteres");
        }
    }

    // Criar novo usuário
    async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
        // Validar dados
        this.validateCreateData(data);

        // Verificar se email já existe
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new DuplicateEmailError(data.email);
        }

        const user = await this.userRepository.create(data);
        return this.toResponseDTO(user);
    }

    // Listar todos os usuários
    async getAllUsers(): Promise<UserResponseDTO[]> {
        const users = await this.userRepository.findAll();
        return users.map(user => this.toResponseDTO(user));
    }

    // Buscar usuário por ID
    async getUserById(id: number): Promise<UserResponseDTO> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new UserNotFoundError(id);
        }

        return this.toResponseDTO(user);
    }

    // Buscar usuário por email
    async getUserByEmail(email: string): Promise<UserResponseDTO> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UserNotFoundError();
        }

        return this.toResponseDTO(user);
    }

    // Buscar usuários por nome
    async getUsersByName(name: string): Promise<UserResponseDTO[]> {
        const users = await this.userRepository.findByName(name);
        return users.map(user => this.toResponseDTO(user));
    }

    // Buscar usuários com filtros
    async getUsersByFilters(filters: UserFiltersDTO): Promise<UserResponseDTO[]> {
        const users = await this.userRepository.findWithFilters(filters);
        return users.map(user => this.toResponseDTO(user));
    }

    // Atualizar usuário
    async updateUser(id: number, data: UpdateUserDTO): Promise<UserResponseDTO> {
        // Verificar se usuário existe
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new UserNotFoundError(id);
        }

        // Validar dados de atualização
        this.validateUpdateData(data);

        // Se está atualizando email, verificar se já existe outro usuário com esse email
        if (data.email && data.email !== existingUser.email) {
            const emailExists = await this.userRepository.emailExists(data.email, id);
            if (emailExists) {
                throw new DuplicateEmailError(data.email);
            }
        }

        const user = await this.userRepository.update(id, data);
        return this.toResponseDTO(user!);
    }

    // Deletar usuário
    async deleteUser(id: number): Promise<UserResponseDTO> {
        const user = await this.userRepository.delete(id);

        if (!user) {
            throw new UserNotFoundError(id);
        }

        return this.toResponseDTO(user);
    }

    // Obter estatísticas de usuários
    async getUserStats(): Promise<{ total: number }> {
        const total = await this.userRepository.count();

        return {
            total
        };
    }
}
