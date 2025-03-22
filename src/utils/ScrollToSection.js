/**
 * Smoothly scrolls to the specified section on the page
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {Object} options - Scroll options (behavior, offset, etc.)
 */
export const scrollToSection = (sectionId, options = {}) => {
  // Handle case when sectionId includes the hash prefix
  const cleanId = sectionId.startsWith('#') ? sectionId.substring(1) : sectionId;
  const cleanId2 = cleanId.startsWith('/') ? cleanId.substring(1) : cleanId;
  
  const section = document.getElementById(cleanId2);
  
  if (section) {
    const defaultOptions = { 
      behavior: 'smooth',
      offset: 0
    };
    
    const scrollOptions = { ...defaultOptions, ...options };
    
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - scrollOptions.offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: scrollOptions.behavior
    });
    
    return true;
  } else if (window.location.pathname !== '/') {
    // If not on the home page and section not found, redirect to home with anchor
    window.location.href = `/#${cleanId2}`;
    return true;
  }
  
  return false;
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

/**
 * Handles navigation links that point to page sections
 * Works with both same-page links and cross-page links
 * @param {Event} e - The click event
 * @param {string} href - The href attribute of the link
 */
export const handleSectionLink = (e, href) => {
  // If it's an anchor link
  if (href.startsWith('/#') || href.startsWith('#')) {
    e.preventDefault();
    
    // Get the element ID without the '/#' or '#'
    const sectionId = href.replace(/^\/?#/, '');
    
    // Check if we're on the landing page
    if (window.location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      // Navigate to landing page with the anchor
      window.location.href = href.startsWith('#') ? `/${href}` : href;
    }
    
    return true;
  }
  
  return false;
};
