// Mock API Backend Simulation
export const mockAPI = {
  users: [{ id: 0, username: 'admin', password: 'admin123', role: 'admin' }],
  tasks: [],
  currentId: 1,
  taskId: 1,

  register: function(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.users.find(u => u.username === username)) {
          reject({ message: 'User already exists' });
        } else {
          const user = { id: this.currentId++, username, password, role: 'user' };
          this.users.push(user);
          resolve({ token: `token_${user.id}`, user: { id: user.id, username, role: user.role } });
        }
      }, 500);
    });
  },

  login: function(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
          resolve({ token: `token_${user.id}`, user: { id: user.id, username, role: user.role } });
        } else {
          reject({ message: 'Invalid credentials' });
        }
      }, 500);
    });
  },

  getTasks: function(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.tasks.filter(t => t.userId === userId));
      }, 300);
    });
  },

  createTask: function(task, userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = { ...task, id: this.taskId++, userId };
        this.tasks.push(newTask);
        resolve(newTask);
      }, 300);
    });
  },

  updateTask: function(id, updates, userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const taskIndex = this.tasks.findIndex(t => t.id === id && t.userId === userId);
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates };
          resolve(this.tasks[taskIndex]);
        } else {
          reject({ message: 'Task not found' });
        }
      }, 300);
    });
  },

  deleteTask: function(id, userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const taskIndex = this.tasks.findIndex(t => t.id === id && t.userId === userId);
        if (taskIndex !== -1) {
          this.tasks.splice(taskIndex, 1);
          resolve();
        } else {
          reject({ message: 'Task not found' });
        }
      }, 300);
    });
  },

  getAllUsers: function() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users.map(u => ({ id: u.id, username: u.username, role: u.role })));
      }, 300);
    });
  },

  deleteUser: function(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.users = this.users.filter(u => u.id !== userId);
        this.tasks = this.tasks.filter(t => t.userId !== userId);
        resolve();
      }, 300);
    });
  },

  updateUserRole: function(userId, role) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (user) {
          user.role = role;
          resolve({ id: user.id, username: user.username, role: user.role });
        }
      }, 300);
    });
  }
};