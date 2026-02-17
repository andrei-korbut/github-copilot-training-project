# 02 – Add Maintenance Template

## 📌 Use Case Description

Allow users to create a new maintenance template via an always-visible "Add Template" button. Display a form with name, interval type (km/time), and interval value. Validate inputs and show specific error messages. Save creates the template and refreshes the list.

---

## 🔗 Backend Dependency

POST /api/setup

Depends on:
- /backend/02-create-maintenance-template
- /frontend/01-display-maintenance-templates

---

## 🧱 Scope of Work

- Add "Add Template" button (always visible on Setup page)
- Create AddTemplateForm component (modal or inline):
  - Name input (text, required)
  - Interval Type dropdown (km/time, required)
  - Interval Value input (number, required)
  - Dynamic label: "km" or "days" based on interval type
  - Save button
  - Cancel button
- Implement form validation:
  - Name required → "Name is obligatory field"
  - Interval Type required → "Interval type is obligatory field"
  - Interval Value required → "Interval value is obligatory field"
  - Interval Value must be > 0
- On Save:
  - POST to /api/setup
  - Show success notification
  - Refresh template list
  - Close form
- On Cancel:
  - Discard changes
  - Close form

---

## 🎨 UX Requirements

- Add button prominently positioned (top of page)
- Form opens in modal or expands inline
- Clear field labels
- Real-time validation feedback
- Disable Save button during submission
- Show loading indicator on Save button
- Success notification: "Template created successfully"
- Error notification for server errors
- Close modal on successful save
- Focus on first field when form opens

---

## 🔐 Validation / Edge Cases

- Prevent empty submissions
- Show field-specific error messages
- Handle backend validation errors (400)
- Handle backend server errors (500)
- Prevent duplicate submissions (disable button)
- Clear form after successful creation

---

## ✅ Acceptance Criteria

- Add Template button visible and functional
- Form opens correctly
- All validations work
- Error messages match specifications
- POST request creates template successfully
- Template list refreshes after creation
- Success notification shown
- Form closes after save
- Cancel discards changes
- No console errors
- No TypeScript errors

---

## 🧪 Testing Requirements

- Form validation tested for all fields
- API call integration tested
- Success flow tested (create → refresh → close)
- Cancel flow tested
- Error handling tested (400, 500)
- Duplicate submission prevention tested
