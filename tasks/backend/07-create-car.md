# 07 – POST Create Car

## 📌 Use Case Description

Create a new car with name and current mileage, along with associated maintenance items. Each maintenance item can have custom interval values and last service data. The system calculates next service km/date based on provided values.

---

## 🌐 Endpoint Specification

**Method:** POST  
**Route:** /api/cars

**Request Body:**
```json
{
  "name": "Toyota Camry",
  "currentKm": 45000,
  "maintenanceItems": [
    {
      "maintenanceTemplateId": 1,
      "intervalValue": 10000,
      "intervalType": "km",
      "lastServiceKm": 40000,
      "lastServiceDate": null
    },
    {
      "maintenanceTemplateId": 2,
      "intervalValue": 365,
      "intervalType": "time",
      "lastServiceKm": null,
      "lastServiceDate": "2025-06-15T00:00:00"
    }
  ]
}
```

**Response:**
- 201 Created with created CarDto and Location header
- 400 Bad Request (validation errors)
- 500 Internal Server Error (unexpected error)

---

## 🧱 Architecture Requirements

This task must implement:

- CreateCarDto with nested CreateCarMaintenanceItemDto
- Repository method: CreateCarWithMaintenanceItemsAsync
- Service method: CreateCarAsync with next service calculation logic
- Controller POST endpoint
- Calculation service/helper for next service dates

Must follow:
- 3-layer architecture
- Repository pattern
- Async/await everywhere
- DTO mapping with nested objects
- Transaction handling (car + maintenance items created together)
- Location header with created resource URI

Calculation Logic:
- If intervalType = "km": calculatedNextKm = lastServiceKm + intervalValue
- If intervalType = "time": calculatedNextDate = lastServiceDate + intervalValue days

Repository Method:
```csharp
Task<Car> CreateCarWithMaintenanceItemsAsync(Car car, List<CarMaintenanceItem> items)
```

Service Method:
```csharp
Task<CarDto> CreateCarAsync(CreateCarDto dto)
```

---

## 🔐 Validation Rules

- Name is required → "Name is obligatory field"
- CurrentKm is required → "Mileage is obligatory field"
- CurrentKm must be >= 0
- MaintenanceItems array can be empty
- For each maintenance item:
  - MaintenanceTemplateId is required
  - IntervalValue is required and > 0
  - IntervalType is required ("km" or "time")
  - If intervalType = "km", lastServiceKm should be provided
  - If intervalType = "time", lastServiceDate should be provided
- Only non-archived templates can be assigned
- CreatedAt auto-generated

---

## 🔗 Dependencies

- 02 – POST Create Maintenance Template (needs MaintenanceTemplate for maintenance items)

Note: This task creates the Car and CarMaintenanceItem entities.

---

## 🚫 Out of Scope

- Duplicate car name checking
- Authorization
- Validation that lastServiceKm <= currentKm

---

## ✅ Acceptance Criteria

- POST /api/cars creates car with maintenance items
- Returns 201 Created on success
- Location header contains /api/cars/{id}
- Returns 400 for validation errors
- Next service km/date calculated correctly
- Transaction ensures atomicity (all or nothing)
- No business logic in controller
- Repository pattern respected
- Build succeeds without warnings

---

## 🧪 Testing Requirements

- Unit test for Service layer validation
- Unit test for next service calculations
- Repository transaction tested
- Controller returns 201 with Location header
- Validation errors return 400
- All required field validations tested
- Calculation logic verified (km and time modes)
