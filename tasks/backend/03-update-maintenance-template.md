# 03 – PUT Update Maintenance Template

## 📌 Use Case Description

Update an existing maintenance template by ID. All fields (name, intervalType, intervalValue, archived status) can be modified. Returns 404 if template doesn't exist.

---

## 🌐 Endpoint Specification

**Method:** PUT  
**Route:** /api/setup/{id}

**Request:**
- Path parameter: id (int, required)
- Body: UpdateMaintenanceTemplateDto

```json
{
  "name": "Oil Change Updated",
  "intervalType": "time",
  "intervalValue": 365,
  "archived": false
}
```

**Response:**
- 200 OK with updated MaintenanceTemplateDto
- 400 Bad Request (validation errors)
- 404 Not Found (template doesn't exist)
- 500 Internal Server Error (unexpected error)

---

## 🧱 Architecture Requirements

This task must implement:

- UpdateMaintenanceTemplateDto
- Repository method: UpdateAsync
- Repository method: GetByIdAsync
- Service method: UpdateTemplateAsync
- Controller PUT endpoint

Must follow:
- 3-layer architecture
- Repository pattern
- Async/await everywhere
- DTO mapping
- Proper status codes
- Check existence before update

Repository Methods:
```csharp
Task<MaintenanceTemplate?> GetByIdAsync(int id)
Task<MaintenanceTemplate> UpdateAsync(MaintenanceTemplate template)
```

Service Method:
```csharp
Task<MaintenanceTemplateDto?> UpdateTemplateAsync(int id, UpdateMaintenanceTemplateDto dto)
```

---

## 🔐 Validation Rules

- id must be valid integer
- Template with id must exist → 404
- Name is required → "Name is obligatory field"
- IntervalType is required → "Interval type is obligatory field"
- IntervalType must be "km" or "time"
- IntervalValue is required → "Interval value is obligatory field"
- IntervalValue must be > 0
- CreatedAt should not be modified

---

## 🔗 Dependencies

- 02 – POST Create Maintenance Template

---

## 🚫 Out of Scope

- Cascading updates to CarMaintenanceItems
- Authorization
- Change history/audit

---

## ✅ Acceptance Criteria

- PUT /api/setup/{id} updates template
- Returns 200 OK with updated data
- Returns 404 if template not found
- Returns 400 for validation errors
- All fields can be updated
- CreatedAt remains unchanged
- No business logic in controller
- Repository pattern respected
- Build succeeds without warnings

---

## 🧪 Testing Requirements

- Unit test for Service layer
- Repository GetByIdAsync and UpdateAsync tested
- Controller returns 200 on success
- Controller returns 404 when not found
- Validation errors return 400
- CreatedAt not modified
