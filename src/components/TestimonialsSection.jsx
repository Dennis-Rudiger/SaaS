import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    content: "SaaSPro has completely transformed how our team collaborates. We've cut our project delivery time by 40% and improved client satisfaction significantly.",
    author: "Sarah Johnson",
    role: "Project Manager at TechCorp",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    companyLogo: "https://via.placeholder.com/100x40/4F46E5/FFFFFF?text=TechCorp"
  },
  {
    id: 2,
    content: "The analytics features have given us insights we never had before. We can now make data-driven decisions that have increased our productivity by 25%.",
    author: "Michael Chen",
    role: "Director of Operations at InnoSystems",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 5,
    companyLogo: "https://via.placeholder.com/100x40/3B82F6/FFFFFF?text=InnoSystems"
  },
  {
    id: 3,
    content: "As a remote-first company, SaaSPro's collaboration tools have been essential for keeping our team connected and projects on track.",
    author: "Elena Rodriguez",
    role: "CEO at RemoteWorks",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4,
    companyLogo: "https://via.placeholder.com/100x40/10B981/FFFFFF?text=RemoteWorks"
  },
  {
    id: 4,
    content: "The customizable workflows have allowed us to adapt SaaSPro to our unique processes instead of changing our processes to fit the software.",
    author: "David Kim",
    role: "Product Lead at CreativeStudio",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
    rating: 5,
    companyLogo: "https://via.placeholder.com/100x40/F59E0B/FFFFFF?text=CreativeStudio"
  },
  {
    id: 5,
    content: "Customer support has been outstanding. Any time we've had questions, the team responds quickly and helps us get the most out of the platform.",
    author: "Priya Patel",
    role: "Operations Manager at GrowthPartners",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    companyLogo: "https://via.placeholder.com/100x40/EC4899/FFFFFF?text=GrowthPartners"
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);
  const autoplayRef = useRef(null);

  // Reset autoplay on manual navigation
  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(nextTestimonial, 6000);
    }
  };

  // Navigation functions
  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToTestimonial = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    resetAutoplay();
  };

  // Auto-scroll functionality
  useEffect(() => {
    autoplayRef.current = setInterval(nextTestimonial, 6000);
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, []);

  // Mouse drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth;
      const newIndex = Math.round(carouselRef.current.scrollLeft / cardWidth);
      setActiveIndex(Math.max(0, Math.min(newIndex, testimonials.length - 1)));
      resetAutoplay();
    }
  };

  // Render star ratings
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <svg 
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const testimonialVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.85
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.85,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    })
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 dark:bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-400/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-indigo-400/10 dark:bg-indigo-400/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
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
              Customer Stories
            </p>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-6"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Loved by teams worldwide
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Thousands of teams trust SaaSPro to manage their projects and improve their workflows.
          </motion.p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Main testimonial carousel */}
          <div 
            ref={carouselRef}
            className="relative h-[28rem] md:h-[22rem] overflow-hidden rounded-2xl"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="h-full flex flex-col p-6 md:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700">
                  {/* Company logo */}
                  <div className="flex justify-between items-center mb-6">
                    <img 
                      src={testimonials[activeIndex].companyLogo} 
                      alt={`${testimonials[activeIndex].author}'s company`}
                      className="h-8 w-auto"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/100x40/6B7280/FFFFFF?text=${testimonials[activeIndex].role.split(' at ')[1]}`;
                      }}
                    />
                    <div className="flex">
                      {renderStars(testimonials[activeIndex].rating)}
                    </div>
                  </div>
                  
                  {/* Quote icon */}
                  <div className="mb-6">
                    <svg className="h-10 w-10 text-primary/20 dark:text-primary/30" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  
                  {/* Testimonial content */}
                  <blockquote className="flex-grow">
                    <p className="text-xl md:text-2xl text-gray-800 dark:text-white leading-relaxed font-light mb-8">
                      "{testimonials[activeIndex].content}"
                    </p>
                    
                    {/* Author info */}
                    <div className="flex items-center">
                      <img 
                        src={testimonials[activeIndex].image} 
                        alt={testimonials[activeIndex].author}
                        className="h-14 w-14 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700 mr-4 shadow-md"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonials[activeIndex].author)}&background=random&size=100`;
                        }}
                      />
                      <div>
                        <p className="font-semibold text-lg text-gray-900 dark:text-white">
                          {testimonials[activeIndex].author}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {testimonials[activeIndex].role}
                        </p>
                      </div>
                    </div>
                  </blockquote>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons - more stylish with better hover effects */}
          <button
            className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-white dark:bg-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 z-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            onClick={() => {
              prevTestimonial();
              resetAutoplay();
            }}
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-white dark:bg-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 z-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            onClick={() => {
              nextTestimonial();
              resetAutoplay();
            }}
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Progress indicator - more interactive design */}
        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`group relative h-2 rounded-full overflow-hidden transition-all ${
                activeIndex === index ? 'w-10 bg-primary' : 'w-6 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              onClick={() => goToTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              {activeIndex === index && (
                <span className="absolute inset-0 bg-primary-dark origin-left animate-grow"></span>
              )}
            </button>
          ))}
        </div>
        
        {/* Additional testimonial stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          {[
            { value: '4.9/5', label: 'Average rating', icon: 'star' },
            { value: '10,000+', label: 'Active users', icon: 'users' },
            { value: '30%', label: 'Productivity boost', icon: 'chart' },
            { value: '97%', label: 'Customer satisfaction', icon: 'smile' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className={`w-10 h-10 mb-3 rounded-full flex items-center justify-center bg-primary/10 dark:bg-primary/20`}>
                {stat.icon === 'star' && (
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
                {stat.icon === 'users' && (
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
                {stat.icon === 'chart' && (
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )}
                {stat.icon === 'smile' && (
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Add these animation classes to your tailwind.config.js
// extend: {
//   animation: {
//     blob: "blob 7s infinite",
//     grow: "grow 6s linear 1"
//   },
//   keyframes: {
//     blob: {
//       "0%": { transform: "translate(0px, 0px) scale(1)" },
//       "33%": { transform: "translate(30px, -50px) scale(1.1)" },
//       "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
//       "100%": { transform: "translate(0px, 0px) scale(1)" }
//     },
//     grow: {
//       "0%": { transform: "scaleX(0)" },
//       "100%": { transform: "scaleX(1)" }
//     }
//   }
// }

export default TestimonialsSection;