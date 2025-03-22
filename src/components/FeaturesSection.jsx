import React, { useState } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    id: 1,
    name: 'Project Management',
    description: 'Plan, track, and manage your projects with ease. Set milestones, assign tasks, and monitor progress in real time.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    color: 'primary',
  },
  {
    id: 2,
    name: 'Team Collaboration',
    description: 'Collaborate with your team in real time. Share files, leave comments, and keep everyone on the same page.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'blue',
  },
  {
    id: 3,
    name: 'Task Management',
    description: 'Create, assign, and track tasks. Set priorities, due dates, and dependencies to keep your work organized.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    color: 'green',
  },
  {
    id: 4,
    name: 'Time Tracking',
    description: 'Track time spent on tasks and projects. Generate reports to analyze productivity and improve resource allocation.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'yellow',
  },
  {
    id: 5,
    name: 'Document Management',
    description: 'Store, organize, and share documents securely. Control access and maintain version history for all your files.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    ),
    color: 'orange',
  },
  {
    id: 6,
    name: 'Analytics & Reporting',
    description: 'Gain insights with powerful analytics and customizable reports. Make data-driven decisions to improve performance.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'purple',
  },
];

const integrations = [
  { 
    name: 'Slack', 
    icon: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
    category: 'Communication'
  },
  { 
    name: 'GitHub', 
    icon: 'https://cdn.worldvectorlogo.com/logos/github-icon-1.svg',
    category: 'Development'
  },
  { 
    name: 'Google Drive', 
    icon: 'https://cdn.worldvectorlogo.com/logos/google-drive.svg',
    category: 'Storage'
  },
  { 
    name: 'Dropbox', 
    icon: 'https://cdn.worldvectorlogo.com/logos/dropbox-1.svg',
    category: 'Storage'
  },
  { 
    name: 'Trello', 
    icon: 'https://cdn.worldvectorlogo.com/logos/trello.svg',
    category: 'Management'
  },
  { 
    name: 'Jira', 
    icon: 'https://cdn.worldvectorlogo.com/logos/jira-1.svg',
    category: 'Management'
  },
  { 
    name: 'Figma', 
    icon: 'https://cdn.worldvectorlogo.com/logos/figma-icon.svg',
    category: 'Design'
  },
  { 
    name: 'Notion', 
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    category: 'Productivity'
  },
  { 
    name: 'Zapier', 
    icon: 'https://cdn.worldvectorlogo.com/logos/zapier-1.svg',
    category: 'Automation'
  },
];

