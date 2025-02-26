// Email validation
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Password validation - requires at least 8 characters, one uppercase, one lowercase and one number
export const validatePassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
};

// Phone number validation - basic format check
export const validatePhone = (phone) => {
  const re = /^\+?[1-9]\d{9,14}$/;
  return re.test(phone);
};

// URL validation
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
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
