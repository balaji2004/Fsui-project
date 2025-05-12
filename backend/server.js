// server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Simple route for favicon to avoid proxy errors
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Define routes
app.use('/api/tasks', require('./routes/api/tasks'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));