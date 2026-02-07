import { User } from '../models/User';
import { hashPassword } from '../utils/auth';
import sequelize from '../config/database';

export const setupTestDB = async () => {
  // 1. Limpa o banco de dados
  await sequelize.sync({ force: true });

  // 2. Recria o usuário Admin necessário para os testes
  const hashedPassword = await hashPassword('admin123');
  await User.create({
    name: 'Administrador',
    email: 'admin@livrarium.com',
    password: hashedPassword,
    role: 'admin'
  });
};