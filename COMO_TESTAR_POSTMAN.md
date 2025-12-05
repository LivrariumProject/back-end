# 🧪 Como Testar no Postman - Guia Completo

## 🧪 Testando Manualmente (Passo a Passo)

Se preferir criar as requisições do zero, siga este guia:

---

# 📚 TESTANDO LIVROS

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

---

### 2️⃣ LISTAR TODOS OS LIVROS (GET)

- **URL:** `http://localhost:3000/books`

### 3️⃣ BUSCAR LIVRO POR ID (GET)

- **URL:** `http://localhost:3000/books/1`

### 4️⃣ BUSCAR POR ISBN (GET)

- **URL:** `http://localhost:3000/books/isbn/978-0451524935`

### 5️⃣ BUSCAR POR AUTOR (GET)

- **URL:** `http://localhost:3000/books/author/George Orwell`

### 6️⃣ BUSCAR POR GÊNERO (GET)

- **URL:** `http://localhost:3000/books/genre/Fantasia`

### 7️⃣ BUSCAR COM FILTROS (GET)

- **URL:** `http://localhost:3000/books/search?genre=Fantasia&available=true`

### 8️⃣ LISTAR DISPONÍVEIS (GET)

- **URL:** `http://localhost:3000/books/available`

### 9️⃣ ESTATÍSTICAS (GET)

- **URL:** `http://localhost:3000/books/stats`

### 🔟 ATUALIZAR LIVRO (PUT)

- **URL:** `http://localhost:3000/books/1`

### 1️⃣1️⃣ DELETAR LIVRO (DELETE)

- **URL:** `http://localhost:3000/books/1`

---

## 📋 Resumo - Rotas de Livros

| Método   | Rota                      | Descrição                 |
| -------- | ------------------------- | ------------------------- |
| `GET`    | `/books`                  | Listar todos              |
| `GET`    | `/books/search`           | Buscar com filtros        |
| `GET`    | `/books/available`        | Listar disponíveis        |
| `GET`    | `/books/stats`            | Estatísticas              |
| `GET`    | `/books/isbn/:isbn`       | Buscar por ISBN           |
| `GET`    | `/books/author/:author`   | Buscar por autor          |
| `GET`    | `/books/genre/:genre`     | Buscar por gênero         |
| `GET`    | `/books/:id`              | Buscar por ID             |
| `GET`    | `/books/:id/availability` | Verificar disponibilidade |
| `POST`   | `/books`                  | Criar livro               |
| `PUT`    | `/books/:id`              | Atualizar livro           |
| `PATCH`  | `/books/:id/available`    | Marcar como disponível    |
| `PATCH`  | `/books/:id/unavailable`  | Marcar como indisponível  |
| `DELETE` | `/books/:id`              | Deletar livro             |

---

## 📚 Exemplos de Livros

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

---

# 👤 TESTANDO USUÁRIOS

---

### 1️⃣ CRIAR UM USUÁRIO (POST)

**Configuração:**
- **Método:** `POST`
- **URL:** `http://localhost:3000/users`
- **Headers:**
  - Key: `Content-Type`
  - Value: `application/json`

**Body (raw JSON):**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta Esperada (201 Created):**
```json
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "data": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com"
  }
}
```

> ⚠️ **Nota:** A senha NÃO é retornada na resposta por questões de segurança.

---

### 2️⃣ LISTAR TODOS OS USUÁRIOS (GET)

- **URL:** `http://localhost:3000/users`

### 3️⃣ BUSCAR USUÁRIO POR ID (GET)

- **URL:** `http://localhost:3000/users/1`

### 4️⃣ BUSCAR POR EMAIL (GET)

- **URL:** `http://localhost:3000/users/email/joao@email.com`

### 5️⃣ BUSCAR POR NOME (GET)

- **URL:** `http://localhost:3000/users/name/João`

### 6️⃣ BUSCAR COM FILTROS (GET)

- **URL:** `http://localhost:3000/users/search?name=João&email=email.com`

### 7️⃣ ESTATÍSTICAS (GET)

- **URL:** `http://localhost:3000/users/stats`

### 8️⃣ ATUALIZAR USUÁRIO (PUT)

- **URL:** `http://localhost:3000/users/1`

