import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    content: "SaaSPro completely transformed our project management workflow. We're now delivering projects 40% faster with 90% client satisfaction—up from 65% before. The intuitive dashboard gives us real-time insights that have been game-changing for our decision-making process.",
    author: "Sarah Johnson",
    role: "Director of Operations at TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    metrics: [
      { label: "Faster delivery", value: "40%" },
      { label: "Client satisfaction", value: "90%" },
      { label: "ROI achieved", value: "320%" }
    ],
    industry: "Technology"
  },
  {
    id: 2,
    content: "The analytics capabilities in SaaSPro have revolutionized how we understand our business. We can now identify trends and bottlenecks in real-time, leading to a 25% increase in team productivity and a remarkable 30% reduction in project overruns. The collaboration features have been essential for our hybrid work model.",
    author: "Michael Chen",
    role: "CTO at InnoSystems",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    metrics: [
      { label: "Productivity increase", value: "25%" },
      { label: "Reduced overruns", value: "30%" },
      { label: "Team adoption", value: "100%" }
    ],
    industry: "Software Development"
  },
  {
    id: 3,
    content: "As a remote-first agency with team members across 12 countries, SaaSPro's collaboration tools have eliminated the chaos of our previous multi-tool setup. Our project handoffs are now seamless, client communication is centralized, and we've cut administrative overhead by 35%. Worth every penny!",
    author: "Elena Rodriguez",
    role: "Founder & CEO at RemoteWorks",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    metrics: [
      { label: "Admin overhead", value: "-35%" },
      { label: "Tools consolidated", value: "8→1" },
      { label: "Team members", value: "47+" }
    ],
    industry: "Digital Agency"
  },
  {
    id: 4,
    content: "The customizable workflows in SaaSPro allowed us to implement our exact creative process instead of changing how we work. Since switching, we've increased our creative output by 50% while maintaining our quality standards. The resource allocation features helped us optimize staffing, saving us $150K in just six months.",
    author: "David Kim",
    role: "Creative Director at CreativeStudio",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    metrics: [
      { label: "Creative output", value: "+50%" },
      { label: "Cost savings", value: "$150K" },
      { label: "Projects delivered", value: "214" }
    ],
    industry: "Creative Services"
  },
  {
    id: 5,
    content: "SaaSPro's enterprise features gave us the security and compliance features we needed while still being incredibly user-friendly. The dedicated account manager made our company-wide rollout smooth, and executive leadership loves the advanced reporting. We've measured a 28% improvement in cross-team collaboration.",
    author: "Priya Patel",
    role: "VP of Technology at GrowthPartners",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    metrics: [
      { label: "Cross-team collaboration", value: "+28%" },
      { label: "Onboarding time", value: "-60%" },
      { label: "Team size", value: "500+" }
    ],
    industry: "Consulting"
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [mouseOver, setMouseOver] = useState(false);
  const carouselRef = useRef(null);
  const autoplayRef = useRef(null);
  const testimonialRefs = useRef([]);

  // Reset autoplay on manual navigation
  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      if (autoplayEnabled && !mouseOver) {
        autoplayRef.current = setInterval(nextTestimonial, 6000);
      }
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
    if (autoplayEnabled && !mouseOver) {
      autoplayRef.current = setInterval(nextTestimonial, 6000);
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplayEnabled, mouseOver]);

  // Handle mouse enter/leave for autoplay pause
  const handleMouseEnter = () => setMouseOver(true);
  const handleMouseLeave = () => setMouseOver(false);
  
  // Update autoplay when mouseOver changes
  useEffect(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    
    if (autoplayEnabled && !mouseOver) {
      autoplayRef.current = setInterval(nextTestimonial, 6000);
    }
  }, [mouseOver]);

  // Mouse drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    setAutoplayEnabled(false);
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

  // Enhanced animation variants with smoother transitions
  const testimonialVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.85,
      rotateY: direction > 0 ? -15 : 15,
      filter: 'blur(8px)',
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        filter: { duration: 0.5 }
      }
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: {
        x: { type: "spring", stiffness: 300, damping: 25, bounce: 0.2 },
        opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        filter: { duration: 0.3 },
        scale: { 
          type: "spring", 
          stiffness: 400, 
          damping: 25,
          duration: 0.4
        },
        rotateY: {
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1]
        },
        // Stagger children animations
        delayChildren: 0.1,
        staggerChildren: 0.08
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.85,
      rotateY: direction > 0 ? 15 : -15,
      filter: 'blur(8px)',
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        filter: { duration: 0.3 },
        // Stagger children exit animations
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    })
  };

  // Child animations for staggered elements
  const childVariants = {
    enter: {
      y: 20,
      opacity: 0
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: "spring", stiffness: 500, damping: 25 },
        opacity: { duration: 0.5 }
      }
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 dark:bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-400/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-indigo-400/10 dark:bg-indigo-400/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            className="inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-primary/20 to-indigo-500/20 dark:from-primary/30 dark:to-indigo-500/30 rounded-full"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary dark:text-primary-light text-sm font-medium">
              Success Stories
            </p>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-primary to-gray-700 dark:from-white dark:via-primary-light dark:to-gray-300 mb-6"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            See Why Teams Love SaaSPro
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of organizations who have transformed their operations and achieved remarkable results with our platform.
          </motion.p>
        </div>
        
        <div className="relative max-w-5xl mx-auto perspective-1000">
          {/* Main testimonial carousel with enhanced 3D effect */}
          <div 
            ref={carouselRef}
            className="relative h-[42rem] md:h-[36rem] overflow-hidden rounded-2xl"
            style={{ perspective: "1500px" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="wait"
              // Increased exitBeforeEnter delay for smoother transition
              onExitComplete={() => {
                // Reset scroll position on animation complete
                if (carouselRef.current) {
                  carouselRef.current.scrollLeft = 0;
                }
              }}
            >
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
                style={{ 
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  transformOrigin: direction > 0 ? "left center" : "right center"
                }}
                ref={el => testimonialRefs.current[activeIndex] = el}
              >
                <motion.div 
                  className="h-full flex flex-col p-6 md:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 relative"
                  initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                  animate={{ 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Header with industry tag and rating - now with staggered animation */}
                  <motion.div 
                    className="flex justify-between items-start mb-6"
                    variants={childVariants}
                  >
                    {/* Industry tag */}
                    <motion.div 
                      className="px-4 py-1.5 bg-gradient-to-r from-primary/70 to-indigo-500/70 text-white text-sm font-semibold rounded-full shadow-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      {testimonials[activeIndex].industry}
                    </motion.div>
                    
                    {/* Rating display */}
                    <motion.div className="flex">
                      {renderStars(testimonials[activeIndex].rating)}
                    </motion.div>
                  </motion.div>
                  
                  {/* Quote icon with gradient - with animation */}
                  <motion.div 
                    className="mb-4"
                    variants={childVariants}
                  >
                    <div className="relative">
                      <svg className="h-14 w-14 text-gray-100 dark:text-gray-700 absolute -top-4 -left-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <motion.svg 
                        className="h-10 w-10 bg-gradient-to-br from-primary to-indigo-500 text-white rounded-full p-2 relative z-10" 
                        fill="currentColor" 
                        viewBox="0 0 32 32" 
                        aria-hidden="true"
                        initial={{ rotate: -10, scale: 0.9 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.2
                        }}
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </motion.svg>
                    </div>
                  </motion.div>
                  
                  {/* Testimonial content - with staggered animation */}
                  <motion.blockquote 
                    className="flex-grow flex flex-col"
                    variants={childVariants}
                  >
                    <motion.p 
                      className="text-lg md:text-xl text-gray-800 dark:text-white leading-relaxed font-light mb-6"
                      variants={childVariants}
                    >
                      {testimonials[activeIndex].content.split(' ').map((word, idx) => {
                        // Highlight important words/numbers
                        if (word.includes('%') || /\d+x|\$\d+K?/.test(word)) {
                          return <span key={idx} className="font-medium text-primary dark:text-primary-light"> {word} </span>;
                        }
                        return <span key={idx}> {word}</span>;
                      })}
                    </motion.p>
                    
                    {/* Business outcome metrics with enhanced animations */}
                    <motion.div 
                      className="grid grid-cols-3 gap-3 mb-6"
                      variants={childVariants}
                    >
                      {testimonials[activeIndex].metrics.map((metric, idx) => (
                        <motion.div 
                          key={idx} 
                          className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { 
                              delay: 0.3 + (idx * 0.1),
                              duration: 0.5,
                              type: "spring",
                              stiffness: 300,
                              damping: 25
                            }
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                          }}
                        >
                          <motion.div 
                            className="text-xl md:text-2xl font-bold text-primary dark:text-primary-light"
                            initial={{ scale: 0.8 }}
                            animate={{ 
                              scale: 1,
                              transition: { 
                                delay: 0.4 + (idx * 0.1),
                                type: "spring",
                                stiffness: 400, 
                                damping: 10
                              }
                            }}
                          >
                            {metric.value}
                          </motion.div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{metric.label}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                    
                    {/* Spacer to push author info to bottom */}
                    <div className="flex-grow"></div>
                    
                    {/* Author info with improved styling */}
                    <motion.div 
                      className="flex items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700"
                      variants={childVariants}
                    >
                      <motion.img 
                        src={testimonials[activeIndex].image} 
                        alt={testimonials[activeIndex].author}
                        className="h-14 w-14 rounded-full object-cover border-2 border-white dark:border-gray-700 ring-2 ring-primary/20 dark:ring-primary/40 mr-4 shadow-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                          scale: 1, 
                          opacity: 1,
                          transition: { delay: 0.5, duration: 0.4 }
                        }}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonials[activeIndex].author)}&background=random&size=100`;
                        }}
                      />
                      <div>
                        <motion.p 
                          className="font-semibold text-lg text-gray-900 dark:text-white"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: 1, 
                            x: 0,
                            transition: { delay: 0.55, duration: 0.3 }
                          }}
                        >
                          {testimonials[activeIndex].author}
                        </motion.p>
                        <motion.p 
                          className="text-gray-600 dark:text-gray-400"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: 1, 
                            x: 0,
                            transition: { delay: 0.6, duration: 0.3 }
                          }}
                        >
                          {testimonials[activeIndex].role}
                        </motion.p>
                      </div>
                      
                      {/* Verification badge */}
                      <motion.div 
                        className="ml-auto"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          transition: { delay: 0.65, duration: 0.3 }
                        }}
                      >
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          <svg className="-ml-0.5 mr-1.5 h-3 w-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      </motion.div>
                    </motion.div>
                  </motion.blockquote>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced navigation buttons with hover effects */}
          <motion.button
            className="absolute top-1/2 -left-5 md:-left-6 transform -translate-y-1/2 bg-white dark:bg-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center border border-gray-200 dark:border-gray-700 z-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 hover:scale-110 transition-transform"
            onClick={() => {
              prevTestimonial();
              resetAutoplay();
            }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button
            className="absolute top-1/2 -right-5 md:-right-6 transform -translate-y-1/2 bg-white dark:bg-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center border border-gray-200 dark:border-gray-700 z-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 hover:scale-110 transition-transform"
            onClick={() => {
              nextTestimonial();
              resetAutoplay();
            }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
        
        {/* Enhanced progress indicator */}
        <div className="flex justify-center space-x-4 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`group relative flex items-center focus:outline-none`}
              onClick={() => goToTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <motion.div 
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index 
                    ? 'w-10 bg-primary' 
                    : 'w-6 bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 dark:group-hover:bg-gray-500'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeIndex === index && (
                  <motion.span 
                    className="absolute inset-0 bg-primary-dark origin-left" 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                    key={`progress-${activeIndex}`}
                  />
                )}
              </motion.div>
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-2 transform -translate-x-1/2 left-1/2 hidden group-hover:block">
                <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                  {testimonials[index].author}
                </div>
                {/* Triangle */}
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 mx-auto"></div>
              </div>
            </button>
          ))}
        </div>
        
        {/* CTA Section that builds on testimonial credibility */}
        <motion.div 
          className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-primary/5 to-indigo-500/5 dark:from-primary/10 dark:to-indigo-500/10 rounded-2xl overflow-hidden border border-primary/20 dark:border-primary/30 shadow-lg p-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to achieve similar results?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of teams who have transformed their workflow with SaaSPro. Start your free 14-day trial today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/signup" 
                className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link 
                to="/demo" 
                className="px-8 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 font-medium rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                Schedule a Demo
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              No credit card required • Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;