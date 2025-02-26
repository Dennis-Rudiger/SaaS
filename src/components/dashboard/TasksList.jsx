import React, { useState } from 'react';

const initialTasks = [
  {
    id: 1,
    title: 'Review project proposal',
    completed: false,
    priority: 'high',
    dueDate: '2023-08-25',
  },
  {
    id: 2,
    title: 'Prepare client presentation',
    completed: false,
    priority: 'medium',
    dueDate: '2023-08-28',
  },
  {
    id: 3,
    title: 'Update documentation',
    completed: true,
    priority: 'low',
    dueDate: '2023-08-22',
  },
  {
    id: 4,
    title: 'Schedule team meeting',
    completed: false,
    priority: 'medium',
    dueDate: '2023-08-24',
  },
];

const priorityClasses = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
};

const TasksList = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Tasks</h2>
        <button className="text-sm text-primary hover:text-primary-dark">View all</button>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center p-3 rounded-md border ${
              task.completed
                ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:border-gray-600"
            />
            <div className="ml-3 flex-1">
              <p
                className={`text-sm font-medium ${
                  task.completed
                    ? 'text-gray-500 dark:text-gray-400 line-through'
                    : 'text-gray-900 dark:text-white'
                }`}
              >
                {task.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Due {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${priorityClasses[task.priority]}`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button className="bg-primary text-white px-4 py-2 text-sm font-medium rounded-r-md hover:bg-primary-dark">
          Add
        </button>
      </div>
    </div>
  );
};

export default TasksList;