### 9️⃣ DELETAR USUÁRIO (DELETE)

- **URL:** `http://localhost:3000/users/1`

---

## 📋 Resumo - Rotas de Usuários

| Método   | Rota                  | Descrição          |
| -------- | --------------------- | ------------------ |
| `GET`    | `/users`              | Listar todos       |
| `GET`    | `/users/search`       | Buscar com filtros |
| `GET`    | `/users/stats`        | Estatísticas       |
| `GET`    | `/users/email/:email` | Buscar por email   |
| `GET`    | `/users/name/:name`   | Buscar por nome    |
| `GET`    | `/users/:id`          | Buscar por ID      |
| `POST`   | `/users`              | Criar usuário      |
| `PUT`    | `/users/:id`          | Atualizar usuário  |
| `DELETE` | `/users/:id`          | Deletar usuário    |

---

## 👥 Exemplos de Usuários

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

```json
{
  "name": "Maria Santos",
  "email": "maria@email.com",
  "password": "maria456"
}
```

```json
{
  "name": "Pedro Oliveira",
  "email": "pedro@gmail.com",
  "password": "pedro789"
}
```

---

# 🛒 TESTANDO COMPRAS

---

### 1️⃣ CRIAR UMA COMPRA (POST)

**Configuração:**
- **Método:** `POST`
- **URL:** `http://localhost:3000/purchases`
- **Headers:**
  - Key: `Content-Type`
  - Value: `application/json`

**Body (raw JSON):**
```json
{
  "userId": 1,
  "bookId": 1,
  "paymentMethod": "credit_card"
}
```

> 💡 **Métodos de pagamento aceitos:** `credit_card`, `debit_card`, `pix`, `boleto`

**Resposta Esperada (201 Created):**
```json
{
  "success": true,
  "message": "Compra realizada com sucesso",
  "data": {
    "id": 1,
    "userId": 1,
    "bookId": 1,
    "price": 45.90,
    "paymentMethod": "credit_card",
    "paymentStatus": "pending",
    "purchaseDate": "2025-12-05T10:30:00.000Z",
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "joao@email.com"
    },
    "book": {
      "id": 1,
      "title": "1984",
      "author": "George Orwell",
      "isbn": "978-0451524935"
    }
  }
}
```

**Se usuário não existir (404 Not Found):**
```json
{
  "success": false,
  "message": "Usuário com ID 99 não encontrado",
  "statusCode": 404
}
```

**Se livro não existir (404 Not Found):**
```json
{
  "success": false,
  "message": "Livro com ID 99 não encontrado",
  "statusCode": 404
}
```

**Se método de pagamento inválido (400 Bad Request):**
```json
{
  "success": false,
  "message": "Método de pagamento 'cash' inválido. Use: credit_card, debit_card, pix ou boleto",
  "statusCode": 400
}
```

---