// Feature card component with hover effects
const FeatureCard = ({ feature }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Color mapping
  const colorClasses = {
    primary: {
      light: 'bg-primary/10 text-primary',
      dark: 'dark:bg-primary/20 dark:text-primary-light',
      border: 'border-primary/20 dark:border-primary/30',
      hover: 'hover:border-primary/50 dark:hover:border-primary/50'
    },
    blue: {
      light: 'bg-blue-100 text-blue-600',
      dark: 'dark:bg-blue-900/30 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800/30',
      hover: 'hover:border-blue-400 dark:hover:border-blue-700'
    },
    green: {
      light: 'bg-green-100 text-green-600',
      dark: 'dark:bg-green-900/30 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800/30',
      hover: 'hover:border-green-400 dark:hover:border-green-700'
    },
    yellow: {
      light: 'bg-yellow-100 text-yellow-600',
      dark: 'dark:bg-yellow-900/30 dark:text-yellow-400',
      border: 'border-yellow-200 dark:border-yellow-800/30',
      hover: 'hover:border-yellow-400 dark:hover:border-yellow-700'
    },
    orange: {
      light: 'bg-orange-100 text-orange-600',
      dark: 'dark:bg-orange-900/30 dark:text-orange-400',
      border: 'border-orange-200 dark:border-orange-800/30',
      hover: 'hover:border-orange-400 dark:hover:border-orange-700'
    },
    purple: {
      light: 'bg-purple-100 text-purple-600',
      dark: 'dark:bg-purple-900/30 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800/30',
      hover: 'hover:border-purple-400 dark:hover:border-purple-700'
    }
  };
  
  const colorClass = colorClasses[feature.color] || colorClasses.primary;
  
  return (
    <motion.div 
      className={`flex flex-col bg-white dark:bg-gray-800 border rounded-xl shadow-sm p-6 transition-all duration-300 ${colorClass.border} ${colorClass.hover} ${isHovered ? 'shadow-md -translate-y-1' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: feature.id * 0.1 }}
    >
      <div className={`self-start p-3 rounded-lg mb-4 ${colorClass.light} ${colorClass.dark}`}>
        {feature.icon}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {feature.name}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
        {feature.description}
      </p>
      
      <div className={`mt-2 flex items-center text-sm font-medium ${colorClass.light} ${colorClass.dark} transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <span>Learn more</span>
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </div>
    </motion.div>
  );
};

// Integration card component
const IntegrationCard = ({ integration }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-12 h-12 mb-3 flex items-center justify-center">
        <img src={integration.icon} alt={integration.name} className="max-w-full max-h-full object-contain" />
      </div>
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">{integration.name}</h4>
      <span className="text-xs text-gray-500 dark:text-gray-400">{integration.category}</span>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 z-0"></div>
      <div className="absolute top-40 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5"></div>
      <div className="absolute bottom-40 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            className="inline-block mb-4 px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary dark:text-primary-light text-sm font-medium">
              Powerful Features
            </p>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-primary to-gray-800 dark:from-white dark:via-primary-light dark:to-gray-300 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything You Need <span className="block">in One Place</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Powerful, intuitive tools to help your team succeed, no matter the project size or complexity.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
        
        {/* Integration section with modern styling */}
        <div className="mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 dark:from-primary/10 dark:via-blue-500/10 dark:to-purple-500/10 rounded-2xl z-0"></div>
          
          <motion.div 
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl p-8 md:p-12 relative z-10 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-purple-600"></div>
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-blue-500/30 rounded-full filter blur-2xl"></div>
            <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-gradient-to-tr from-purple-500/20 to-pink-500/30 rounded-full filter blur-2xl"></div>
            
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
                <motion.div 
                  className="inline-block mb-4 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 rounded-full"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                    Seamless Connections
                  </p>
                </motion.div>
                
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  Integrate with Your Favorite Tools
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  Connect SaaSPro with the tools your team already uses for a seamless workflow. Our platform integrates with 50+ popular apps and services.
                </motion.p>
                
                <ul className="space-y-4">
                  {[
                    'One-click installations with no coding required',
                    'Bidirectional sync ensures data is always up-to-date',
                    'Custom API access for advanced integrations'
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + (idx * 0.1) }}
                    >
                      <span className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 mr-3">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.a 
                  href="/integrations" 
                  className="inline-flex items-center mt-8 px-4 py-2 bg-blue-100 dark:bg-blue-900/40 hover:bg-blue-200 dark:hover:bg-blue-800/40 text-blue-600 dark:text-blue-400 font-medium rounded-lg transition-colors"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  View all integrations
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </motion.a>
              </div>
              
              <div className="lg:w-1/2 grid grid-cols-3 gap-4">
                {integrations.map((integration, index) => (
                  <IntegrationCard key={index} integration={integration} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Feature showcase / call to action */}
        <div className="mt-24 text-center">
          <motion.div
            className="inline-block mb-4 bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-1 rounded-full shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium">Supercharge your workflow</p>
          </motion.div>
          
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ready to boost your team's productivity?
          </motion.h3>
          
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Start your 14-day free trial today. No credit card required.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a 
              href="/signup" 
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              Get Started Free
            </a>
            <a 
              href="/demo" 
              className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
            >
              Schedule a Demo
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
