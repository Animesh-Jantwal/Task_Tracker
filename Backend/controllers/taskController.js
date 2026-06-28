import Task from '../models/Task.js';
import asyncHandler from '../utils/asyncHandler.js';

// Create a new task
export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

// Get all tasks (filtering, sorting, pagination)
export const getTasks = asyncHandler(async (req, res) => {
  const { status, priority, sortBy, order, page, limit } = req.query;

  // Filtering
  const filter = {};
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  // Sorting
  let sort = {};
  if (sortBy) {
    sort[sortBy] = order === 'desc' ? -1 : 1;
  } else {
    sort = { createdAt: -1 };
  }

  // Pagination
  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * pageSize;

  const tasks = await Task.find(filter).sort(sort).skip(skip).limit(pageSize);
  const total = await Task.countDocuments(filter);

  res.status(200).json({
    tasks,
    page: pageNumber,
    pages: Math.ceil(total / pageSize),
    total,
  });
});

// Update a task
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.status(200).json(task);
});

// Delete a task
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.status(200).json({ message: 'Task deleted successfully' });
});