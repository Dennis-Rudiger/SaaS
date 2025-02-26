import React, { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    content: "SaaSPro has completely transformed how our team collaborates. We've cut our project delivery time by 40% and improved client satisfaction significantly.",
    author: "Sarah Johnson",
    role: "Project Manager at TechCorp",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: 2,
    content: "The analytics features have given us insights we never had before. We can now make data-driven decisions that have increased our productivity by 25%.",
    author: "Michael Chen",
    role: "Director of Operations at InnoSystems",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 3,
    content: "As a remote-first company, SaaSPro's collaboration tools have been essential for keeping our team connected and projects on track.",
    author: "Elena Rodriguez",
    role: "CEO at RemoteWorks",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    content: "The customizable workflows have allowed us to adapt SaaSPro to our unique processes instead of changing our processes to fit the software.",
    author: "David Kim",
    role: "Product Lead at CreativeStudio",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
  },
  {
    id: 5,
    content: "Customer support has been outstanding. Any time we've had questions, the team responds quickly and helps us get the most out of the platform.",
    author: "Priya Patel",
    role: "Operations Manager at GrowthPartners",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Scroll to active testimonial
  useEffect(() => {
    if (carouselRef.current) {
      const scrollPosition = activeIndex * (carouselRef.current.offsetWidth / 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

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
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thousands of teams trust SaaSPro to manage their projects and improve their workflows.
          </p>
        </div>
        
        <div className="relative">
          <div 
            ref={carouselRef}
            className="flex overflow-x-hidden snap-x snap-mandatory touch-pan-x"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="min-w-full snap-center flex flex-col items-center px-4"
              >
                <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 max-w-3xl">
                  <svg className="h-8 w-8 text-gray-300 dark:text-gray-600 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <blockquote>
                    <p className="text-xl text-gray-800 dark:text-white leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author}
                        className="h-12 w-12 rounded-full object-cover mr-4"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&background=random`;
                        }}
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {testimonial.author}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            onClick={() => setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            onClick={() => setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === activeIndex ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;