const express = require('express');
const { tasks } = require('../utils/data');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// GET /tasks?userId=1&completed=true&page=1&limit=10&sortBy=title&order=asc
router.get('/', authenticateToken, (req, res) => {
  let filteredTasks = [...tasks];

  // Filter by userId
  if (req.query.userId) {
    filteredTasks = filteredTasks.filter(t => t.userId === req.query.userId);
  }

  // Filter by completed
  if (req.query.completed !== undefined) {
    const completed = req.query.completed === 'true';
    filteredTasks = filteredTasks.filter(t => t.completed === completed);
  }

  //Search by Title
  if (req.query.search) {
    const searchTerm = req.query.search.toLowerCase();
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm) || 
      (task.description && task.description.toLowerCase().includes(searchTerm))
    );
  }

  // Sorting
  const sortBy = req.query.sortBy || 'createdAt';
  const order = req.query.order === 'desc' ? -1 : 1;

  filteredTasks.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1 * order;
    if (a[sortBy] > b[sortBy]) return 1 * order;
    return 0;
  });

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  const meta = {
    total: filteredTasks.length,
    page,
    limit,
    totalPages: Math.ceil(filteredTasks.length / limit),
    hasNext: endIndex < filteredTasks.length,
    hasPrev: page > 1
  };

  res.status(200).json({
    data: paginatedTasks,
    meta
  });
});

// POST /tasks
router.post('/', authenticateToken, (req, res) => {
  const { title, description, completed = false } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required.' });
  }

  const newTask = {
    id: String(tasks.length + 1),
    userId: req.user.id,
    createdAt: new Date().toISOString(),
    title,
    completed,
    description: description || ''
  };

  tasks.push(newTask);
  res.status(201).json({ message: 'Task created', task: newTask });
});

// PUT /tasks/:id
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  // Check ownership
  if (tasks[taskIndex].userId !== req.user.id) {
    return res.status(403).json({ error: 'You can only edit your own tasks.' });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description || tasks[taskIndex].description,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed
  };

  res.status(200).json({ message: 'Task updated', task: tasks[taskIndex] });
});

// DELETE /tasks/:id
router.delete('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  // Check ownership
  if (tasks[taskIndex].userId !== req.user.id) {
    return res.status(403).json({ error: 'You can only delete your own tasks.' });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: 'Task deleted' });
});

module.exports = router;