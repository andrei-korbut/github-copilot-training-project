# 06 – Add Car with Maintenance Items

## 📌 Use Case Description

Allow users to create a new car by providing name and current mileage, then assign maintenance items from available (non-archived) templates. Each maintenance item can have customized interval values and last service data (km or date based on type).

---

## 🔗 Backend Dependency

GET /api/setup (for templates list)
POST /api/cars

Depends on:
- /backend/01-get-maintenance-templates
- /backend/07-create-car
- /frontend/05-display-cars-list

---

## 🧱 Scope of Work

- Create AddCarPage (/cars/new)
- Fetch non-archived templates on page load
- Create multi-step or single-page form:
  
  **Step 1: Car Details**
  - Name input (text, required)
  - Current Mileage input (number, required)
  
  **Step 2: Assign Maintenance Items**
  - List all non-archived templates with checkboxes
  - For each selected template:
    - Show interval value (editable, pre-filled from template)
    - Show interval type (km/time, read-only from template)
    - If type = "km": lastServiceKm input (number, optional)
    - If type = "time": lastServiceDate input (date picker with dd/mm/yyyy mask, optional)

- Implement form validation:
  - Name required → "Name is obligatory field"
  - Mileage required → "Mileage is obligatory field"
  - Mileage must be >= 0
  - For each maintenance item:
    - Interval value required and > 0
- On Save:
  - POST to /api/cars with car + maintenance items
  - Show success notification
  - Navigate to /cars (list page)
- On Cancel:
  - Navigate back to /cars

---

## 🎨 UX Requirements

- Clear page title: "Add New Car"
- Logical form flow
- Date input with masked field (dd/mm/yyyy)
- Dynamic interval label (km or days)
- Checkbox selection for templates
- Collapsible/expandable sections for assigned items
- Disable Save button during submission
- Show loading indicator on Save button
- Success notification: "Car created successfully"
- Error notification for server errors
- Breadcrumb or back button to Cars page

---

## 🔐 Validation / Edge Cases

- Prevent empty submissions
- Show field-specific error messages
- Handle backend validation errors (400)
- Handle backend server errors (500)
- Prevent duplicate submissions
- Date validation:
  - dd <= 31
  - mm <= 12
  - yyyy >= 2000
- Handle case when no templates exist
- Allow creating car with no maintenance items

---

## ✅ Acceptance Criteria

- Page accessible at /cars/new
- Form displays correctly with all fields
- Templates fetched and displayed
- Archived templates excluded
- All validations work
- Error messages match specifications
- POST request creates car successfully
- Navigates to /cars after success
- Success notification shown
- Cancel navigates back without saving
- Date mask works correctly (dd/mm/yyyy)
- Dynamic labels for interval values
- No console errors
- No TypeScript errors

---

## 🧪 Testing Requirements

- Form validation tested for all fields
- Date input validation tested
- API call integration tested
- Success flow tested (create → navigate → refresh)
- Cancel flow tested
- Error handling tested (400, 500)
- Template selection tested
- Dynamic fields based on interval type tested
