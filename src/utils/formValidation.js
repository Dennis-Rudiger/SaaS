/**
 * Validates email format
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if the email format is valid
 */
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates password strength
 * @param {string} password - The password to validate
 * @returns {boolean} - True if the password meets strength requirements
 */
export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return re.test(password);
};

/**
 * Validates a URL format
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if the URL format is valid
 */
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Validates phone number format
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - True if the phone number format is valid
 */
export const validatePhone = (phone) => {
  // Basic phone validation - adjust as needed for your requirements
  const re = /^\+?[0-9]{10,15}$/;
  return re.test(phone.replace(/[\s()\-]/g, ''));
};

/**
 * Checks if a string is empty or only contains whitespace
 * @param {string} value - The string to check
 * @returns {boolean} - True if the string is not empty
 */
export const isNotEmpty = (value) => {
  return value.trim().length > 0;
};

/**
 * Validates file size
 * @param {File} file - The file to validate
 * @param {number} maxSizeMB - Maximum file size in MB
 * @returns {boolean} - True if the file size is valid
 */
export const validateFileSize = (file, maxSizeMB) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Validates file type
 * @param {File} file - The file to validate
 * @param {Array<string>} allowedTypes - Array of allowed MIME types
 * @returns {boolean} - True if the file type is allowed
 */
export const validateFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

// Required field validation
export const validateRequired = (value) => {
  return value && value.trim() !== '';
};

// Min length validation
export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

// Max length validation
export const validateMaxLength = (value, maxLength) => {
  return value && value.length <= maxLength;
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};
  
  Object.keys(validationRules).forEach((field) => {
    const value = formData[field];
    const rules = validationRules[field];
    
    if (rules.required && !validateRequired(value)) {
      errors[field] = rules.requiredMessage || 'This field is required';
      return;
    }
    
    if (rules.email && value && !validateEmail(value)) {
      errors[field] = rules.emailMessage || 'Please enter a valid email address';
      return;
    }
    
    if (rules.minLength && value && !validateMinLength(value, rules.minLength)) {
      errors[field] = rules.minLengthMessage || `Must be at least ${rules.minLength} characters`;
      return;
    }
    
    if (rules.maxLength && value && !validateMaxLength(value, rules.maxLength)) {
      errors[field] = rules.maxLengthMessage || `Must be less than ${rules.maxLength} characters`;
      return;
    }
    
    if (rules.password && value && !validatePassword(value)) {
      errors[field] = rules.passwordMessage || 'Password must be at least 8 characters, with uppercase, lowercase and number';
      return;
    }
    
    if (rules.phone && value && !validatePhone(value)) {
      errors[field] = rules.phoneMessage || 'Please enter a valid phone number';
      return;
    }
    
    if (rules.url && value && !validateURL(value)) {
      errors[field] = rules.urlMessage || 'Please enter a valid URL';
      return;
    }
    
    if (rules.match && formData[rules.match] !== value) {
      errors[field] = rules.matchMessage || `Does not match ${rules.match}`;
      return;
    }
    
    if (rules.custom && !rules.custom(value)) {
      errors[field] = rules.customMessage || 'Invalid value';
      return;
    }
  });
  
  return errors;
};
