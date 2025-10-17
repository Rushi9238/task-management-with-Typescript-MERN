import { api } from "./axiosService";

// Tasks API calls
export const tasksAPI = {
  getTasks: async (params) => {
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id, updates) => {
    const response = await api.put(`/tasks/${id}`, updates);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  getTasksStats: async () => {
    const response = await api.get('/tasks/stats');
    return response.data;
  },

  bulkDeleteTasks: async (taskIds) => {
    const response = await api.delete('/tasks', { data: { taskIds } });
    return response.data;
  },
};