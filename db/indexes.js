//Create Collection
db.createCollection('users');
db.createCollection('tasks');

// Insert document users
db.users.insertMany([
  {
    _id: "1",
    createdAt: new Date(),
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    fullname: "John Doe"
  },
  {
    _id: "2",
    createdAt: new Date(),
    username: "jane_smith",
    email: "jane@example.com",
    password: "password456",
    fullname: "Jane Smith"
  }
]);

db.tasks.insertMany([
  { _id: "1", userId: "1", createdAt: new Date(), title: "Buy groceries", completed: false, description: "Milk, eggs, bread" },
  { _id: "2", userId: "1", createdAt: new Date(), title: "Finish Vue project", completed: true, description: "Complete task manager app" },
  { _id: "3", userId: "1", createdAt: new Date(), title: "Read documentation", completed: true, description: "Vue 3 and Express API" },
  { _id: "4", userId: "1", createdAt: new Date(), title: "Deploy to Vercel", completed: false, description: "Frontend deployment" },
  { _id: "5", userId: "1", createdAt: new Date(), title: "Write README", completed: false, description: "Project documentation" },
  { _id: "6", userId: "1", createdAt: new Date(), title: "Test pagination", completed: true, description: "Ensure it works with 25+ tasks" },
  { _id: "7", userId: "1", createdAt: new Date(), title: "Add search feature", completed: true, description: "Search by title" },
  { _id: "8", userId: "1", createdAt: new Date(), title: "Fix filter bug", completed: false, description: "Completed/pending filter not working" },
  { _id: "9", userId: "1", createdAt: new Date(), title: "Review code", completed: false, description: "Check for best practices" },
  { _id: "10", userId: "1", createdAt: new Date(), title: "Update dependencies", completed: true, description: "npm update" },
  { _id: "11", userId: "1", createdAt: new Date(), title: "Create MongoDB indexes", completed: false, description: "For real DB optimization" },
  { _id: "12", userId: "1", createdAt: new Date(), title: "Learn Tailwind CSS", completed: true, description: "Or stick with plain CSS" },
  { _id: "13", userId: "1", createdAt: new Date(), title: "Build responsive UI", completed: true, description: "Mobile and desktop" },
  { _id: "14", userId: "1", createdAt: new Date(), title: "Handle errors gracefully", completed: false, description: "404, 500, network errors" },
  { _id: "15", userId: "1", createdAt: new Date(), title: "Add loading states", completed: false, description: "User feedback during API calls" },
  { _id: "16", userId: "1", createdAt: new Date(), title: "Implement logout", completed: true, description: "Clear token and redirect" },
  { _id: "17", userId: "1", createdAt: new Date(), title: "Test with Postman", completed: true, description: "Verify all endpoints" },
  { _id: "18", userId: "1", createdAt: new Date(), title: "Optimize API performance", completed: false, description: "Reduce response time" },
  { _id: "19", userId: "1", createdAt: new Date(), title: "Add dark mode", completed: false, description: "Optional UI enhancement" },
  { _id: "20", userId: "1", createdAt: new Date(), title: "Prepare for deployment", completed: false, description: "Vercel + Render setup" },
  { _id: "21", userId: "1", createdAt: new Date(), title: "Write unit tests", completed: false, description: "For critical functions" },
  { _id: "22", userId: "1", createdAt: new Date(), title: "Document API endpoints", completed: true, description: "Swagger or simple markdown" },
  { _id: "23", userId: "1", createdAt: new Date(), title: "Refactor code", completed: false, description: "Improve readability" },
  { _id: "24", userId: "1", createdAt: new Date(), title: "Add toast notifications", completed: false, description: "Success/error messages" },
  { _id: "25", userId: "1", createdAt: new Date(), title: "Celebrate completion", completed: false, description: "You did it!" },
  { _id: "26", userId: "2", createdAt: new Date(), title: "Design UI mockups", completed: true, description: "Figma designs" },
  { _id: "27", userId: "2", createdAt: new Date(), title: "Conduct user testing", completed: false, description: "Gather feedback" },
  { _id: "28", userId: "2", createdAt: new Date(), title: "Create color palette", completed: true, description: "Brand consistency" },
  { _id: "29", userId: "2", createdAt: new Date(), title: "Optimize images", completed: false, description: "Reduce file size" },
  { _id: "30", userId: "2", createdAt: new Date(), title: "Write design system", completed: false, description: "Components and guidelines" },
  { _id: "31", userId: "2", createdAt: new Date(), title: "Present to team", completed: true, description: "Weekly sync" },
  { _id: "32", userId: "2", createdAt: new Date(), title: "Research trends", completed: false, description: "UI/UX 2024" },
  { _id: "33", userId: "2", createdAt: new Date(), title: "Fix accessibility issues", completed: true, description: "ARIA labels, contrast" },
  { _id: "34", userId: "2", createdAt: new Date(), title: "Animate transitions", completed: false, description: "Smooth interactions" },
  { _id: "35", userId: "2", createdAt: new Date(), title: "Handoff to developers", completed: true, description: "Final assets and specs" }
]);

