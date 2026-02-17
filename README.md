# Car Maintenance Tracker

A full-stack application for tracking car maintenance, built with .NET 9 Web API, React 18 + TypeScript, and SQL Server.

## Prerequisites

- **Docker Desktop 4.x+** with WSL2 backend (Windows users)
- **.NET 9 SDK** (for local development without Docker)
- **Node.js 18+** (for local frontend development without Docker)
- **Minimum 4GB RAM** available for containers
- **Minimum 5GB disk space** for Docker images and volumes

## Quick Start

### 1. Environment Configuration

Copy the `.env.example` file to `.env` in the workspace root:

```bash
cp .env.example .env
```

The `.env` file contains:
- `SA_PASSWORD`: SQL Server SA password (must be strong: 8+ chars with uppercase, lowercase, numbers, and symbols)
- `ASPNETCORE_ENVIRONMENT`: Set to `Development` for local development

**Note:** The `.env` file is already configured with a default password. You can change it if needed.

### 2. Start the Application

From the **workspace root** directory, run:

```bash
docker-compose up --build
```

**First-time startup takes 60-90 seconds** while:
- SQL Server container initializes
- Database is created and migrations are applied
- Backend container builds and starts
- Frontend container builds and starts

### 3. Verify the Setup

Once all containers are running, verify the following:

- **Frontend Application**: http://localhost:3000
  - Should display "Car Maintenance Tracker" home page
  - Styled with Tailwind CSS

- **Backend Health Check**: http://localhost:5000/health
  - Should return: `{"status":"healthy","timestamp":"..."}`

- **Swagger UI**: http://localhost:5000/swagger
  - Interactive API documentation and testing interface

- **Database**: Connect to SQL Server at `localhost:1433`
  - Username: `sa`
  - Password: Value from your `.env` file
  - Database: `MaintenanceAppDB`

## Project Structure

```
backend/
├── CarMaintenanceTracker.sln        # Solution file
├── CarMaintenanceTracker.Api/
│   ├── Controllers/
│   │   └── HealthController.cs      # Health check endpoint
│   ├── Data/
│   │   └── AppDbContext.cs          # Entity Framework DbContext
│   ├── Migrations/                  # EF Core migrations
│   ├── Program.cs                   # Application entry point
│   ├── appsettings.json            # Configuration
│   └── CarMaintenanceTracker.Api.csproj
└── Dockerfile                       # Multi-stage Docker build

frontend/
├── src/
│   ├── components/                  # React components (empty initially)
│   ├── pages/
│   │   └── Home.tsx                # Home page component
│   ├── services/                    # API service layer (empty initially)
│   ├── App.tsx                     # Main application component
│   └── index.tsx                   # Application entry point
├── nginx/
│   └── default.conf                # nginx configuration for SPA
├── Dockerfile                      # Multi-stage Docker build
├── package.json                    # npm dependencies
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.ts                  # Vite configuration
└── tsconfig.json                   # TypeScript configuration

docker-compose.yml                   # Container orchestration
.env                                 # Environment variables (not committed)
.env.example                        # Environment template
```

## Available Endpoints

### Health Check
- **GET** `/health`
- Returns service health status and timestamp
- No authentication required

## Docker Services

### Frontend Service
- **Container name**: `maintenance-tracker-frontend`
- **Technology**: React 18 + TypeScript + Vite
- **External port**: 3000
- **Internal port**: 80 (nginx)
- **Network**: `maintenance-network`
- **Depends on**: `backend`
- **Environment**: `VITE_API_URL=http://backend:80`

### Backend Service
- **Container name**: `maintenance-tracker-backend`
- **Technology**: .NET 9 Web API
- **External port**: 5000
- **Internal port**: 80
- **Network**: `maintenance-network`
- **Depends on**: `database` (waits for health check)

### Database Service
- **Container name**: `maintenance-tracker-db`
- **Image**: `mcr.microsoft.com/mssql/server:2022-latest`
- **Port**: 1433
- **Volume**: `maintenance-tracker-mssql-data` (persistent storage)
- **Health check**: Every 10s with 5 retries

## Common Tasks

### View Logs

```bash
# View all logs
docker-compose logs

# View frontend logs only
docker-compose logs frontend

# View backend logs only
docker-compose logs backend

# View database logs only
docker-compose logs database

# Follow logs in real-time
docker-compose logs -f frontend backend
```

### Stop Containers

```bash
# Stop containers (data persists)
docker-compose down

# Stop containers and remove volumes (deletes all data)
docker-compose down -v
```

### Restart Containers

```bash
docker-compose restart
```

### Rebuild After Code Changes

```bash
docker-compose up --build
```

### Add a New Migration (Local Development)

