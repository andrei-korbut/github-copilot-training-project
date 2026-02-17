# 08 – PUT Update Car

## 📌 Use Case Description

Update an existing car's name, current mileage, and maintenance items. Can modify interval values and last service data for maintenance items. Recalculates next service km/date for all items.

---

## 🌐 Endpoint Specification

**Method:** PUT  
**Route:** /api/cars/{id}

**Request:**
- Path parameter: id (int, required)
- Body: UpdateCarDto

```json
{
  "name": "Toyota Camry 2020",
  "currentKm": 50000,
  "maintenanceItems": [
    {
      "id": 1,
      "intervalValue": 12000,
      "lastServiceKm": 48000,
      "lastServiceDate": null
    },
    {
      "id": 2,
      "intervalValue": 365,
      "lastServiceKm": null,
      "lastServiceDate": "2025-12-01T00:00:00"
    }
  ]
}
```

**Response:**
- 200 OK with updated CarDto
- 400 Bad Request (validation errors)
- 404 Not Found (car doesn't exist)
- 500 Internal Server Error (unexpected error)

---

## 🧱 Architecture Requirements

This task must implement:

- UpdateCarDto with nested UpdateCarMaintenanceItemDto
- Repository methods: GetCarByIdWithMaintenanceItemsAsync, UpdateCarAsync
- Service method: UpdateCarAsync with recalculation logic
- Controller PUT endpoint

Must follow:
- 3-layer architecture
- Repository pattern
- Async/await everywhere
- DTO mapping
- Transaction handling
- Recalculate next service dates after update

Repository Methods:
```csharp
Task<Car?> GetCarByIdWithMaintenanceItemsAsync(int id)
Task<Car> UpdateCarAsync(Car car)
```

Service Method:
```csharp
Task<CarDto?> UpdateCarAsync(int id, UpdateCarDto dto)
```

---

## � Entity Model

**Car:**
- `id` (int, PK) – Unique car ID
- `name` (string, required)
- `currentKm` (int, required)
- `createdAt` (datetime, auto-set)

**CarMaintenanceItem:**
- `id` (int, PK) – Unique maintenance item ID
- `carId` (int, FK → Car)
- `maintenanceTemplateId` (int, FK → MaintenanceTemplate)
- `lastServiceKm` (int, optional)
- `lastServiceDate` (datetime, optional)
- `intervalValue` (int, required) – copied from template
- `intervalType` (`km` / `time`)
- `calculatedNextKm` (int, backend-calculated)
- `calculatedNextDate` (datetime, backend-calculated)

---

## �🔐 Validation Rules

- id must be valid integer
- Car with id must exist → 404
- Name is required → "Name is obligatory field"
- CurrentKm is required → "Mileage is obligatory field"
- CurrentKm must be >= 0
- For each maintenance item:
  - Item id must exist for this car
  - IntervalValue is required and > 0
  - LastServiceKm or LastServiceDate should match intervalType
- Recalculate next service km/date after update

---

## 🔗 Dependencies

- 07 – POST Create Car

---

## 🚫 Out of Scope

- Adding/removing maintenance items (only update existing)
- Authorization
- Change history

---

## ✅ Acceptance Criteria

- PUT /api/cars/{id} updates car and maintenance items
- Returns 200 OK with updated data
- Returns 404 if car not found
- Returns 400 for validation errors
- Next service values recalculated
- Transaction ensures atomicity
- No business logic in controller
- Repository pattern respected
- Build succeeds without warnings

---

## 🧪 Testing Requirements

- Unit test for Service layer
- Unit test for recalculation logic
- Repository update tested
- Controller returns 200 on success
- Controller returns 404 when not found
- Validation errors return 400
- Calculations verified after update
