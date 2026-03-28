import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUserProjects } from '../../services/projectService';
import { eventService } from '../../services/eventService';

const EventForm = ({ onClose, onSuccess }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Initialize with current time for start, and +1 hour for end
  const getInitialTimes = () => {
    const start = new Date();
    start.setMinutes(Math.ceil(start.getMinutes() / 30) * 30);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    
    // Format to YYYY-MM-DDThh:mm for datetime-local input
    const toLocalISOString = (date) => {
      const offset = date.getTimezoneOffset() * 60000;
      return (new Date(date - offset)).toISOString().slice(0, 16);
    };

    return {
      start: toLocalISOString(start),
      end: toLocalISOString(end)
    };
  };

  const initialTimes = getInitialTimes();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: initialTimes.start,
    end_time: initialTimes.end,
    project_id: ''
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getUserProjects();
        if (response && response.data) {
          setProjects(response.data || []);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error('Failed to load projects for event form', err);
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Convert local times to absolute ISO strings for Supabase
      const startIso = new Date(formData.start_time).toISOString();
      const endIso = new Date(formData.end_time).toISOString();

      const eventPayload = {
        title: formData.title,
        description: formData.description,
        start_time: startIso,
        end_time: endIso,
        project_id: formData.project_id || null
      };

      await eventService.createEvent(eventPayload);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create event');
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity'>
      <div className="fixed inset-0" aria-hidden="true" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full"
      >
          <form onSubmit={handleSubmit}>
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                Schedule New Event
              </h3>
              
              {error && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/30 p-3 rounded-md">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Event Title</label>
                  <input
                    type="text"
                    id="title"
                    required
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="start_time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Time</label>
                    <input
                      type="datetime-local"
                      id="start_time"
                      required
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                      value={formData.start_time}
                      onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="end_time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Time</label>
                    <input
                      type="datetime-local"
                      id="end_time"
                      required
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                      value={formData.end_time}
                      onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Related Project (Optional)</label>
                  <select
                    id="project"
                    className="mt-1 block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-white"
                    value={formData.project_id}
                    onChange={(e) => setFormData({...formData, project_id: e.target.value})}
                  >
                    <option value="">None</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <textarea
                    id="description"
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Event'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
    </div>
  );
};

export default EventForm;
