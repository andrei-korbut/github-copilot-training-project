# XX – <Endpoint Name>

## 📌 Use Case Description
Describe the functional behavior in human language.

Example:
Delete an existing product by its ID. 
If the product does not exist, return 404.
If deletion succeeds, return 204 No Content.

---

## 🌐 Endpoint Specification

Method: DELETE  
Route: /products/{id}  

Request:
- Path parameter: id (Guid, required)

Response:
- 204 No Content (success)
- 404 Not Found (if product does not exist)
- 400 Bad Request (if id invalid)
- 500 Internal Server Error (unexpected error)

---

## 🧱 Architecture Requirements

This task must implement:

- Product entity (if not already existing)
- Repository method (DeleteAsync)
- Service method (DeleteProductAsync)
- Controller endpoint

Must follow:
- 3-layer architecture
- Repository pattern
- Async/await everywhere
- DTO usage (if applicable)
- Proper status codes

---

## 🔐 Validation Rules

- id is required
- id must be valid Guid
- If product does not exist → return 404
- No silent failures

---

## 🔗 Dependencies

- 01 – Product Entity Setup
- 02 – Get Products Endpoint

---

## 🚫 Out of Scope

- Soft delete
- Audit logging
- Authorization

---

## ✅ Acceptance Criteria

- DELETE /products/{id} works
- Product removed from database
- Returns 204 on success
- Returns 404 if not found
- No business logic in controller
- Repository pattern respected
- Build succeeds without warnings

---

## 🧪 Testing Requirements

- Unit test for Service layer
- Repository method tested (if using test DB or mocks)
- Controller returns correct status codes
- Edge cases tested (invalid Guid)
