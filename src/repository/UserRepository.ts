import { User } from "../models/User";

export class UserRepository {
  // Criar um novo usuário
  async createUser(name: string, email: string, password: string) {
    const user = await User.create({
      name,
      email,
      password
    });

    return user;
  }

  // Listar todos os usuários
  async getAllUsers() {
    return await User.findAll();
  }

  // Buscar usuário por ID
  async getUserById(id: number) {
    return await User.findByPk(id);
  }

  // Atualizar usuário
  async updateUser(
    id: number,
    data: {
      name?: string;
      email?: string;
      password?: string;
    }
  ) {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    await user.update(data);
    return user;
  }

  // Deletar usuário
  async deleteUser(id: number) {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    await user.destroy();
    return user;
  }
}
