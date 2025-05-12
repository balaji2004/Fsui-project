 // components/AddTask.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions/taskActions';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    completed: false
  });

  const { title, description, priority, dueDate } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // jQuery form validation
  const validateForm = () => {
    let isValid = true;
    $('.is-invalid').removeClass('is-invalid');
    $('.invalid-feedback').remove();

    if (!title.trim()) {
      $('#title').addClass('is-invalid');
      $('#title').after('<div class="invalid-feedback">Title is required</div>');
      isValid = false;
    }

    if (!dueDate) {
      $('#dueDate').addClass('is-invalid');
      $('#dueDate').after('<div class="invalid-feedback">Due date is required</div>');
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = e => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(addTask(formData)).then(() => {
        // Show success message
        $('#successAlert').fadeIn().delay(2000).fadeOut();
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          priority: 'medium',
          dueDate: '',
          completed: false
        });
        
        // Redirect after timeout
        setTimeout(() => {
          navigate('/');
        }, 2500);
      });
    }
  };

  return (
    <div className="add-task">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Add New Task</h2>
        </div>
        <div className="card-body">
          <div id="successAlert" className="alert alert-success" style={{ display: 'none' }}>
            Task added successfully! Redirecting to dashboard...
          </div>
          
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Task Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={title}
                onChange={onChange}
                placeholder="Enter task title"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={description}
                onChange={onChange}
                placeholder="Enter task description"
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
                  value={priority}
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
                  value={dueDate}
                  onChange={onChange}
                />
              </div>
            </div>
            
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;