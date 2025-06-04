import React from 'react';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { StatsGridProps } from '../lib/types';
import { getTasksByStatus } from '../lib/utils';

const StatsGrid: React.FC<StatsGridProps> = ({ tasks }) => {
  const todoTasks = getTasksByStatus(tasks, 'todo');
  const inProgressTasks = getTasksByStatus(tasks, 'inprogress');
  const doneTasks = getTasksByStatus(tasks, 'done');

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <AlertCircle className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">To Do</p>
            <p className="text-2xl font-bold text-gray-900">{todoTasks.length}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <AlertCircle className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">In Progress</p>
            <p className="text-2xl font-bold text-gray-900">{inProgressTasks.length}</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Done</p>
            <p className="text-2xl font-bold text-gray-900">{doneTasks.length}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;