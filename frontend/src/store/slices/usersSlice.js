import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUserRole: (state, action) => {
      const { userId, role } = action.payload;
      const user = state.users.find(u => u.id === userId);
      if (user) {
        user.role = role;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setUsersLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUsersError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUsers,
  addUser,
  updateUserRole,
  deleteUser,
  setUsersLoading,
  setUsersError,
} = usersSlice.actions;

export default usersSlice.reducer;