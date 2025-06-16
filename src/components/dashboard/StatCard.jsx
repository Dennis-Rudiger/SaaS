import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color }) => {
  const colorStyles = {
    blue: {
      bgLight: 'bg-blue-100',
      bgDark: 'dark:bg-blue-900/30',
      text: 'text-blue-600',
      textDark: 'dark:text-blue-400'
    },
    green: {
      bgLight: 'bg-green-100',
      bgDark: 'dark:bg-green-900/30',
      text: 'text-green-600',
      textDark: 'dark:text-green-400'
    },
    purple: {
      bgLight: 'bg-purple-100',
      bgDark: 'dark:bg-purple-900/30',
      text: 'text-purple-600',
      textDark: 'dark:text-purple-400'
    },
    red: {
      bgLight: 'bg-red-100',
      bgDark: 'dark:bg-red-900/30',
      text: 'text-red-600',
      textDark: 'dark:text-red-400'
    },
    primary: {
      bgLight: 'bg-primary/10',
      bgDark: 'dark:bg-primary/20',
      text: 'text-primary',
      textDark: 'dark:text-primary-light'
    }
  };

  const styles = colorStyles[color] || colorStyles.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center">
        <div className={`rounded-full p-3 ${styles.bgLight} ${styles.bgDark} mr-4`}>
          <div className={`${styles.text} ${styles.textDark}`}>
            {icon}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
