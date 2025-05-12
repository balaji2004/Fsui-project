# Task Management System

A full-stack web application for task management built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Create, read, update, and delete tasks
- Set priority levels for tasks (low, medium, high)
- Mark tasks as completed
- Filter and sort tasks by different criteria
- Responsive design

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- RESTful API architecture
- Express-validator for data validation
- CORS enabled for cross-domain requests

### Frontend
- React 18
- Redux for state management
- React Router v6 for navigation
- Bootstrap 5 for styling
- Axios for API requests

## Project Structure

### Backend
- `server.js`: Main application entry point
- `routes/api/`: API endpoint definitions
- `models/`: Mongoose schemas
- `config/`: Database configuration

### Frontend
- `src/components/`: React components
- `src/redux/`: Redux store, actions, and reducers
- `public/`: Static assets

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (or use MongoDB Atlas)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/task-management-system.git
   cd task-management-system
   ```

2. Install backend dependencies
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```
   cd frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with your MongoDB URI
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

### Running the Application

1. Start both backend and frontend in development mode
   ```
   cd backend
   npm run dev
   ```

   This will concurrently run both the server and client using the script defined in package.json.

2. Alternatively, run them separately:
   ```
   # Terminal 1 - Backend
   cd backend
   npm run server
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

3. Open your browser and go to `http://localhost:3000`

## API Endpoints

The backend serves its API from `/api/tasks` with various operations for task management.

## License

This project is licensed under the MIT License