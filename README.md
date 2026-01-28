# ERP Application

A modern, full-stack Enterprise Resource Planning (ERP) application built with a monorepo architecture using Turbo, featuring a Node.js/Express backend API and a Next.js frontend web application.

## 🏗️ Project Structure

This is a monorepo managed with **pnpm** and **Turbo**, containing:

### Apps

- **`apps/api`** - Express.js backend REST API
  - User authentication and management
  - PostgreSQL database integration with Prisma ORM
  - JWT-based authorization
  - Environment-based configuration

- **`apps/web`** - Next.js frontend application (React 19)
  - Modern UI with Tailwind CSS
  - Redux Toolkit for state management
  - Redux RTK Query for API integration
  - Authentication forms (Login & Registration)
  - Responsive design with custom UI components

### Packages (Shared Libraries)

- **`packages/database`** - Prisma ORM setup
  - PostgreSQL data models
  - User schema with authentication fields

- **`packages/ui`** - Shared React component library
  - Reusable UI components (Button, Card, Input, etc.)
  - Built with shadcn/ui pattern
  - Tailwind CSS styling

- **`packages/types`** - Shared TypeScript types
  - `@erp/shared-types` - Common type definitions
  - User types and interfaces

- **`packages/eslint-config`** - Shared ESLint configurations
  - Base, Next.js, and React internal configs

- **`packages/typescript-config`** - Shared TypeScript configurations
  - Base, Next.js, and React library configs

- **`packages/config-tailwind`** - Shared Tailwind CSS configuration

## 🚀 Quick Start

### Prerequisites

- **Node.js**: >= 18.x
- **pnpm**: 9.0.0
- **PostgreSQL**: For database

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
# Create .env files in apps/api and apps/web as needed
```

### Development

```bash
# Start all apps in development mode
pnpm dev

# The following will start:
# - API: http://localhost:3001 (with live reload)
# - Web: http://localhost:3000
```

### Build

```bash
# Build all apps and packages
pnpm build
```

### Linting

```bash
# Run ESLint across all packages
pnpm lint

# Format code with Prettier
pnpm format
```

### Type Checking

```bash
# Check TypeScript types across the monorepo
pnpm check-types
```

## 📋 API Overview

### Base URL

- Development: `http://localhost:3001`

### Endpoints

#### Health Check

- **GET** `/health` - Check API status
  ```json
  {
    "status": "OK",
    "timestamp": "2024-01-28T10:00:00.000Z"
  }
  ```

#### Users

- **GET** `/api/users` - Get all users
- **POST** `/api/users` - Create new user (register)
- **GET** `/api/users/:id` - Get user by ID
- **PUT** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user

### Authentication

The API uses JWT (JSON Web Tokens) for authentication:

- Credentials are hashed using bcryptjs
- JWT tokens are issued on successful login
- Include token in `Authorization: Bearer <token>` header

### CORS Configuration

The API accepts requests from:

- `http://localhost:3000` (local web app)
- `http://localhost:5173` (Vite dev server)
- `https://react-template-frontend.vercel.app` (production)

## 🗄️ Database

### Schema

The application uses PostgreSQL with Prisma ORM.

**User Model:**

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  isactive  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Prisma Commands

```bash
# Run migrations
pnpm --filter @repo/database prisma migrate dev --name "your_migration_name"

# Reset database
pnpm --filter @repo/database prisma migrate reset

# Open Prisma Studio (GUI)
pnpm --filter @repo/database prisma studio
```

## 🔧 Tech Stack

### Backend (API)

- **Framework**: Express.js 4.22.1
- **Runtime**: Node.js (ES modules)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT, bcryptjs
- **Validation**: express-validator, zod
- **Security**: helmet, CORS
- **Logging**: morgan
- **Testing**: Jest
- **Build**: tsup

### Frontend (Web)

- **Framework**: Next.js 16.1.0
- **UI Library**: React 19.2.0
- **State Management**: Redux Toolkit 2.11.2
- **API Client**: Redux RTK Query, Axios
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Build**: Next.js bundler

### Monorepo Tools

- **Workspace Manager**: pnpm 9.0.0
- **Monorepo Orchestrator**: Turbo 2.7.4
- **Type Checker**: TypeScript 5.9.2
- **Linter**: ESLint 9.39.1
- **Formatter**: Prettier 3.7.4

## 📁 Key Directories

```
├── apps/
│   ├── api/                 # Express backend
│   │   ├── src/
│   │   │   ├── app.ts      # Express app setup
│   │   │   ├── index.ts    # Server entry point
│   │   │   ├── controllers/# Request handlers
│   │   │   ├── routes/     # API routes
│   │   │   ├── services/   # Business logic
│   │   │   ├── middleware/ # Custom middleware
│   │   │   ├── utils/      # Utilities (JWT, bcrypt, logger)
│   │   │   └── config/     # Configuration (env vars)
│   │   └── tests/          # Jest test files
│   │
│   └── web/                 # Next.js frontend
│       ├── app/            # Next.js app router
│       ├── components/     # React components
│       ├── lib/            # Utilities
│       ├── redux/          # Redux store & slices
│       │   └── api/        # RTK Query API definitions
│       ├── provider/       # Context providers
│       └── public/         # Static assets
│
└── packages/
    ├── database/           # Prisma ORM & migrations
    ├── ui/                 # Shared React components
    ├── types/              # Shared TypeScript types
    ├── eslint-config/      # ESLint presets
    ├── typescript-config/  # TypeScript presets
    └── config-tailwind/    # Tailwind CSS config
```

## 🧪 Testing

### Run API Tests

```bash
pnpm --filter api test
```

## 📝 Environment Variables

### API (.env)

```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/erp_db
JWT_SECRET=your_secret_key_here
```

### Web (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🔐 Security Features

- **Helmet.js** - Sets HTTP headers for security
- **CORS** - Restricts cross-origin requests
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **zod** - Schema validation

## 📚 Scripts Reference

| Command                  | Description                        |
| ------------------------ | ---------------------------------- |
| `pnpm dev`               | Start all apps in development mode |
| `pnpm build`             | Build all apps and packages        |
| `pnpm lint`              | Run ESLint on all packages         |
| `pnpm format`            | Format code with Prettier          |
| `pnpm check-types`       | Check TypeScript types             |
| `pnpm --filter api test` | Run API tests                      |

## 🎯 Development Workflow

1. **Make changes** in the relevant app or package
2. **Run type checking**: `pnpm check-types`
3. **Run linting**: `pnpm lint`
4. **Format code**: `pnpm format`
5. **Run tests**: `pnpm --filter api test` (for API changes)
6. **Start dev server**: `pnpm dev` to test locally

## 🚀 Deployment

### API Deployment

1. Build: `pnpm build`
2. Run: `npm start` in `apps/api`
3. Set environment variables in deployment platform

### Web Deployment

1. Build: `pnpm build`
2. Deploy `apps/web/.next` to your hosting provider (Vercel recommended)

## 📖 Additional Resources

- [Turborepo Documentation](https://turborepo.dev)
- [Express.js Documentation](https://expressjs.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

When contributing to this monorepo:

1. Install dependencies: `pnpm install`
2. Create a feature branch
3. Make changes and ensure types check: `pnpm check-types`
4. Run linting: `pnpm lint`
5. Format code: `pnpm format`
6. Commit and push
7. Create a pull request

## 📄 License

[Add your license here]

---

**Last Updated**: January 2026  
**Node Version**: >= 18.x  
**Package Manager**: pnpm 9.0.0
