export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inprogress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  assignee?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  walletAddress?: string;
}

export interface TaskCardProps {
  task: Task;
  onDragStart: () => void;
  onDelete: () => void;
  getPriorityColor: (priority: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
}

export interface AddTaskModalProps {
  onClose: () => void;
  onAdd: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
}

export interface ProfileModalProps {
  user: User;
  onClose: () => void;
}

export interface TaskBoardProps {
  tasks: Task[];
  onUpdateTaskStatus: (taskId: string, newStatus: Task['status']) => void;
  onDeleteTask: (taskId: string) => void;
}

export interface StatsGridProps {
  tasks: Task[];
}