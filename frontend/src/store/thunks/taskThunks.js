import { mockAPI } from '../../services/api';
import { tasksAPI } from '../../services/taskApi';
import { setTasks, addTask, updateTask, deleteTask, setLoading, setError } from '../slices/tasksSlice';

export const loadTasks = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const tasks = await tasksAPI.getTasks();
    dispatch(setTasks(tasks));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const newTask = await tasksAPI.createTask(task);
    dispatch(addTask(newTask));
    dispatch(loadTasks())
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateTaskStatus = (taskId, updates) => async (dispatch) => {
  try {
    const updatedTask = await tasksAPI.updateTask(taskId, updates);
    dispatch(updateTask(updatedTask));
     dispatch(loadTasks())
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const removeTask = (taskId, userId) => async (dispatch) => {
  try {
    await mockAPI.deleteTask(taskId, userId);
    dispatch(deleteTask(taskId));
     dispatch(loadTasks())
  } catch (error) {
    dispatch(setError(error.message));
  }
};