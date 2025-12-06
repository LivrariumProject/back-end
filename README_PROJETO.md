# 📚 Livrarium - Documentação Técnica do Projeto

## 📋 Visão Geral

O **Livrarium** é uma API RESTful para uma livraria digital que permite:
- Gerenciar catálogo de livros
- Gerenciar usuários
- Processar compras de livros digitais
- Gerenciar aluguéis de livros com controle de prazos

## 🏗️ Arquitetura do Sistema

### Padrão Arquitetural: Layered Architecture

O projeto implementa uma **arquitetura em camadas** que separa responsabilidades:

```
┌──────────────────────────────────────────────────────────────────┐
│                           CLIENT                                 │
│                    (Postman / Frontend)                          │
└─────────────────────────────┬────────────────────────────────────┘
                              │ HTTP Request
┌─────────────────────────────▼────────────────────────────────────┐
│                           ROUTES                                 │
│   • Define endpoints da API                                      │
│   • Mapeia URLs para métodos dos controllers                     │
│   Arquivos: bookRoutes.ts, userRoutes.ts, purchaseRoutes.ts...   │
└─────────────────────────────┬────────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────────┐
│                        CONTROLLERS                               │
│   • Recebe e valida requisições HTTP                             │
│   • Extrai dados do request (params, body, query)                │
│   • Chama os services apropriados                                │
│   • Formata e retorna respostas HTTP                             │
│   Arquivos: BookController.ts, UserController.ts...              │
└─────────────────────────────┬────────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────────┐
│                         SERVICES                                 │
│   • Implementa lógica de negócio                                 │
│   • Valida regras de negócio                                     │
│   • Orquestra operações entre repositories                       │
│   • Converte Models para DTOs                                    │
│   Arquivos: BookService.ts, UserService.ts...                    │
└─────────────────────────────┬────────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────────┐
│                       REPOSITORIES                               │
│   • Abstrai acesso ao banco de dados                             │
│   • Implementa operações CRUD                                    │
│   • Executa queries específicas                                  │
│   Arquivos: BookRepository.ts, UserRepository.ts...              │
└─────────────────────────────┬────────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────────┐
│                          MODELS                                  │
│   • Define estrutura das tabelas (Sequelize)                     │
│   • Define tipos e interfaces                                    │
│   • Configura relacionamentos                                    │
│   Arquivos: Book.ts, User.ts, Purchase.ts, Rental.ts             │
└─────────────────────────────┬────────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────────┐
│                       PostgreSQL                                 │
│                    (Banco de Dados)                              │
└──────────────────────────────────────────────────────────────────┘
```

### Outros Componentes

```
┌──────────────────────────────────────────────────────────────────┐
│                           DTOs                                   │
│   • Define tipos para entrada/saída de dados                     │
│   • CreateBookDTO, UpdateBookDTO, BookResponseDTO...             │
│   • Garante tipagem forte e validação                            │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                          ERRORS                                  │
│   • Classes de erro customizadas                                 │
│   • BookNotFoundError, DuplicateIsbnError...                     │
│   • Centraliza tratamento de exceções                            │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                       MIDDLEWARES                                │
│   • errorHandler: Trata erros de forma centralizada              │
│   • Retorna respostas padronizadas de erro                       │
└──────────────────────────────────────────────────────────────────┘
```

## 📊 Modelo de Dados

### Diagrama de Entidades

