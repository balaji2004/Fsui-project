 // redux/actions/taskActions.js
import axios from 'axios';

// Action Types
export const GET_TASKS = 'GET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const GET_TASK = 'GET_TASK';
export const TASK_ERROR = 'TASK_ERROR';
export const LOADING = 'LOADING';

const API_URL = 'http://localhost:5000/api/tasks';

// Get all tasks
export const getTasks = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    const res = await axios.get(API_URL);
    dispatch({
      type: GET_TASKS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
};

// Get single task
export const getTask = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    const res = await axios.get(`${API_URL}/${id}`);
    dispatch({
      type: GET_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
};

// Add new task
export const addTask = (taskData) => async (dispatch) => {
  try {
    const res = await axios.post(API_URL, taskData);
    dispatch({
      type: ADD_TASK,
      payload: res.data
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
};

// Update task
export const updateTask = (id, taskData) => async (dispatch) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, taskData);
    dispatch({
      type: UPDATE_TASK,
      payload: res.data
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
};

// Delete task
export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({
      type: DELETE_TASK,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
};