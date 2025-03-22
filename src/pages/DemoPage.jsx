import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DemoPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: 'small',
    date: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormSubmitted(true);
    setIsLoading(false);
  };

  // Demo UI sections
  const demoSections = {
    dashboard: {
      title: "Dashboard Experience",
      description: "Get a complete overview of all your projects, tasks, and team activities in one place. The intuitive dashboard provides real-time insights and metrics to keep you informed.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80",
      features: [
        "Customizable widgets for metrics that matter to you",
        "Real-time project progress and status tracking",
        "Team activity timeline and notifications",
        "Resource allocation and availability at a glance"
      ]
    },
    projects: {
      title: "Project Management",
      description: "Plan, track, and deliver projects of any size with our comprehensive project management tools. Set milestones, assign tasks, and monitor progress with ease.",
      image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80",
      features: [
        "Gantt charts, Kanban boards, and list views",
        "Task dependencies and critical path analysis",
        "Customizable workflows for any methodology",
        "Project templates for quick setup"
      ]
    },
    collaboration: {
      title: "Team Collaboration",
      description: "Break down silos and bring your team together with powerful collaboration features. Comment on tasks, share files, and communicate in real-time.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80",
      features: [
        "Threaded comments and @mentions",
        "Document collaboration with version control",
        "Team chat and video meetings integration",
        "Permission controls and sharing settings"
      ]
    },
    analytics: {
      title: "Analytics & Reporting",
      description: "Make data-driven decisions with powerful analytics and customizable reports. Visualize trends, identify bottlenecks, and measure team performance.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80",
      features: [
        "Performance dashboards and visual reports",
        "Time tracking and resource utilization",
        "Budget vs. actual cost analysis",
        "Custom report builder with export options"
      ]
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-blue-500/5 to-purple-500/10 dark:from-primary/20 dark:via-blue-500/10 dark:to-purple-500/20 -z-10"></div>
        <div className="absolute top-40 right-0 w-72 h-72 bg-primary opacity-10 dark:opacity-20 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute bottom-40 left-0 w-72 h-72 bg-blue-400 dark:bg-blue-600 opacity-10 dark:opacity-20 rounded-full filter blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full"
            >
              <p className="text-primary dark:text-primary-light text-sm font-medium">
                Interactive Product Demo
              </p>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              See SaaSPro in Action
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            >
              Explore our interactive demo to see how SaaSPro can transform your team's productivity
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/signup"
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-md hover:shadow-lg transition"
              >
                Start Free Trial
              </Link>
              <a
                href="#schedule-demo"
                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-medium rounded-lg shadow-sm hover:shadow-md transition"
              >
                Schedule a Live Demo
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Demo Navigation Tabs */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto pb-2 hide-scrollbar">
            <nav className="flex space-x-2 min-w-full justify-center">
              {Object.keys(demoSections).map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === tab 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {demoSections[tab].title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>
      
      {/* Demo Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {demoSections[activeTab].title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  {demoSections[activeTab].description}
                </p>
                
                <ul className="space-y-4 mb-8">
                  {demoSections[activeTab].features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 mr-3">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/signup"
                    className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    Try This Feature
                  </Link>
                  <button
                    onClick={() => {
                      const nextKey = Object.keys(demoSections)[
                        (Object.keys(demoSections).indexOf(activeTab) + 1) % Object.keys(demoSections).length
                      ];
                      setActiveTab(nextKey);
                    }}
                    className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-medium rounded-lg shadow-sm hover:shadow-md transition flex items-center"
                  >
                    Next Feature
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                  <img 
                    src={demoSections[activeTab].image}
                    alt={`${demoSections[activeTab].title} demo`}
                    className="w-full h-auto rounded-lg border border-gray-100 dark:border-gray-700"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300">
                    Interactive Demo
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 dark:bg-primary/30 rounded-lg transform rotate-6 -z-10"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-400/20 dark:bg-blue-500/30 rounded-lg transform -rotate-6 -z-10"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Interactive Demo Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Key Features You'll Love
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Discover what makes SaaSPro the preferred choice for thousands of teams worldwide
            </motion.p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {[
              {
                title: "Intuitive Interface",
                description: "Designed for ease of use with minimal learning curve. Get your team up and running quickly.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                color: "blue"
              },
              {
                title: "Smart Automation",
                description: "Automate repetitive tasks and workflows to save time and reduce manual errors.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                color: "primary"
              },
              {
                title: "Real-time Collaboration",
                description: "Work together seamlessly with your team, no matter where they are located.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                color: "green"
              },
              {
                title: "Custom Workflows",
                description: "Adapt the platform to your specific processes and requirements with flexible workflows.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                color: "purple"
              },
              {
                title: "Advanced Analytics",
                description: "Gain valuable insights with customizable dashboards and in-depth reporting tools.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                color: "yellow"
              },
              {
                title: "Seamless Integrations",
                description: "Connect with the tools you already use through our extensive integration ecosystem.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                ),
                color: "orange"
              }
            ].map((feature, index) => {
              // Color classes
              const colorClasses = {
                primary: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light",
                blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                green: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                yellow: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
                orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
              };
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition duration-300"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[feature.color]}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      
      {/* User Testimonial */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <blockquote className="relative">
              <div className="absolute -top-10 -left-10 text-primary/20 dark:text-primary/10">
                <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 relative z-10"
              >
                <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-white mb-8 leading-relaxed">
                  "SaaSPro has completely transformed how our team collaborates. We've cut our project delivery time by 40% and improved client satisfaction significantly. The intuitive interface meant our team was up and running in days, not weeks."
                </p>
                
                <div className="flex items-center">
                  <img 
                    src="https://randomuser.me/api/portraits/women/32.jpg" 
                    alt="Sarah Johnson"
                    className="h-14 w-14 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700 mr-4"
                  />
                  <div>
                    <p className="font-semibold text-lg text-gray-900 dark:text-white">
                      Sarah Johnson
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Project Manager at TechCorp
                    </p>
                  </div>
                </div>
              </motion.div>
            </blockquote>
          </div>
        </div>
      </section>
      
      {/* Schedule Demo Form */}
      <section id="schedule-demo" className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12 bg-gradient-to-br from-primary/80 to-blue-600/80 text-white">
                  <h2 className="text-3xl font-bold mb-6">
                    Schedule a Personalized Demo
                  </h2>
                  <p className="text-white/90 mb-8 text-lg">
                    Get a personalized walkthrough of SaaSPro with one of our product experts. They'll answer your questions and show you how SaaSPro can meet your specific needs.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-lg mr-4 flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">30-Minute Demo</h3>
                        <p className="text-white/80">A focused walkthrough of key features relevant to your needs</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-lg mr-4 flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Q&A Session</h3>
                        <p className="text-white/80">Get answers to your specific questions from a product expert</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-lg mr-4 flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">No Obligation</h3>
                        <p className="text-white/80">No pressure to buy - we're here to help you evaluate</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 md:p-12">
                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Demo Scheduled!</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        We've received your request and will be in touch shortly to confirm your demo time. 
                        Please check your email for further details.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="text-primary hover:text-primary-dark dark:text-primary-light font-medium"
                      >
                        Schedule another demo
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleBookingSubmit}>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Enter your details
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={bookingFormData.name}
                              onChange={handleBookingChange}
                              required
                              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Work Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={bookingFormData.email}
                              onChange={handleBookingChange}
                              required
                              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                              placeholder="you@company.com"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Company Name
                            </label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={bookingFormData.company}
                              onChange={handleBookingChange}
                              required
                              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                              placeholder="Acme Inc"
                            />
                          </div>
                          <div>
                            <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Team Size
                            </label>
                            <select
                              id="teamSize"
                              name="teamSize"
                              value={bookingFormData.teamSize}
                              onChange={handleBookingChange}
                              required
                              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                            >
                              <option value="small">1-10 employees</option>
                              <option value="medium">11-50 employees</option>
                              <option value="large">51-200 employees</option>
                              <option value="enterprise">201+ employees</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Preferred Demo Date
                          </label>
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={bookingFormData.date}
                            onChange={handleBookingChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            What are you most interested in?
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows="3"
                            value={bookingFormData.message}
                            onChange={handleBookingChange}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                            placeholder="Tell us about your needs and what you'd like to see in the demo..."
                          ></textarea>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-6 w-full py-3 px-6 text-white bg-primary hover:bg-primary-dark transition-colors rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Scheduling...
                          </div>
                        ) : (
                          'Schedule My Demo'
                        )}
                      </button>
                      
                      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                        By scheduling a demo, you agree to our 
                        <Link to="/privacy" className="text-primary hover:text-primary-dark dark:text-primary-light mx-1">
                          Privacy Policy
                        </Link>
                        and
                        <Link to="/terms" className="text-primary hover:text-primary-dark dark:text-primary-light ml-1">
                          Terms of Service
                        </Link>.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to transform your workflow?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Start your 14-day free trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/signup"
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-md hover:shadow-lg transition"
              >
                Get Started Free
              </Link>
              <Link
                to="/pricing"
                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-medium rounded-lg shadow-sm hover:shadow-md transition"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DemoPage;
