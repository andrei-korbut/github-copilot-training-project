# 05 – Display Cars List

## 📌 Use Case Description

Display a list of all cars on the Cars page sorted by creation date (newest first). Show basic car information and a count of maintenance items. Provide navigation to add new car and edit existing cars. Show empty state when no cars exist.

---

## 🔗 Backend Dependency

GET /api/cars

Depends on:
- /backend/06-get-cars-list

---

## 🧱 Scope of Work

- Fetch cars from GET /api/cars on page load
- Display cars in a list/card layout:
  - Car name
  - Current mileage (formatted with separator, e.g., "52,000 km")
  - Number of maintenance items
  - Created date (formatted)
- Add "Add Car" button (navigates to /cars/new)
- Add "Edit" button for each car (navigates to /cars/{id}/edit)
- Add "View Details" button or expand functionality
- Show empty state: "No cars available. Add your first car to get started."
- Show loading spinner while fetching
- Show error notification if request fails
- Create reusable components:
  - CarList component
  - CarCard component
  - EmptyState component

---

## 🎨 UX Requirements

- Add Car button prominently positioned (top of page)
- Loading spinner centered on page during fetch
- Empty state with clear message and call-to-action
- Cars displayed in card format
- Mileage formatted with thousand separators
- Date formatted as readable string
- Edit button clearly visible on each card
- Responsive grid layout
- Error toast/notification on API failure
- Visual hierarchy: car name most prominent

---

## 🔐 Validation / Edge Cases

- Handle network failure gracefully
- Handle empty response (empty array)
- Handle backend error response (500)
- Show appropriate error messages
- Handle cars with no maintenance items

---

## ✅ Acceptance Criteria

- Page loads and fetches cars automatically
- Cars render correctly with all fields
- Empty state shown when no cars exist
- Add Car button navigates to /cars/new
- Edit button navigates to /cars/{id}/edit
- Loading state displayed during fetch
- Error notification shown on failure
- Sorting matches backend (newest first)
- Mileage formatted correctly
- No console errors
- No TypeScript errors
- Responsive on mobile and desktop

---

## 🧪 Testing Requirements

- Component renders with sample data
- API integration works with backend
- Empty state tested
- Loading state tested
- Error state tested
- Navigation tested (Add Car, Edit)
- Mileage formatting tested
