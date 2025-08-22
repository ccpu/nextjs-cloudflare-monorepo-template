# Repository Pattern Architecture

This directory contains the implementation of the repository pattern for the Next.js application, providing a clean separation of concerns between API routes, business logic, and data access.

## Structure

```
src/lib/
├── types/
│   ├── index.ts           # Re-exports all types
│   └── visits.types.ts    # Visit-related type definitions
├── repositories/
│   └── visits.repository.ts    # Data access layer for visits
├── services/
│   ├── index.ts           # Service factory functions
│   └── visits.service.ts  # Business logic for visits
└── index.ts               # Main lib exports
```

## Architecture Layers

### 1. Types Layer (`types/`)
Contains TypeScript interfaces and types used across the application:
- `PageVisit`: Database entity interface
- `CreateVisitData`: Data transfer object for creating visits
- `VisitStats`: Aggregated statistics interface

### 2. Repository Layer (`repositories/`)
Handles data access and database operations:
- `VisitsRepository`: Encapsulates all database queries for visits
- Provides methods for CRUD operations
- Abstracts database implementation details

### 3. Service Layer (`services/`)
Contains business logic and coordinates between different repositories:
- `VisitsService`: Implements business rules for visit tracking
- Coordinates between repositories
- Provides high-level operations for the API layer

### 4. API Layer (`app/api/`)
Clean HTTP request handlers that use services:
- Minimal logic, focuses on HTTP concerns
- Input validation and error handling
- Delegates business logic to services

## Benefits

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Testability**: Each layer can be unit tested independently
3. **Maintainability**: Changes to business logic don't affect API routes
4. **Scalability**: Easy to add new features and services
5. **Type Safety**: Full TypeScript support across all layers
6. **Reusability**: Services can be used in different contexts

## Usage Example

```typescript
// In an API route
import { createVisitsService } from '../../../lib/services';

const visitsService = createVisitsService(db);
await visitsService.recordVisit('/home', 'US');
const visits = await visitsService.getAllVisits();
```

## Adding New Features

1. **Add types** in `types/` directory
2. **Create repository** for data access
3. **Create service** for business logic
4. **Update service factory** in `services/index.ts`
5. **Use in API routes** or other contexts

This architecture ensures the codebase remains organized and maintainable as it grows.
