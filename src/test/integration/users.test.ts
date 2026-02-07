import sequelize from '../../config/database';
import { request, app, getAdminToken, getUserToken } from '../utils';
import { setupTestDB } from '../setup'; 

describe('👤 Usuários (User Routes)', () => {
  let adminToken: string;
  let userData: any;

  beforeAll(async () => {
    await setupTestDB(); // <--- Configura banco e Admin
    adminToken = await getAdminToken();
    userData = await getUserToken();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('GET /users - Admin lista todos (200)', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    // Deve haver pelo menos 2 usuários (Admin + userData criado no setup)
    expect(res.body.data.length).toBeGreaterThanOrEqual(2); 
  });

  test('GET /users - User comum NÃO lista todos (403)', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${userData.token}`);
    expect(res.status).toBe(403);
  });

  test('GET /users/:id - User vê próprio perfil (200)', async () => {
    const res = await request(app)
      .get(`/users/${userData.userId}`)
      .set('Authorization', `Bearer ${userData.token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe(userData.email);
    expect(res.body.data).not.toHaveProperty('password');
  });

  test('PUT /users/:id - User atualiza nome (200)', async () => {
    const res = await request(app)
      .put(`/users/${userData.userId}`)
      .set('Authorization', `Bearer ${userData.token}`)
      .send({ name: 'Nome Atualizado' });
    
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Nome Atualizado');
  });

  test('DELETE /users/:id - User deleta conta (200)', async () => {
    const res = await request(app)
      .delete(`/users/${userData.userId}`)
      .set('Authorization', `Bearer ${userData.token}`);
    expect(res.status).toBe(200);
  });
});