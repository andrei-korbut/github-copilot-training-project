# 04 – PUT Archive Maintenance Template

## 📌 Use Case Description

Archive an existing maintenance template by setting its archived flag to true. Archived templates are hidden from car assignment lists but remain editable on the Setup page.

---

## 🌐 Endpoint Specification

**Method:** PUT  
**Route:** /api/setup/{id}/archive

**Request:**
- Path parameter: id (int, required)

**Response:**
- 204 No Content (success)
- 404 Not Found (template doesn't exist)
- 400 Bad Request (invalid id)
- 500 Internal Server Error (unexpected error)

---

## 🧱 Architecture Requirements

This task must implement:

- Repository method: ArchiveAsync (or reuse GetByIdAsync + UpdateAsync)
- Service method: ArchiveTemplateAsync
- Controller PUT endpoint

Must follow:
- 3-layer architecture
- Repository pattern
- Async/await everywhere
- Proper status codes
- Check existence before archiving

Repository Method:
```csharp
Task<bool> ArchiveAsync(int id)
```

Service Method:
```csharp
Task<bool> ArchiveTemplateAsync(int id)
```

---

## 🔐 Validation Rules

- id must be valid integer
- Template with id must exist → 404
- Only updates archived flag to true
- Does not delete the entity
- Does not affect existing CarMaintenanceItems

---

## 🔗 Dependencies

- 01 – GET Maintenance Templates
- 03 – PUT Update Maintenance Template

---

## 🚫 Out of Scope

- Cascade archiving of related data
- Soft delete
- Authorization
- Confirmation workflow

---

## ✅ Acceptance Criteria

- PUT /api/setup/{id}/archive sets archived = true
- Returns 204 No Content on success
- Returns 404 if template not found
- Template remains in database
- Archived templates still returned by GET /api/setup
- No business logic in controller
- Repository pattern respected
- Build succeeds without warnings

---

## 🧪 Testing Requirements

- Unit test for Service layer
- Repository archive operation tested
- Controller returns 204 on success
- Controller returns 404 when not found
- Verify archived flag set to true
- Verify entity not deleted