### 2️⃣ LISTAR TODAS AS COMPRAS (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/purchases`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "bookId": 1,
      "price": 45.90,
      "paymentMethod": "credit_card",
      "paymentStatus": "completed",
      "purchaseDate": "2025-12-05T10:30:00.000Z",
      "user": { "id": 1, "name": "João Silva", "email": "joao@email.com" },
      "book": { "id": 1, "title": "1984", "author": "George Orwell" }
    },
    {
      "id": 2,
      "userId": 2,
      "bookId": 2,
      "price": 89.90,
      "paymentMethod": "pix",
      "paymentStatus": "pending",
      "purchaseDate": "2025-12-05T11:00:00.000Z",
      "user": { "id": 2, "name": "Maria Santos", "email": "maria@email.com" },
      "book": { "id": 2, "title": "O Senhor dos Anéis", "author": "J.R.R. Tolkien" }
    }
  ]
}
```

---

### 3️⃣ BUSCAR COMPRA POR ID (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/purchases/1`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "userId": 1,
    "bookId": 1,
    "price": 45.90,
    "paymentMethod": "credit_card",
    "paymentStatus": "pending",
    "purchaseDate": "2025-12-05T10:30:00.000Z",
    "user": { "id": 1, "name": "João Silva", "email": "joao@email.com" },
    "book": { "id": 1, "title": "1984", "author": "George Orwell", "isbn": "978-0451524935", "price": 45.90 }
  }
}
```

---

### 4️⃣ BUSCAR COMPRAS POR USUÁRIO (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/purchases/user/1`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "bookId": 1,
      "price": 45.90,
      "paymentMethod": "credit_card",
      "paymentStatus": "completed",
      "purchaseDate": "2025-12-05T10:30:00.000Z",
      "book": { "id": 1, "title": "1984", "author": "George Orwell" }
    }
  ]
}
```

---

### 5️⃣ BUSCAR COMPRAS POR LIVRO (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/purchases/book/1`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "bookId": 1,
      "price": 45.90,
      "paymentMethod": "credit_card",
      "paymentStatus": "completed",
      "purchaseDate": "2025-12-05T10:30:00.000Z",
      "user": { "id": 1, "name": "João Silva", "email": "joao@email.com" }
    }
  ]
}
```

---

### 6️⃣ VERIFICAR SE USUÁRIO JÁ COMPROU UM LIVRO (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/purchases/check/1/1`
  - Primeiro parâmetro: `userId`
  - Segundo parâmetro: `bookId`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "bookId": 1,
    "hasPurchased": true
  }
}
```

---

### 7️⃣ BUSCAR COMPRAS COM FILTROS (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/purchases/search`
- **Query Params (opcionais):**
  - `userId` - ID do usuário
  - `bookId` - ID do livro
  - `paymentStatus` - Status: `pending`, `completed`, `failed`, `refunded`
  - `paymentMethod` - Método: `credit_card`, `debit_card`, `pix`, `boleto`
  - `startDate` - Data inicial (formato ISO)
  - `endDate` - Data final (formato ISO)

**Exemplos de URL:**
```
http://localhost:3000/purchases/search?paymentStatus=pending
http://localhost:3000/purchases/search?paymentMethod=pix
http://localhost:3000/purchases/search?userId=1&paymentStatus=completed
http://localhost:3000/purchases/search?startDate=2025-01-01&endDate=2025-12-31
```

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "filters": {
    "paymentStatus": "pending"
  },
  "data": [
    {
      "id": 2,
      "userId": 2,
      "bookId": 2,
      "price": 89.90,
      "paymentMethod": "pix",
      "paymentStatus": "pending",
      ...
    }
  ]
}
```

---

### 8️⃣ OBTER ESTATÍSTICAS DE COMPRAS (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/purchases/stats`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 10,
    "pending": 3,
    "completed": 5,
    "failed": 1,
    "refunded": 1,
    "totalRevenue": 450.50
  }
}
```

---

### 9️⃣ CONFIRMAR PAGAMENTO (PATCH)

**Configuração:**
- **Método:** `PATCH`
- **URL:** `http://localhost:3000/purchases/1/confirm`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "message": "Pagamento confirmado com sucesso",
  "data": {
    "id": 1,
    "userId": 1,
    "bookId": 1,
    "price": 45.90,
    "paymentMethod": "credit_card",
    "paymentStatus": "completed",
    ...
  }
}
```

**Se já foi confirmado (400 Bad Request):**
```json
{
  "success": false,
  "message": "A compra com ID 1 já foi completada",
  "statusCode": 400
}
```

---

### 🔟 MARCAR PAGAMENTO COMO FALHO (PATCH)

**Configuração:**
- **Método:** `PATCH`
- **URL:** `http://localhost:3000/purchases/1/fail`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "message": "Pagamento marcado como falho",
  "data": {
    "id": 1,
    "paymentStatus": "failed",
    ...
  }
}
```

---

### 1️⃣1️⃣ REEMBOLSAR COMPRA (PATCH)

**Configuração:**
- **Método:** `PATCH`
- **URL:** `http://localhost:3000/purchases/1/refund`

