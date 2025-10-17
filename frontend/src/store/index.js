import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import tasksSlice from './slices/tasksSlice';
import usersSlice from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tasks: tasksSlice,
    users: usersSlice,
  },
});

export default store;