# Repository Pattern Architecture with Zod Validation

This directory contains the implementation of the repository pattern for the Next.js application with comprehensive Zod validation, providing a clean separation of concerns between API routes, business logic, and data access.

## Structure

```
src/lib/
├── types/
│   ├── index.ts           # Re-exports all types
│   └── visits.types.ts    # Visit-related type definitions with Zod schemas
├── repositories/
│   └── visits.repository.ts    # Data access layer with validation
├── services/
│   ├── index.ts           # Service factory functions
│   └── visits.service.ts  # Business logic for visits
├── hooks/
│   └── useVisits.ts       # React hooks with client-side validation
└── index.ts               # Main lib exports
```

## Architecture Layers

### 1. Database Schema Layer (`db/schema.ts`)
Contains Drizzle schema definitions with auto-generated Zod schemas:
- `pageVisits`: Drizzle table definition
- `insertPageVisitSchema`: Zod schema for insertions (with validation rules)
- `selectPageVisitSchema`: Zod schema for selections
- `recordVisitSchema`: API-specific validation schema
- `dateRangeSchema`: Date range validation schema

### 2. Types Layer (`types/`)
TypeScript interfaces inferred from Zod schemas:
- `PageVisit`: Database entity interface (from selectPageVisitSchema)
- `InsertPageVisit`: Insert data interface (from insertPageVisitSchema)
- `RecordVisitRequest`: API request interface (from recordVisitSchema)
- `DateRangeRequest`: Date range request interface
- `VisitStats`: Aggregated statistics interface
- `ApiResponse<T>`: Generic API response interface

### 3. Repository Layer (`repositories/`)
Handles data access with comprehensive validation:
- Input validation using Zod schemas
- Database query execution
- Output validation for type safety
- Error handling for validation failures

### 4. Service Layer (`services/`)
Contains business logic and coordinates between repositories:
- High-level operations combining multiple repository calls
- Business rule enforcement
- Data transformation and aggregation

### 5. API Layer (`app/api/`)
Clean HTTP request handlers with validation:
- Request body validation using Zod
- Query parameter validation
- Structured error responses
- Type-safe response objects

### 6. Hooks Layer (`hooks/`)
React hooks with client-side validation:
- Response validation using Zod schemas
- Error handling and loading states
- Type-safe data consumption

## Key Features

### 🔒 **Comprehensive Validation**
- **Database Level**: Schema constraints and defaults
- **Input Level**: Request validation before processing
- **Output Level**: Response validation for type safety
- **Client Level**: Frontend data validation

### 🎯 **Type Safety**
- All types inferred from Zod schemas
- Single source of truth for data structures
- Compile-time and runtime type checking
- Auto-completion and IntelliSense support

### 🛡️ **Error Handling**
- Detailed validation error messages
- Structured error responses
- Client-side error handling
- Graceful degradation

### 📊 **API Design**
- Consistent response format
- Proper HTTP status codes
- Query parameter support
- RESTful endpoints

## Usage Examples

### Backend Usage
```typescript
// API Route
import { recordVisitSchema } from '../../../db/schema';
import { createVisitsService } from '../../../lib';

// Validate request
const validatedData = recordVisitSchema.parse(body);
const visitsService = createVisitsService(db);
await visitsService.recordVisit(validatedData.pagePath, country);
```

### Frontend Usage
```tsx
// React Component
import { useVisits, useVisitStats } from '../../lib/hooks/useVisits';

function Analytics() {
  const { visits, loading, error } = useVisits();
  const { stats } = useVisitStats();
  
  // Fully typed data with validation
  return (
    <div>
      {visits.map(visit => (
        <div key={visit.id}>{visit.page_path}</div>
      ))}
    </div>
  );
}
```

## API Endpoints

### POST `/api/visits`
Record a new page visit
- **Body**: `{ pagePath: string }`
- **Response**: `ApiResponse<null>`

### GET `/api/visits`
Get all visits or filter by date range
- **Query**: `startDate?, endDate?` (YYYY-MM-DD format)
- **Response**: `ApiResponse<{ visits: PageVisit[] }>`

### GET `/api/visits/stats`
Get aggregated visit statistics
- **Response**: `ApiResponse<VisitStats>`

## Benefits

1. **Type Safety**: End-to-end type safety from database to frontend
2. **Validation**: Comprehensive input/output validation
3. **Developer Experience**: Auto-completion and compile-time checks
4. **Error Handling**: Detailed validation errors and graceful failures
5. **Maintainability**: Single source of truth for data structures
6. **Scalability**: Easy to add new features with consistent patterns
7. **Testing**: Each layer can be tested independently
8. **Documentation**: Self-documenting code with TypeScript types

## Adding New Features

1. **Update database schema** in `db/schema.ts`
2. **Generate Zod schemas** using `createInsertSchema`/`createSelectSchema`
3. **Add types** inferred from Zod schemas
4. **Create repository methods** with validation
5. **Add service methods** for business logic
6. **Create API routes** with request/response validation
7. **Add React hooks** for frontend consumption

This architecture ensures your codebase remains type-safe, well-validated, and maintainable as it grows.
