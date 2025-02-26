/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Object containing the validation result and message
 */
export const validatePassword = (password) => {
  // Password must be at least 8 characters
  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long',
    };
  }

  // Password must contain at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter',
    };
  }

  // Password must contain at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter',
    };
  }

  // Password must contain at least one number
  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number',
    };
  }

  // Password must contain at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one special character',
    };
  }

  return {
    isValid: true,
    message: 'Password is strong',
  };
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
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
export const validatePhone = (phone) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(String(phone));
};

/**
 * Checks if a string is empty or only contains whitespace
 * @param {string} value - The string to check
 * @returns {boolean} - True if the string is not empty
 */
export const isNotEmpty = (value) => {
  return value !== undefined && value !== null && value.trim() !== '';
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
    
    if (rules.password && value && !validatePassword(value).isValid) {
      errors[field] = rules.passwordMessage || validatePassword(value).message;
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

/**
 * Validates a form field based on its type
 * @param {string} type - Type of validation to perform
 * @param {any} value - Value to validate
 * @returns {Object} - Object containing the validation result and message
 */
export const validateField = (type, value) => {
  switch (type) {
    case 'email':
      return {
        isValid: validateEmail(value),
        message: validateEmail(value) ? '' : 'Please enter a valid email address',
      };
    case 'password':
      return validatePassword(value);
    case 'required':
      return {
        isValid: isNotEmpty(value),
        message: isNotEmpty(value) ? '' : 'This field is required',
      };
    case 'phone':
      return {
        isValid: validatePhone(value),
        message: validatePhone(value) ? '' : 'Please enter a valid phone number',
      };
    case 'url':
      return {
        isValid: validateURL(value),
        message: validateURL(value) ? '' : 'Please enter a valid URL',
      };
    default:
      return { isValid: true, message: '' };
  }
};
