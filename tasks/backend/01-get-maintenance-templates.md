# 01 – GET Maintenance Templates

## 📌 Use Case Description

Retrieve all maintenance templates sorted by creation date (newest first). This endpoint returns all templates including archived ones, as the Setup page allows editing archived templates.

---

## 🌐 Endpoint Specification

**Method:** GET  
**Route:** /api/setup

**Request:**
- No parameters

**Response:**
- 200 OK with array of MaintenanceTemplateDto
- 500 Internal Server Error (unexpected error)

**Response DTO Structure:**
```json
[
  {
    "id": 1,
    "name": "Oil Change",
    "intervalType": "km",
    "intervalValue": 10000,
    "archived": false,
    "createdAt": "2026-01-15T10:30:00"
  }
]
```

---

## 🧱 Architecture Requirements

This task must implement:

- IMaintenanceTemplateRepository interface with GetAllAsync method
- MaintenanceTemplateRepository implementation
- IMaintenanceTemplateService interface with GetAllTemplatesAsync method
- MaintenanceTemplateService implementation
- SetupController with GET endpoint
- MaintenanceTemplateDto

**Note:** This task uses the MaintenanceTemplate entity created in Task 02.

Must follow:
- 3-layer architecture (Controller → Service → Repository)
- Repository pattern with interfaces
- Async/await everywhere
- DTO mapping (Entity → DTO)
- Proper status codes
- Dependency injection

Repository Method:
```csharp
Task<List<MaintenanceTemplate>> GetAllAsync()
```

Service Method:
```csharp
Task<List<MaintenanceTemplateDto>> GetAllTemplatesAsync()
```

---

## � Entity Model

**MaintenanceTemplate:**
- `id` (int, PK, auto-increment) – Unique template ID
- `name` (string, required)
- `intervalType` (`km` / `time`)
- `intervalValue` (int, required)
- `archived` (bool, default false)
- `createdAt` (datetime, auto-set)

---

## �🔐 Validation Rules

- Return empty array if no templates exist
- Always return 200 OK (even for empty list)
- Results sorted by CreatedAt descending

---

## 🔗 Dependencies

**Backend Task 02 (POST Create Maintenance Template)** – This task depends on the MaintenanceTemplate entity being created by Task 02. Task 02 must be completed first to establish the entity model, and this task will implement the GET endpoint using that existing entity.

---

## 🚫 Out of Scope

- Filtering by archived status
- Pagination
- Searching/filtering
- Authorization

---

## ✅ Acceptance Criteria

- GET /api/setup returns all templates
- Templates sorted newest first
- Empty array returned when no data
- Returns 200 OK always
- No business logic in controller
- Repository pattern respected
- Proper async/await usage
- DTO mapping works correctly
- Build succeeds without warnings
- Swagger documentation generated

---

## 🧪 Testing Requirements

- Unit test for Service layer
- Repository method returns correct data
- Controller returns 200 OK
- Empty list scenario tested
- Sorting verified (newest first)