> ⚠️ **Nota:** Só é possível reembolsar compras com pagamento `completed`.

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "message": "Compra reembolsada com sucesso",
  "data": {
    "id": 1,
    "paymentStatus": "refunded",
    ...
  }
}
```

**Se não foi completada (400 Bad Request):**
```json
{
  "success": false,
  "message": "Só é possível reembolsar compras com pagamento completado",
  "statusCode": 400
}
```

---

### 1️⃣2️⃣ DELETAR COMPRA (DELETE)

**Configuração:**
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/purchases/1`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "message": "Compra deletada com sucesso",
  "data": {
    "id": 1,
    "userId": 1,
    "bookId": 1,
    ...
  }
}
```

---

## 📋 Resumo - Rotas de Compras

| Método   | Rota                               | Descrição               |
| -------- | ---------------------------------- | ----------------------- |
| `GET`    | `/purchases`                       | Listar todas            |
| `GET`    | `/purchases/search`                | Buscar com filtros      |
| `GET`    | `/purchases/stats`                 | Estatísticas            |
| `GET`    | `/purchases/user/:userId`          | Compras de um usuário   |
| `GET`    | `/purchases/book/:bookId`          | Compras de um livro     |
| `GET`    | `/purchases/check/:userId/:bookId` | Verificar se já comprou |
| `GET`    | `/purchases/:id`                   | Buscar por ID           |
| `POST`   | `/purchases`                       | Criar compra            |
| `PATCH`  | `/purchases/:id/confirm`           | Confirmar pagamento     |
| `PATCH`  | `/purchases/:id/fail`              | Marcar como falho       |
| `PATCH`  | `/purchases/:id/refund`            | Reembolsar              |
| `DELETE` | `/purchases/:id`                   | Deletar compra          |

---

## 🛒 Exemplos de Compras

```json
{
  "userId": 1,
  "bookId": 1,
  "paymentMethod": "credit_card"
}
```

```json
{
  "userId": 2,
  "bookId": 2,
  "paymentMethod": "pix"
}
```

```json
{
  "userId": 1,
  "bookId": 3,
  "paymentMethod": "boleto"
}
```

---

# 📖 TESTANDO ALUGUÉIS

---

### 1️⃣ CRIAR UM ALUGUEL (POST)

**Configuração:**
- **Método:** `POST`
- **URL:** `http://localhost:3000/rentals`
- **Headers:**
  - Key: `Content-Type`
  - Value: `application/json`

**Body (raw JSON):**
```json
{
  "userId": 1,
  "bookId": 1,
  "paymentMethod": "credit_card",
  "rentalDays": 7
}
```

> 💡 **Período de aluguel:** Mínimo 1 dia, máximo 30 dias.

**Resposta Esperada (201 Created):**
```json
{
  "success": true,
  "message": "Aluguel realizado com sucesso",
  "data": {
    "id": 1,
    "userId": 1,
    "bookId": 1,
    "rentalPrice": 12.50,
    "paymentMethod": "credit_card",
    "paymentStatus": "pending",
    "rentalStatus": "active",
    "rentalDate": "2025-12-05T10:30:00.000Z",
    "dueDate": "2025-12-12T10:30:00.000Z",
    "daysRemaining": 7,
    "isOverdue": false,
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "joao@email.com"
    },
    "book": {
      "id": 1,
      "title": "1984",
      "author": "George Orwell",
      "isbn": "978-0451524935"
    }
  }
}
```

**Se período inválido (400 Bad Request):**
```json
{
  "success": false,
  "message": "O período de aluguel deve ser entre 1 e 30 dias",
  "statusCode": 400
}
```

---

### 2️⃣ LISTAR TODOS OS ALUGUÉIS (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/rentals`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "bookId": 1,
      "rentalPrice": 12.50,
      "paymentMethod": "credit_card",
      "paymentStatus": "completed",
      "rentalStatus": "active",
      "rentalDate": "2025-12-05T10:30:00.000Z",
      "dueDate": "2025-12-12T10:30:00.000Z",
      "daysRemaining": 5,
      "isOverdue": false,
      "user": { "id": 1, "name": "João Silva" },
      "book": { "id": 1, "title": "1984" }
    }
  ]
}
```

---

### 3️⃣ BUSCAR ALUGUEL POR ID (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/rentals/1`

---

### 4️⃣ BUSCAR ALUGUÉIS POR USUÁRIO (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/rentals/user/1`

---

### 5️⃣ BUSCAR ALUGUÉIS ATIVOS DE UM USUÁRIO (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/rentals/user/1/active`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "rentalStatus": "active",
      "daysRemaining": 5,
      "isOverdue": false,
      "book": { "id": 1, "title": "1984" }
    }
  ]
}
```

---

### 6️⃣ BUSCAR ALUGUÉIS POR LIVRO (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/rentals/book/1`

