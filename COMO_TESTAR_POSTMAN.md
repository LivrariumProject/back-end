# 🧪 Como Testar no Postman - Guia Completo

## 🧪 Testando Manualmente (Passo a Passo)

Se preferir criar as requisições do zero, siga este guia:

### 🎯 TESTANDO LIVROS

---

### 1️⃣ CRIAR UM LIVRO (POST)

**Configuração:**
- **Método:** `POST`
- **URL:** `http://localhost:3000/books`
- **Headers:**
  - Key: `Content-Type`
  - Value: `application/json`

**Body (raw JSON):**
```json
{
  "title": "1984",
  "author": "George Orwell",
  "isbn": "978-0451524935",
  "publishedYear": 1949,
  "genre": "Ficção Científica",
  "price": 45.90,
  "rentalPrice": 12.50,
  "description": "Um clássico da literatura distópica"
}
```

**Resposta Esperada (201 Created):**
```json
{
  "success": true,
  "message": "Livro criado com sucesso",
  "data": {
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "isbn": "978-0451524935",
    "publishedYear": 1949,
    "genre": "Ficção Científica",
    "price": 45.90,
    "rentalPrice": 12.50,
    "available": true,
    "description": "Um clássico da literatura distópica"
  }
}
```

**Se ISBN duplicado (409 Conflict):**
```json
{
  "success": false,
  "message": "Já existe um livro com o ISBN 978-0451524935",
  "statusCode": 409
}
```

---

### 2️⃣ LISTAR TODOS OS LIVROS (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/books`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "title": "1984",
      "author": "George Orwell",
      "isbn": "978-0451524935",
      "publishedYear": 1949,
      "genre": "Ficção Científica",
      "price": 45.90,
      "rentalPrice": 12.50,
      "available": true,
      "description": "Um clássico da literatura distópica"
    }
  ]
}
```

---

### 3️⃣ BUSCAR LIVRO POR ID (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/books/1`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "isbn": "978-0451524935",
    "publishedYear": 1949,
    "genre": "Ficção Científica",
    "price": 45.90,
    "rentalPrice": 12.50,
    "available": true,
    "description": "Um clássico da literatura distópica"
  }
}
```

**Se não encontrar (404 Not Found):**
```json
{
  "success": false,
  "message": "Livro com ID 99 não encontrado",
  "statusCode": 404
}
```

---

### 4️⃣ BUSCAR LIVRO POR ISBN (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/books/isbn/978-0451524935`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "isbn": "978-0451524935",
    "publishedYear": 1949,
    "genre": "Ficção Científica",
    "price": 45.90,
    "rentalPrice": 12.50,
    "available": true,
    "description": "Um clássico da literatura distópica"
  }
}
```

---

### 5️⃣ BUSCAR LIVROS POR AUTOR (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/books/author/George Orwell`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "title": "1984",
      "author": "George Orwell",
      "isbn": "978-0451524935",
      "publishedYear": 1949,
      "genre": "Ficção Científica",
      "price": 45.90,
      "rentalPrice": 12.50,
      "available": true,
      "description": "Um clássico da literatura distópica"
    }
  ]
}
```

---

### 6️⃣ BUSCAR LIVROS POR GÊNERO (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/books/genre/Fantasia`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 2,
      "title": "O Senhor dos Anéis",
      "author": "J.R.R. Tolkien",
      ...
    },
    {
      "id": 5,
      "title": "Harry Potter e a Pedra Filosofal",
      "author": "J.K. Rowling",
      ...
    }
  ]
}
```

---

### 7️⃣ BUSCAR LIVROS COM FILTROS (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/books/search`
- **Query Params (opcionais):**
  - `genre` - Filtrar por gênero (busca parcial)
  - `author` - Filtrar por autor (busca parcial)
  - `available` - Filtrar por disponibilidade (`true` ou `false`)
  - `minPrice` - Preço mínimo
  - `maxPrice` - Preço máximo
  - `publishedYear` - Ano de publicação

**Exemplos de URL:**
```
http://localhost:3000/books/search?genre=Fantasia&available=true
http://localhost:3000/books/search?minPrice=30&maxPrice=100
http://localhost:3000/books/search?author=Tolkien&available=true
```

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "filters": {
    "genre": "Fantasia",
    "available": true
  },
  "data": [
    {
      "id": 2,
      "title": "O Senhor dos Anéis",
      "author": "J.R.R. Tolkien",
      ...
    }
  ]
}
```

---

### 8️⃣ LISTAR LIVROS DISPONÍVEIS (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/books/available`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    { "id": 1, "title": "1984", "available": true, ... },
    { "id": 2, "title": "O Senhor dos Anéis", "available": true, ... },
    { "id": 3, "title": "Clean Code", "available": true, ... }
  ]
}
```

---

### 9️⃣ OBTER ESTATÍSTICAS DE LIVROS (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/books/stats`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 5,
    "available": 3,
    "unavailable": 2
  }
}
```

---

### 🔟 VERIFICAR DISPONIBILIDADE DO LIVRO (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/books/1/availability`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "available": true
  }
}
```

---

### 1️⃣1️⃣ ATUALIZAR LIVRO (PUT)

**Configuração:**
- **Método:** `PUT`
- **URL:** `http://localhost:3000/books/1`
- **Headers:**
  - Key: `Content-Type`
  - Value: `application/json`

