📋 Full-Featured Task Management Module
A complete, secure, and user-friendly task management system built with Express.js (mock REST API) and Vue.js 3 (frontend) — designed for demonstration, learning, and easy deployment.

✨ Features
🔐 Authentication
JWT-based login (POST /login)
Token stored in localStorage (mock setup)
Protected routes on frontend and backend

📝 Task Management (Full CRUD)
Create: Add new tasks with title & description
Read: View your tasks with pagination
Update: Edit task details or toggle completion status
Delete: Remove tasks permanently

🔍 Advanced Task Exploration
Search: Find tasks by keyword in title or description
Filter: Show only completed or pending tasks
Sort: Order by title (A–Z) or date (newest/oldest)
Paginate: Navigate large task lists efficiently (with metadata)

🛡️ Security & Data Isolation
Users only see/edit/delete their own tasks
Backend enforces ownership on all PUT/DELETE requests
Case-insensitive search/filter for consistent UX

🎨 Frontend Experience
Responsive UI (mobile, tablet, desktop)
Accessible: semantic HTML, keyboard navigable, clear feedback
Zero CSS frameworks — clean, custom CSS only
Real-time updates without page reloads

⚙️ Developer-Friendly
In-memory storage (no database required)
Modular code structure
Preloaded test data (35+ tasks across 2 users)
MongoDB index strategy included for real-world migration
Deployment-ready: Vercel (frontend) + Render/Railway (backend)

🏗️ Architecture Overview
task-manager/
├── backend/                 # Express.js mock API
│   ├── server.js            # Entry point
│   ├── routes/
│   │   └── tasks.js         # CRUD + query logic
│   ├── middleware/
│   │   └── auth.js          # JWT validation
│   └── data/                # In-memory users & tasks
│
├── frontend/                # Vue.js 3 SPA
│   ├── src/
│   │   ├── components/      # TaskForm, TaskItem, etc.
│   │   ├── views/           # Home, Login
│   │   ├── router/          # Protected routes
│   │   └── services/        # Axios API calls + interceptors
│   └── public/
│
├── db/
│   └── indexes.js           # MongoDB index recommendations
│
├── README.md
└── package.json (x2)

🚀 Key Design Decisions
✅ 1. Mock API with In-Memory Storage
Uses JavaScript arrays (users, tasks) for zero dependencies.
Trade-off: Data resets on server restart — acceptable for demo/mock use.
✅ 2. JWT Authentication (Simplified)
Mimics real-world token flow.
Frontend stores token in localStorage and attaches via Axios interceptor.
⚠️ Note: In production, use HTTP-only cookies + refresh tokens.
✅ 3. Backend-Driven Query Logic
All filtering, sorting, pagination, and search happen server-side.
Supports query params:
?completed=true&search=milk&sortBy=date&order=desc&page=1&limit=10
Ensures scalability and consistent behavior.
✅ 4. User Data Isolation
Every task has a userId.
Backend validates ownership on every task operation.
Prevents unauthorized access even via direct API calls.
✅ 5. CSS-Only UI
No Tailwind, Bootstrap, or build-time CSS frameworks.
Fast loading, full design control, and no external dependencies.
✅ 6. Smart Pagination
Returns metadata:
json


{ "total": 24, "page": 1, "limit": 10, "totalPages": 3 }
Automatically resets to page 1 when search/filter changes.

💪 Strengths
Production Patterns
RESTful routes, proper HTTP status codes (400, 401, 403, 404, 500), input validation
Data Exploration
Combine search + filter + sort + paginate for powerful workflows
Security
Auth + authz enforced, case-insensitive matching, no data leakage
UX
Responsive, accessible, loading states, clear error/success messages
Extensibility
Easy to plug in a real DB (see
db/indexes.js
), modular code
Testing
Preloaded realistic data for thorough UI/API validation