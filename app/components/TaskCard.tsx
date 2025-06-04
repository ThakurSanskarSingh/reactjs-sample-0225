import React from 'react';
import { Calendar, User, Trash2 } from 'lucide-react';
import { TaskCardProps } from '../lib/types';
import { getPriorityColor, getStatusIcon, formatDate } from '../lib/utils';

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onDragStart, 
  onDelete 
}) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-gray-50 rounded-lg p-4 cursor-move hover:shadow-md transition-shadow border-l-4 border-blue-400"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-gray-900 line-clamp-2">{task.title}</h4>
        <div className="flex items-center space-x-1">
          {getStatusIcon(task.status)}
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(task.dueDate)}</span>
        </div>
      </div>
      
      {task.assignee && (
        <div className="mt-3 flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-blue-600" />
          </div>
          <span className="text-xs text-gray-600">{task.assignee}</span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;