**Body (raw JSON):**
```json
{
  "price": 39.90,
  "description": "Edição atualizada do clássico"
}
```

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "message": "Livro atualizado com sucesso",
  "data": {
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "isbn": "978-0451524935",
    "publishedYear": 1949,
    "genre": "Ficção Científica",
    "price": 39.90,
    "rentalPrice": 12.50,
    "available": true,
    "description": "Edição atualizada do clássico"
  }
}
```

---

### 1️⃣2️⃣ MARCAR LIVRO COMO DISPONÍVEL (PATCH)

**Configuração:**
- **Método:** `PATCH`
- **URL:** `http://localhost:3000/books/1/available`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "message": "Livro marcado como disponível",
  "data": {
    "id": 1,
    "title": "1984",
    "available": true,
    ...
  }
}
```

---

### 1️⃣3️⃣ MARCAR LIVRO COMO INDISPONÍVEL (PATCH)

**Configuração:**
- **Método:** `PATCH`
- **URL:** `http://localhost:3000/books/1/unavailable`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "message": "Livro marcado como indisponível",
  "data": {
    "id": 1,
    "title": "1984",
    "available": false,
    ...
  }
}
```

---

### 1️⃣4️⃣ DELETAR LIVRO (DELETE)

**Configuração:**
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/books/1`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "message": "Livro deletado com sucesso",
  "data": {
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "isbn": "978-0451524935",
    "publishedYear": 1949,
    "genre": "Ficção Científica",
    "price": 39.90,
    "rentalPrice": 12.50,
    "available": false,
    "description": "Edição atualizada do clássico"
  }
}
```

---

## 📋 Resumo de Todas as Rotas de Livros

| Método   | Rota                      | Descrição                                        |
| -------- | ------------------------- | ------------------------------------------------ |
| `GET`    | `/books`                  | Listar todos os livros                           |
| `GET`    | `/books/search`           | Buscar com filtros (query params)                |
| `GET`    | `/books/available`        | Listar apenas disponíveis                        |
| `GET`    | `/books/stats`            | Estatísticas (total, disponíveis, indisponíveis) |
| `GET`    | `/books/isbn/:isbn`       | Buscar por ISBN                                  |
| `GET`    | `/books/author/:author`   | Buscar por autor                                 |
| `GET`    | `/books/genre/:genre`     | Buscar por gênero                                |
| `GET`    | `/books/:id`              | Buscar por ID                                    |
| `GET`    | `/books/:id/availability` | Verificar disponibilidade                        |
| `POST`   | `/books`                  | Criar novo livro                                 |
| `PUT`    | `/books/:id`              | Atualizar livro                                  |
| `PATCH`  | `/books/:id/available`    | Marcar como disponível                           |
| `PATCH`  | `/books/:id/unavailable`  | Marcar como indisponível                         |
| `DELETE` | `/books/:id`              | Deletar livro                                    |

---

## 📚 Exemplos de Livros para Cadastrar

### Livro 1: 1984
```json
{
  "title": "1984",
  "author": "George Orwell",
  "isbn": "978-0451524935",
  "publishedYear": 1949,
  "genre": "Ficção Científica",
  "price": 45.90,
  "rentalPrice": 12.50,
  "description": "Um clássico da literatura distópica"
}
```

### Livro 2: O Senhor dos Anéis
```json
{
  "title": "O Senhor dos Anéis",
  "author": "J.R.R. Tolkien",
  "isbn": "978-8533613379",
  "publishedYear": 1954,
  "genre": "Fantasia",
  "price": 89.90,
  "rentalPrice": 25.00,
  "description": "A maior saga de fantasia já escrita"
}
```

### Livro 3: Clean Code
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "978-0132350884",
  "publishedYear": 2008,
  "genre": "Tecnologia",
  "price": 120.00,
  "rentalPrice": 35.00,
  "description": "Manual essencial sobre boas práticas de programação"
}
```

### Livro 4: Dom Casmurro
```json
{
  "title": "Dom Casmurro",
  "author": "Machado de Assis",
  "isbn": "978-8544001080",
  "publishedYear": 1899,
  "genre": "Romance",
  "price": 29.90,
  "rentalPrice": 8.00,
  "description": "Clássico da literatura brasileira"
}
```

### Livro 5: Harry Potter e a Pedra Filosofal
```json
{
  "title": "Harry Potter e a Pedra Filosofal",
  "author": "J.K. Rowling",
  "isbn": "978-8532530787",
  "publishedYear": 1997,
  "genre": "Fantasia",
  "price": 54.90,
  "rentalPrice": 15.00,
  "description": "O início da saga mágica mais famosa do mundo"
}
```