---

### 7️⃣ LISTAR ALUGUÉIS ATIVOS (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/rentals/active`

---

### 8️⃣ LISTAR ALUGUÉIS ATRASADOS (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/rentals/overdue`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 3,
      "rentalStatus": "active",
      "dueDate": "2025-12-01T10:30:00.000Z",
      "daysRemaining": 0,
      "isOverdue": true,
      "user": { "id": 2, "name": "Maria Santos" },
      "book": { "id": 2, "title": "O Senhor dos Anéis" }
    }
  ]
}
```

---

### 9️⃣ BUSCAR ALUGUÉIS COM FILTROS (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/rentals/search`
- **Query Params (opcionais):**
  - `userId` - ID do usuário
  - `bookId` - ID do livro
  - `paymentStatus` - Status: `pending`, `completed`, `failed`, `refunded`
  - `rentalStatus` - Status: `active`, `returned`, `overdue`
  - `startDate` - Data inicial (formato ISO)
  - `endDate` - Data final (formato ISO)

**Exemplos de URL:**
```
http://localhost:3000/rentals/search?rentalStatus=active
http://localhost:3000/rentals/search?paymentStatus=pending
http://localhost:3000/rentals/search?userId=1&rentalStatus=active
```

---

### 🔟 OBTER ESTATÍSTICAS DE ALUGUÉIS (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/rentals/stats`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 15,
    "active": 5,
    "returned": 8,
    "overdue": 2,
    "pendingPayment": 3,
    "completedPayment": 12,
    "totalRevenue": 187.50
  }
}
```

---

### 1️⃣1️⃣ DEVOLVER LIVRO (PATCH)

**Configuração:**
- **Método:** `PATCH`
- **URL:** `http://localhost:3000/rentals/1/return`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "message": "Livro devolvido com sucesso",
  "data": {
    "id": 1,
    "rentalStatus": "returned",
    "returnDate": "2025-12-10T15:00:00.000Z",
    ...
  }
}
```

**Se já foi devolvido (400 Bad Request):**
```json
{
  "success": false,
  "message": "O aluguel com ID 1 já foi devolvido",
  "statusCode": 400
}
```

---

### 1️⃣2️⃣ CONFIRMAR PAGAMENTO DO ALUGUEL (PATCH)

**Configuração:**
- **Método:** `PATCH`
- **URL:** `http://localhost:3000/rentals/1/confirm`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "message": "Pagamento confirmado com sucesso",
  "data": {
    "id": 1,
    "paymentStatus": "completed",
    ...
  }
}
```

---

### 1️⃣3️⃣ RENOVAR ALUGUEL (PATCH)

**Configuração:**
- **Método:** `PATCH`
- **URL:** `http://localhost:3000/rentals/1/renew`
- **Headers:**
  - Key: `Content-Type`
  - Value: `application/json`

**Body (raw JSON):**
```json
{
  "additionalDays": 7,
  "paymentMethod": "pix"
}
```

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "message": "Aluguel renovado com sucesso",
  "data": {
    "id": 1,
    "rentalStatus": "active",
    "dueDate": "2025-12-19T10:30:00.000Z",
    "daysRemaining": 14,
    ...
  }
}
```

**Se não está ativo (400 Bad Request):**
```json
{
  "success": false,
  "message": "O aluguel com ID 1 não está ativo",
  "statusCode": 400
}
```

---

### 1️⃣4️⃣ DELETAR ALUGUEL (DELETE)

**Configuração:**
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/rentals/1`

**Resposta Esperada (200 OK):**
```json
{
  "success": true,
  "message": "Aluguel deletado com sucesso",
  "data": {
    "id": 1,
    ...
  }
}
```

---

## 📋 Resumo - Rotas de Aluguéis

