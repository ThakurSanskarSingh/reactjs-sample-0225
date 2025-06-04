'use client';

import React, { useState, useEffect } from 'react';
import { Plus, User, Wallet, Search } from 'lucide-react';
import TaskBoard from './components/TaskBoard';
import StatsGrid from './components/StatsGrid';
import AddTaskModal from './components/AddTaskModal';
import ProfileModal from './components/ProfileModal';
import { Task, User as UserType } from './lib/types';
import { connectWallet } from './lib/web3';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [web3Account, setWeb3Account] = useState<string>('');

  // Initialize app
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Fetch user profile with random image
      const randomId = Math.floor(Math.random() * 1000);
      const response = await fetch(`https://picsum.photos/id/${randomId}/info`);
      const imageData = await response.json();
      
      const userData: UserType = {
        id: '1',
        name: 'John Doe',
        avatar: imageData.download_url
      };
      
      setUser(userData);
      
      // Load sample tasks
      const sampleTasks: Task[] = [
        {
          id: '1',
          title: 'Design Task Board UI',
          description: 'Create wireframes and mockups for the task board interface',
          status: 'done',
          priority: 'high',
          dueDate: '2025-06-05',
          createdAt: '2025-06-01',
          assignee: 'John Doe'
        },
        {
          id: '2',
          title: 'Implement Drag & Drop',
          description: 'Add drag and drop functionality for task management',
          status: 'inprogress',
          priority: 'medium',
          dueDate: '2025-06-08',
          createdAt: '2025-06-02',
          assignee: 'Jane Smith'
        },
        {
          id: '3',
          title: 'Setup Web3 Integration',
          description: 'Integrate Web3.js for blockchain functionality',
          status: 'todo',
          priority: 'high',
          dueDate: '2025-06-10',
          createdAt: '2025-06-03',
          assignee: 'Bob Johnson'
        },
        {
          id: '4',
          title: 'Write Unit Tests',
          description: 'Create comprehensive test cases using Jest',
          status: 'todo',
          priority: 'low',
          dueDate: '2025-06-12',
          createdAt: '2025-06-03',
          assignee: 'Alice Brown'
        }
      ];
      
      setTasks(sampleTasks);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to initialize app:', error);
      setIsLoading(false);
    }
  };


  const handleConnectWallet = async () => {
    try {
      const account = await connectWallet();
      setWeb3Account(account);
      
      if (user) {
        setUser({ ...user, walletAddress: account });
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };


  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
    setShowAddTask(false);
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Task Board...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">TaskBoard</h1>
              <div className="hidden sm:flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border text-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleConnectWallet}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  web3Account
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {web3Account ? `${web3Account.slice(0, 6)}...${web3Account.slice(-4)}` : 'Connect Wallet'}
                </span>
              </button>
              
              <button
                onClick={() => setShowAddTask(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Task</span>
              </button>
              
              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
                ) : (
                  <User className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

     
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsGrid tasks={tasks} />
        <TaskBoard 
          tasks={filteredTasks}
          onUpdateTaskStatus={updateTaskStatus}
          onDeleteTask={deleteTask}
        />
      </main>

     
      {showAddTask && (
        <AddTaskModal
          onClose={() => setShowAddTask(false)}
          onAdd={addTask}
        />
      )}

      {showProfile && user && (
        <ProfileModal
          user={user}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}