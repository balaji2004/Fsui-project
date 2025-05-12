import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../redux/actions/taskActions';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const { _id, title, priority, dueDate, completed } = task;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-danger';
      case 'medium':
        return 'bg-warning';
      case 'low':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  };

  const toggleComplete = () => {
    dispatch(updateTask(_id, { ...task, completed: !completed }));
  };

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(_id));
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className={`card-title ${completed ? 'text-muted text-decoration-line-through' : ''}`}>
            {title}
          </h5>
          <div>
            <span className={`badge ${getPriorityClass(priority)} me-2`}>
              {priority}
            </span>
            <span className="badge bg-info">
              Due: {formatDate(dueDate)}
            </span>
          </div>
        </div>
        
        <div className="d-flex mt-3">
          <button
            onClick={toggleComplete}
            className={`btn ${completed ? 'btn-outline-success' : 'btn-success'} btn-sm me-2`}
          >
            {completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <Link to={`/task/${_id}`} className="btn btn-primary btn-sm me-2">
            View Details
          </Link>
          <button onClick={onDelete} className="btn btn-danger btn-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired
};

export default TaskItem; 