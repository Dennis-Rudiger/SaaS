/**
 * Smoothly scrolls to a section by ID with an offset for fixed headers
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} offset - The offset from the top (default: 80px for header)
 */
export const scrollToSection = (sectionId, offset = 80) => {
  const section = document.getElementById(sectionId);
  
  if (section) {
    const yCoordinate = section.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -offset;
    
    window.scrollTo({
      top: yCoordinate + yOffset,
      behavior: 'smooth'
    });
  }
};

/**
 * Scrolls to the top of the page
 * @param {boolean} smooth - Whether to scroll smoothly or jump
 */
export const scrollToTop = (smooth = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
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
