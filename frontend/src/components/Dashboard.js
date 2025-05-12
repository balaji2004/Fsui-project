 // components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, deleteTask, updateTask } from '../redux/actions/taskActions';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector(state => state.task);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(getTasks());
    
    // jQuery example for DOM manipulation
    $('#taskFilter').on('change', function() {
      setFilter($(this).val());
    });
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const handleStatusChange = (task) => {
    const updatedTask = {
      ...task,
      completed: !task.completed
    };
    dispatch(updateTask(task._id, updatedTask));
  };

  // Filter tasks based on completion status
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  if (loading) {
    return <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return (
    <div className="dashboard">
      <h2 className="text-center mb-4">Task Dashboard</h2>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 className="card-title">Your Tasks</h5>
              <p className="card-text">You have {tasks.length} tasks in total.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <select id="taskFilter" className="form-select d-inline-block w-auto me-2">
                <option value="all">All Tasks</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
              <Link to="/add-task" className="btn btn-primary">
                Add New Task
              </Link>
            </div>
          </div>
        </div>
      </div>

      {filteredTasks.length > 0 ? (
        <div className="list-group">
          {filteredTasks.map(task => (
            <div key={task._id} className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <div>
                  <h5 className={`mb-1 ${task.completed ? 'text-decoration-line-through' : ''}`}>
                    {task.title}
                  </h5>
                  <p className="mb-1">{task.description}</p>
                  <small>Priority: {task.priority} | Due: {new Date(task.dueDate).toLocaleDateString()}</small>
                </div>
                <div>
                  <div className="form-check form-switch d-inline-block me-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => handleStatusChange(task)}
                    />
                  </div>
                  <Link to={`/task/${task._id}`} className="btn btn-sm btn-info me-2">
                    View
                  </Link>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No tasks found. Add a new task to get started!</div>
      )}
    </div>
  );
};

export default Dashboard;