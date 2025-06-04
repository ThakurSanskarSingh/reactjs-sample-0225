import React, { useState } from 'react';
import { TaskBoardProps, Task } from '../lib/types';
import { getTasksByStatus, getPriorityColor, getStatusIcon } from '../lib/utils';
import TaskCard from './TaskCard';

const TaskBoard: React.FC<TaskBoardProps> = ({ 
  tasks, 
  onUpdateTaskStatus, 
  onDeleteTask 
}) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    if (draggedTask) {
      onUpdateTaskStatus(draggedTask.id, status);
      setDraggedTask(null);
    }
  };

  const todoTasks = getTasksByStatus(tasks, 'todo');
  const inProgressTasks = getTasksByStatus(tasks, 'inprogress');
  const doneTasks = getTasksByStatus(tasks, 'done');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* To Do Column */}
      <div
        className="bg-white rounded-xl shadow-sm p-6"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'todo')}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span>To Do ({todoTasks.length})</span>
          </h3>
        </div>
        
        <div className="space-y-4">
          {todoTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={() => handleDragStart(task)}
              onDelete={() => onDeleteTask(task.id)}
              getPriorityColor={() => getPriorityColor(task.priority)}
              getStatusIcon={() => getStatusIcon(task.status)}
            />
          ))}
        </div>
      </div>

      <div
        className="bg-white rounded-xl shadow-sm p-6"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'inprogress')}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span>In Progress ({inProgressTasks.length})</span>
          </h3>
        </div>
        
        <div className="space-y-4">
          {inProgressTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={() => handleDragStart(task)}
              onDelete={() => onDeleteTask(task.id)}
              getPriorityColor={() => getPriorityColor(task.priority)}
              getStatusIcon={() => getStatusIcon(task.status)}
            />
          ))}
        </div>
      </div>

      {/* Done Column */}
      <div
        className="bg-white rounded-xl shadow-sm p-6"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'done')}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Done ({doneTasks.length})</span>
          </h3>
        </div>
        
        <div className="space-y-4">
          {doneTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={() => handleDragStart(task)}
              onDelete={() => onDeleteTask(task.id)}
              getPriorityColor={() => getPriorityColor(task.priority)}
              getStatusIcon={() => getStatusIcon(task.status)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;