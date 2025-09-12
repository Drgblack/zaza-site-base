// Input validation and sanitization utilities
import DOMPurify from 'isomorphic-dompurify';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedValue?: string;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  customError?: string;
}

export class InputValidator {
  private static sanitizeHtml(input: string): string {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true,
    });
  }

  static validateText(
    value: string, 
    rules: ValidationRule = {},
    fieldName: string = 'Field'
  ): ValidationResult {
    const errors: string[] = [];
    let sanitizedValue = value;

    // Sanitize HTML content
    if (typeof value === 'string') {
      sanitizedValue = this.sanitizeHtml(value.trim());
    }

    // Required validation
    if (rules.required && (!sanitizedValue || sanitizedValue.length === 0)) {
      errors.push(`${fieldName} is required`);
    }

    // Length validation
    if (sanitizedValue) {
      if (rules.minLength && sanitizedValue.length < rules.minLength) {
        errors.push(`${fieldName} must be at least ${rules.minLength} characters`);
      }

      if (rules.maxLength && sanitizedValue.length > rules.maxLength) {
        errors.push(`${fieldName} must be no more than ${rules.maxLength} characters`);
      }

      // Pattern validation
      if (rules.pattern && !rules.pattern.test(sanitizedValue)) {
        errors.push(`${fieldName} format is invalid`);
      }

      // Custom validation
      if (rules.custom && !rules.custom(sanitizedValue)) {
        errors.push(rules.customError || `${fieldName} is invalid`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: errors.length === 0 ? sanitizedValue : undefined,
    };
  }

  static validateEmail(email: string): ValidationResult {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.validateText(email, {
      required: true,
      pattern: emailPattern,
      maxLength: 254,
    }, 'Email');
  }

  static validateName(name: string): ValidationResult {
    return this.validateText(name, {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s\-']+$/,
    }, 'Name');
  }

  static validatePassword(password: string): ValidationResult {
    const errors: string[] = [];
    
    if (!password) {
      errors.push('Password is required');
    } else {
      if (password.length < 8) {
        errors.push('Password must be at least 8 characters');
      }
      if (!/(?=.*[a-z])/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (!/(?=.*\d)/.test(password)) {
        errors.push('Password must contain at least one number');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: errors.length === 0 ? password : undefined,
    };
  }

  static validateUrl(url: string): ValidationResult {
    const urlPattern = /^https?:\/\/.+/;
    return this.validateText(url, {
      pattern: urlPattern,
      maxLength: 2048,
    }, 'URL');
  }

  static validatePhone(phone: string): ValidationResult {
    const phonePattern = /^[+]?[1-9][\d]{0,15}$/;
    return this.validateText(phone.replace(/\s/g, ''), {
      pattern: phonePattern,
      minLength: 10,
      maxLength: 15,
    }, 'Phone number');
  }

  static sanitizeUserInput(input: string): string {
    return this.sanitizeHtml(input.trim());
  }

  static validateFormData(data: Record<string, any>): Record<string, ValidationResult> {
    const results: Record<string, ValidationResult> = {};
    
    for (const [field, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        results[field] = this.validateText(value, {}, field);
      }
    }
    
    return results;
  }
}

// Common validation rules
export const VALIDATION_RULES = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 254,
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s\-']+$/,
  },
  password: {
    required: true,
    minLength: 8,
    custom: (value: string) => {
      return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value);
    },
    customError: 'Password must contain uppercase, lowercase, and number',
  },
  url: {
    pattern: /^https?:\/\/.+/,
    maxLength: 2048,
  },
  phone: {
    pattern: /^[+]?[1-9][\d]{0,15}$/,
    minLength: 10,
    maxLength: 15,
  },
} as const;


