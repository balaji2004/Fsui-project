 // redux/reducers/taskReducer.js
import {
    GET_TASKS,
    GET_TASK,
    ADD_TASK,
    DELETE_TASK,
    UPDATE_TASK,
    TASK_ERROR,
    LOADING
  } from '../actions/taskActions';
  
  const initialState = {
    tasks: [],
    task: null,
    loading: false,
    error: null
  };
  
  export default function taskReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_TASKS:
        return {
          ...state,
          tasks: payload,
          loading: false
        };
      case GET_TASK:
        return {
          ...state,
          task: payload,
          loading: false
        };
      case ADD_TASK:
        return {
          ...state,
          tasks: [payload, ...state.tasks],
          loading: false
        };
      case UPDATE_TASK:
        return {
          ...state,
          tasks: state.tasks.map(task => 
            task._id === payload._id ? payload : task
          ),
          loading: false
        };
      case DELETE_TASK:
        return {
          ...state,
          tasks: state.tasks.filter(task => task._id !== payload),
          loading: false
        };
      case TASK_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }