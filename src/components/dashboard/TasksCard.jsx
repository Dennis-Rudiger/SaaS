import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Sample tasks data
const sampleTasks = [
  {
    id: 1,
    title: 'Complete dashboard design',
    completed: false,
    priority: 'high',
    project: { name: 'Website Redesign', id: 1 },
    dueDate: '2023-12-10'
  },
  {
    id: 2,
    title: 'Review user feedback',
    completed: false,
    priority: 'medium',
    project: { name: 'Mobile App', id: 2 },
    dueDate: '2023-12-12'
  },
  {
    id: 3,
    title: 'Fix authentication bug',
    completed: false,
    priority: 'high',
    project: { name: 'Website Redesign', id: 1 },
    dueDate: '2023-12-08'
  },
  {
    id: 4,
    title: 'Prepare presentation slides',
    completed: false,
    priority: 'low',
    project: { name: 'Brand Identity', id: 3 },
    dueDate: '2023-12-15'
  }
];

const TasksCard = () => {
  const [tasks, setTasks] = useState(sampleTasks);

  // Function to toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to get priority badge class
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0);
    
    if (taskDate.getTime() === today.getTime()) {
      return 'Today';
    } else if (taskDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    } else {
      return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Function to check if a task is due soon (today or tomorrow)
  const isDueSoon = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0);
    
    return taskDate.getTime() === today.getTime() || taskDate.getTime() === tomorrow.getTime();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">My Tasks</h3>
        <Link 
          to="/tasks"
          className="text-sm font-medium text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-light/90"
        >
          View all
        </Link>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {tasks.map((task) => (
          <div key={task.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750">
            <div className="flex items-start">
              {/* Checkbox */}
              <div className="flex-shrink-0 mt-1">
                <button
                  type="button"
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`h-5 w-5 rounded border ${
                    task.completed 
                      ? 'bg-primary border-primary' 
                      : 'border-gray-300 dark:border-gray-600'
                  } flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                >
                  {task.completed && (
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Task content */}
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${
                    task.completed 
                      ? 'text-gray-400 dark:text-gray-500 line-through' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {task.title}
                  </p>
                  <div className="ml-2 flex-shrink-0">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityBadgeClass(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Link to={`/projects/${task.project.id}`} className="hover:text-primary dark:hover:text-primary-light">
                    {task.project.name}
                  </Link>
                  <span className="mx-2">•</span>
                  <span className={`${
                    isDueSoon(task.dueDate) && !task.completed
                      ? 'text-red-600 dark:text-red-400 font-medium' 
                      : ''
                  }`}>
                    {formatDate(task.dueDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 text-center">
        <Link 
          to="/tasks/new"
          className="text-sm font-medium text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-light/90 inline-flex items-center"
        >
          <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add new task
        </Link>
      </div>
    </motion.div>
  );
};

export default TasksCard;
