import React from 'react';

const TaskColumn = ({ title, status, tasks, icon: Icon, bgColor, onDrop, onDragOver, children }) => {
  return (
    <div className="flex-1 min-w-[300px]">
      <div className={`${bgColor} rounded-t-lg p-4`}>
        <div className="flex items-center gap-2 text-white">
          <Icon className="w-5 h-5" />
          <h3 className="font-semibold">{title}</h3>
          <span className="ml-auto bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-sm">
            {tasks.length}
          </span>
        </div>
      </div>
      <div
        onDrop={(e) => onDrop(e, status)}
        onDragOver={onDragOver}
        className="bg-gray-50 rounded-b-lg p-4 min-h-[500px] border-2 border-dashed border-gray-200"
      >
        {children}
      </div>
    </div>
  );
};

export default TaskColumn;