# 🚀 Full-Featured Task Management System

> A complete, secure, and user-friendly task management system built with Express.js (mock REST API) and Vue.js 3 (frontend).

---

## 🔗 Live Demo

| Component       | URL                                                                 |
|-----------------|---------------------------------------------------------------------|
| **Frontend**    | [https://frontend-five-mu-20.vercel.app/login](https://frontend-five-mu-20.vercel.app/login) |
| **Backend API** | [https://mileapp-fullstack-production.up.railway.app](https://mileapp-fullstack-production.up.railway.app) |

> ✅ Login credentials:  
> - Email: `john@example.com`  
> - Password: `password123`

> - Email: `jane@example.com`  
> - Password: `password456`

---

## 🎯 Features

### 🔐 Authentication
- JWT-based login (`POST /login`)
- Token stored in `localStorage`
- Protected routes on frontend and backend
- User ownership enforced on all CRUD operations

### 📋 Task Management (CRUD)
- **Create**: Add new tasks with title & description
- **Read**: View your tasks with pagination, filtering, sorting
- **Update**: Edit task details or toggle completion status
- **Delete**: Remove tasks permanently

### 🔍 Advanced Task Exploration
- **Search**: Find tasks by keyword in title or description
- **Filter**: Show only completed or pending tasks
- **Sort**: Order by date (newest/oldest) or title (A-Z)
- **Paginate**: Navigate large task lists efficiently with metadata

### 🛡️ Security & Data Isolation
- Users can only see/edit/delete their own tasks
- Backend enforces ownership on all `PUT`/`DELETE` requests
- Case-insensitive search/filter for consistent behavior

### 🌐 Frontend Experience
- Responsive UI (mobile, tablet, desktop)
- Accessible semantic HTML
- Keyboard navigable
- Clear feedback zero CSS frameworks
- Real-time updates without page reloads

### 👨‍💻 Developer-Friendly
- In-memory storage (no database required)
- Modular code structure
- Preloaded realistic data (35+ tasks across 2 users)
- MongoDB index strategy included for real DB migration
- Deployment-ready: Vercel (frontend), Railway (backend)

---

## ⚙️ Key Design Decisions

✅ **1. Mock API with In-Memory Storage**  
→ No real database → fast, lightweight, ideal for demo.

✅ **2. JWT for Authentication**  
→ Mimics real-world token-based auth → secure and scalable.

✅ **3. Backend-Driven Query Logic**  
→ All filtering, sorting, pagination handled server-side → efficient and consistent.

✅ **4. User Data Isolation**  
→ Each task has `userId` → users only see/edit/delete their own tasks.

✅ **5. Clean & Responsive UI**  
→ CSS-only design → no external libraries → fast loading and full control.

✅ **6. Smart Pagination Returns Metadata**  
→ `{ total, page, limit, totalPages }` → enables intuitive UI controls.

---

## 📈 Strengths of the Module

### ✅ Production-Ready Patterns
- REST conventions
- Proper HTTP status codes
- Input validation
- Secure authentication

### ✅ Powerful Data Exploration
- Search, filter, sort, paginate — all combinable

### ✅ Security by Design
- Authenticated routes
- Ownership enforcement
- Input sanitization

### ✅ Responsive & Accessible UI
- Works on all devices
- Semantic HTML
- Keyboard-navigable

### ✅ Easy to Extend & Deploy
- Modular code
- Zero-config deployment
- MongoDB-ready index strategy

---

## 📊 Sample Data Included

Preloaded with **35+ tasks** across **2 users**:
- **John Doe** (ID: "1") → 25 tasks
- **Jane Smith** (ID: "2") → 10 tasks

Mix of completed/pending states → perfect for testing filters and pagination.
