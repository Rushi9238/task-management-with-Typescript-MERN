import mongoose, { Document, Schema } from 'mongoose';

export interface TaskManagementInterface extends Document {
  title: string;
  description?: string;
  status: 'TO-DO' | 'IN-PROGRESS' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<TaskManagementInterface>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    status: {
      type: String,
      enum: ['TO-DO', 'IN-PROGRESS', 'DONE'],
      default: 'TO-DO',
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      default: 'MEDIUM',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.index({ createdBy: 1, status: 1 });
taskSchema.index({ createdAt: -1 });

export const Task = mongoose.model<TaskManagementInterface>('Task', taskSchema);