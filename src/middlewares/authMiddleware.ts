import { Request, Response, NextFunction } from 'express';
import { verifyToken, isTokenBlacklisted } from '../utils/auth';

//Proteger rotas
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

   // Verifica se token está na blacklist
  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ message: 'Token has been invalidated (logged out).' });
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded; // Adiciona o usuário decodificado ao objeto `req`
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
