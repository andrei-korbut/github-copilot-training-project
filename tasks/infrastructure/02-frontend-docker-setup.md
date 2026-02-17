# 02 – Frontend & Docker Setup

## 📌 Use Case Description

Set up the frontend project with React 18 and TypeScript in Docker. This task ensures the frontend application can run locally in a containerized environment with a minimal placeholder page to verify the setup works correctly.

This is the foundational frontend infrastructure task that establishes the development environment. The frontend will be containerized and integrated into the existing Docker Compose setup alongside the backend and database services.

---

## 🌐 Endpoint Specification

**Home Page Route**

Route: /  
Component: Home  

Display:
- Title: "Product Management App"
- Simple placeholder UI to verify the application is running
- Styled with Tailwind CSS

**Docker URLs:**
- Frontend (external): http://localhost:3000
- Frontend (internal): http://frontend:3000
- Backend API URL: http://localhost:5000 (configured via environment variable)

---

## 🧱 Architecture Requirements

This task must implement:

### Frontend Structure:
- React 18 + TypeScript project in `/frontend` folder
- Project created via `npx create-react-app . --template typescript`
- Tailwind CSS configured and working
- React Router DOM for routing setup
- Home page component with placeholder content
- Environment variable configuration for API URL
- Basic project structure:
  ```
  /frontend
    /src
      /components (folder created, empty initially)
      /pages
        Home.tsx
      /services (folder created for future API calls)
      App.tsx
      index.tsx
    /public
    package.json
    tsconfig.json
    tailwind.config.js
    Dockerfile
  ```

### Styling:
- Tailwind CSS v3+ configured
- PostCSS and Autoprefixer set up
- Basic utility classes working
- Remove default Create React App styles
- Clean, minimal design for placeholder page

### Docker Infrastructure:
- `Dockerfile` for frontend service:
  - Multi-stage build (build + serve)
  - Build stage: Node 18+ with npm install and build
  - Production stage: nginx to serve static files
  - Expose port 3000 (or 80 depending on implementation)
- Update `docker-compose.yml` to add `frontend` service:
  - Port mapping: 3000:80 or 3000:3000
  - Environment variable for backend API URL
  - Depends on backend service (optional)
- nginx configuration for React Router (SPA fallback to index.html)

Must follow:
- React best practices and conventions
- TypeScript strict mode enabled
- Component-based architecture
- Functional components with hooks
- Clean folder structure
- Container best practices

---

## 🔐 Validation Rules

- Node modules must not be committed to repository (.gitignore configured)
- TypeScript must compile without errors
- Tailwind CSS must be properly integrated
- Environment variables must be loaded correctly
- Production build must be optimized and minified
- nginx must serve the React app correctly
- SPA routing must work (all routes serve index.html)

---

## 🔗 Dependencies

**Depends On:**
- 01 – Backend, Database & Docker Setup (backend must exist for API URL configuration)

**Blocks:**
- All frontend feature tasks
- Any UI component development

**External Dependencies:**
- Docker Desktop installed and running
- Node.js 18+ (for local development)
- npm or yarn package manager

---

## 🚫 Out of Scope

- API integration and service layer implementation (future tasks)
- Authentication/Authorization UI
- Advanced routing configuration
- State management (Redux, Zustand, etc.)
- Complex component library setup
- PWA configuration
- Advanced error boundaries
- Internationalization (i18n)
- Unit/Integration testing setup (can be added later)
- Storybook or component documentation
- Performance monitoring
- SEO optimization

---

## ✅ Acceptance Criteria

### Frontend Application:
- ✅ React + TypeScript project created in `/frontend` folder
- ✅ TypeScript compiles without errors (strict mode)
- ✅ Tailwind CSS configured and working
- ✅ React Router DOM installed and basic routing configured
- ✅ Home page displays "Product Management App" title
- ✅ Home page styled with Tailwind CSS
- ✅ Basic folder structure created (components, pages, services)
- ✅ No console errors in browser

### Docker:
- ✅ `Dockerfile` builds successfully
- ✅ Frontend container runs successfully
- ✅ Multi-stage build produces optimized production bundle
- ✅ nginx serves the React application correctly
- ✅ Environment variables accessible in the application

### Docker Compose:
- ✅ `docker-compose.yml` updated with frontend service
- ✅ `docker-compose up` starts all three services (frontend, backend, database)
- ✅ Frontend accessible at `http://localhost:3000`
- ✅ Frontend can resolve backend URL from environment variable
- ✅ All containers start in correct order

### General:
- ✅ Project builds without warnings
- ✅ `npm start` works for local development
- ✅ `npm run build` creates optimized production build
- ✅ Containers can be stopped and restarted successfully
- ✅ Hot reload works in development mode (optional for Docker)
- ✅ README updated with frontend setup instructions

---

## 🧪 Testing Requirements

### Manual Testing:
- Run `npm start` locally to verify development server works
- Run `npm run build` to verify production build succeeds
- Build Docker image: `docker build -t frontend .`
- Run full stack: `docker-compose up --build`
- Verify all three containers start successfully
- Access `http://localhost:3000` in browser
- Verify home page displays correctly with title
- Verify Tailwind CSS styles are applied
- Check browser console for errors
- Verify React DevTools recognizes the application

### Build Testing:
- TypeScript compilation test (no errors)
- Production build size check (reasonable bundle size)
- Build performance test (acceptable build time)

### Integration Testing:
- Frontend container communicates with backend (verify environment variable)
- nginx serves all routes correctly (SPA fallback)
- Static assets load correctly (CSS, JS, images)

### Edge Cases:
- Invalid route handling (should show home page or 404)
- Browser refresh on any route (should work with nginx config)
- Environment variable not set (should have fallback)
- Docker build cache behavior (rebuilds when dependencies change)

---

## 📝 Implementation Notes

### Environment Variables Required:

**docker-compose.yml:**
```yaml
frontend:
  environment:
    - REACT_APP_API_URL=http://localhost:5000
  # OR use .env file
  env_file:
    - .env
```

**.env file:**
```
REACT_APP_API_URL=http://localhost:5000
```

### Tailwind CSS Setup:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

**tailwind.config.js:**
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### nginx Configuration for SPA:
```nginx
server {
  listen 80;
  
  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
}
```

### Recommended npm Packages:
- react (18+)
- react-dom (18+)
- react-router-dom (6+)
- typescript (5+)
- tailwindcss (3+)
- @types/react
- @types/react-dom
- @types/node

### Home.tsx Example Structure:
```typescript
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Product Management App
        </h1>
        <p className="mt-4 text-gray-600">
          Frontend is running successfully
        </p>
      </div>
    </div>
  );
};

export default Home;
```

### Dockerfile Multi-stage Build Example:
```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🎯 Definition of Done

- All acceptance criteria met
- Frontend builds and runs without errors locally
- Docker container builds and runs successfully
- Home page accessible and displays correctly
- Tailwind CSS working properly
- TypeScript strict mode enabled with no errors
- All three services (frontend, backend, database) run together via Docker Compose
- Code committed to repository
- Documentation updated with frontend setup instructions
- .gitignore properly configured
- Peer review completed (if applicable)

---

## 🔄 Post-Implementation Checklist

- [ ] Verify `http://localhost:3000` is accessible
- [ ] Check browser console has no errors
- [ ] Verify React DevTools recognizes the app
- [ ] Test production build optimization
- [ ] Verify environment variable is read correctly
- [ ] Test container restart behavior
- [ ] Update main README with frontend instructions
- [ ] Document any deviations from plan
- [ ] Tag Docker images appropriately (optional)
- [ ] Verify .gitignore excludes node_modules and build artifacts
