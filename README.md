# Learning DDD (Domain-Driven Design)

A TypeScript project demonstrating Domain-Driven Design principles with Express.js and Kafka integration.

## Project Structure

```
src/
├── application/
│   ├── services/
│   └── use-cases/
│       └── customer/
│           ├── create-customer.use-case.ts
│           ├── update-customer.use-case.ts
│           ├── deactivate-customer.use-case.ts
│           ├── get-customer.use-case.ts
│           └── get-all-customers.use-case.ts
├── domain/
│   ├── dtos/
│   │   └── customer.dto.ts
│   ├── entities/
│   │   └── customer.ts
│   ├── repositories/
│   │   └── customer-repository.ts
│   └── value-objects/
│       └── email.ts
├── infrastructure/
│   ├── messaging/
│   │   └── kafka-consumer.ts
│   ├── middleware/
│   │   └── auth.middleware.ts
│   ├── repositories/
│   │   └── in-memory-customer-repository.ts
│   └── routes/
│       └── customer.routes.ts
├── interfaces/
│   └── controllers/
│       └── customer.controller.ts
└── main.ts
```

## Architecture

This project follows Clean Architecture and Domain-Driven Design principles:

- **Domain Layer**: Contains entities, value objects, and repository interfaces
- **Application Layer**: Contains use cases and application services
- **Infrastructure Layer**: Contains implementations of repositories, messaging, and middleware
- **Interface Layer**: Contains controllers and route handlers

## Features

- Customer management (CRUD operations)
- JWT Authentication
- Kafka message consumption
- Clean Architecture
- Domain-Driven Design
- TypeScript with strict type checking
- Express.js REST API
- In-memory repository implementation

## Prerequisites

- Node.js (v16 or higher)
- TypeScript
- Kafka (for message consumption)

## Installation

1. Clone the repository:
\`\`\`bash
git clone [repository-url]
cd LearningDDD
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a .env file:
\`\`\`env
PORT=3000
JWT_SECRET=your-secret-key
KAFKA_BROKERS=localhost:9092
\`\`\`

## Running the Application

Development mode:
\`\`\`bash
npm run dev
\`\`\`

Production build:
\`\`\`bash
npm run build
npm start
\`\`\`

## API Endpoints

### Customers

- **GET** `/api/customers` - Get all customers
- **GET** `/api/customers/:id` - Get customer by ID
- **POST** `/api/customers` - Create new customer
- **PUT** `/api/customers/:id` - Update customer
- **DELETE** `/api/customers/:id` - Deactivate customer

### Authentication

All endpoints require JWT authentication. Include the token in the Authorization header:
\`\`\`
Authorization: Bearer <your-token>
\`\`\`

## Domain Concepts

### Customer Entity
- ID (unique identifier)
- Name
- Email (value object)
- Active status

### Value Objects
- Email: Ensures valid email format

## Use Cases

1. **Create Customer**
   - Validates customer data
   - Generates unique ID
   - Creates customer record

2. **Update Customer**
   - Updates name and/or email
   - Validates new data

3. **Deactivate Customer**
   - Marks customer as inactive
   - Preserves customer data

4. **Get Customer**
   - Retrieves customer by ID

5. **Get All Customers**
   - Lists all customers

## Technology Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JSON Web Tokens (JWT)
- **Message Queue**: Kafka

## Development Practices

- Clean Architecture
- Domain-Driven Design
- SOLID Principles
- Use Case Driven Development
- Type-Safe Development

## Future Improvements

- [ ] Database integration
- [ ] Unit tests
- [ ] Integration tests
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Error handling middleware
- [ ] Rate limiting
- [ ] Logging service
- [ ] Metrics collection

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.