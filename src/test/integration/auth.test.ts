import sequelize from '../../config/database';
import { request, app, generateId } from '../utils';
import { setupTestDB } from '../setup';

describe('🔐 Autenticação (Auth Routes)', () => {

  beforeAll(async () => {
    await setupTestDB();
  });
  
  afterAll(async () => {
    await sequelize.close();
  });

  test('POST /register - Deve criar conta com sucesso (201)', async () => {
    const res = await request(app).post('/register').send({
      name: 'Novo User',
      email: `novo${generateId()}@email.com`,
      password: '123'
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.role).toBe('user');
  });

  test('POST /auth/login - Deve logar com credenciais corretas (200)', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'admin@livrarium.com',
      password: 'admin123'
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /auth/login - Deve falhar com senha errada (400 ou 401)', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'admin@livrarium.com',
      password: 'senha_errada'
    });
    // Aceita 400 (Bad Request) ou 401 (Unauthorized)
    expect([400, 401]).toContain(res.status);
  });
});