| Método   | Rota                           | Descrição              |
| -------- | ------------------------------ | ---------------------- |
| `GET`    | `/rentals`                     | Listar todos           |
| `GET`    | `/rentals/search`              | Buscar com filtros     |
| `GET`    | `/rentals/stats`               | Estatísticas           |
| `GET`    | `/rentals/active`              | Listar ativos          |
| `GET`    | `/rentals/overdue`             | Listar atrasados       |
| `GET`    | `/rentals/user/:userId`        | Aluguéis de um usuário |
| `GET`    | `/rentals/user/:userId/active` | Ativos de um usuário   |
| `GET`    | `/rentals/book/:bookId`        | Aluguéis de um livro   |
| `GET`    | `/rentals/:id`                 | Buscar por ID          |
| `POST`   | `/rentals`                     | Criar aluguel          |
| `PATCH`  | `/rentals/:id/return`          | Devolver livro         |
| `PATCH`  | `/rentals/:id/confirm`         | Confirmar pagamento    |
| `PATCH`  | `/rentals/:id/renew`           | Renovar aluguel        |
| `DELETE` | `/rentals/:id`                 | Deletar aluguel        |

---

## 📖 Exemplos de Aluguéis

```json
{
  "userId": 1,
  "bookId": 1,
  "paymentMethod": "credit_card",
  "rentalDays": 7
}
```

```json
{
  "userId": 2,
  "bookId": 2,
  "paymentMethod": "pix",
  "rentalDays": 14
}
```

```json
{
  "userId": 1,
  "bookId": 3,
  "paymentMethod": "debit_card",
  "rentalDays": 30
}
```

---

# 🎯 Sequência de Testes Recomendada

## Passo 1: Criar dados base
1. Criar 3 livros (POST /books)
2. Criar 2 usuários (POST /users)

## Passo 2: Testar compras
3. Criar uma compra (POST /purchases)
4. Listar compras (GET /purchases)
5. Confirmar pagamento (PATCH /purchases/1/confirm)
6. Ver estatísticas (GET /purchases/stats)
7. Verificar se usuário já comprou (GET /purchases/check/1/1)

## Passo 3: Testar aluguéis
8. Criar um aluguel de 7 dias (POST /rentals)
9. Listar aluguéis ativos (GET /rentals/active)
10. Confirmar pagamento (PATCH /rentals/1/confirm)
11. Renovar aluguel (PATCH /rentals/1/renew)
12. Devolver livro (PATCH /rentals/1/return)
13. Ver estatísticas (GET /rentals/stats)

---

# 🔍 Status de Pagamento

| Status      | Descrição             |
| ----------- | --------------------- |
| `pending`   | Aguardando pagamento  |
| `completed` | Pagamento confirmado  |
| `failed`    | Pagamento falhou      |
| `refunded`  | Pagamento reembolsado |

# 📖 Status de Aluguel

| Status     | Descrição                          |
| ---------- | ---------------------------------- |
| `active`   | Aluguel ativo, livro com o usuário |
| `returned` | Livro devolvido                    |
| `overdue`  | Aluguel atrasado                   |

# 💳 Métodos de Pagamento

| Método        | Descrição         |
| ------------- | ----------------- |
| `credit_card` | Cartão de crédito |
| `debit_card`  | Cartão de débito  |
| `pix`         | PIX               |
| `boleto`      | Boleto bancário   |

---

# 🔍 Códigos de Resposta

| Código | Significado      | Quando aparece                        |
| ------ | ---------------- | ------------------------------------- |
| 200    | Sucesso          | GET, PUT, PATCH, DELETE bem-sucedidos |
| 201    | Criado           | POST bem-sucedido                     |
| 400    | Dados inválidos  | Campos faltando, período inválido     |
| 402    | Pagamento falhou | Erro no processamento de pagamento    |
| 404    | Não encontrado   | ID não existe                         |
| 409    | Conflito         | ISBN ou email duplicado               |
| 500    | Erro no servidor | Erro de banco, código, etc.           |

---

# ✅ Checklist Antes de Apresentar

- [ ] Servidor rodando (`npm run dev`)
- [ ] Postman aberto
- [ ] Pelo menos 3 livros cadastrados
- [ ] Pelo menos 2 usuários cadastrados
- [ ] Pelo menos 2 compras criadas
- [ ] Pelo menos 2 aluguéis criados
- [ ] Testou confirmação de pagamento
- [ ] Testou devolução de livro
- [ ] Testou renovação de aluguel
- [ ] Terminal visível mostrando logs

---

**Boa sorte na apresentação! 🚀**
