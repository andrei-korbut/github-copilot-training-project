# 04 – Archive and Restore Maintenance Template

## 📌 Use Case Description

Allow users to archive and restore maintenance templates. Archived templates are visually distinguished and hidden from car assignment lists but remain visible on Setup page for editing.

---

## 🔗 Backend Dependency

PUT /api/setup/{id}/archive
PUT /api/setup/{id}/restore

Depends on:
- /backend/04-archive-maintenance-template
- /backend/05-restore-maintenance-template

---

## 🧱 Scope of Work

- Add "Archive" button to non-archived templates
- Add "Restore" button to archived templates
- Implement archive functionality:
  - Confirmation dialog: "Archive this template?"
  - PUT to /api/setup/{id}/archive
  - Show success notification
  - Refresh template list
- Implement restore functionality:
  - PUT to /api/setup/{id}/restore
  - Show success notification
  - Refresh template list
- Visual distinction for archived templates:
  - Badge/label: "Archived"
  - Different background color or opacity

---

## 🎨 UX Requirements

- Archive/Restore button clearly visible
- Confirmation dialog for archive action
- Disable button during API call
- Show loading indicator on button
- Success notifications:
  - "Template archived successfully"
  - "Template restored successfully"
- Error notification for server errors
- Archived templates visually muted but still readable
- Update UI immediately after action

---

## 🔐 Validation / Edge Cases

- Handle template not found (404)
- Handle backend server errors (500)
- Prevent duplicate clicks (disable button)
- Show appropriate error messages
- User can cancel archive operation

---

## ✅ Acceptance Criteria

- Archive button visible on active templates
- Restore button visible on archived templates
- Confirmation dialog shows before archiving
- Archive operation works correctly
- Restore operation works correctly
- Template list refreshes after each action
- Success notifications shown
- Archived templates visually distinguished
- No console errors
- No TypeScript errors

---

## 🧪 Testing Requirements

- Archive flow tested (confirm → archive → refresh)
- Restore flow tested (restore → refresh)
- Confirmation dialog tested
- API integration tested for both endpoints
- Error handling tested (404, 500)
- Button states tested (loading, disabled)
- Visual distinction for archived templates verified
