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
- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend
- React
- Redux for state management
- React Router for navigation
- Bootstrap for styling

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
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with your MongoDB URI
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

### Running the Application

1. Start the backend server
   ```
   cd backend
   npm start
   ```

2. Start the frontend development server
   ```
   cd frontend
   npm start
   ```

3. Open your browser and go to `http://localhost:3000`

## License

This project is licensed under the MIT License