```
┌─────────────────┐       ┌─────────────────┐
│      USER       │       │      BOOK       │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ name            │       │ title           │
│ email (UNIQUE)  │       │ author          │
│ password        │       │ isbn (UNIQUE)   │
└────────┬────────┘       │ publishedYear   │
         │                │ genre           │
         │                │ price           │
         │                │ rentalPrice     │
         │                │ available       │
         │                │ description     │
         │                └────────┬────────┘
         │                         │
         │    ┌────────────────────┴────────────────────┐
         │    │                                         │
         ▼    ▼                                         ▼
┌─────────────────────┐                    ┌─────────────────────┐
│      PURCHASE       │                    │       RENTAL        │
├─────────────────────┤                    ├─────────────────────┤
│ id (PK)             │                    │ id (PK)             │
│ userId (FK)         │                    │ userId (FK)         │
│ bookId (FK)         │                    │ bookId (FK)         │
│ price               │                    │ rentalPrice         │
│ paymentMethod       │                    │ paymentMethod       │
│ paymentStatus       │                    │ paymentStatus       │
│ purchaseDate        │                    │ rentalStatus        │
│ createdAt           │                    │ rentalDate          │
│ updatedAt           │                    │ dueDate             │
└─────────────────────┘                    │ returnDate          │
                                           │ createdAt           │
                                           │ updatedAt           │
                                           └─────────────────────┘
```

### Entidades Detalhadas

#### Book (Livro)
```typescript
{
  id: number;              // Identificador único (auto incremento)
  title: string;           // Título do livro
  author: string;          // Autor do livro
  isbn: string;            // ISBN (único)
  publishedYear: number;   // Ano de publicação
  genre: string;           // Gênero
  price: number;           // Preço de venda
  rentalPrice: number;     // Preço de aluguel
  available: boolean;      // Disponibilidade (default: true)
  description?: string;    // Descrição (opcional)
}
```

#### User (Usuário)
```typescript
{
  id: number;              // Identificador único (auto incremento)
  name: string;            // Nome completo
  email: string;           // Email (único)
  password: string;        // Senha (mínimo 6 caracteres)
}
```

#### Purchase (Compra)
```typescript
{
  id: number;              // Identificador único
  userId: number;          // ID do usuário (FK)
  bookId: number;          // ID do livro (FK)
  price: number;           // Preço no momento da compra
  paymentMethod: PaymentMethod;  // Método de pagamento
  paymentStatus: PaymentStatus;  // Status do pagamento
  purchaseDate: Date;      // Data da compra
  createdAt: Date;         // Data de criação
  updatedAt: Date;         // Data de atualização
}
```

#### Rental (Aluguel)
```typescript
{
  id: number;              // Identificador único
  userId: number;          // ID do usuário (FK)
  bookId: number;          // ID do livro (FK)
  rentalPrice: number;     // Preço do aluguel
  paymentMethod: PaymentMethod;  // Método de pagamento
  paymentStatus: PaymentStatus;  // Status do pagamento
  rentalStatus: RentalStatus;    // Status do aluguel
  rentalDate: Date;        // Data do aluguel
  dueDate: Date;           // Data de devolução prevista
  returnDate?: Date;       // Data de devolução efetiva
  createdAt: Date;         // Data de criação
  updatedAt: Date;         // Data de atualização
}
```

## 🔄 Fluxos de Negócio

### Fluxo de Compra

```
1. Cliente envia POST /purchases
   {userId, bookId, paymentMethod}
                │
                ▼
2. Controller extrai dados do request
                │
                ▼
3. Service valida:
   - Usuário existe?
   - Livro existe?
   - Método de pagamento válido?
                │
                ▼
4. Repository cria registro com status "pending"
                │
                ▼
5. Processamento de pagamento (externo)
                │
                ▼
6. PATCH /purchases/:id/confirm → status "completed"
   ou
   PATCH /purchases/:id/fail → status "failed"
```

### Fluxo de Aluguel

```
1. Cliente envia POST /rentals
   {userId, bookId, paymentMethod, rentalDays}
                │
                ▼
2. Service valida:
   - Usuário existe?
   - Livro existe?
   - Período válido (1-30 dias)?
                │
                ▼
3. Calcula dueDate = hoje + rentalDays
                │
                ▼
4. Repository cria com:
   - paymentStatus: "pending"
   - rentalStatus: "active"
                │
                ▼
5. Durante o aluguel:
   - GET /rentals/:id → mostra daysRemaining, isOverdue
   - PATCH /rentals/:id/renew → estende dueDate
                │
                ▼
6. PATCH /rentals/:id/return → marca como "returned"
```

