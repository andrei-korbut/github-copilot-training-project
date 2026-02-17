# 08 – Track Change from Cars Page

## 📌 Use Case Description

Allow users to record a maintenance service for a specific car maintenance item from the Cars page. Open a dialog/modal with km or date input (based on interval type), auto-fill with current values, and submit to update the maintenance record.

---

## 🔗 Backend Dependency

POST /api/trackchange/{carMaintenanceItemId}

Depends on:
- /backend/10-track-maintenance-change
- /frontend/05-display-cars-list

---

## 🧱 Scope of Work

- Add "Track Change" button to each maintenance item in car detail view
- Create TrackChangeModal component:
  - Show maintenance item name and template
  - If intervalType = "km":
    - Km input (number, auto-filled with car's current km)
  - If intervalType = "time":
    - Date input (date picker with dd/mm/yyyy mask, auto-filled with today's date)
  - Save button
  - Cancel button

- User can override auto-filled values
- On Save:
  - POST to /api/trackchange/{carMaintenanceItemId}
  - Show success notification
  - Refresh car data to show updated maintenance item
  - Close modal
- On Cancel:
  - Close modal without changes

---

## 🎨 UX Requirements

- Track Change button clearly visible on each maintenance item
- Modal opens with clear title: "Track Maintenance: [Item Name]"
- Auto-filled values visible but editable
- Date input with masked field (dd/mm/yyyy)
- Disable Save button during submission
- Show loading indicator on Save button
- Success notification: "Maintenance tracked successfully"
- Error notification for server errors
- Close modal on successful save
- Show current maintenance details in modal (last service, next due)

---

## 🔐 Validation / Edge Cases

- Km required if intervalType = "km"
- Date required if intervalType = "time"
- Km must be >= 0
- Date validation (dd/mm/yyyy format, valid date)
- Handle maintenance item not found (404)
- Handle backend validation errors (400)
- Handle backend server errors (500)
- Prevent duplicate submissions

---

## ✅ Acceptance Criteria

- Track Change button visible on each maintenance item
- Modal opens correctly
- Auto-fill works for km/date based on type
- User can override auto-filled values
- All validations work
- POST request records change successfully
- Car data refreshes after success
- Success notification shown
- Modal closes after save
- Cancel closes modal without changes
- No console errors
- No TypeScript errors

---

## 🧪 Testing Requirements

- Modal functionality tested
- Auto-fill tested (km and date modes)
- API call integration tested
- Success flow tested (track → refresh → close)
- Cancel flow tested
- Error handling tested (400, 404, 500)
- Date validation tested
- Km validation tested
