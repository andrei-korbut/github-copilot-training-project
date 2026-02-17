# Initial Project Tasks

---

## 1️⃣ Backend & Database Initialization

### Issue #1: Backend Project & Database Setup
**Priority:** CRITICAL (Must be completed first)

**Description:**  
Set up the backend project with .NET 8 Web API and SQL Server database in Docker. This task ensures the project can run locally with migrations applied and a basic health check endpoint.

#### Backend Work:
- Create backend folder and initialize .NET 8 Web API project (`dotnet new webapi`)  
- Create `AppDbContext` with EF Core for database access  
- Configure SQL Server connection via environment variables  
- Enable **automatic migrations** on container startup (`db.Database.Migrate()`)  
- Create `Dockerfile` for backend service  
- Add **health check endpoint**: `GET /health` → returns status 200  
- Set up basic logging and error handling  

#### Database Work:
- Use SQL Server Docker container (`mcr.microsoft.com/mssql/server:2022-latest`)  
- Expose port 1433 for local development  
- Configure Docker volume for persistent data  
- No initial tables required beyond migrations for Product entity  

#### DevOps / Docker Work:
- Create `docker-compose.yml` with services:
  - Backend: port 5000 (external), 80 (internal)
  - Database: port 1433  
- Ensure backend waits for DB container to be ready before applying migrations  

**Endpoints:**
- `GET /health` → backend health check

**Docker URLs:**
- Backend: `http://backend:5000` (internal), `http://localhost:5000` (external)  
- Database: `sqlserver://database:1433` (internal)

---

## 2️⃣ Frontend Initialization

### Issue #2: Frontend Project Setup
**Priority:** HIGH (Can be done after backend + DB setup)

**Description:**  
Set up the frontend React + TypeScript project in Docker with a minimal placeholder page to ensure the container can build and run.

#### Frontend Work:
- Create frontend folder and initialize React + TypeScript project (`npx create-react-app . --template typescript`)  
- Configure **Tailwind CSS** for styling  
- Create `Dockerfile` for frontend container  
- Create a **default Home page**:
  - Renders a simple title text: `"Product Management App"`  
  - Ensures something visible is displayed when container starts  
- Set up basic React Router structure (optional at this stage)

#### DevOps / Docker Work:
- Update `docker-compose.yml` to include frontend:
  - Frontend: port 3000 (external), 3000 (internal)  
- Configure environment variables for backend API URL (placeholder for now)

**Docker URLs:**
- Frontend: `http://frontend:3000` (internal), `http://localhost:3000` (external)

---

**Notes:**  
- At this stage, the backend can connect to an **empty database**, with migrations applying automatically.  
- The frontend container will display a simple Home page as a placeholder, so Docker build/test passes.  
- Future tasks will add actual pages, components, and API calls to these initial projects.
