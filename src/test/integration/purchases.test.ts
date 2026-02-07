import sequelize from '../../config/database';
import { request, app, getAdminToken, getUserToken, generateId } from '../utils';
import { setupTestDB } from '../setup';

describe('🛒 Compras (Purchase Routes)', () => {
  let adminToken: string;
  let userData: any;
  let bookId: number;
  let purchaseId: number;

  beforeAll(async () => {
    await setupTestDB();
    adminToken = await getAdminToken();
    userData = await getUserToken();

    const book = await request(app)
      .post('/books')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Livro Compras',
        author: 'Autor Teste',
        isbn: `978-1-${generateId()}`,
        publishedYear: 2023,
        genre: 'Tecnologia',
        price: 100.00,
        rentalPrice: 20.00,
        stock: 5
      });

    expect(book.status).toBe(201);
    bookId = book.body.data.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('POST /purchases - Criar compra (201)', async () => {
    const res = await request(app)
      .post('/purchases')
      .set('Authorization', `Bearer ${userData.token}`)
      .send({
        userId: userData.userId,
        bookId,
        paymentMethod: 'pix'
      });

    expect(res.status).toBe(201);
    expect(res.body.data.paymentStatus).toBe('pending');
    purchaseId = res.body.data.id;
  });

  test('PATCH /purchases/:id/confirm - Admin confirma pagamento (200)', async () => {
    const res = await request(app)
      .patch(`/purchases/${purchaseId}/confirm`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.paymentStatus).toBe('completed');
  });

  test('GET /purchases/check/:userId/:bookId - Verifica se já comprou (true)', async () => {
    const res = await request(app)
      .get(`/purchases/check/${userData.userId}/${bookId}`)
      .set('Authorization', `Bearer ${userData.token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.hasPurchased).toBe(true);
  });

  test('PATCH /purchases/:id/refund - Admin reembolsa (200)', async () => {
    const res = await request(app)
      .patch(`/purchases/${purchaseId}/refund`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.paymentStatus).toBe('refunded');
  });

  test('POST /purchases - Erro método inválido (403)', async () => {
    const res = await request(app)
      .post('/purchases')
      .set('Authorization', `Bearer ${userData.token}`)
      .send({
        bookId,
        paymentMethod: 'fiado'
      });

    expect(res.status).toBe(403);
  });

  test('GET /purchases/user/:id - Listar compras do usuário', async () => {
    const res = await request(app)
      .get(`/purchases/user/${userData.userId}`)
      .set('Authorization', `Bearer ${userData.token}`);

    expect(res.status).toBe(200);
    expect(res.body.count).toBeGreaterThanOrEqual(1);
  });
});
