import { api } from "./axiosService";

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

//   getProfile: async () => {
//     const response = await api.get('/auth/profile');
//     return response.data;
//   },

//   refreshToken: async () => {
//     const response = await api.post('/auth/refresh-token');
//     return response.data;
//   },
};