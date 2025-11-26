# 🧪 Como Testar no Postman - Guia Completo

## 📥 Importando a Coleção (Método Rápido)

### Opção 1: Importar a coleção pronta

1. Abra o Postman
2. Clique em **"Import"** (canto superior esquerdo)
3. Selecione o arquivo `Postman_Collection.json`
4. Pronto! Todas as requisições já estarão configuradas

---

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
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "isbn": "978-0451524935",
  "publishedYear": 1949,
  "genre": "Ficção Científica",
  "price": "45.90",
  "rentalPrice": "12.50",
  "available": true,
  "description": "Um clássico da literatura distópica"
}
```

---

### 2️⃣ LISTAR TODOS OS LIVROS (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/books`

**Resposta Esperada (200 OK):**
```json
[
  {
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "isbn": "978-0451524935",
    "publishedYear": 1949,
    "genre": "Ficção Científica",
    "price": "45.90",
    "rentalPrice": "12.50",
    "available": true,
    "description": "Um clássico da literatura distópica"
  }
]
```

---

### 3️⃣ BUSCAR LIVRO POR ID (GET)

**Configuração:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/books/1`

**Resposta Esperada (200 OK):**
```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "isbn": "978-0451524935",
  "publishedYear": 1949,
  "genre": "Ficção Científica",
  "price": "45.90",
  "rentalPrice": "12.50",
  "available": true,
  "description": "Um clássico da literatura distópica"
}
```

**Se não encontrar (404 Not Found):**
```json
{
  "message": "Livro não encontrado"
}
```

---

### 4️⃣ ATUALIZAR LIVRO (PUT)

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
  "available": false
}
```

**Resposta Esperada (200 OK):**
```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "isbn": "978-0451524935",
  "publishedYear": 1949,
  "genre": "Ficção Científica",
  "price": "39.90",
  "rentalPrice": "12.50",
  "available": false,
  "description": "Um clássico da literatura distópica"
}
```

---

### 5️⃣ DELETAR LIVRO (DELETE)

**Configuração:**
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/books/1`

**Resposta Esperada (200 OK):**
```json
{
  "message": "Livro deletado com sucesso",
  "book": {
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "isbn": "978-0451524935",
    "publishedYear": 1949,
    "genre": "Ficção Científica",
    "price": "39.90",
    "rentalPrice": "12.50",
    "available": false,
    "description": "Um clássico da literatura distópica"
  }
}
```

---

## 📚 Mais Exemplos de Livros para Cadastrar

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

1. **Criar 3 livros** (POST /books) com diferentes dados
2. **Listar todos os livros** (GET /books) - mostre os 3 livros criados
3. **Buscar livro específico** (GET /books/2) - busque o livro do meio
4. **Atualizar um livro** (PUT /books/1) - altere o preço ou disponibilidade
5. **Deletar um livro** (DELETE /books/3) - delete o último
6. **Listar novamente** (GET /books) - mostre que agora só tem 2 livros

7. **Criar 2 usuários** (POST /users)
8. **Listar usuários** (GET /users)
9. **Buscar usuário** (GET /users/1)
10. **Atualizar usuário** (PUT /users/1)

---

## 🔍 Como Interpretar os Códigos de Resposta

| Código                    | Significado      | Quando aparece                 |
| ------------------------- | ---------------- | ------------------------------ |
| 200 OK                    | Sucesso          | GET, PUT, DELETE bem-sucedidos |
| 201 Created               | Criado           | POST bem-sucedido              |
| 404 Not Found             | Não encontrado   | ID não existe                  |
| 500 Internal Server Error | Erro no servidor | Erro de banco, código, etc.    |

---

## ⚠️ Problemas Comuns

### 1. "Cannot POST /books" ou "Cannot GET /books"
- **Causa:** Servidor não está rodando
- **Solução:** Execute `npm run dev`

### 2. "ECONNREFUSED"
- **Causa:** URL errada ou servidor não está rodando
- **Solução:** Verifique se a URL é `http://localhost:3000` e se o servidor está ativo

### 3. "Livro não encontrado"
- **Causa:** ID não existe no banco
- **Solução:** Use um ID válido (liste os livros primeiro com GET /books)

### 4. Erro 500 com "Validation error"
- **Causa:** ISBN duplicado (já existe)
- **Solução:** Use um ISBN diferente

### 5. Servidor resetou e perdeu dados
- **Causa:** O código está com `sync({ force: true })` que recria as tabelas
- **Solução:** Normal para desenvolvimento. Recadastre os dados ou mude para `sync()`

---

## 💡 Dicas para a Apresentação

1. **Prepare alguns livros antes** - tenha os JSONs prontos para copiar/colar
2. **Mostre a progressão** - crie, liste, busque, atualize, delete
3. **Explique os códigos HTTP** - 200, 201, 404, etc.
4. **Mostre o terminal** - destaque as mensagens de sucesso
5. **Tenha o banco pronto** - evite erros de conexão durante a demo

---

## ✅ Checklist Antes de Apresentar

- [ ] Servidor rodando (`npm run dev`)
- [ ] Postman aberto e coleção importada
- [ ] Pelo menos 3 livros cadastrados
- [ ] Testou todas as rotas pelo menos uma vez
- [ ] Terminal visível mostrando logs
- [ ] Conexão com banco funcionando

---

**Boa sorte na apresentação! 🚀**
