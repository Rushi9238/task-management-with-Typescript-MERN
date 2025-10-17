import { Request, Response } from 'express';
import { Task, TaskManagementInterface } from '../../models/TaskMang.model';
import User from '../../models/User.model';
import { asyncHandler } from '../../utils/asyncHandler';
interface AuthRequest extends Request {
  user?: any;
}

// Create a new task
export const createTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { title, description, status, priority } = await req.body;
  const userId = req.user?._id;

  // Validate required fields
  if (!(title && description)) {
    return res.status(400).json({
      success: false,
      message: 'Title and Description are required',
      data: null,
    });
  }

  // Validate user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
      data: null,
    });
  }

  const task: TaskManagementInterface = new Task({
    title,
    description,
    status: status || 'TO-DO',
    createdBy: userId,
    priority: priority || 'MEDIUM',
  });

  const savedTask = await task.save();

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: savedTask,
  });
});

// List of Tasks
export const listTasks = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id;
  const { status, page = 1, limit = 10 } = req.query;

  // Create a filter object
  const filter: any = { createdBy: userId };

  // Optional Filter by status if provided
  if (status && ['TO-DO', 'IN-PROGRESS', 'DONE'].includes(status as string)) {
    filter.status = status;
  }

  // Find tasks
  const tasks = await Task.find(filter).sort({ createdAt: -1 }).exec();

  return res.status(200).json({
    success: true,
    message: 'Tasks fetched successfully',
    data: tasks,
  });
});

// Get single task by ID
export const getTaskById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?._id;

  // find task by ID and createdBy
  const task = await Task.findOne({ _id: id, createdBy: userId });

  // if task not found
  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found',
      data: null,
    });
  }

  // return response
  return res.status(200).json({
    success: true,
    message: 'Task fetched successfully',
    data: task,
  });
});

// Update task by ID
export const updateTaskById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const { title, description, status } = req.body;

  // Find task by ID and createdBy
    const task = await Task.findOne({ _id: id, createdBy: userId });

    // If task not found
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
        data: null,
      });
    }

    // Update task fields if provided
     if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    // Save the updated task
    const updatedTask = await task.save();

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask,
    });
});

// Delete a task
export const deleteTask = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;

    // Find task and delete
    const task = await Task.findOneAndDelete({ _id: id, createdBy: userId });

    // If task not found
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
        data: null,
      });
    }

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: null,
    });
    
})
