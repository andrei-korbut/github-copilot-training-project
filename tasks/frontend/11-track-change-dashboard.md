# 11 – Track Change from Dashboard

## 📌 Use Case Description

Allow users to record a maintenance service for any maintenance item directly from the Dashboard page. Reuse the Track Change functionality from the Cars page but ensure the dashboard refreshes afterward to reflect updated status and grouping.

---

## 🔗 Backend Dependency

POST /api/trackchange/{carMaintenanceItemId}

Depends on:
- /backend/10-track-maintenance-change
- /frontend/08-track-change-cars-page
- /frontend/09-display-dashboard

---

## 🧱 Scope of Work

- Add "Track Change" button to each maintenance item in all status groups
- Reuse TrackChangeModal component from task 09:
  - Show maintenance item name and template
  - If intervalType = "km": Km input (auto-filled with car's current km)
  - If intervalType = "time": Date input (auto-filled with today's date)
  - User can override auto-filled values
  - Save button
  - Cancel button

- On Save:
  - POST to /api/trackchange/{carMaintenanceItemId}
  - Show success notification
  - Refresh dashboard data
  - Item may move to different status group
  - Close modal
  
- On Cancel:
  - Close modal without changes

---

## 🎨 UX Requirements

- Track Change button visible on each item in all sections
- Modal behavior same as Cars page implementation
- Auto-filled values visible but editable
- Disable Save button during submission
- Show loading indicator on Save button
- Success notification: "Maintenance tracked successfully"
- Error notification for server errors
- Dashboard automatically refreshes after save
- Item smoothly moves to appropriate status group if needed
- Close modal on successful save

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
- Dashboard refresh updates all status groups
- Item may move from Overdue → DueSoon or DueSoon → OK

---

## ✅ Acceptance Criteria

- Track Change button visible on all dashboard items
- Modal opens correctly (reused component)
- Auto-fill works for km/date based on type
- User can override auto-filled values
- All validations work
- POST request records change successfully
- Dashboard refreshes completely after success
- Item moves to correct status group if needed
- Success notification shown
- Modal closes after save
- Cancel closes modal without changes
- Status grouping updates correctly
- No console errors
- No TypeScript errors

---

## 🧪 Testing Requirements

- Modal functionality tested
- API call integration tested
- Dashboard refresh tested
- Status group update tested (item movement)
- Success flow tested (track → refresh → regroup)
- Cancel flow tested
- Error handling tested (400, 404, 500)
- Auto-fill tested
- Validation tested
- Verify item can move between all status groups
