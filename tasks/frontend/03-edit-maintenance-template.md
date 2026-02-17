# 03 – Edit Maintenance Template

## 📌 Use Case Description

Allow users to edit an existing maintenance template. Display edit form (inline or modal) with pre-filled values. Validate inputs and save changes. Support editing all fields including archived status.

---

## 🔗 Backend Dependency

PUT /api/setup/{id}

Depends on:
- /backend/03-update-maintenance-template
- /frontend/01-display-maintenance-templates
- /frontend/02-add-maintenance-template

---

## 🧱 Scope of Work

- Add "Edit" button to each template in the list
- Create EditTemplateForm component (modal or inline):
  - Pre-fill all fields from existing template
  - Name input (text, required)
  - Interval Type dropdown (km/time, required)
  - Interval Value input (number, required)
  - Dynamic label: "km" or "days" based on interval type
  - Save button
  - Cancel button
- Implement form validation (same as Add Template):
  - Name required → "Name is obligatory field"
  - Interval Type required → "Interval type is obligatory field"
  - Interval Value required → "Interval value is obligatory field"
  - Interval Value must be > 0
- On Save:
  - PUT to /api/setup/{id}
  - Show success notification
  - Refresh template list
  - Close form
- On Cancel:
  - Discard changes
  - Close form

---

## 🎨 UX Requirements

- Edit button clearly visible on each template
- Form pre-filled with current values
- Clear visual indication of edit mode
- Same validation feedback as Add form
- Disable Save button during submission
- Show loading indicator on Save button
- Success notification: "Template updated successfully"
- Error notification for server errors
- Close modal on successful save

---

## 🔐 Validation / Edge Cases

- Prevent empty submissions
- Show field-specific error messages
- Handle template not found (404)
- Handle backend validation errors (400)
- Handle backend server errors (500)
- Prevent duplicate submissions
- Revert to original values on cancel

---

## ✅ Acceptance Criteria

- Edit button visible on each template
- Form opens with pre-filled values
- All validations work
- Error messages match specifications
- PUT request updates template successfully
- Template list refreshes after update
- Success notification shown
- Form closes after save
- Cancel discards changes
- No console errors
- No TypeScript errors

---

## 🧪 Testing Requirements

- Form validation tested for all fields
- API call integration tested
- Success flow tested (edit → save → refresh → close)
- Cancel flow tested
- Error handling tested (400, 404, 500)
- Pre-fill functionality tested
