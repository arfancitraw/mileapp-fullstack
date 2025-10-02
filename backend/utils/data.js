const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

let users = [
  {
    id: "1",
    createdAt: new Date().toISOString(),
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    fullname: "John Doe"
  },
  {
    id: "2",
    createdAt: new Date().toISOString(),
    username: "jane_smith",
    email: "jane@example.com",
    password: "password456",
    fullname: "Jane Smith"
  }
];

let tasks = [
  // Tasks for John (userId: "1")
  { id: "1", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Buy groceries", completed: false, description: "Milk, eggs, bread" },
  { id: "2", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Finish Vue project", completed: true, description: "Complete task manager app" },
  { id: "3", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Read documentation", completed: true, description: "Vue 3 and Express API" },
  { id: "4", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Deploy to Vercel", completed: false, description: "Frontend deployment" },
  { id: "5", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Write README", completed: false, description: "Project documentation" },
  { id: "6", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Test pagination", completed: true, description: "Ensure it works with 25+ tasks" },
  { id: "7", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Add search feature", completed: true, description: "Search by title" },
  { id: "8", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Fix filter bug", completed: false, description: "Completed/pending filter not working" },
  { id: "9", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Review code", completed: false, description: "Check for best practices" },
  { id: "10", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Update dependencies", completed: true, description: "npm update" },
  { id: "11", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Create MongoDB indexes", completed: false, description: "For real DB optimization" },
  { id: "12", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Learn Tailwind CSS", completed: true, description: "Or stick with plain CSS" },
  { id: "13", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Build responsive UI", completed: true, description: "Mobile and desktop" },
  { id: "14", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Handle errors gracefully", completed: false, description: "404, 500, network errors" },
  { id: "15", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Add loading states", completed: false, description: "User feedback during API calls" },
  { id: "16", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Implement logout", completed: true, description: "Clear token and redirect" },
  { id: "17", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Test with Postman", completed: true, description: "Verify all endpoints" },
  { id: "18", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Optimize API performance", completed: false, description: "Reduce response time" },
  { id: "19", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Add dark mode", completed: false, description: "Optional UI enhancement" },
  { id: "20", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Prepare for deployment", completed: false, description: "Vercel + Render setup" },
  { id: "21", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Write unit tests", completed: false, description: "For critical functions" },
  { id: "22", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Document API endpoints", completed: true, description: "Swagger or simple markdown" },
  { id: "23", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Refactor code", completed: false, description: "Improve readability" },
  { id: "24", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Add toast notifications", completed: false, description: "Success/error messages" },
  { id: "25", userId: "1", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Celebrate completion", completed: false, description: "You did it!" },

  // Tasks for Jane (userId: "2")
  { id: "26", userId: "2", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Design UI mockups", completed: true, description: "Figma designs" },
  { id: "27", userId: "2", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Conduct user testing", completed: false, description: "Gather feedback" },
  { id: "28", userId: "2", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Create color palette", completed: true, description: "Brand consistency" },
  { id: "29", userId: "2", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Optimize images", completed: false, description: "Reduce file size" },
  { id: "30", userId: "2", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Write design system", completed: false, description: "Components and guidelines" },
  { id: "31", userId: "2", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Present to team", completed: true, description: "Weekly sync" },
  { id: "32", userId: "2", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Research trends", completed: false, description: "UI/UX 2024" },
  { id: "33", userId: "2", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Fix accessibility issues", completed: true, description: "ARIA labels, contrast" },
  { id: "34", userId: "2", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Animate transitions", completed: false, description: "Smooth interactions" },
  { id: "35", userId: "2", createdAt: getRandomDate(new Date(2024, 0, 1), new Date()), title: "Handoff to developers", completed: true, description: "Final assets and specs" }
];

module.exports = { users, tasks };