import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('taskmaster_auth') ? JSON.parse(localStorage.getItem('taskmaster_auth')) : null,
  token: null,
  isAuthenticated: localStorage.getItem('taskmaster_token') ? true : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("action.payload",action.payload)
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;