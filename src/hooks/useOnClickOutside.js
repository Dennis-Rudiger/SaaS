import { useEffect } from 'react';

/**
 * Hook that alerts when you click outside of the passed ref
 * @param {React.RefObject} ref - The ref to detect clicks outside of
 * @param {Function} handler - The function to call when clicked outside
 */
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Return if ref is not set or contains the clicked element
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      // Add event listeners
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      // Clean up event listeners
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler]
  );
}

export default useOnClickOutside;
