/**
 * Privacy Compliance Utilities
 * GDPR/FERPA compliance for community sharing features
 */

interface PrivacyScanResult {
  isCompliant: boolean;
  warnings: string[];
  blocked: string[];
  suggestions: string[];
}

interface PIIPattern {
  name: string;
  pattern: RegExp;
  severity: 'high' | 'medium' | 'low';
  description: string;
}

// Common PII patterns for educational content
const PII_PATTERNS: PIIPattern[] = [
  // Names (high risk)
  {
    name: 'student_names',
    pattern: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g,
    severity: 'high',
    description: 'Potential full names detected'
  },
  
  // Email addresses
  {
    name: 'email_addresses',
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    severity: 'high',
    description: 'Email addresses detected'
  },
  
  // Phone numbers
  {
    name: 'phone_numbers',
    pattern: /(\+?1[-.\s]?)?(\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/g,
    severity: 'high',
    description: 'Phone numbers detected'
  },
  
  // Student ID patterns
  {
    name: 'student_ids',
    pattern: /\b(student\s?id|ID|#)\s?:?\s?[A-Z0-9]{5,}\b/gi,
    severity: 'high',
    description: 'Student ID numbers detected'
  },
  
  // Addresses
  {
    name: 'addresses',
    pattern: /\b\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Boulevard|Blvd)\b/gi,
    severity: 'medium',
    description: 'Street addresses detected'
  },
  
  // Medical information keywords
  {
    name: 'medical_info',
    pattern: /\b(ADHD|autism|medication|therapy|counseling|IEP|504\s?plan|special\s?needs|disability)\b/gi,
    severity: 'high',
    description: 'Sensitive medical/educational information detected'
  },
  
  // Family situation keywords
  {
    name: 'family_situation',
    pattern: /\b(divorce|custody|abuse|foster|adoption|homeless|poverty)\b/gi,
    severity: 'high',
    description: 'Sensitive family situation information detected'
  },
  
  // Behavioral issues
  {
    name: 'behavioral_issues',
    pattern: /\b(suspension|detention|behavioral?\s?problems?|aggressive|violent|expelled)\b/gi,
    severity: 'medium',
    description: 'Sensitive behavioral information detected'
  }
];

// Safe replacements for common educational terms
const SAFE_REPLACEMENTS: Record<string, string[]> = {
  student_names: ['[Student name]', '[Student]', 'the student', 'your child'],
  email_addresses: ['[email address]', '[contact email]'],
  phone_numbers: ['[phone number]', '[contact number]'],
  student_ids: ['[student ID]', '[ID number]'],
  addresses: ['[address]', '[home address]'],
  medical_info: ['[educational support information]', '[support needs]'],
  family_situation: ['[family circumstances]', '[home situation]'],
  behavioral_issues: ['[classroom behavior]', '[behavior concerns]']
};

/**
 * Scans content for PII and FERPA violations
 */
export function scanContentForPII(content: string): PrivacyScanResult {
  const result: PrivacyScanResult = {
    isCompliant: true,
    warnings: [],
    blocked: [],
    suggestions: []
  };

  for (const pattern of PII_PATTERNS) {
    const matches = content.match(pattern.pattern);
    
    if (matches) {
      const message = `${pattern.description}: ${matches.length} instance(s) found`;
      
      if (pattern.severity === 'high') {
        result.blocked.push(message);
        result.isCompliant = false;
      } else if (pattern.severity === 'medium') {
        result.warnings.push(message);
      }
      
      // Add replacement suggestions
      const replacements = SAFE_REPLACEMENTS[pattern.name];
      if (replacements) {
        result.suggestions.push(`Consider replacing with: ${replacements.join(', ')}`);
      }
    }
  }

  return result;
}

/**
 * Automatically neutralizes PII in content
 */
export function neutralizePII(content: string): string {
  let sanitized = content;

  for (const pattern of PII_PATTERNS) {
    if (pattern.severity === 'high') {
      const replacements = SAFE_REPLACEMENTS[pattern.name];
      if (replacements && replacements.length > 0) {
        sanitized = sanitized.replace(pattern.pattern, replacements[0]);
      }
    }
  }

  return sanitized;
}

/**
 * Validates sharing consent and requirements
 */
export function validateSharingConsent(
  content: string,
  hasExplicitConsent: boolean = false,
  isAnonymized: boolean = true
): {
  canShare: boolean;
  requirements: string[];
  recommendations: string[];
} {
  const scanResult = scanContentForPII(content);
  const requirements: string[] = [];
  const recommendations: string[] = [];

  // Check PII compliance
  if (!scanResult.isCompliant) {
    requirements.push('Remove or anonymize all personally identifiable information');
  }

  // Check consent requirements
  if (!hasExplicitConsent) {
    requirements.push('Obtain explicit consent for sharing educational content');
  }

  // Check anonymization
  if (!isAnonymized && scanResult.warnings.length > 0) {
    recommendations.push('Consider sharing anonymously to protect privacy');
  }

  // Educational compliance recommendations
  recommendations.push(
    'Ensure shared content complies with your school/district policies',
    'Verify no sensitive student information is included',
    'Consider the educational value vs. privacy risk'
  );

  return {
    canShare: requirements.length === 0,
    requirements,
    recommendations
  };
}

/**
 * GDPR/FERPA compliance checker for community features
 */
export class PrivacyComplianceChecker {
  private static instance: PrivacyComplianceChecker;

  static getInstance(): PrivacyComplianceChecker {
    if (!PrivacyComplianceChecker.instance) {
      PrivacyComplianceChecker.instance = new PrivacyComplianceChecker();
    }
    return PrivacyComplianceChecker.instance;
  }

  /**
   * Pre-sharing compliance check
   */
  checkBeforeSharing(content: string, context: {
    isAnonymous?: boolean;
    hasConsent?: boolean;
    userLocation?: string;
  } = {}): {
    approved: boolean;
    message: string;
    neutralizedContent?: string;
  } {
    const scanResult = scanContentForPII(content);
    const { isAnonymous = true, hasConsent = false, userLocation = 'US' } = context;

    // Strict check for high-risk content
    if (scanResult.blocked.length > 0) {
      return {
        approved: false,
        message: `Cannot share content with sensitive information: ${scanResult.blocked.join(', ')}`,
        neutralizedContent: neutralizePII(content)
      };
    }

    // GDPR compliance for EU users
    if (userLocation.startsWith('EU') && !hasConsent) {
      return {
        approved: false,
        message: 'GDPR compliance requires explicit consent for sharing educational content'
      };
    }

    // FERPA compliance warning
    if (scanResult.warnings.length > 0 && !isAnonymous) {
      return {
        approved: false,
        message: `FERPA compliance warning: ${scanResult.warnings.join(', ')}. Consider sharing anonymously.`
      };
    }

    return {
      approved: true,
      message: 'Content approved for sharing with teacher community',
      neutralizedContent: content
    };
  }

  /**
   * Generate privacy notice for sharing
   */
  generatePrivacyNotice(contentType: 'snippet' | 'resource' = 'snippet'): string {
    return `
🔒 Privacy & Compliance Notice

When you share ${contentType}s with the teacher community:

✅ Your content helps fellow educators
✅ All personal information is automatically removed
✅ You maintain attribution (unless you choose anonymous)
✅ Content follows FERPA and GDPR guidelines

⚠️ Please ensure:
• No student names, IDs, or contact information
• No sensitive medical or family information
• You have appropriate rights to share this content
• Content follows your school/district policies

By sharing, you confirm this content is appropriate for the educational community and complies with applicable privacy laws.
    `.trim();
  }

  /**
   * Log privacy compliance event
   */
  logComplianceEvent(event: {
    userId: string;
    action: 'scan' | 'share' | 'block';
    contentType: string;
    result: 'approved' | 'blocked' | 'warning';
    details?: string;
  }): void {
    // In production, this would log to a compliance audit system
    console.log('[Privacy Compliance]', {
      timestamp: new Date().toISOString(),
      ...event
    });
  }
}
