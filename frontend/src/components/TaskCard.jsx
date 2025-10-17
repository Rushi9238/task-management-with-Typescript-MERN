import React from 'react';
import { Edit2, Trash2, GripVertical } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onDragStart, onDragEnd }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      className="bg-white rounded-lg border border-gray-200 p-4 mb-3 cursor-move hover:shadow-lg transition-shadow group"
    >
      <div className="flex items-start gap-3">
        <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-500 mb-2">{task.description}</p>
          )}
          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-1 rounded-full ${
              task.priority === 'high' ? 'bg-red-100 text-red-700' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {task.priority || 'low'} priority
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                disabled={task.status ==='DONE'}
                className={`p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition ${task.status ==='DONE' ? 'opacity-50 cursor-not-allowed hover:text-gray-400 hover:bg-transparent' : ''}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;