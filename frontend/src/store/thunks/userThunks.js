import { mockAPI } from '../../services/api';
import { setUsers, updateUserRole, deleteUser, setUsersLoading } from '../slices/usersSlice';

export const loadAllUsers = () => async (dispatch) => {
  try {
    dispatch(setUsersLoading(true));
    const users = await mockAPI.getAllUsers();
    dispatch(setUsers(users));
  } catch (error) {
    console.error('Error loading users:', error);
  } finally {
    dispatch(setUsersLoading(false));
  }
};

export const removeUser = (userId) => async (dispatch) => {
  try {
    await mockAPI.deleteUser(userId);
    dispatch(deleteUser(userId));
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export const changeUserRole = (userId, role) => async (dispatch) => {
  try {
    const updatedUser = await mockAPI.updateUserRole(userId, role);
    dispatch(updateUserRole({ userId, role }));
  } catch (error) {
    console.error('Error updating user role:', error);
  }
};