import { Op } from "sequelize";
import { User } from "../models/User";
import { CreateUserDTO, UpdateUserDTO, UserFiltersDTO } from "../dtos/UserDTO";

export class UserRepository {
  // Criar um novo usuário
  async create(data: CreateUserDTO): Promise<User> {
    return await User.create(data);
  }

  // Listar todos os usuários
  async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  // Buscar usuário por ID
  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  // Buscar usuário por email
  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  // Buscar usuários por nome (busca parcial)
  async findByName(name: string): Promise<User[]> {
    return await User.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    });
  }

  // Buscar usuários com filtros
  async findWithFilters(filters: UserFiltersDTO): Promise<User[]> {
    const whereClause: any = {};

    if (filters.name) {
      whereClause.name = { [Op.iLike]: `%${filters.name}%` };
    }

    if (filters.email) {
      whereClause.email = { [Op.iLike]: `%${filters.email}%` };
    }

    return await User.findAll({ where: whereClause });
  }

  // Atualizar usuário
  async update(id: number, data: UpdateUserDTO): Promise<User | null> {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    await user.update(data);
    return user;
  }

  // Deletar usuário
  async delete(id: number): Promise<User | null> {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    await user.destroy();
    return user;
  }

  // Verificar se email já existe (excluindo um ID específico - útil para update)
  async emailExists(email: string, excludeId?: number): Promise<boolean> {
    const whereClause: any = { email };

    if (excludeId) {
      whereClause.id = { [Op.ne]: excludeId };
    }

    const user = await User.findOne({ where: whereClause });
    return user !== null;
  }

  // Contar total de usuários
  async count(): Promise<number> {
    return await User.count();
  }
}
