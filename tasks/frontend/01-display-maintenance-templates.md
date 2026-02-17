# 01 – Display Maintenance Templates

## 📌 Use Case Description

Display a list of all maintenance templates on the Setup page sorted by creation date (newest first). Show empty state when no templates exist. This provides the foundation for the Setup page.

---

## 🔗 Backend Dependency

GET /api/setup

Depends on:
- /backend/01-get-maintenance-templates

---

## 🧱 Scope of Work

- Fetch templates from GET /api/setup on page load
- Display templates in a list/table:
  - Name
  - Interval Type (km/time)
  - Interval Value (with appropriate label: km or days)
  - Archived status (badge or indicator)
  - Created date (formatted)
- Show empty state: "No maintenance templates available."
- Show loading spinner while fetching
- Show error notification if request fails
- Create reusable components:
  - TemplateList component
  - TemplateListItem component
  - EmptyState component

---

## 🎨 UX Requirements

- Loading spinner centered on page during fetch
- Empty state with clear message and icon
- Templates displayed in card or table format
- Visual distinction for archived templates
- Date formatted as readable string (e.g., "Jan 15, 2026")
- Responsive design
- Error toast/notification on API failure

---

## 🔐 Validation / Edge Cases

- Handle network failure gracefully
- Handle empty response (empty array)
- Handle backend error response (500)
- Show appropriate error messages
- Retry mechanism optional

---

## ✅ Acceptance Criteria

- Page loads and fetches templates automatically
- Templates render correctly with all fields
- Empty state shown when no templates exist
- Loading state displayed during fetch
- Error notification shown on failure
- Sorting matches backend (newest first)
- Archived templates visually distinguished
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
- Archived templates display correctly
