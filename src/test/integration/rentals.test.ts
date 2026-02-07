import sequelize from '../../config/database';
import { request, app, getAdminToken, getUserToken, generateId } from '../utils';
import { setupTestDB } from '../setup';

describe('📅 Aluguéis (Rental Routes)', () => {
  let adminToken: string;
  let userData: any;
  let bookId: number;
  let rentalId: number;

  beforeAll(async () => {
    await setupTestDB();
    adminToken = await getAdminToken();
    userData = await getUserToken();

    const book = await request(app)
      .post('/books')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Livro Aluguel',
        author: 'Autor Aluguel',
        isbn: `978-2-${generateId()}`,
        publishedYear: 2022,
        genre: 'Romance',           
        price: 200.00,
        rentalPrice: 15.00,
        stock: 5
      });

    expect(book.status).toBe(201);
    bookId = book.body.data.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('POST /rentals - Criar aluguel de 7 dias (201)', async () => {
    const res = await request(app)
      .post('/rentals')
      .set('Authorization', `Bearer ${userData.token}`)
      .send({
        userId: userData.userId,
        bookId,
        paymentMethod: 'credit_card',
        rentalDays: 7
      });

    expect(res.status).toBe(201);
    expect(res.body.data.rentalStatus).toBe('active');
    rentalId = res.body.data.id;
  });

  test('POST /rentals - Erro dias inválidos (403)', async () => {
    const res = await request(app)
      .post('/rentals')
      .set('Authorization', `Bearer ${userData.token}`)
      .send({
        bookId,
        rentalDays: 35
      });

    expect(res.status).toBe(403);
  });

  test('GET /rentals/active - Listar aluguéis ativos (Admin)', async () => {
    const res = await request(app)
      .get('/rentals/active')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.find((r: any) => r.id === rentalId)).toBeDefined();
  });

  test('PATCH /rentals/:id/renew - Renovar aluguel (200)', async () => {
    const res = await request(app)
      .patch(`/rentals/${rentalId}/renew`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        additionalDays: 7,
        paymentMethod: 'pix'
      });

    expect(res.status).toBe(200);
  });

  test('PATCH /rentals/:id/return - Devolver livro (200)', async () => {
    const res = await request(app)
      .patch(`/rentals/${rentalId}/return`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.rentalStatus).toBe('returned');
  });

  test('PATCH /rentals/:id/return - Erro devolver duplicado (400)', async () => {
    const res = await request(app)
      .patch(`/rentals/${rentalId}/return`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(400);
  });
});
