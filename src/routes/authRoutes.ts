import express from 'express';
import { login, logout  } from '../controllers/AuthController';

// Para as rotas de autenticação
const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);

export default router;