## 📁 Estrutura de Pastas

```
src/
├── config/
│   └── database.ts           # Conexão com PostgreSQL
│
├── controllers/              # Camada de apresentação
│   ├── BookController.ts
│   ├── UserController.ts
│   ├── PurchaseController.ts
│   └── RentalController.ts
│
├── dtos/                     # Data Transfer Objects
│   ├── BookDTO.ts
│   ├── UserDTO.ts
│   ├── PurchaseDTO.ts
│   └── RentalDTO.ts
│
├── errors/                   # Erros customizados
│   └── AppError.ts
│
├── middlewares/              # Middlewares Express
│   └── errorHandler.ts
│
├── models/                   # Modelos Sequelize
│   ├── Book.ts
│   ├── User.ts
│   ├── Purchase.ts
│   └── Rental.ts
│
├── repository/               # Acesso a dados
│   ├── BookRepository.ts
│   ├── UserRepository.ts
│   ├── PurchaseRepository.ts
│   └── RentalRepository.ts
│
├── routes/                   # Definição de rotas
│   ├── bookRoutes.ts
│   ├── userRoutes.ts
│   ├── purchaseRoutes.ts
│   └── rentalRoutes.ts
│
├── services/                 # Lógica de negócio
│   ├── BookService.ts
│   ├── UserService.ts
│   ├── PurchaseService.ts
│   └── RentalService.ts
│
└── index.ts                  # Entry point
```

## 🛡️ Tratamento de Erros

### Classes de Erro

| Classe                       | Status | Quando ocorre                     |
| ---------------------------- | ------ | --------------------------------- |
| `BookNotFoundError`          | 404    | Livro não encontrado              |
| `UserNotFoundError`          | 404    | Usuário não encontrado            |
| `PurchaseNotFoundError`      | 404    | Compra não encontrada             |
| `RentalNotFoundError`        | 404    | Aluguel não encontrado            |
| `DuplicateIsbnError`         | 409    | ISBN já existe                    |
| `DuplicateEmailError`        | 409    | Email já cadastrado               |
| `InvalidBookDataError`       | 400    | Dados de livro inválidos          |
| `InvalidUserDataError`       | 400    | Dados de usuário inválidos        |
| `InvalidPurchaseDataError`   | 400    | Dados de compra inválidos         |
| `InvalidRentalDataError`     | 400    | Dados de aluguel inválidos        |
| `InvalidPaymentMethodError`  | 400    | Método de pagamento inválido      |
| `InvalidRentalPeriodError`   | 400    | Período de aluguel fora do limite |
| `RentalAlreadyReturnedError` | 400    | Aluguel já devolvido              |
| `RentalNotActiveError`       | 400    | Aluguel não está ativo            |

### Formato de Resposta de Erro

```json
{
  "success": false,
  "message": "Descrição do erro",
  "statusCode": 400
}
```

## 📡 Formato de Respostas

### Sucesso (Objeto único)
```json
{
  "success": true,
  "data": { ... }
}
```

### Sucesso (Lista)
```json
{
  "success": true,
  "count": 10,
  "data": [ ... ]
}
```

### Sucesso (Com mensagem)
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { ... }
}
```

### Sucesso (Busca com filtros)
```json
{
  "success": true,
  "count": 5,
  "filters": { "genre": "Fantasia" },
  "data": [ ... ]
}
```

## 🔧 Configuração

### Variáveis de Ambiente (.env)

```env
# Banco de Dados
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=sua_senha
DB_NAME=livrarium

# Servidor
PORT=3000

# Ambiente
NODE_ENV=development
```

### Scripts NPM

```json
{
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

## 📚 Referências

- [Express.js](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)

---

**Disciplina:** Programação Web
**Curso:** Ciência da Computação
