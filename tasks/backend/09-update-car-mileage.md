# 09 – PATCH Update Car Current Mileage

## 📌 Use Case Description

Update only the current mileage of a car. This is a lightweight endpoint used by the dashboard for inline editing. Does not affect maintenance items.

---

## 🌐 Endpoint Specification

**Method:** PATCH  
**Route:** /api/cars/{id}/km

**Request:**
- Path parameter: id (int, required)
- Body:
```json
{
  "currentKm": 52000
}
```

**Response:**
- 204 No Content (success)
- 400 Bad Request (validation error)
- 404 Not Found (car doesn't exist)
- 500 Internal Server Error (unexpected error)

---

## 🧱 Architecture Requirements

This task must implement:

- UpdateCarMileageDto
- Repository method: UpdateCarMileageAsync
- Service method: UpdateCarMileageAsync
- Controller PATCH endpoint

Must follow:
- 3-layer architecture
- Repository pattern
- Async/await everywhere
- Proper status codes
- Only update currentKm field

Repository Method:
```csharp
Task<bool> UpdateCarMileageAsync(int id, int currentKm)
```

Service Method:
```csharp
Task<bool> UpdateCarMileageAsync(int id, int currentKm)
```

---

## 🔐 Validation Rules

- id must be valid integer
- Car with id must exist → 404
- currentKm is required
- currentKm must be >= 0
- Only updates currentKm, no other fields

---

## 🔗 Dependencies

- 06 – GET Cars List
- 07 – POST Create Car

---

## 🚫 Out of Scope

- Updating other car properties
- Validation that new km >= old km
- Authorization

---

## ✅ Acceptance Criteria

- PATCH /api/cars/{id}/km updates current mileage
- Returns 204 No Content on success
- Returns 404 if car not found
- Returns 400 for validation errors
- Only currentKm field modified
- No business logic in controller
- Repository pattern respected
- Build succeeds without warnings

---

## 🧪 Testing Requirements

- Unit test for Service layer
- Repository update tested
- Controller returns 204 on success
- Controller returns 404 when not found
- Validation errors return 400
- Verify only currentKm changed
