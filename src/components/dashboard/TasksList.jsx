import React, { useState } from 'react';

const initialTasks = [
  {
    id: 'task-1',
    title: 'Complete project proposal',
    priority: 'high',
    status: 'in_progress',
    dueDate: '2023-07-28',
    assignee: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    project: 'Marketing Website',
    completion: 75,
  },
  {
    id: 'task-2',
    title: 'Review Q3 marketing budget',
    priority: 'medium',
    status: 'todo',
    dueDate: '2023-07-30',
    assignee: {
      name: 'Maria Garcia',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    project: 'Financial Planning',
    completion: 0,
  },
  {
    id: 'task-3',
    title: 'Prepare client presentation',
    priority: 'high',
    status: 'in_progress',
    dueDate: '2023-07-25',
    assignee: {
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    },
    project: 'Client Pitch',
    completion: 40,
  },
  {
    id: 'task-4',
    title: 'Update user documentation',
    priority: 'low',
    status: 'todo',
    dueDate: '2023-08-05',
    assignee: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    project: 'Product Development',
    completion: 0,
  },
  {
    id: 'task-5',
    title: 'Fix navigation bug in mobile app',
    priority: 'medium',
    status: 'in_progress',
    dueDate: '2023-07-26',
    assignee: {
      name: 'Emily Chen',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    project: 'Mobile App',
    completion: 60,
  },
];

const priorityClasses = {
  high: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-800 dark:text-red-300',
  },
  medium: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-800 dark:text-yellow-300',
  },
  low: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-300',
  },
};

const statusClasses = {
  todo: {
    bg: 'bg-gray-100 dark:bg-gray-700',
    text: 'text-gray-800 dark:text-gray-300',
  },
  in_progress: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-800 dark:text-blue-300',
  },
  completed: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-300',
  },
};

const TasksList = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  // Filter tasks based on status
  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter((task) => task.status === filter);

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map((task) => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'in_progress' : 'completed';
        const newCompletion = newStatus === 'completed' ? 100 : task.completion;
        return { ...task, status: newStatus, completion: newCompletion };
      }
      return task;
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-0">
            Tasks
          </h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`py-2 px-4 text-sm font-medium rounded-l-lg ${
                  filter === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilter('todo')}
                className={`py-2 px-4 text-sm font-medium ${
                  filter === 'todo' 
                    ? 'bg-primary text-white' 
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                To Do
              </button>
              <button
                type="button"
                onClick={() => setFilter('in_progress')}
                className={`py-2 px-4 text-sm font-medium ${
                  filter === 'in_progress' 
                    ? 'bg-primary text-white' 
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                In Progress
              </button>
              <button
                type="button"
                onClick={() => setFilter('completed')}
                className={`py-2 px-4 text-sm font-medium rounded-r-lg ${
                  filter === 'completed' 
                    ? 'bg-primary text-white' 
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                Completed
              </button>
            </div>
            <select
              className="form-select py-2 px-4 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Task
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Priority
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Assignee
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Progress
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedTasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                      checked={task.status === 'completed'}
                      onChange={() => toggleTaskStatus(task.id)}
                    />
                    <div className="ml-4">
                      <div className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                        {task.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {task.project}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityClasses[task.priority].bg} ${priorityClasses[task.priority].text}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[task.status].bg} ${statusClasses[task.status].text}`}>
                    {task.status === 'in_progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(task.dueDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={task.assignee.avatar}
                        alt={task.assignee.name}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(task.assignee.name)}&background=random`;
                        }}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {task.assignee.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${task.completion}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {task.completion}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-primary hover:text-primary-dark"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksList;
