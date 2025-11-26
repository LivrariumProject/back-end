# 📚 Biblioteca Digital - Backend API

Sistema de biblioteca digital onde é possível comprar ou alugar livros.

## 🎯 Funcionalidades

- ✅ CRUD completo de Usuários
- ✅ CRUD completo de Livros
- ✅ Integração com PostgreSQL
- ✅ API RESTful

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Plataforma JavaScript
- **TypeScript** - Tipagem estática
- **Express** - Framework web
- **Sequelize** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional

## 📁 Estrutura do Projeto

```
back-end/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuração do Sequelize
│   ├── models/
│   │   ├── User.ts              # Modelo de Usuário
│   │   └── Book.ts              # Modelo de Livro
│   ├── repository/
│   │   ├── UserRepository.ts    # Repositório de Usuários
│   │   └── BookRepository.ts    # Repositório de Livros
│   └── index.ts                 # Arquivo principal com rotas
├── .env                         # Variáveis de ambiente (criar)
├── package.json
├── tsconfig.json
├── TUTORIAL.md                  # Tutorial completo
└── Postman_Collection.json      # Coleção do Postman
```

## 🚀 Como Rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar banco de dados
Crie um arquivo `.env` na raiz com:
```env
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=biblioteca_digital
PORT=3000
```

### 3. Criar o banco de dados
```bash
createdb livrarium
```

### 4. Iniciar servidor
```bash
npm run dev
```

## 📡 Endpoints da API

### Livros
- `POST /books` - Criar livro
- `GET /books` - Listar todos os livros
- `GET /books/:id` - Buscar livro por ID
- `PUT /books/:id` - Atualizar livro
- `DELETE /books/:id` - Deletar livro

### Usuários
- `POST /users` - Criar usuário
- `GET /users` - Listar todos os usuários
- `GET /users/:id` - Buscar usuário por ID
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

## 📝 Modelo de Dados

### Book (Livro)
```typescript
{
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  price: number;
  rentalPrice: number;
  available: boolean;
  description?: string;
}
```

### User (Usuário)
```typescript
{
  id: number;
  name: string;
  email: string;
  password: string;
}
```

## 🧪 Testando com Postman

1. Importe o arquivo `Postman_Collection.json` no Postman
2. As requisições já estarão prontas para uso
3. Teste as rotas conforme necessário

## 📖 Documentação Completa

Consulte o arquivo `TUTORIAL.md` para instruções detalhadas e exemplos completos.

## ⚠️ Importante

O projeto está configurado com `sync({ force: true })`, que recria as tabelas a cada reinicialização.
Para produção, altere para `sync({ alter: true })` ou `sync()`.

## 👨‍💻 Autor

Desenvolvido para a disciplina de Programação Web.

---
