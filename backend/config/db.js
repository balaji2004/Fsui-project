// config/db.js
const mongoose = require('mongoose');

// Suppress strictQuery warning
mongoose.set('strictQuery', false);

// Use MongoDB connection string or mock data mode
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/task-manager';

const connectDB = async () => {
  try {
    // Check if we're in mock data mode (no real MongoDB connection)
    if (process.env.NODE_ENV === 'mock' || process.env.USE_MOCK_DB === 'true') {
      console.log('Running with mock database - no MongoDB connection required');
      return;
    }
    
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Continuing with in-memory data only');
  }
};

module.exports = connectDB;