# 05 – PUT Restore Maintenance Template

## 📌 Use Case Description

Restore an archived maintenance template by setting its archived flag to false. This makes the template visible again for car assignment.

---

## 🌐 Endpoint Specification

**Method:** PUT  
**Route:** /api/setup/{id}/restore

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

- Repository method: RestoreAsync (or reuse GetByIdAsync + UpdateAsync)
- Service method: RestoreTemplateAsync
- Controller PUT endpoint

Must follow:
- 3-layer architecture
- Repository pattern
- Async/await everywhere
- Proper status codes
- Check existence before restoring

Repository Method:
```csharp
Task<bool> RestoreAsync(int id)
```

Service Method:
```csharp
Task<bool> RestoreTemplateAsync(int id)
```

---

## 🔐 Validation Rules

- id must be valid integer
- Template with id must exist → 404
- Only updates archived flag to false
- Can restore already active templates (idempotent)

---

## 🔗 Dependencies

- 01 – GET Maintenance Templates
- 04 – PUT Archive Maintenance Template

---

## 🚫 Out of Scope

- Authorization
- Confirmation workflow
- Cascade operations

---

## ✅ Acceptance Criteria

- PUT /api/setup/{id}/restore sets archived = false
- Returns 204 No Content on success
- Returns 404 if template not found
- Operation is idempotent
- No business logic in controller
- Repository pattern respected
- Build succeeds without warnings

---

## 🧪 Testing Requirements

- Unit test for Service layer
- Repository restore operation tested
- Controller returns 204 on success
- Controller returns 404 when not found
- Verify archived flag set to false
- Test idempotency (restore already active template)
