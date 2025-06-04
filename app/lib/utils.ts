import {Task} from './types';
import React, { ReactElement } from 'react';
import Web3 from 'web3';

export const getPriorityColor = (priority: string): string => {
  switch (priority?.toLowerCase()) {
    case 'high':
    case 'HIGH':
      return 'text-red-600 bg-red-100';
    case 'medium':
    case 'MEDIUM':
      return 'text-yellow-600 bg-yellow-100';
    case 'low':
    case 'LOW':
      return 'text-green-600 bg-green-100';
    case 'urgent':
    case 'URGENT':
      return 'text-pink-600 bg-pink-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const getStatusIcon = (status: string): ReactElement => {
  const { CheckCircle, Clock, AlertCircle, XCircle } = require('lucide-react');
  
  switch (status?.toLowerCase()) {
    case 'done':
    case 'DONE':
      return React.createElement(CheckCircle, { className: 'w-4 h-4 text-green-600' });
    case 'inprogress':
    case 'in_progress':
    case 'IN_PROGRESS':
      return React.createElement(Clock, { className: 'w-4 h-4 text-yellow-600' });
    case 'cancelled':
    case 'CANCELLED':
      return React.createElement(XCircle, { className: 'w-4 h-4 text-red-600' });
    default:
      return React.createElement(AlertCircle, { className: 'w-4 h-4 text-gray-600' });
  }
};

export const getTasksByStatus = (tasks: Task[], status: Task['status']): Task[] => {
  return tasks.filter(task => task.status?.toLowerCase() === status?.toLowerCase());
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString();
};

export const generateTaskId = (): string => {
  return Date.now().toString();
};