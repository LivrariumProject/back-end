import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { CreateUserDTO, UpdateUserDTO, UserFiltersDTO } from "../dtos/UserDTO";
import { AppError } from "../errors/AppError";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // Criar usuário
    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const createData: CreateUserDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            };

            const user = await this.userService.createUser(createData);

            res.status(201).json({
                success: true,
                message: "Usuário criado com sucesso",
                data: user
            });
        } catch (error) {
            next(error);
        }
    };

    // Listar todos os usuários
    getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await this.userService.getAllUsers();

            res.status(200).json({
                success: true,
                count: users.length,
                data: users
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar usuário por ID
    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const user = await this.userService.getUserById(id);

            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar usuário por email
    getByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email } = req.params;
            const user = await this.userService.getUserByEmail(email);

            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar usuários por nome
    getByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name } = req.params;
            const users = await this.userService.getUsersByName(name);

            res.status(200).json({
                success: true,
                count: users.length,
                data: users
            });
        } catch (error) {
            next(error);
        }
    };

    // Buscar usuários com filtros (query params)
    search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const filters: UserFiltersDTO = {};

            if (req.query.name) {
                filters.name = req.query.name as string;
            }

            if (req.query.email) {
                filters.email = req.query.email as string;
            }

            const users = await this.userService.getUsersByFilters(filters);

            res.status(200).json({
                success: true,
                count: users.length,
                filters: filters,
                data: users
            });
        } catch (error) {
            next(error);
        }
    };

    // Atualizar usuário
    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const updateData: UpdateUserDTO = {};

            // Só inclui campos que foram enviados
            if (req.body.name !== undefined) updateData.name = req.body.name;
            if (req.body.email !== undefined) updateData.email = req.body.email;
            if (req.body.password !== undefined) updateData.password = req.body.password;

            const user = await this.userService.updateUser(id, updateData);

            res.status(200).json({
                success: true,
                message: "Usuário atualizado com sucesso",
                data: user
            });
        } catch (error) {
            next(error);
        }
    };

    // Deletar usuário
    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                throw new AppError("ID inválido", 400);
            }

            const user = await this.userService.deleteUser(id);

            res.status(200).json({
                success: true,
                message: "Usuário deletado com sucesso",
                data: user
            });
        } catch (error) {
            next(error);
        }
    };

    // Obter estatísticas
    getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const stats = await this.userService.getUserStats();

            res.status(200).json({
                success: true,
                data: stats
            });
        } catch (error) {
            next(error);
        }
    };
}
