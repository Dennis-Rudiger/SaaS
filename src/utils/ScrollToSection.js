/**
 * Smoothly scrolls to a section on the page
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} offset - Offset from the top (useful for fixed headers)
 */
export const scrollToSection = (sectionId, offset = 80) => {
  const section = document.getElementById(sectionId);
  
  if (!section) {
    console.error(`Section with ID "${sectionId}" not found.`);
    return;
  }

  const yCoordinate = section.getBoundingClientRect().top + window.pageYOffset;
  const targetPosition = yCoordinate - offset;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
};
