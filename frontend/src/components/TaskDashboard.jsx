import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, ListTodo, LayoutDashboard, Plus, Circle, Clock, CheckCheck } from 'lucide-react';
import { loadTasks, createTask, updateTaskStatus, removeTask } from '../store/thunks/taskThunks';
import TaskColumn from './TaskColumn';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { logoutUser } from '../store/thunks/authThunks';
import { clearDraggedTask, setDraggedTask } from '../store/slices/tasksSlice';

const TaskDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { tasks, draggedTask } = useSelector(state => state.tasks);
  
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'TO-DO', priority: 'MEDIUM' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(loadTasks(user._id));
  }, [dispatch, user._id]);

  const openModal = (task = null) => {
    if (task) {
      setEditTask(task);
      setFormData({ 
        title: task.title, 
        description: task.description || '', 
        status: task.status,
        priority: task.priority || 'MEDIUM'
      });
    } else {
      setEditTask(null);
      setFormData({ title: '', description: '', status: 'TO-DO', priority: 'MEDIUM' });
    }
    setErrors({});
    setShowModal(true);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title || formData.title.trim().length === 0) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (editTask) {
      await dispatch(updateTaskStatus(editTask._id, formData));
    } else {
      await dispatch(createTask(formData));
    }
    
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this task?')) {
      await dispatch(removeTask(id, user._id));
    }
  };

  const handleDragStart = (e, task) => {
    dispatch(setDraggedTask(task));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    dispatch(clearDraggedTask());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      await dispatch(updateTaskStatus(draggedTask._id, { ...draggedTask, status: newStatus }));
    }
    // dispatch(clearDraggedTask());
  };

  const tasksByStatus = {
    todo: tasks.filter(t => t.status === 'TO-DO'),
    inprogress: tasks.filter(t => t.status === 'IN-PROGRESS'),
    completed: tasks.filter(t => t.status === 'DONE')
  };

  const stats = {
    total: tasks.length,
    todo: tasksByStatus.todo.length,
    inprogress: tasksByStatus.inprogress.length,
    completed: tasksByStatus.completed.length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <ListTodo className="w-6 h-6 text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-900">TaskMaster Sprint</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user.username}</span>
              <button
                onClick={() => dispatch(logoutUser())}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">To Do</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">{stats.todo}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Circle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.inprogress}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sprint Board</h2>
            <p className="text-sm text-gray-600 mt-1">Drag and drop tasks to update their status</p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4">
          <TaskColumn
            title="To Do"
            status="TO-DO"
            tasks={tasksByStatus.todo}
            icon={Circle}
            bgColor="bg-orange-500"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {tasksByStatus.todo.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Circle className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No tasks yet</p>
              </div>
            ) : (
              tasksByStatus.todo.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={openModal}
                  onDelete={handleDelete}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              ))
            )}
          </TaskColumn>

          <TaskColumn
            title="In Progress"
            status="IN-PROGRESS"
            tasks={tasksByStatus.inprogress}
            icon={Clock}
            bgColor="bg-blue-500"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {tasksByStatus.inprogress.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No tasks in progress</p>
              </div>
            ) : (
              tasksByStatus.inprogress.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={openModal}
                  onDelete={handleDelete}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              ))
            )}
          </TaskColumn>

          <TaskColumn
            title="Completed"
            status="DONE"
            tasks={tasksByStatus.completed}
            icon={CheckCheck}
            bgColor="bg-green-500"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {tasksByStatus.completed.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <CheckCheck className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No completed tasks</p>
              </div>
            ) : (
              tasksByStatus.completed.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={openModal}
                  // onDelete={handleDelete}
                  // onDragStart={handleDragStart}
                  // onDragEnd={handleDragEnd}
                />
              ))
            )}
          </TaskColumn>
        </div>
      </div>

      <TaskModal
        showModal={showModal}
        setShowModal={setShowModal}
        editTask={editTask}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default TaskDashboard;