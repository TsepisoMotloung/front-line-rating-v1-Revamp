// Phone number validation by country code
const PHONE_PATTERNS: Record<string, { regex: RegExp; length: number; description: string }> = {
  default: {
    regex: /^\+?[0-9\s\-\(\)]{10,}$/,
    length: 10,
    description: 'Phone number with at least 10 digits',
  },
  ZA: {
    regex: /^(\+27|0)[0-9]{9}$/,
    length: 10,
    description: 'South African phone (10 digits, starting with 0 or +27)',
  },
  LS: {
    regex: /^(\+266)?[0-9]{8}$/,
    length: 8,
    description: 'Lesotho phone (8 digits or +266 followed by 8 digits)',
  },
  US: {
    regex: /^(\+1)?[0-9]{10}$/,
    length: 10,
    description: 'US phone (10 digits)',
  },
  UK: {
    regex: /^(\+44)?[0-9]{10,11}$/,
    length: 10,
    description: 'UK phone (10-11 digits)',
  },
  AU: {
    regex: /^(\+61)?[0-9]{9,10}$/,
    length: 9,
    description: 'Australian phone (9-10 digits)',
  },
};

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface FormValidationErrors {
  [key: string]: string;
}

/**
 * Validate email format
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  return { isValid: true };
};

/**
 * Validate phone number - auto-detect country format
 */
export const validatePhoneNumber = (
  phoneNumber: string,
  countryCode?: string
): ValidationResult => {
  if (!phoneNumber) {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Remove common separators for validation
  const cleanedPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');

  // If country code is provided, use it
  if (countryCode && PHONE_PATTERNS[countryCode]) {
    const pattern = PHONE_PATTERNS[countryCode];
    if (!pattern.regex.test(phoneNumber)) {
      return {
        isValid: false,
        error: `Invalid phone format. Expected: ${pattern.description}`,
      };
    }
    if (cleanedPhone.replace(/\D/g, '').length < pattern.length) {
      return {
        isValid: false,
        error: `Phone number must have at least ${pattern.length} digits`,
      };
    }
    return { isValid: true };
  }

  // Auto-detect: Try each pattern, prioritizing specific countries over default
  const countriesToTry = ['ZA', 'LS', 'US', 'UK', 'AU', 'default'];
  
  for (const country of countriesToTry) {
    const pattern = PHONE_PATTERNS[country];
    if (pattern.regex.test(phoneNumber)) {
      // Additional check for minimum digits
      const digitCount = cleanedPhone.replace(/\D/g, '').length;
      if (digitCount >= pattern.length) {
        return { isValid: true };
      }
    }
  }

  // If no pattern matched, use default error message
  return {
    isValid: false,
    error: 'Phone number format not recognized. Try international format like +1234567890 or local format.',
  };
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      error: 'Password must be at least 8 characters long',
    };
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one uppercase letter',
    };
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one lowercase letter',
    };
  }

  // Check for at least one number
  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one number',
    };
  }

  return { isValid: true };
};

/**
 * Validate password confirmation
 */
export const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Password confirmation is required' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }

  return { isValid: true };
};

/**
 * Validate name/text field
 */
export const validateName = (name: string, fieldName = 'Name'): ValidationResult => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters long` };
  }

  if (name.length > 100) {
    return { isValid: false, error: `${fieldName} must be less than 100 characters` };
  }

  return { isValid: true };
};

/**
 * Validate employee ID field
 */
export const validateEmployeeId = (employeeId: string): ValidationResult => {
  if (!employeeId) {
    return { isValid: false, error: 'Employee ID is required' };
  }

  if (employeeId.trim().length < 3) {
    return { isValid: false, error: 'Employee ID must be at least 3 characters' };
  }

  if (employeeId.length > 50) {
    return { isValid: false, error: 'Employee ID must be less than 50 characters' };
  }

  return { isValid: true };
};

/**
 * Validate department selection
 */
export const validateDepartmentSelection = (departmentId: string): ValidationResult => {
  if (!departmentId || departmentId.trim().length === 0) {
    return { isValid: false, error: 'Please select a department' };
  }

  return { isValid: true };
};

/**
 * Validate numeric fields (like customer ratings)
 */
export const validateScore = (score: number, min = 1, max = 5): ValidationResult => {
  if (typeof score !== 'number' || isNaN(score)) {
    return { isValid: false, error: 'Invalid score' };
  }

  if (score < min || score > max) {
    return {
      isValid: false,
      error: `Score must be between ${min} and ${max}`,
    };
  }

  return { isValid: true };
};

/**
 * Validate text field length
 */
export const validateTextLength = (
  text: string,
  minLength = 0,
  maxLength = 1000,
  fieldName = 'Text'
): ValidationResult => {
  if (minLength > 0 && (!text || text.trim().length < minLength)) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${minLength} characters`,
    };
  }

  if (text && text.length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName} must be less than ${maxLength} characters`,
    };
  }

  return { isValid: true };
};

/**
 * Get phone pattern info for a country
 */
export const getPhonePatternInfo = (countryCode: string): string => {
  const pattern = PHONE_PATTERNS[countryCode] || PHONE_PATTERNS.default;
  return pattern.description;
};

/**
 * Get all supported country codes
 */
export const getSupportedCountryCodes = (): string[] => {
  return Object.keys(PHONE_PATTERNS).filter(code => code !== 'default');
};