// ===== INDEXES FOR `users` COLLECTION =====

// Create a unique index on the `email` field
// - Speeds up login and user lookup queries that filter by `email`
// - Enforces uniqueness constraint: prevents duplicate email registrations
// - `background: true` ensures the index is built without blocking read/write operations
db.users.createIndex(
  { email: 1 },
  { unique: true, name: 'users_email_unique', background: true }
);

// Create a unique index on the `username` field
// - Accelerates queries that search or validate usernames (e.g., profile lookup)
// - Guarantees username uniqueness across the system
// - `background: true` allows concurrent database operations during index creation
db.users.createIndex(
  { username: 1 },
  { unique: true, name: 'users_username_unique', background: true }
);

// Create a descending index on `createdAt`
// - Optimizes queries that sort users by registration date (newest first)
// - Supports efficient pagination for user lists (e.g., admin dashboard)
// - `background: true` prevents downtime during index build
db.users.createIndex(
  { createdAt: -1 },
  { name: 'users_createdAt_desc', background: true }
);

// ===== INDEXES FOR `tasks` COLLECTION =====

// Create a compound index on `userId` and `completed`
// - Speeds up queries that fetch tasks for a specific user filtered by completion status
//   Example: GET /tasks?userId=123&completed=false
// - Reduces need for in-memory filtering after initial user-based fetch
// - `background: true` ensures smooth index creation in production
db.tasks.createIndex(
  { userId: 1, completed: 1 },
  { name: 'tasks_userId_completed', background: true }
);

// Create a compound index on `status` and `createdAt` (descending)
// - Optimizes common filtered + sorted queries:
//   Example: GET /tasks?status=pending&sortBy=createdAt&order=desc
// - Avoids expensive in-memory sorting by leveraging pre-sorted index
// - `background: true` maintains database availability during build
db.tasks.createIndex(
  { status: 1, createdAt: -1 },
  { name: 'tasks_status_createdAt_desc', background: true }
);

// Create a single-field index on `userId`
// - Accelerates all queries that retrieve tasks by user (core operation)
//   Example: GET /tasks?userId=123
// - Serves as fallback when compound index isn't used
// - `background: true` for non-blocking index creation
db.tasks.createIndex(
  { userId: 1 },
  { name: 'tasks_userId', background: true }
);

// Create a descending index on `createdAt`
// - Optimizes default task sorting by recency (newest first)
//   Example: GET /tasks?sortBy=createdAt&order=desc
// - Supports efficient time-range queries (e.g., "tasks from last week")
// - `background: true` prevents operational disruption
db.tasks.createIndex(
  { createdAt: -1 },
  { name: 'tasks_createdAt_desc', background: true }
);

// Create a text index on `title` and `description`
// - Enables full-text search across task content
//   Example: Search for "milk" matches title "Buy groceries" and description "Milk, eggs, bread"
// - Supports case-insensitive and diacritic-insensitive search by default
// - `background: true` ensures search functionality can be added without downtime
db.tasks.createIndex(
  { title: "text", description: "text" },
  { name: 'tasks_text_search', background: true }
);