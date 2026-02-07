import request from 'supertest';
import app from '../index'; 

export const generateId = () => Date.now().toString() + Math.floor(Math.random() * 1000);

export async function getAdminToken() {
  const res = await request(app).post('/auth/login').send({
    email: 'admin@livrarium.com',
    password: 'admin123'
  });
  return res.body.token;
}

export async function getUserToken() {
  const email = `user${generateId()}@test.com`;
  
  // Registrar
  const register = await request(app).post('/register').send({
    name: 'User Teste',
    email,
    password: 'senha123'
  });

  // Logar
  const login = await request(app).post('/auth/login').send({
    email,
    password: 'senha123'
  });

  return {
    token: login.body.token,
    userId: register.body.id,
    email
  };
}

export { request, app };