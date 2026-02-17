# 02 – POST Create Maintenance Template

## 📌 Use Case Description

Create a new maintenance template with name, interval type (km/time), and interval value. Validates required fields and returns the created template.

---

## 🌐 Endpoint Specification

**Method:** POST  
**Route:** /api/setup

**Request Body:**
```json
{
  "name": "Oil Change",
  "intervalType": "km",
  "intervalValue": 10000
}
```

**Response:**
- 201 Created with created MaintenanceTemplateDto and Location header
- 400 Bad Request (validation errors)
- 500 Internal Server Error (unexpected error)

**Validation Error Response:**
```json
{
  "errors": {
    "Name": ["Name is obligatory field"],
    "IntervalType": ["Interval type is obligatory field"],
    "IntervalValue": ["Interval value is obligatory field"]
  }
}
```

---

## 🧱 Architecture Requirements

This task must implement:

- CreateMaintenanceTemplateDto (request DTO)
- Repository method: CreateAsync
- Service method: CreateTemplateAsync
- Controller POST endpoint with validation

Must follow:
- 3-layer architecture
- Repository pattern
- Async/await everywhere
- DTO mapping (CreateDto → Entity → ResponseDto)
- Proper status codes (201 Created)
- Location header with created resource URI
- Model validation attributes

Repository Method:
```csharp
Task<MaintenanceTemplate> CreateAsync(MaintenanceTemplate template)
```

Service Method:
```csharp
Task<MaintenanceTemplateDto> CreateTemplateAsync(CreateMaintenanceTemplateDto dto)
```

---

## 🔐 Validation Rules

- Name is required → "Name is obligatory field"
- IntervalType is required → "Interval type is obligatory field"
- IntervalType must be "km" or "time"
- IntervalValue is required → "Interval value is obligatory field"
- IntervalValue must be > 0
- Archived defaults to false
- CreatedAt auto-generated

---

## 🔗 Dependencies

- 01 – GET Maintenance Templates

---

## 🚫 Out of Scope

- Duplicate name checking
- Authorization
- Audit logging

---

## ✅ Acceptance Criteria

- POST /api/setup creates template
- Returns 201 Created on success
- Location header contains /api/setup/{id}
- Returns 400 for validation errors
- Error messages match specifications
- CreatedAt automatically set
- Archived defaults to false
- No business logic in controller
- Repository pattern respected
- Build succeeds without warnings

---

## 🧪 Testing Requirements

- Unit test for Service layer validation
- Repository CreateAsync tested
- Controller returns 201 with Location header
- Validation errors return 400
- All required field validations tested
- IntervalType validation tested (only km/time allowed)
