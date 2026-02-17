# 10 – Update Current Mileage Inline (Dashboard)

## 📌 Use Case Description

Allow users to update the car's current mileage directly from the Dashboard page using inline editing. Clicking on the mileage value makes it editable, user can save or cancel, and the dashboard refreshes to show updated status calculations.

---

## 🔗 Backend Dependency

PATCH /api/cars/{id}/km

Depends on:
- /backend/09-update-car-mileage
- /frontend/09-display-dashboard

---

## 🧱 Scope of Work

- Make current mileage display editable
- Implement inline editing:
  - Click on mileage to enter edit mode
  - Show input field with current value
  - Show Save icon/button
  - Show Cancel icon/button
  
- On Save:
  - Validate km value (>= 0)
  - PATCH to /api/cars/{id}/km
  - Show success notification
  - Refresh dashboard data (status may change)
  - Exit edit mode
  
- On Cancel:
  - Revert to original value
  - Exit edit mode

- Alternative: Use a small "Edit" button next to mileage that opens input

---

## 🎨 UX Requirements

- Clear visual indication of editable field (e.g., dashed underline, pencil icon)
- Smooth transition to edit mode
- Input field styled consistently
- Save/Cancel buttons clearly visible
- Disable save during submission
- Show loading indicator during save
- Success notification: "Mileage updated successfully"
- Error notification for validation/server errors
- Dashboard refreshes automatically after update
- Esc key cancels edit
- Enter key saves (after validation)

---

## 🔐 Validation / Edge Cases

- Km must be >= 0
- Km must be a valid integer
- Handle backend validation errors (400)
- Handle backend server errors (500)
- Handle car not found (404)
- Prevent duplicate submissions
- Cancel on Esc key
- Save on Enter key (optional)

---

## ✅ Acceptance Criteria

- Current mileage is editable inline
- Edit mode activates on click
- Input field pre-filled with current value
- Validation works (km >= 0)
- PATCH request updates mileage successfully
- Dashboard data refreshes after update
- Status calculations update (items may move between groups)
- Success notification shown
- Cancel reverts to original value
- Error handling works (400, 404, 500)
- Keyboard shortcuts work (Esc, Enter optional)
- No console errors
- No TypeScript errors

---

## 🧪 Testing Requirements

- Inline edit functionality tested
- Validation tested
- API call integration tested
- Success flow tested (edit → save → refresh)
- Cancel flow tested
- Dashboard refresh tested
- Status recalculation verified
- Error handling tested
- Keyboard shortcuts tested
