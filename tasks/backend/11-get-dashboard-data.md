# 11 – GET Dashboard Data

## 📌 Use Case Description

Retrieve dashboard data for a specific car, including car details and all maintenance items with their calculated status (Overdue, Due Soon, OK). Status is calculated based on current km/date vs. next service km/date.

---

## 🌐 Endpoint Specification

**Method:** GET  
**Route:** /api/dashboard/{carId}

**Request:**
- Path parameter: carId (int, required)

**Response:**
- 200 OK with DashboardDto
- 404 Not Found (car doesn't exist)
- 500 Internal Server Error (unexpected error)

**Response DTO Structure:**
```json
{
  "carId": 1,
  "carName": "Toyota Camry",
  "currentKm": 52000,
  "maintenanceItems": [
    {
      "id": 1,
      "templateName": "Oil Change",
      "intervalType": "km",
      "intervalValue": 10000,
      "lastServiceKm": 50000,
      "calculatedNextKm": 60000,
      "status": "OK",
      "daysUntilDue": null,
      "kmUntilDue": 8000
    },
    {
      "id": 2,
      "templateName": "Air Filter",
      "intervalType": "time",
      "intervalValue": 365,
      "lastServiceDate": "2025-06-01T00:00:00",
      "calculatedNextDate": "2026-06-01T00:00:00",
      "status": "DueSoon",
      "daysUntilDue": 104,
      "kmUntilDue": null
    }
  ]
}
```

---

## 🧱 Architecture Requirements

This task must implement:

- DashboardDto with nested DashboardMaintenanceItemDto
- Repository method: GetCarWithMaintenanceItemsAsync
- Service method: GetDashboardDataAsync with status calculation
- DashboardController with GET endpoint
- Status calculation helper

Must follow:
- 3-layer architecture
- Repository pattern
- Async/await everywhere
- DTO mapping with calculated fields
- Proper status calculation logic

Status Calculation Logic:

**For km-based items:**
- kmUntilDue = calculatedNextKm - currentKm
- Overdue: kmUntilDue < 0
- DueSoon: kmUntilDue >= 0 AND kmUntilDue <= 300
- OK: kmUntilDue > 300

**For time-based items:**
- daysUntilDue = (calculatedNextDate - Today).TotalDays
- Overdue: daysUntilDue < 0
- DueSoon: daysUntilDue >= 0 AND daysUntilDue <= 30
- OK: daysUntilDue > 30

Repository Method:
```csharp
Task<Car?> GetCarWithMaintenanceItemsAsync(int carId)
```

Service Method:
```csharp
Task<DashboardDto?> GetDashboardDataAsync(int carId)
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

- carId must be valid integer
- Car with id must exist → 404
- Exclude maintenance items with archived templates
- Status calculated dynamically
- Include all maintenance items for the car

---

## 🔗 Dependencies

- 02 – POST Create Maintenance Template
- 07 – POST Create Car

---

## 🚫 Out of Scope

- Filtering by status
- Multiple cars at once
- Authorization
- Caching

---

## ✅ Acceptance Criteria

- GET /api/dashboard/{carId} returns dashboard data
- Returns 200 OK with calculated status
- Returns 404 if car not found
- Status correctly calculated for km-based items
- Status correctly calculated for time-based items
- kmUntilDue / daysUntilDue calculated correctly
- Archived template items excluded
- No business logic in controller
- Repository pattern respected
- Build succeeds without warnings

---

## 🧪 Testing Requirements

- Unit test for Service layer
- Unit test for status calculation (all 3 states for km and time)
- Repository includes related data correctly
- Controller returns 200 OK
- Controller returns 404 when car not found
- Verify status calculations:
  - Overdue scenarios
  - DueSoon scenarios
  - OK scenarios
- Verify kmUntilDue and daysUntilDue calculations
