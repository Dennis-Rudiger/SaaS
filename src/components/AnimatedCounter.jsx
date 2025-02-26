import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const startTime = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      observer.disconnect();
    };
  }, [end]);

  const startAnimation = () => {
    startTime.current = Date.now();
    animate();
  };

  const easeOutQuad = (t) => t * (2 - t);

  const animate = () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime.current;
    const progress = Math.min(elapsedTime / duration, 1);
    const easedProgress = easeOutQuad(progress);
    const currentCount = Math.floor(easedProgress * end);

    setCount(currentCount);

    if (progress < 1) {
      frameRef.current = requestAnimationFrame(animate);
    } else {
      setCount(end);
    }
  };

  return (
    <div ref={countRef} className="inline-block">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

export default AnimatedCounter;