```bash
cd backend/CarMaintenanceTracker.Api
dotnet ef migrations add YourMigrationName
```

Migrations are applied automatically when the container starts.

### Frontend Local Development (Without Docker)

For faster frontend development with hot reload:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

The frontend will be available at http://localhost:5173 (Vite default port).

**Note:** When developing locally, update `frontend/.env` to use `http://localhost:5000` for the backend API URL.

## Troubleshooting

### Port 3000 Already in Use

If port 3000 is occupied, modify `docker-compose.yml`:

```yaml
frontend:
  ports:
    - "3001:80"  # Change 3000 to another port
```

### Port 5000 Already in Use

If port 5000 is occupied, modify `docker-compose.yml`:

```yaml
backend:
  ports:
    - "5001:80"  # Change 5000 to another port
```

### SQL Server Startup Timeout

If the backend fails to connect to the database:

1. Check database logs: `docker-compose logs database`
2. Verify SQL Server is healthy: `docker-compose ps`
3. The health check allows 30 seconds for startup with 5 retries
4. On slower machines, you may need to wait longer on first run

### Connection String Issues

The connection string is configured via environment variables in `docker-compose.yml`:

```yaml
ConnectionStrings__DefaultConnection=Server=database;Database=MaintenanceAppDB;User=sa;Password=${SA_PASSWORD};TrustServerCertificate=True;Encrypt=False
```

- `Server=database` uses Docker's internal DNS
- `TrustServerCertificate=True` and `Encrypt=False` are set for development (not for production)

### Migration Errors

If migrations fail on startup:

1. View backend logs: `docker-compose logs backend`
2. Check for SQL syntax errors or connection issues
3. The application uses **fail-fast** approach - it will exit if migrations fail
4. To reset the database: `docker-compose down -v` then `docker-compose up --build`

### Cannot Connect to Database from Host Machine

If you can't connect to SQL Server from SSMS or Azure Data Studio:

1. Verify container is running: `docker-compose ps`
2. Check port mapping: Should show `0.0.0.0:1433->1433/tcp`
3. Ensure firewall allows port 1433
4. Use `localhost,1433` (note the comma) in connection string for some tools

## Development Notes

### CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:3000` (frontend URL)

Additional origins can be added in [Program.cs](CarMaintenanceTracker.Api/Program.cs).

### Entity Framework Core

- **Provider**: SQL Server
- **Migrations**: Applied automatically on container startup
- **DbContext**: `AppDbContext` in `Data/` folder
- Currently empty - entities will be added in feature tasks

### Swagger/OpenAPI

Swagger is enabled in Development mode:
- **Swagger UI**: http://localhost:5000/swagger
- **OpenAPI JSON**: http://localhost:5000/swagger/v1/swagger.json
- Currently documents the `/health` endpoint
- Will automatically include all API endpoints as they're added

### Logging

Default logging configuration:
- **Console output** (visible in Docker logs)
- **Level**: Information
- **ASP.NET Core**: Warning level

### Frontend Technology Stack

- **Framework**: React 18 with TypeScript
- **Build tool**: Vite 8
- **Styling**: Tailwind CSS v3
- **Routing**: React Router DOM v6
- **Production server**: nginx (Alpine Linux)
- **Hot reload**: Enabled in development mode (`npm run dev`)

### Frontend Environment Variables

- **VITE_API_URL**: Backend API base URL
  - Docker (internal): `http://backend:80`
  - Local dev: `http://localhost:5000`
- Access in code: `import.meta.env.VITE_API_URL`
- Variables must be prefixed with `VITE_` to be exposed to the app

### nginx Configuration

The frontend uses nginx to serve the production React build:
- **SPA routing**: All routes fallback to `index.html` via `try_files`
- **Static asset caching**: CSS, JS, images cached for 1 year
- **HTML caching disabled**: Ensures fresh app versions
- Configuration: `frontend/nginx/default.conf`

## Next Steps

After completing the infrastructure setup:

1. ✅ Backend container running
2. ✅ Database accessible and persistent
3. ✅ Health check endpoint working
4. ✅ Swagger UI accessible
5. ✅ Automatic migrations on startup
6. ✅ Frontend container running
7. ✅ React + TypeScript + Tailwind CSS configured
8. ✅ Home page displaying correctly

**Next tasks:**
- Add entity models (MaintenanceTemplate, Car, etc.)
- Implement backend API endpoints
- Create frontend UI components
- Implement API service layer in frontend
- Add authentication/authorization

## References

**Backend:**
- [.NET 9 Documentation](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-9)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- [SQL Server on Docker](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker)

**Frontend:**
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/)

**DevOps:**
- [Docker Compose](https://docs.docker.com/compose/)
- [nginx Documentation](https://nginx.org/en/docs/)
