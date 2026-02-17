# Frontend Architecture Guidelines
Car Maintenance Tracker – React + TypeScript + Tailwind

This document defines the mandatory architectural standards for frontend implementation.

Copilot and all contributors must strictly follow these rules.

---

# 🏛 Core Architecture Principles

1. Pages must be thin.
   - Pages compose components.
   - Pages must NOT contain heavy business logic.
   - Pages handle layout and composition only.

2. Reusable UI must be centralized.
   - Generic UI components go into src/components/ui
   - Layout components go into src/components/layout

3. Page-specific components must remain scoped.
   - Store them inside src/pages/<page-name>/components

4. Business logic must be separated from UI.
   - Feature logic goes into src/features/<feature-name>

5. API calls must never live inside page files.
   - Use src/services or src/features/<feature>/api

6. Avoid duplication.
   - If a component is reused more than once → extract it.

7. UI primitives must be "dumb".
   - Button, Input, Card must not contain business logic.

8. Follow strict TypeScript typing.
   - No `any`
   - Explicit interfaces required

---

# 📁 Mandatory Folder Structure (Text Format)

src/

src/app/  
src/app/router.tsx  
src/app/providers.tsx  

src/pages/  

src/pages/home/  
src/pages/home/home-page.tsx  

src/pages/setup/  
src/pages/setup/setup-page.tsx  
src/pages/setup/components/  
src/pages/setup/components/add-template-form.tsx  

src/pages/not-found/  
src/pages/not-found/not-found-page.tsx  

src/components/  

src/components/ui/  
src/components/ui/button.tsx  
src/components/ui/input.tsx  
src/components/ui/card.tsx  
src/components/ui/container.tsx  

src/components/layout/  
src/components/layout/app-layout.tsx  
src/components/layout/navbar.tsx  
src/components/layout/sidebar.tsx  

src/components/feedback/  
src/components/feedback/spinner.tsx  
src/components/feedback/empty-state.tsx  
src/components/feedback/error-message.tsx  

src/features/  

src/features/templates/  
src/features/templates/api/  
src/features/templates/api/templates-api.ts  
src/features/templates/hooks/  
src/features/templates/hooks/use-templates.ts  
src/features/templates/types.ts  
src/features/templates/components/  
src/features/templates/components/template-list.tsx  
src/features/templates/components/template-card.tsx  

src/hooks/  
src/hooks/use-debounce.ts  

src/services/  
src/services/api-client.ts  
src/services/endpoints.ts  

src/types/  
src/types/api.ts  

src/utils/  
src/utils/format-date.ts  

src/main.tsx  
src/App.tsx  

---

# 🧱 Component Hierarchy Model

App  
→ Page  
→ Feature Component  
→ UI Component  

Example:

SetupPage  
→ TemplateList  
→ Card  
→ Button  

Pages orchestrate.  
Features contain business logic.  
UI components remain presentation-only.

---

# 🎨 UI & Styling Rules

1. Tailwind CSS only.
2. No inline styles.
3. Use consistent spacing scale (4, 6, 8).
4. Cards use rounded-2xl and shadow-md or shadow-lg.
5. Background should typically use bg-gray-50.
6. Buttons must have:
   - hover state
   - disabled state
   - transition
7. Maintain consistent max-width containers.
8. Do not mix CSS files with Tailwind utilities.

---

# ❌ Forbidden Patterns

- Do NOT place pages inside src/components
- Do NOT place reusable UI inside page folders
- Do NOT duplicate Button/Card/Input implementations
- Do NOT call backend APIs directly inside page components
- Do NOT create large 400+ line components
- Do NOT use `any` type
- Do NOT mix business logic with UI primitives

---

# 📏 Component Size Rule

If a component exceeds ~150 lines:
- Refactor into smaller components.

---

# 🔐 TypeScript Rules

- Strict typing required.
- Use explicit interfaces.
- Avoid implicit any.
- Prefer typed hooks.
- Validate props via TypeScript interfaces.

---

# 🧪 Quality Requirements

- All new logic must be testable.
- Avoid side effects inside render.
- Separate stateful logic into hooks where appropriate.
- Keep architecture consistent across features.

---

# 🏁 Final Rule

Favor clarity over cleverness.  
Favor consistency over customization.  
Favor structure over speed.  

Maintain scalable architecture from the beginning.