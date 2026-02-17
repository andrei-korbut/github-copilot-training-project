# 01 – Backend, Database & Docker Setup

## 📌 Use Case Description

Set up the backend project with .NET 8 Web API and SQL Server database in Docker. This task ensures the project can run locally with migrations applied automatically and a basic health check endpoint to verify the service is running.

This is the foundational infrastructure task that must be completed before any business logic can be implemented. The backend will be containerized along with SQL Server, orchestrated via Docker Compose.

---

## 🌐 Endpoint Specification

**Health Check Endpoint**

Method: GET  
Route: /health  

Request:
- No parameters required

Response:
- 200 OK with status message `{ "status": "healthy" }`
- 500 Internal Server Error (if service is down)

**Docker URLs:**
- Backend (external): http://localhost:5000
- Backend (internal): http://backend:80
- Database (internal): sqlserver://database:1433
- Database (external): localhost:1433

---

## 🧱 Architecture Requirements

This task must implement:

### Backend Structure:
- .NET 8 Web API project in `/backend` folder
- Project created via `dotnet new webapi`
- `AppDbContext` class inheriting from `DbContext`
- Entity Framework Core with SQL Server provider
- Connection string configured via environment variables
- Automatic migrations on container startup using `db.Database.Migrate()`
- Health check endpoint controller
- Basic logging and error handling middleware
- CORS configuration for frontend communication

### Database Structure:
- SQL Server 2022 Docker container (`mcr.microsoft.com/mssql/server:2022-latest`)
- Exposed on port 1433
- Docker volume for data persistence
- Environment variables for SA password
- No initial tables required (migrations will create schema)

### Docker Infrastructure:
- `Dockerfile` for backend service:
  - Multi-stage build (build + runtime)
  - Based on `mcr.microsoft.com/dotnet/aspnet:8.0`
  - Expose port 80
- `docker-compose.yml` with services:
  - `backend` service (port 5000:80)
  - `database` service (port 1433:1433)
- Health checks configured in docker-compose
- Backend depends on database service
- Network configuration for inter-service communication
- Volume mounts for development (optional at this stage)

Must follow:
- Clean architecture principles
- Environment-based configuration
- Container best practices
- Async/await for all database operations
- Proper error handling and logging

---

## 🔐 Validation Rules

- Backend must wait for database to be ready before applying migrations
- Connection string must be loaded from environment variables
- SA password must be strong and configurable
- Health check must return 200 only when service is fully initialized
- Migrations must run automatically on container startup
- Database must persist data between container restarts

---

## 🔗 Dependencies

**None** - This is the foundational task

**Blocks:**
- All backend feature tasks
- All frontend tasks (frontend depends on backend API URL)

**External Dependencies:**
- Docker Desktop installed and running
- .NET 8 SDK (for local development)
- SQL Server tools (for database management - optional)

---

## 🚫 Out of Scope

- Authentication/Authorization setup
- API documentation (Swagger) - can be added later
- Advanced logging (Serilog, ELK) - basic logging only
- Monitoring and metrics
- SSL/TLS certificates for HTTPS
- Database migrations rollback strategy
- Seed data or initial database population
- CI/CD pipeline configuration
- Production-ready security hardening

---

## ✅ Acceptance Criteria

### Backend:
- ✅ .NET 8 Web API project created in `/backend` folder
- ✅ `AppDbContext` configured with SQL Server
- ✅ Connection string loaded from environment variables
- ✅ Automatic migrations work on container startup
- ✅ `GET /health` endpoint returns 200 OK
- ✅ `Dockerfile` builds successfully
- ✅ No build warnings or errors

### Database:
- ✅ SQL Server container runs successfully
- ✅ Database accessible on port 1433
- ✅ Data persists between container restarts
- ✅ Backend can connect to database

### Docker:
- ✅ `docker-compose up` starts both services
- ✅ Backend container starts after database is ready
- ✅ Health checks pass for both services
- ✅ Services can communicate via Docker network
- ✅ `http://localhost:5000/health` returns 200 OK from host machine

### General:
- ✅ Project builds without warnings
- ✅ Containers can be stopped and restarted successfully
- ✅ README or documentation includes setup instructions
- ✅ Environment variables properly documented

---

## 🧪 Testing Requirements

### Manual Testing:
- Run `docker-compose up --build`
- Verify both containers start successfully
- Access `http://localhost:5000/health` in browser
- Verify response is 200 OK with health status
- Stop containers with `docker-compose down`
- Restart containers and verify data persistence
- Check logs for migration execution

### Integration Testing:
- Database connection test (verify AppDbContext can connect)
- Migration execution test (verify tables are created)
- Health endpoint test (verify returns correct status code)

### Edge Cases:
- Backend container starts before database is ready (should wait and retry)
- Invalid connection string (should log error and fail gracefully)
- Database container stops while backend is running (health check should fail)
- First-time startup vs subsequent startups (migrations should handle both)

---

## 📝 Implementation Notes

### Environment Variables Required:

**docker-compose.yml:**
```yaml
backend:
  environment:
    - ConnectionStrings__DefaultConnection=Server=database,1433;Database=MaintenanceAppDB;User Id=sa;Password=${SA_PASSWORD};TrustServerCertificate=True
    - ASPNETCORE_ENVIRONMENT=Development

database:
  environment:
    - SA_PASSWORD=${SA_PASSWORD}
    - ACCEPT_EULA=Y
```

### AppDbContext Initialization:
```csharp
// In Program.cs or Startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate(); // Apply migrations automatically
}
```

### Recommended NuGet Packages:
- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Design
- Microsoft.EntityFrameworkCore.Tools

---

## 🎯 Definition of Done

- All acceptance criteria met
- Containers build and run without errors
- Health check endpoint accessible
- Database persists data
- Code committed to repository
- Documentation updated with setup instructions
- Peer review completed (if applicable)
