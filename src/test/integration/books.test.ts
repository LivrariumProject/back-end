import sequelize from '../../config/database';
import { request, app, getAdminToken, getUserToken, generateId } from '../utils';
import { setupTestDB } from '../setup'; 

describe('📚 Livros (Book Routes)', () => {
  let adminToken: string;
  let userToken: string;
  let bookId: number;
  const isbnTeste = `978-${generateId()}`;

  beforeAll(async () => {
    await setupTestDB(); // <--- Cria o admin no banco
    adminToken = await getAdminToken(); // <--- Agora consegue logar e pegar o token
    const user = await getUserToken();
    userToken = user.token;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('Criação e Edição (Admin)', () => {
    test('POST /books - Admin cria livro (201)', async () => {
      const res = await request(app)
        .post('/books')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Livro Teste Jest',
          author: 'George Orwell',
          isbn: isbnTeste,
          publishedYear: 1949,
          genre: 'Ficção',
          price: 50.00,
          rentalPrice: 10.00,
          stock: 10
        });

      expect(res.status).toBe(201);
      bookId = res.body.data.id;
    });

    test('POST /books - User comum é bloqueado (403)', async () => {
      const res = await request(app)
        .post('/books')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ title: 'Hacker Book' });
      expect(res.status).toBe(403);
    });

    test('PUT /books/:id - Admin atualiza preço (200)', async () => {
      const res = await request(app)
        .put(`/books/${bookId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ price: 99.90 });
      
      expect(res.status).toBe(200);
      expect(res.body.data.price).toBe(99.90);
    });
  });

  describe('Consultas e Filtros (Público)', () => {
    test('GET /books - Listar todos', async () => {
      const res = await request(app).get('/books');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    test('GET /books/:id - Buscar por ID existente', async () => {
      const res = await request(app).get(`/books/${bookId}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(bookId);
    });

    test('GET /books/:id - Buscar ID inexistente (404)', async () => {
      const res = await request(app).get('/books/999999');
      expect(res.status).toBe(404);
    });

    test('GET /books/isbn/:isbn - Buscar por ISBN', async () => {
      const res = await request(app).get(`/books/isbn/${isbnTeste}`);
      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe('Livro Teste Jest');
    });

    test('GET /books/search - Filtro por Gênero', async () => {
      const res = await request(app).get('/books/search?genre=Ficção');
      expect(res.status).toBe(200);
      if (res.body.data.length > 0) {
        expect(res.body.data[0].genre).toMatch(/Ficção/i);
      }
    });

    test('GET /books/stats - Estatísticas (Admin)', async () => {
      const res = await request(app)
        .get('/books/stats')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('total');
    });
  });

  describe('Deleção', () => {
    test('DELETE /books/:id - Admin deleta livro (200)', async () => {
      const res = await request(app)
        .delete(`/books/${bookId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
    });
  });
});