# Car Maintenance Tracker – Project Description

## 1️⃣ Project Idea / Overview
**Goal:** Build a simple MVP app to track car maintenance items (oil change, air filter, coolant, etc.) with both **time-based** and **km-based** intervals.  

- No authentication; all cars and templates are global.  
- Users can define **maintenance templates** (parts with interval type & value).  
- Users can register **cars** and customize templates for each car.  
- Each maintenance item tracks **last service date/km** and calculates the **next due date/km**.  
- Users can record **track changes** for each part.  
- **Dashboard** shows parts grouped by status: Overdue, Due soon, OK.  

**Key Notes / MVP Scope:**  
- No user accounts for MVP.  
- Date inputs use masked fields `dd/mm/yyyy`.  
- Archived templates are hidden for all cars but remain editable on the setup page.  

---

## 2️⃣ Pages & Features

### 2.1 Setup Page / Maintenance Templates (`/setup`)
- **Features:**  
  - Display list of existing maintenance templates (sorted by `CreatedAt` descending) or empty state `"No maintenance templates available."`  
  - Always-visible **Add Template** button.  
  - **Add Template Form:**  
    - Name (string) – required, error `"Name is obligatory field"`  
    - Interval Type (`km` / `time`) – required, error `"Interval type is obligatory field"`  
    - Interval Value (number) – required, error `"Interval value is obligatory field"`; label dynamically shows `km` or `days`.  
    - Save / Cancel buttons; Save validates inputs and sends `POST /setup`, Cancel discards changes.  
  - **Edit Template:**  
    - Inline or modal editing for all fields.  
    - Save / Cancel functionality same as creation.  
  - **Archive / Restore Template:**  
    - Archived templates are hidden from car lists.  
    - Can be restored to visible state.  

- **Endpoints:**  
  - `GET /setup` → list templates  
  - `POST /setup` → create new template  
  - `PUT /setup/{id}` → edit template  
  - `PUT /setup/{id}/archive` → archive template  
  - `PUT /setup/{id}/restore` → restore template  

---

### 2.2 Cars Page (`/cars`)
- **Features:**  
  - Display list of cars (sorted by `CreatedAt` descending).  
  - **Add Car** (`/cars/new`):  
    - Name (string, required) – `"Name is obligatory field"`  
    - Current Mileage (int, required) – `"Mileage is obligatory field"`  
    - Assign maintenance items from templates:  
      - Interval (editable, default from template) – required  
      - Last Service (km/date) – dynamic input: km input if type=`km`, masked date input if type=`time` (`dd/mm/yyyy`)  
      - Frontend validates inputs; backend parses dates for storage.  
  - **Edit Car** (`/cars/{id}/edit`):  
    - Edit car name, current mileage  
    - Edit maintenance items (interval, last service km/date)  
  - **Track Change per Maintenance Item:**  
    - Default auto-fills current km/date; user can override  
    - Sends `POST /trackchange/{carMaintenanceItemId}` → creates TrackChange, updates CarMaintenanceItem, recalculates next due km/date  

- **Endpoints:**  
  - `GET /cars` → list cars + attached non-archived maintenance items  
  - `POST /cars` → add new car + maintenance items  
  - `PUT /cars/{id}` → edit car info + maintenance items  
  - `POST /trackchange/{carMaintenanceItemId}` → record km/date change  

---

### 2.3 Dashboard Page (`/dashboard`)
- **Features:**  
  - Dropdown to select car (default: first car returned)  
  - Show current mileage (editable inline → `PATCH /cars/{id}/km`)  
  - Show maintenance items grouped by **status**:  
    - 🔴 Overdue – past planned km/date  
    - 🟡 Due soon – < 300 km / < 30 days  
    - 🟢 OK – > 300 km / > 30 days  
  - For each item:  
    - Name, interval info, next due km/date  
    - Track Change button (same as Cars page)  

- **Endpoints:**  
  - `GET /dashboard/{carId}` → returns maintenance items with calculated status  
  - `PATCH /cars/{id}/km` → update current mileage  

---

## 3️⃣ Backend Models (Entity IDs are all ints)

### 3.1 MaintenanceTemplate
- `id` (int, PK, auto-increment) – Unique template ID  
- `name` (string, required)  
- `intervalType` (`km` / `time`)  
- `intervalValue` (int, required)  
- `archived` (bool, default false)  
- `createdAt` (datetime, auto-set)  

### 3.2 Car
- `id` (int, PK) – Unique car ID  
- `name` (string, required)  
- `currentKm` (int, required)  
- `createdAt` (datetime, auto-set)  

### 3.3 CarMaintenanceItem
- `id` (int, PK) – Unique maintenance item ID  
- `carId` (int, FK → Car)  
- `maintenanceTemplateId` (int, FK → MaintenanceTemplate)  
- `lastServiceKm` (int, optional)  
- `lastServiceDate` (datetime, optional)  
- `intervalValue` (int, required) – copied from template  
- `intervalType` (`km` / `time`)  
- `calculatedNextKm` (int, backend-calculated)  
- `calculatedNextDate` (datetime, backend-calculated)  

### 3.4 TrackChange
- `id` (int, PK) – Unique track change ID  
- `carMaintenanceItemId` (int, FK → CarMaintenanceItem)  
- `km` (int, optional)  
- `date` (datetime, optional)  

---

## 4️⃣ Backend Implementation Details
- **Repository Layer:** CRUD for all entities: MaintenanceTemplate, Car, CarMaintenanceItem, TrackChange  
- **Service Layer:**  
  - Validates required fields and uniqueness constraints  
  - Calculates `NextServiceKm` / `NextServiceDate`  
  - Updates status for dashboard  
- **Controller Layer:**  
  - Handles HTTP requests with proper status codes: 200, 201, 204, 400, 404, 500  
  - Maps entities ↔ DTOs  

- **Next Service Calculation:**  
  - km-based: `NextServiceKm = LastServiceKm + IntervalValue`  
  - time-based: `NextServiceDate = LastServiceDate + IntervalValue (days)`  

- **Dashboard Status Calculation:**  
  - km: Red = overdue, Yellow = ≤ 300 km, Green = > 300 km  
  - time: Red = overdue, Yellow = ≤ 30 days, Green = > 30 days  

- **Archived Templates:**  
  - Hidden in car lists, affect all connected maintenance items  
  - Still editable on Setup page  

- **Sorting:**  
  - Cars, maintenance templates, and car maintenance items → default newest first  

---

## 5️⃣ Frontend Validations
- Date input `dd/mm/yyyy`  
  - dd ≤ 31, mm ≤ 12, yyyy ≥ 2000  
- Km input ≥ 0  
- IntervalValue > 0  
- IntervalType: dropdown `km` / `time`  
- Dynamic label for IntervalValue: km or days depending on IntervalType  

---

## 6️⃣ Technology Stack

### Frontend
- React + TypeScript  
- Tailwind CSS  
- Vite or Create React App  
- React Router  
- Axios or Fetch API  

### Backend
- .NET 8 Web API (C#)  
- Entity Framework Core  
- SQL Server (Dockerized)  
- RESTful controllers  
- Swagger enabled  

### DevOps / Containers
- Docker + Docker Compose  
- Environment variables for DB connection  
- Startup: SQL Server → Backend migrations → Frontend  