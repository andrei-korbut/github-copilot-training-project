# 09 – Display Dashboard with Car Selector

## 📌 Use Case Description

Create the Dashboard page with a car selector dropdown and display maintenance items grouped by status (Overdue, Due Soon, OK). Show car's current mileage and provide visual indicators for each status category.

---

## 🔗 Backend Dependency

GET /api/cars (for car list)
GET /api/dashboard/{carId}

Depends on:
- /backend/06-get-cars-list
- /backend/11-get-dashboard-data

---

## 🧱 Scope of Work

- Create DashboardPage (/dashboard)
- Fetch cars list for dropdown on page load
- Display car selector dropdown (default: first car)
- On car selection:
  - Fetch dashboard data via GET /api/dashboard/{carId}
  - Display car name and current mileage
- Group and display maintenance items by status:
  
  **🔴 Overdue Section**
  - Red background/border
  - Items past due date/km
  
  **🟡 Due Soon Section**
  - Yellow background/border
  - Items within 300 km or 30 days
  
  **🟢 OK Section**
  - Green background/border
  - Items > 300 km or > 30 days

- For each maintenance item display:
  - Template name
  - Interval info (e.g., "Every 10,000 km" or "Every 365 days")
  - Last service (km or date)
  - Next due (km or date)
  - kmUntilDue or daysUntilDue
  - Track Change button

- Show loading spinner while fetching
- Show error notification if request fails
- Handle case when no cars exist

---

## 🎨 UX Requirements

- Car selector prominently placed at top
- Current mileage displayed near car name
- Clear visual separation between status groups
- Color-coded sections (red, yellow, green)
- Status icons (🔴, 🟡, 🟢) or badges
- Empty state for each section: "No items in this category"
- Loading spinner during data fetch
- Error toast/notification on API failure
- Responsive layout
- Items sorted within each group (most urgent first)

---

## 🔐 Validation / Edge Cases

- Handle no cars exist → show message: "No cars available. Add a car first."
- Handle network failure gracefully
- Handle backend error response (500)
- Handle car with no maintenance items
- Handle empty sections gracefully
- Car selector updates dashboard data

---

## ✅ Acceptance Criteria

- Dashboard page loads correctly
- Car selector displays all cars
- Default car selected on load (first car)
- Dashboard data fetched for selected car
- Maintenance items grouped correctly by status:
  - Overdue (red)
  - Due Soon (yellow)
  - OK (green)
- Each item displays all required information
- Color coding works correctly
- Empty states shown for empty sections
- Loading state displayed during fetch
- Error notification shown on failure
- No cars state handled
- Car selection triggers data refresh
- No console errors
- No TypeScript errors
- Responsive on mobile and desktop

---

## 🧪 Testing Requirements

- Component renders with sample data
- API integration works with backend
- Car selector tested
- Status grouping logic tested (all 3 categories)
- Empty states tested
- Loading state tested
- Error state tested
- No cars scenario tested
