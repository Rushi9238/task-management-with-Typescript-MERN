import { mockAPI } from '../../services/api';
import { authAPI } from '../../services/authApi';
import { loginSuccess, logout } from '../slices/authSlice';

export const loginUser = (username, password) => async (dispatch) => {
  try {
    const formData=new FormData();
    formData.append('email',username);
    formData.append('password',password);
    const data = await authAPI.login(formData);
    dispatch(loginSuccess(data));
    localStorage.setItem('taskmaster_auth', JSON.stringify(data.data.user));
    localStorage.setItem('taskmaster_token', data.data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = (username,email, password) => async (dispatch) => {
  try {
    const formData= new FormData();
    formData.append('name',username)
    formData.append('email',email);
    formData.append('password',password)

    const data = await authAPI.register(formData);
    dispatch(loginSuccess(data));
    localStorage.setItem('taskmaster_auth', JSON.stringify(data.data.user));
    localStorage.setItem('taskmaster_token', data.data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('taskmaster_auth');
  dispatch(logout());
};