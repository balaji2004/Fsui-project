 // components/TaskDetails.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTask, updateTask, deleteTask } from '../redux/actions/taskActions';
import { useParams, useNavigate } from 'react-router-dom';
import $ from 'jquery';

const TaskDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { task, loading } = useSelector(state => state.task);
  
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    completed: false
  });

  useEffect(() => {
    dispatch(getTask(id));
  }, [dispatch, id]);

  useEffect(() => {
    // When task data is loaded, set form data
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        completed: task.completed || false
      });
      
      // jQuery animation example
      $('.task-details-card').hide().fadeIn(500);
    }
  }, [task]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onToggleComplete = () => {
    setFormData({ 
      ...formData, 
      completed: !formData.completed 
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(updateTask(id, formData)).then(() => {
      setEditing(false);
      
      // jQuery to show success message
      $('#updateSuccess').fadeIn().delay(2000).fadeOut();
    });
  };

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id)).then(() => {
        navigate('/');
      });
    }
  };

  if (loading || !task) {
    return <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return (
    <div className="task-details">
      <div className="alert alert-success" id="updateSuccess" style={{ display: 'none' }}>
        Task updated successfully!
      </div>
      
      <div className="card task-details-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Task Details</h2>
          <div>
            {!editing ? (
              <button 
                className="btn btn-primary me-2"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            ) : (
              <button 
                className="btn btn-secondary me-2"
                onClick={() => {
                  setEditing(false);
                  // Reset form data to original task data
                  if (task) {
                    setFormData({
                      title: task.title || '',
                      description: task.description || '',
                      priority: task.priority || 'medium',
                      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
                      completed: task.completed || false
                    });
                  }
                }}
              >
                Cancel
              </button>
            )}
            <button 
              className="btn btn-danger"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
        
        <div className="card-body">
          {editing ? (
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Task Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={onChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={onChange}
                  rows="3"
                ></textarea>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="priority" className="form-label">Priority</label>
                  <select
                    className="form-select"
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={onChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div className="col-md-6">
                  <label htmlFor="dueDate" className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="completed"
                  checked={formData.completed}
                  onChange={onToggleComplete}
                />
                <label className="form-check-label" htmlFor="completed">
                  Mark as completed
                </label>
              </div>
              
              <button type="submit" className="btn btn-success w-100">
                Save Changes
              </button>
            </form>
          ) : (
            <div>
              <div className="mb-4">
                <h4 className={formData.completed ? 'text-decoration-line-through text-muted' : ''}>
                  {formData.title}
                </h4>
                <div className={`status-badge badge ${formData.completed ? 'bg-success' : 'bg-warning'}`}>
                  {formData.completed ? 'Completed' : 'Pending'}
                </div>
              </div>
              
              <div className="mb-3">
                <h5>Description</h5>
                <p>{formData.description || 'No description provided.'}</p>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <h5>Priority</h5>
                  <div className={`badge ${
                    formData.priority === 'high' ? 'bg-danger' : 
                    formData.priority === 'medium' ? 'bg-warning' : 'bg-info'
                  }`}>
                    {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)}
                  </div>
                </div>
                
                <div className="col-md-6">
                  <h5>Due Date</h5>
                  <p>{new Date(formData.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="d-grid gap-2 mt-4">
                <button 
                  className={`btn ${formData.completed ? 'btn-outline-warning' : 'btn-outline-success'}`}
                  onClick={() => {
                    dispatch(updateTask(id, {
                      ...formData,
                      completed: !formData.completed
                    })).then(() => {
                      setFormData({
                        ...formData,
                        completed: !formData.completed
                      });
                      
                      // jQuery to show status change message
                      $('#updateSuccess').text(
                        `Task marked as ${!formData.completed ? 'completed' : 'pending'}!`
                      ).fadeIn().delay(2000).fadeOut();
                    });
                  }}
                >
                  Mark as {formData.completed ? 'Pending' : 'Completed'}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => navigate('/')}
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;