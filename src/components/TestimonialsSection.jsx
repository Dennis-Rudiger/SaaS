import React, { useState, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    content: "SaaSPro has transformed how our team works. The automation features alone have saved us hundreds of hours each month. It's not just a tool; it's become a crucial part of our business operations.",
    name: "Sarah Johnson",
    title: "CEO, TechStart Inc.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
  },
  {
    id: 2,
    content: "I was skeptical at first, but after the first month using SaaSPro, our productivity increased by 37%. The interface is intuitive and the customer support team has been incredibly responsive.",
    name: "Michael Chen",
    title: "Operations Director, GrowthLabs",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5,
  },
  {
    id: 3,
    content: "The analytics capabilities in SaaSPro provided insights we never had access to before. We've been able to identify inefficiencies and make data-driven decisions that have positively impacted our bottom line.",
    name: "Emma Rodriguez",
    title: "Marketing Manager, Bloom Digital",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 4,
  },
  {
    id: 4,
    content: "Moving our entire workflow to SaaSPro was the best decision we made last year. The collaboration features are seamless and the regular updates keep bringing valuable new functionality.",
    name: "David Kim",
    title: "Product Lead, InnovateX",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
  },
  {
    id: 5,
    content: "SaaSPro has scaled with our business from 10 to over 200 employees. The enterprise security features give us peace of mind, and the customization options let us tailor the platform to our specific needs.",
    name: "Olivia Taylor",
    title: "CTO, ScaleUp Solutions",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg 
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50" id="testimonials">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how SaaSPro has helped businesses of all sizes improve their workflows and achieve their goals.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto relative" ref={sliderRef}>
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="flex items-center space-x-2 mb-6">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-8">
                      "{testimonial.content}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-600">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevSlide} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 focus:outline-none z-10"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 focus:outline-none z-10"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 mx-1 rounded-full transition-all ${
                activeIndex === index ? 'bg-primary scale-125' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;