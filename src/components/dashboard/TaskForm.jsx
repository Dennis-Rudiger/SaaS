import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUserProjects } from '../../services/projectService';

const TaskForm = ({ onClose, onSubmit }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_id: '',
    priority: 'medium',
    due_date: '',
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await getUserProjects();
      if (data) {
        setProjects(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, project_id: data[0].id }));
        }
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className='bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden relative'
      >
        <div className='flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700'>
          <h3 className='text-lg font-medium text-gray-900 dark:text-white'>Create New Task</h3>
          <button onClick={onClose} className='text-gray-400 hover:text-gray-500 focus:outline-none'>
            <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Task Title</label>
            <input
              type='text'
              name='title'
              required
              value={formData.title}
              onChange={handleChange}
              className='mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Project</label>
            <select
              name='project_id'
              required
              value={formData.project_id}
              onChange={handleChange}
              className='mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border'
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Description</label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              rows='3'
              className='mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border'
            ></textarea>
          </div>
          <div className='flex space-x-4'>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Priority</label>
              <select
                name='priority'
                value={formData.priority}
                onChange={handleChange}
                className='mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border'
              >
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </div>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Due Date</label>
              <input
                type='date'
                name='due_date'
                value={formData.due_date}
                onChange={handleChange}
                className='mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border'
              />
            </div>
          </div>
          <div className='pt-4 flex justify-end space-x-3'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={loading}
              className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            >
              {loading ? 'Saving...' : 'Create Task'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TaskForm;

