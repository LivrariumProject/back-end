import { Request, Response } from 'express';
import { comparePassword, generateToken } from '../utils/auth';
import { UserRepository } from '../repository/UserRepository';
import { addToBlacklist } from '../utils/auth';

const userRepo = new UserRepository();

// lidar com login e outras operações de autenticação
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe pelo email
    const user = await userRepo.findByEmail(email);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compara a senha fornecida com a senha armazenada
    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Gera um token JWT
    const token = generateToken(user.id, user.name);

    res.status(200).json({ 
      message: 'Login successful', 
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }
    
    // Adiciona token à blacklist
    addToBlacklist(token);
    
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error during logout' });
  }
};