---

## 👤 TESTANDO USUÁRIOS

As rotas de usuários funcionam de forma similar:

### Criar Usuário (POST)
```http
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

### Listar Usuários (GET)
```http
GET http://localhost:3000/users
```

### Buscar Usuário por ID (GET)
```http
GET http://localhost:3000/users/1
```

### Atualizar Usuário (PUT)
```http
PUT http://localhost:3000/users/1
Content-Type: application/json

{
  "name": "João Silva Atualizado",
  "email": "joao.novo@email.com"
}
```

### Deletar Usuário (DELETE)
```http
DELETE http://localhost:3000/users/1
```

---

## 🎯 Sequência de Testes Recomendada

Para apresentar ao professor, siga esta ordem:

### Fluxo Básico (CRUD):
1. **Criar 3 livros** (POST /books) com diferentes dados
2. **Listar todos os livros** (GET /books) - mostre os 3 livros criados
3. **Buscar livro específico** (GET /books/1) - busque por ID
4. **Atualizar um livro** (PUT /books/1) - altere o preço
5. **Deletar um livro** (DELETE /books/3) - delete o último
6. **Listar novamente** (GET /books) - mostre que agora só tem 2 livros

### Fluxo Avançado (Buscas e Filtros):
7. **Buscar por ISBN** (GET /books/isbn/978-0451524935)
8. **Buscar por autor** (GET /books/author/Tolkien)
9. **Buscar por gênero** (GET /books/genre/Fantasia)
10. **Buscar com filtros** (GET /books/search?minPrice=50&available=true)
11. **Ver estatísticas** (GET /books/stats)

### Fluxo de Disponibilidade:
12. **Marcar como indisponível** (PATCH /books/1/unavailable)
13. **Verificar disponibilidade** (GET /books/1/availability)
14. **Listar apenas disponíveis** (GET /books/available)
15. **Marcar como disponível** (PATCH /books/1/available)

### Usuários:
16. **Criar 2 usuários** (POST /users)
17. **Listar usuários** (GET /users)
18. **Buscar usuário** (GET /users/1)
19. **Atualizar usuário** (PUT /users/1)

---

## 🔍 Como Interpretar os Códigos de Resposta

| Código                    | Significado      | Quando aparece                            |
| ------------------------- | ---------------- | ----------------------------------------- |
| 200 OK                    | Sucesso          | GET, PUT, PATCH, DELETE bem-sucedidos     |
| 201 Created               | Criado           | POST bem-sucedido                         |
| 400 Bad Request           | Dados inválidos  | Campos obrigatórios faltando, ID inválido |
| 404 Not Found             | Não encontrado   | ID ou ISBN não existe                     |
| 409 Conflict              | Conflito         | ISBN duplicado                            |
| 500 Internal Server Error | Erro no servidor | Erro de banco, código, etc.               |

---

## ⚠️ Problemas Comuns

### 1. "Cannot POST /books" ou "Cannot GET /books"
- **Causa:** Servidor não está rodando
- **Solução:** Execute `npm run dev`

### 2. "ECONNREFUSED"
- **Causa:** URL errada ou servidor não está rodando
- **Solução:** Verifique se a URL é `http://localhost:3000` e se o servidor está ativo

### 3. "Livro com ID X não encontrado"
- **Causa:** ID não existe no banco
- **Solução:** Use um ID válido (liste os livros primeiro com GET /books)

### 4. "Já existe um livro com o ISBN..."
- **Causa:** ISBN duplicado
- **Solução:** Use um ISBN diferente

### 5. "O título é obrigatório" ou similar
- **Causa:** Campo obrigatório não enviado
- **Solução:** Verifique se todos os campos obrigatórios estão no body

### 6. Servidor resetou e perdeu dados
- **Causa:** O código está com `sync({ force: true })` que recria as tabelas
- **Solução:** Normal para desenvolvimento. Recadastre os dados ou mude para `sync()`

---

## 💡 Dicas para a Apresentação

1. **Prepare alguns livros antes** - tenha os JSONs prontos para copiar/colar
2. **Mostre a progressão** - crie, liste, busque, atualize, delete
3. **Demonstre as buscas avançadas** - filtros por gênero, autor, preço
4. **Use as estatísticas** - mostre o endpoint /books/stats
5. **Explique os códigos HTTP** - 200, 201, 400, 404, 409
6. **Mostre o terminal** - destaque as mensagens de sucesso
7. **Tenha o banco pronto** - evite erros de conexão durante a demo

---

## ✅ Checklist Antes de Apresentar

- [ ] Servidor rodando (`npm run dev`)
- [ ] Postman aberto e coleção importada
- [ ] Pelo menos 5 livros cadastrados (de diferentes gêneros)
- [ ] Testou todas as rotas pelo menos uma vez
- [ ] Testou os filtros de busca
- [ ] Terminal visível mostrando logs
- [ ] Conexão com banco funcionando

---

**Boa sorte na apresentação! 🚀**
