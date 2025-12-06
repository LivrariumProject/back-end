# 📚 Livrarium Project - Backend API

O **Livrarium Project** é uma plataforma de livraria digital desenvolvida para facilitar a **compra** e **aluguel** de livros digitais. O sistema oferece uma API RESTful completa para gerenciamento de usuários, catálogo de livros, transações de compra e controle de aluguéis.

Este projeto está sendo desenvolvido como parte da disciplina **Princípios de Desenvolvimento Web**, do curso de Ciência da Computação.

## 🚀 Funcionalidades

### 📚 Gestão de Livros
- CRUD completo de livros
- Busca por título, autor, gênero e ISBN
- Filtros avançados (preço, disponibilidade, ano)
- Controle de disponibilidade
- Estatísticas do catálogo

### 👤 Gestão de Usuários
- CRUD completo de usuários
- Busca por nome e email
- Validação de dados (email, senha)
- Estatísticas de usuários

### 🛒 Sistema de Compras
- Compra de livros digitais
- Múltiplos métodos de pagamento
- Controle de status de pagamento
- Reembolso de compras
- Histórico de compras por usuário
- Verificação de compras anteriores

### 📖 Sistema de Aluguéis
- Aluguel de livros por período (1-30 dias)
- Controle de devolução
- Detecção automática de atrasos
- Renovação de aluguéis
- Estatísticas de aluguéis

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição                 |
| ---------- | ------------------------- |
| Node.js    | Plataforma JavaScript     |
| TypeScript | Tipagem estática          |
| Express    | Framework web             |
| Sequelize  | ORM para banco de dados   |
| PostgreSQL | Banco de dados relacional |

## 🏗️ Arquitetura

O projeto segue uma **arquitetura em camadas** (Layered Architecture):

```
┌─────────────────────────────────────────────────────────────┐
│                        ROUTES                               │
│         (Define endpoints e mapeia para controllers)        │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                      CONTROLLERS                            │
│        (Manipula HTTP requests/responses)                   │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                       SERVICES                              │
│           (Lógica de negócio e validações)                  │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                     REPOSITORIES                            │
│              (Acesso ao banco de dados)                     │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                        MODELS                               │
│            (Definição das entidades/tabelas)                │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Estrutura do Projeto

```
back-end/
├── src/
│   ├── config/
│   │   └── database.ts           # Configuração do Sequelize
│   ├── controllers/
│   │   ├── BookController.ts     # Controller de Livros
│   │   ├── UserController.ts     # Controller de Usuários
│   │   ├── PurchaseController.ts # Controller de Compras
│   │   └── RentalController.ts   # Controller de Aluguéis
│   ├── dtos/
│   │   ├── BookDTO.ts            # DTOs de Livros
│   │   ├── UserDTO.ts            # DTOs de Usuários
│   │   ├── PurchaseDTO.ts        # DTOs de Compras
│   │   └── RentalDTO.ts          # DTOs de Aluguéis
│   ├── errors/
│   │   └── AppError.ts           # Classes de erros customizados
│   ├── middlewares/
│   │   └── errorHandler.ts       # Middleware de tratamento de erros
│   ├── models/
│   │   ├── Book.ts               # Modelo de Livro
│   │   ├── User.ts               # Modelo de Usuário
│   │   ├── Purchase.ts           # Modelo de Compra
│   │   └── Rental.ts             # Modelo de Aluguel
│   ├── repository/
│   │   ├── BookRepository.ts     # Repositório de Livros
│   │   ├── UserRepository.ts     # Repositório de Usuários
│   │   ├── PurchaseRepository.ts # Repositório de Compras
│   │   └── RentalRepository.ts   # Repositório de Aluguéis
│   ├── routes/
│   │   ├── bookRoutes.ts         # Rotas de Livros
│   │   ├── userRoutes.ts         # Rotas de Usuários
│   │   ├── purchaseRoutes.ts     # Rotas de Compras
│   │   └── rentalRoutes.ts       # Rotas de Aluguéis
│   ├── services/
│   │   ├── BookService.ts        # Service de Livros
│   │   ├── UserService.ts        # Service de Usuários
│   │   ├── PurchaseService.ts    # Service de Compras
│   │   └── RentalService.ts      # Service de Aluguéis
│   └── index.ts                  # Arquivo principal
├── .env                          # Variáveis de ambiente
├── package.json
├── tsconfig.json
├── COMO_TESTAR_POSTMAN.md        # Guia de testes no Postman
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### 1. Clonar o repositório
```bash
git clone https://github.com/LivrariumProject/back-end.git
cd back-end
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz:
```env
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=livrarium
PORT=3000
```

### 4. Criar o banco de dados
```bash
createdb livrarium
```

### 5. Iniciar o servidor
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## 📡 API Endpoints

### 📚 Livros (`/books`)

| Método   | Rota                     | Descrição                |
| -------- | ------------------------ | ------------------------ |
| `GET`    | `/books`                 | Listar todos             |
| `GET`    | `/books/search`          | Buscar com filtros       |
| `GET`    | `/books/available`       | Listar disponíveis       |
| `GET`    | `/books/stats`           | Estatísticas             |
| `GET`    | `/books/isbn/:isbn`      | Buscar por ISBN          |
| `GET`    | `/books/author/:author`  | Buscar por autor         |
| `GET`    | `/books/genre/:genre`    | Buscar por gênero        |
| `GET`    | `/books/:id`             | Buscar por ID            |
| `POST`   | `/books`                 | Criar livro              |
| `PUT`    | `/books/:id`             | Atualizar livro          |
| `PATCH`  | `/books/:id/available`   | Marcar como disponível   |
| `PATCH`  | `/books/:id/unavailable` | Marcar como indisponível |
| `DELETE` | `/books/:id`             | Deletar livro            |

### 👤 Usuários (`/users`)

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

### 🛒 Compras (`/purchases`)

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

### 📖 Aluguéis (`/rentals`)

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

## 💳 Métodos de Pagamento

- `credit_card` - Cartão de crédito
- `debit_card` - Cartão de débito
- `pix` - PIX
- `boleto` - Boleto bancário

## 📊 Status

### Status de Pagamento
| Status      | Descrição             |
| ----------- | --------------------- |
| `pending`   | Aguardando pagamento  |
| `completed` | Pagamento confirmado  |
| `failed`    | Pagamento falhou      |
| `refunded`  | Pagamento reembolsado |

### Status de Aluguel
| Status     | Descrição                          |
| ---------- | ---------------------------------- |
| `active`   | Aluguel ativo, livro com o usuário |
| `returned` | Livro devolvido                    |
| `overdue`  | Aluguel atrasado                   |

## 🧪 Testes

Consulte o arquivo `COMO_TESTAR_POSTMAN.md` para instruções detalhadas de como testar a API usando o Postman.

## ⚠️ Observações

- O projeto está configurado com `sync({ force: true })`, que recria as tabelas a cada reinicialização
- Para produção, altere para `sync({ alter: true })` ou `sync()`
- As senhas dos usuários não são retornadas nas respostas por segurança

## 👨‍💻 Autores

Desenvolvido para a disciplina de **Programação Web** - Ciência da Computação.

## 📄 Licença

Este projeto está sob a licença ISC.
