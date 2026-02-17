# 10 – POST Track Maintenance Change

## 📌 Use Case Description

Record a maintenance service for a specific car maintenance item. Creates a TrackChange record, updates the CarMaintenanceItem's last service km/date, and recalculates the next service due km/date.

---

## 🌐 Endpoint Specification

**Method:** POST  
**Route:** /api/trackchange/{carMaintenanceItemId}

**Request:**
- Path parameter: carMaintenanceItemId (int, required)
- Body:
```json
{
  "km": 52000,
  "date": "2026-02-17T10:30:00"
}
```

**Response:**
- 201 Created with TrackChangeDto and Location header
- 400 Bad Request (validation errors)
- 404 Not Found (maintenance item doesn't exist)
- 500 Internal Server Error (unexpected error)

---

## 🧱 Architecture Requirements

This task must implement:

- CreateTrackChangeDto
- TrackChangeDto
- ITrackChangeRepository with CreateAsync method
- TrackChangeRepository implementation
- ITrackChangeService with TrackChangeAsync method
- TrackChangeService implementation
- TrackChangeController with POST endpoint
- Logic to update CarMaintenanceItem and recalculate next service

Must follow:
- 3-layer architecture
- Repository pattern
- Async/await everywhere
- Transaction handling (create TrackChange + update CarMaintenanceItem)
- Recalculate next service based on intervalType

Calculation Logic:
- If intervalType = "km": 
  - Update lastServiceKm with provided km
  - calculatedNextKm = lastServiceKm + intervalValue
- If intervalType = "time":
  - Update lastServiceDate with provided date
  - calculatedNextDate = lastServiceDate + intervalValue days

Repository Method:
```csharp
Task<TrackChange> CreateAsync(TrackChange trackChange)
```

Service Method:
```csharp
Task<TrackChangeDto> TrackChangeAsync(int carMaintenanceItemId, CreateTrackChangeDto dto)
```

---

## � Entity Model

**TrackChange:**
- `id` (int, PK) – Unique track change ID
- `carMaintenanceItemId` (int, FK → CarMaintenanceItem)
- `km` (int, optional)
- `date` (datetime, optional)

**CarMaintenanceItem** (updated by this operation):
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

- carMaintenanceItemId must be valid integer
- CarMaintenanceItem with id must exist → 404
- CarMaintenanceItem must reference a non-archived MaintenanceTemplate → 400 Bad Request with error: "Cannot track changes for archived maintenance templates"
- If intervalType = "km": km is required
- If intervalType = "time": date is required
- km must be >= 0 (if provided)
- date cannot be in future (optional validation)
- Update CarMaintenanceItem accordingly
- Recalculate next service values

---

## 🔗 Dependencies

- 02 – POST Create Maintenance Template
- 07 – POST Create Car

Note: This task creates the TrackChange entity.

---

## 🚫 Out of Scope

- Validation that new km > last km
- Authorization
- Multiple items tracking at once

---

## ✅ Acceptance Criteria

- POST /api/trackchange/{carMaintenanceItemId} creates record
- Returns 201 Created with Location header
- TrackChange record created in database
- CarMaintenanceItem lastServiceKm/Date updated
- Next service km/date recalculated
- Returns 404 if maintenance item not found
- Returns 400 for validation errors
- Transaction ensures atomicity
- No business logic in controller
- Repository pattern respected
- Build succeeds without warnings

---

## 🧪 Testing Requirements

- Unit test for Service layer
- Unit test for recalculation logic
- Repository transaction tested
- Controller returns 201 with Location header
- Controller returns 404 when item not found
- Validation errors return 400
- Verify TrackChange created
- Verify CarMaintenanceItem updated
- Verify next service recalculated
