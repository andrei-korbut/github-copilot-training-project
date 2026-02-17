# 07 – Edit Car with Maintenance Items

## 📌 Use Case Description

Allow users to edit an existing car's name, current mileage, and maintenance item details (interval values, last service km/date). Load current car data and pre-fill the form. Save updates and return to cars list.

---

## 🔗 Backend Dependency

GET /api/cars (to fetch car details)
PUT /api/cars/{id}

Depends on:
- /backend/06-get-cars-list
- /backend/08-update-car
- /frontend/05-display-cars-list
- /frontend/06-add-car

**Note:** The cars list page from task 05 can be mocked with a simple placeholder for testing the redirect after editing. Check if tasks 05 or 06 have already created this mock page to avoid duplication.

---

## 🧱 Scope of Work

- Create EditCarPage (/cars/:id/edit)
- Fetch car data with maintenance items on page load
- Create edit form (similar structure to Add Car):
  
  **Car Details**
  - Name input (pre-filled, required)
  - Current Mileage input (pre-filled, required)
  
  **Maintenance Items**
  - Display all assigned maintenance items (cannot add/remove, only edit)
  - For each item:
    - Template name (read-only)
    - Interval value (editable)
    - If type = "km": lastServiceKm input (editable)
    - If type = "time": lastServiceDate input (editable with dd/mm/yyyy mask)

- Implement form validation (same as Add Car):
  - Name required → "Name is obligatory field"
  - Mileage required → "Mileage is obligatory field"
  - Mileage must be >= 0
  - Interval values must be > 0
- On Save:
  - PUT to /api/cars/{id}
  - Show success notification
  - Navigate to /cars (list page)
- On Cancel:
  - Navigate back to /cars

---

## 🎨 UX Requirements

- Clear page title: "Edit Car: [Car Name]"
- All fields pre-filled with current values
- Same form layout as Add Car for consistency
- Date input with masked field (dd/mm/yyyy)
- Dynamic interval label (km or days)
- Disable Save button during submission
- Show loading indicator on Save button
- Success notification: "Car updated successfully"
- Error notification for server errors
- Breadcrumb or back button to Cars page
- Loading state while fetching car data

---

## 🔐 Validation / Edge Cases

- Handle car not found (404) → redirect to /cars
- Prevent empty submissions
- Show field-specific error messages
- Handle backend validation errors (400)
- Handle backend server errors (500)
- Prevent duplicate submissions
- Date validation (same as Add Car)
- Revert to original values on cancel

---

## ✅ Acceptance Criteria

- Page accessible at /cars/:id/edit
- Car data fetched and pre-filled
- Form displays correctly with all fields
- All validations work
- Error messages match specifications
- PUT request updates car successfully
- Navigates to /cars after success
- Success notification shown
- Cancel navigates back without saving
- 404 handling works (redirect + error message)
- Date mask works correctly
- No console errors
- No TypeScript errors

---

## 🧪 Testing Requirements

- Form validation tested for all fields
- API call integration tested
- Pre-fill functionality tested
- Success flow tested (update → navigate → refresh)
- Cancel flow tested
- Error handling tested (400, 404, 500)
- Date input validation tested
