// Utility function to scroll to a specific section by ID
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  
  if (element) {
    // Get the height of the sticky header (if any)
    const header = document.querySelector('header');
    const offset = header ? header.offsetHeight : 0;
    
    // Calculate position with offset
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset - 20; // Extra 20px for breathing room
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Utility function to scroll to the top of the page
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Detects if an element is in the viewport
 * @param {HTMLElement} element - The element to check
 * @param {number} offset - Offset to apply to the calculation
 * @returns {boolean} - Whether the element is in the viewport
 */
export const isElementInViewport = (element, offset = 0) => {
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top >= 0 - offset &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
