import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getUserTasks, updateTask } from '../../services/taskService';

const TasksCard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    const { data } = await getUserTasks();
    if (data) {
      setTasks(data.slice(0, 5));
    }
    setLoading(false);
  };

  const toggleTaskCompletion = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const isCompleted = task.status === 'completed';
    const newStatus = isCompleted ? 'pending' : 'completed';

    // Optimistic update
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, status: newStatus } : t
    ));

    await updateTask(id, { status: newStatus });
  };

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

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0);
    
    if (taskDate.getTime() === today.getTime()) return 'Today';
    if (taskDate.getTime() === tomorrow.getTime()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isDueSoon = (dateString) => {
    if (!dateString) return false;
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
      className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'
    >
      <div className='flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700'>
        <h3 className='text-lg font-medium text-gray-900 dark:text-white'>My Tasks</h3>
        <Link
          to='/tasks'
          className='text-sm font-medium text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-light/90'  
        >
          View all
        </Link>
      </div>

      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        {loading ? (
          <div className='p-6 text-center text-gray-500'>Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className='p-6 text-center text-gray-500'>No tasks found. Create one!</div>
        ) : (
          tasks.map((task) => {
            const isCompleted = task.status === 'completed';
            return (
              <div key={task.id} className='px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0 mt-1'>
                    <button
                      type='button'
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`h-5 w-5 rounded border ${isCompleted ? 'bg-primary border-primary' : 'border-gray-300'} flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                    >
                      {isCompleted && (
                        <svg className='h-3 w-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M5 13l4 4L19 7' />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className='ml-3 flex-1'>
                    <div className='flex items-center justify-between'>
                      <p className={`text-sm font-medium ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                        {task.title}
                      </p>
                      <div className='ml-2 flex-shrink-0'>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'low' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Medium'}
                        </span>
                      </div>
                    </div>
                    <div className='mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400'>
                      {task.project && (
                        <>
                          <Link to={`/projects/${task.project.id}`} className='hover:text-primary dark:hover:text-primary-light'>
                            {task.project.name}
                          </Link>
                          <span className='mx-1'>&middot;</span>
                        </>
                      )}
                        <span className={`inline-flex items-center ${isCompleted ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
                          {formatDate(task.due_date)}
                        </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className='px-6 py-4 bg-gray-50 dark:bg-gray-750 text-center'>
        <Link
          to='/tasks/new'
          className='text-sm font-medium text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-light/90 inline-flex items-center'
        >
          <svg className='mr-1.5 h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
          </svg>
          Add new task
        </Link>
      </div>
    </motion.div>
  );
};

export default TasksCard;

