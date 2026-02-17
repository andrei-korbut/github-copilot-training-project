# 06 – GET Cars List

## 📌 Use Case Description

Retrieve all cars with their attached maintenance items (excluding items based on archived templates). Returns cars sorted by creation date (newest first). Each car includes its maintenance items with template details.

---

## 🌐 Endpoint Specification

**Method:** GET  
**Route:** /api/cars

**Request:**
- No parameters

**Response:**
- 200 OK with array of CarDto
- 500 Internal Server Error (unexpected error)

**Response DTO Structure:**
```json
[
  {
    "id": 1,
    "name": "Toyota Camry",
    "currentKm": 45000,
    "createdAt": "2026-01-10T08:00:00",
    "maintenanceItems": [
      {
        "id": 1,
        "maintenanceTemplateId": 1,
        "templateName": "Oil Change",
        "intervalType": "km",
        "intervalValue": 10000,
        "lastServiceKm": 40000,
        "lastServiceDate": null,
        "calculatedNextKm": 50000,
        "calculatedNextDate": null
      }
    ]
  }
]
```

---

## 🧱 Architecture Requirements

This task must implement:

- ICarRepository interface with GetAllWithMaintenanceItemsAsync method
- CarRepository implementation (with Include for MaintenanceItems and Templates)
- ICarService interface with GetAllCarsAsync method
- CarService implementation
- CarsController with GET endpoint
- CarDto, CarMaintenanceItemDto

Must follow:
- 3-layer architecture
- Repository pattern with interfaces
- Async/await everywhere
- DTO mapping with nested objects
- Proper eager loading (Include)
- Filter out maintenance items with archived templates
- Dependency injection

Repository Method:
```csharp
Task<List<Car>> GetAllWithMaintenanceItemsAsync()
```

Service Method:
```csharp
Task<List<CarDto>> GetAllCarsAsync()
```

---

## 🔐 Validation Rules

- Return empty array if no cars exist
- Always return 200 OK
- Filter out CarMaintenanceItems where template.archived = true
- Results sorted by CreatedAt descending
- Include related MaintenanceTemplate data

---

## 🔗 Dependencies

- 02 – POST Create Maintenance Template (Car entity references MaintenanceTemplate)

Note: This task should create the Car and CarMaintenanceItem entities.

---

## 🚫 Out of Scope

- Pagination
- Searching/filtering
- Authorization
- Include archived templates

---

## ✅ Acceptance Criteria

- GET /api/cars returns all cars with maintenance items
- Cars sorted newest first
- Empty array returned when no data
- Maintenance items include template details
- Archived template items excluded
- Returns 200 OK always
- No N+1 query issues (proper eager loading)
- No business logic in controller
- Repository pattern respected
- Build succeeds without warnings
- Swagger documentation generated

---

## 🧪 Testing Requirements

- Unit test for Service layer
- Repository includes related data correctly
- Controller returns 200 OK
- Empty list scenario tested
- Sorting verified
- Archived templates filtering verified
