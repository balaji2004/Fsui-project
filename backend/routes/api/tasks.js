// routes/api/tasks.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Task = require('../../models/Task');

// Mock in-memory data when MongoDB is not available
let mockTasks = [
  {
    _id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the MERN stack project',
    priority: 'high',
    dueDate: new Date('2023-12-20'),
    completed: false,
    createdAt: new Date('2023-12-01')
  },
  {
    _id: '2',
    title: 'Fix frontend bugs',
    description: 'Address UI issues in the task list component',
    priority: 'medium',
    dueDate: new Date('2023-12-15'),
    completed: true,
    createdAt: new Date('2023-11-30')
  },
  {
    _id: '3',
    title: 'Update dependencies',
    description: 'Update all npm packages to their latest versions',
    priority: 'low',
    dueDate: new Date('2023-12-25'),
    completed: false,
    createdAt: new Date('2023-12-02')
  }
];

// Helper function to check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose?.connection?.readyState === 1;
};

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Use mock data if MongoDB is not connected
    if (!isMongoConnected()) {
      return res.json(mockTasks);
    }
    
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    // Fallback to mock data
    res.json(mockTasks);
  }
});

// @route   GET api/tasks/:id
// @desc    Get task by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    // Use mock data if MongoDB is not connected
    if (!isMongoConnected()) {
      const task = mockTasks.find(task => task._id === req.params.id);
      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }
      return res.json(task);
    }
    
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    
    res.json(task);
  } catch (err) {
    console.error('Error fetching task:', err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    
    // Try mock data as fallback
    const task = mockTasks.find(task => task._id === req.params.id);
    if (task) {
      return res.json(task);
    }
    
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tasks
// @desc    Create a task
// @access  Public
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('dueDate', 'Due date is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { title, description, priority, dueDate, completed } = req.body;
    
    try {
      // Use mock data if MongoDB is not connected
      if (!isMongoConnected()) {
        const newTask = {
          _id: Date.now().toString(),
          title,
          description,
          priority: priority || 'medium',
          dueDate,
          completed: completed || false,
          createdAt: new Date()
        };
        
        mockTasks.unshift(newTask);
        return res.json(newTask);
      }
      
      const newTask = new Task({
        title,
        description,
        priority,
        dueDate,
        completed
      });
      
      const task = await newTask.save();
      res.json(task);
    } catch (err) {
      console.error('Error creating task:', err.message);
      
      // Fallback to mock implementation
      const newTask = {
        _id: Date.now().toString(),
        title,
        description,
        priority: priority || 'medium',
        dueDate,
        completed: completed || false,
        createdAt: new Date()
      };
      
      mockTasks.unshift(newTask);
      res.json(newTask);
    }
  }
);

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Public
router.put('/:id', async (req, res) => {
  const { title, description, priority, dueDate, completed } = req.body;
  
  // Build task object
  const taskFields = {};
  if (title) taskFields.title = title;
  if (description !== undefined) taskFields.description = description;
  if (priority) taskFields.priority = priority;
  if (dueDate) taskFields.dueDate = dueDate;
  if (completed !== undefined) taskFields.completed = completed;
  
  try {
    // Use mock data if MongoDB is not connected
    if (!isMongoConnected()) {
      const taskIndex = mockTasks.findIndex(task => task._id === req.params.id);
      
      if (taskIndex === -1) {
        return res.status(404).json({ msg: 'Task not found' });
      }
      
      mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...taskFields };
      return res.json(mockTasks[taskIndex]);
    }
    
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    
    // Update
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );
    
    res.json(task);
  } catch (err) {
    console.error('Error updating task:', err.message);
    
    // Try mock data as fallback
    const taskIndex = mockTasks.findIndex(task => task._id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    
    mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...taskFields };
    res.json(mockTasks[taskIndex]);
  }
});

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    // Use mock data if MongoDB is not connected
    if (!isMongoConnected()) {
      const taskIndex = mockTasks.findIndex(task => task._id === req.params.id);
      
      if (taskIndex === -1) {
        return res.status(404).json({ msg: 'Task not found' });
      }
      
      mockTasks.splice(taskIndex, 1);
      return res.json({ msg: 'Task removed' });
    }
    
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    
    await Task.findByIdAndRemove(req.params.id);
    
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    
    // Try mock data as fallback
    const taskIndex = mockTasks.findIndex(task => task._id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    
    mockTasks.splice(taskIndex, 1);
    res.json({ msg: 'Task removed' });
  }
});

module.exports = router;