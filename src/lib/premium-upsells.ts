export interface PremiumPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
    currency: string;
  };
  features: string[];
  benefits: string[];
  targetAudience: string[];
  upsellTriggers: string[];
  conversionRate: number;
  priority: number;
}

export interface FamilyPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
    currency: string;
    perMember: number;
  };
  maxMembers: number;
  features: string[];
  benefits: string[];
  targetAudience: string[];
  upsellTriggers: string[];
  conversionRate: number;
  priority: number;
}

export const premiumPlans: PremiumPlan[] = [
  {
    id: 'zaza-pro-pack',
    name: 'Zaza Pro Pack',
    description: 'Advanced AI tools for experienced educators who want to maximize their efficiency',
    price: {
      monthly: 24.99,
      annual: 199.99,
      currency: 'EUR'
    },
    features: [
      'Unlimited AI-powered lesson planning',
      'Advanced parent communication templates',
      'Custom assessment generators',
      'Priority support and onboarding',
      'Advanced analytics and insights',
      'Team collaboration tools',
      'Custom branding options',
      'API access for integrations',
      'White-label solutions',
      'Dedicated success manager'
    ],
    benefits: [
      'Save 10+ hours weekly on administrative tasks',
      'Access to premium templates and resources',
      'Advanced customization options',
      'Priority customer support',
      'Exclusive training and workshops'
    ],
    targetAudience: [
      'Experienced teachers (5+ years)',
      'Department heads and coordinators',
      'Private school educators',
      'Educational consultants',
      'Teacher trainers'
    ],
    upsellTriggers: [
      'High usage of basic features',
      'Multiple class management',
      'Advanced customization requests',
      'Team collaboration needs',
      'Integration requirements'
    ],
    conversionRate: 0.15,
    priority: 1
  },
  {
    id: 'zaza-enterprise',
    name: 'Zaza Enterprise',
    description: 'Comprehensive solution for schools and districts with advanced security and compliance',
    price: {
      monthly: 49.99,
      annual: 499.99,
      currency: 'EUR'
    },
    features: [
      'Everything in Pro Pack',
      'School-wide deployment',
      'Advanced security and compliance',
      'Custom integrations',
      'Data analytics and reporting',
      'Professional development tracking',
      'Parent portal integration',
      'SIS integration',
      'Custom training programs',
      'Dedicated account manager'
    ],
    benefits: [
      'Streamline school-wide communication',
      'Ensure data security and compliance',
      'Track professional development',
      'Improve parent engagement',
      'Reduce administrative overhead'
    ],
    targetAudience: [
      'School administrators',
      'District technology coordinators',
      'Private school networks',
      'Educational organizations',
      'Government education departments'
    ],
    upsellTriggers: [
      'Multiple teacher accounts',
      'Security compliance requirements',
      'Integration with existing systems',
      'School-wide deployment needs',
      'Advanced reporting requirements'
    ],
    conversionRate: 0.08,
    priority: 2
  }
];

export const familyPlans: FamilyPlan[] = [
  {
    id: 'zaza-family-plan',
    name: 'Zaza Family Plan',
    description: 'Perfect for families with multiple educators or homeschooling parents',
    price: {
      monthly: 34.99,
      annual: 299.99,
      currency: 'EUR',
      perMember: 8.75
    },
    maxMembers: 4,
    features: [
      'Up to 4 teacher accounts',
      'Shared resource library',
      'Family collaboration tools',
      'Unified billing and management',
      'Cross-account resource sharing',
      'Family-specific templates',
      'Shared lesson planning',
      'Unified progress tracking',
      'Family communication tools',
      'Bulk resource downloads'
    ],
    benefits: [
      'Save money with family pricing',
      'Share resources and best practices',
      'Collaborate on lesson planning',
      'Unified family communication',
      'Streamlined billing and management'
    ],
    targetAudience: [
      'Families with multiple teachers',
      'Homeschooling families',
      'Teacher couples',
      'Educational families',
      'Small educational groups'
    ],
    upsellTriggers: [
      'Multiple family members using the platform',
      'Shared resource needs',
      'Collaborative teaching requirements',
      'Family communication needs',
      'Cost optimization requests'
    ],
    conversionRate: 0.12,
    priority: 1
  },
  {
    id: 'zaza-team-plan',
    name: 'Zaza Team Plan',
    description: 'Collaborative solution for teaching teams and small schools',
    price: {
      monthly: 79.99,
      annual: 799.99,
      currency: 'EUR',
      perMember: 13.33
    },
    maxMembers: 6,
    features: [
      'Up to 6 teacher accounts',
      'Team collaboration tools',
      'Shared lesson planning',
      'Team resource library',
      'Unified communication',
      'Team analytics and insights',
      'Shared templates and resources',
      'Team training and onboarding',
      'Collaborative assessments',
      'Team performance tracking'
    ],
    benefits: [
      'Enhanced team collaboration',
      'Shared best practices',
      'Unified team communication',
      'Streamlined team management',
      'Improved team performance'
    ],
    targetAudience: [
      'Teaching teams',
      'Small schools',
      'Educational departments',
      'Teacher groups',
      'Educational consultants'
    ],
    upsellTriggers: [
      'Team collaboration needs',
      'Multiple teacher accounts',
      'Shared resource requirements',
      'Team communication needs',
      'Unified team management'
    ],
    conversionRate: 0.10,
    priority: 2
  }
];

// Upsell logic and triggers
export interface UpsellTrigger {
  id: string;
  name: string;
  description: string;
  conditions: {
    usageThreshold: number;
    featureUsage: string[];
    timeOnPlatform: number;
    engagementScore: number;
  };
  recommendedPlan: string;
  message: string;
  priority: number;
}

export const upsellTriggers: UpsellTrigger[] = [
  {
    id: 'high-usage',
    name: 'High Usage Detected',
    description: 'User is actively using the platform and could benefit from advanced features',
    conditions: {
      usageThreshold: 50,
      featureUsage: ['snippet-generation', 'lesson-planning', 'progress-reports'],
      timeOnPlatform: 30,
      engagementScore: 0.7
    },
    recommendedPlan: 'zaza-pro-pack',
    message: 'You\'re getting great value from Zaza! Upgrade to Pro Pack for unlimited access and advanced features.',
    priority: 1
  },
  {
    id: 'team-collaboration',
    name: 'Team Collaboration Needs',
    description: 'User is working with multiple educators and could benefit from team features',
    conditions: {
      usageThreshold: 20,
      featureUsage: ['resource-sharing', 'collaboration'],
      timeOnPlatform: 14,
      engagementScore: 0.6
    },
    recommendedPlan: 'zaza-team-plan',
    message: 'Working with a team? Our Team Plan makes collaboration seamless and cost-effective.',
    priority: 2
  },
  {
    id: 'family-usage',
    name: 'Family Usage Pattern',
    description: 'Multiple family members are using the platform',
    conditions: {
      usageThreshold: 30,
      featureUsage: ['family-communication', 'shared-resources'],
      timeOnPlatform: 21,
      engagementScore: 0.5
    },
    recommendedPlan: 'zaza-family-plan',
    message: 'Multiple educators in your family? Save money with our Family Plan.',
    priority: 3
  },
  {
    id: 'enterprise-needs',
    name: 'Enterprise Requirements',
    description: 'User has enterprise-level needs for security and compliance',
    conditions: {
      usageThreshold: 100,
      featureUsage: ['security', 'compliance', 'integrations'],
      timeOnPlatform: 60,
      engagementScore: 0.8
    },
    recommendedPlan: 'zaza-enterprise',
    message: 'Need enterprise-level features? Our Enterprise plan includes advanced security and compliance.',
    priority: 4
  }
];

// Upsell recommendation engine
export function generateUpsellRecommendation(userData: {
  usageCount: number;
  featuresUsed: string[];
  daysOnPlatform: number;
  engagementScore: number;
  familyMembers?: number;
  teamSize?: number;
}): UpsellTrigger | null {
  const applicableTriggers = upsellTriggers.filter(trigger => {
    const conditions = trigger.conditions;
    
    return (
      userData.usageCount >= conditions.usageThreshold &&
      userData.daysOnPlatform >= conditions.timeOnPlatform &&
      userData.engagementScore >= conditions.engagementScore &&
      conditions.featureUsage.some(feature => userData.featuresUsed.includes(feature))
    );
  });

  if (applicableTriggers.length === 0) return null;

  // Return the highest priority trigger
  return applicableTriggers.sort((a, b) => a.priority - b.priority)[0];
}

// Pricing calculations
export function calculateSavings(plan: PremiumPlan | FamilyPlan, isAnnual: boolean): number {
  const monthlyCost = isAnnual ? plan.price.annual / 12 : plan.price.monthly;
  const standardMonthlyCost = plan.price.monthly;
  
  return ((standardMonthlyCost - monthlyCost) / standardMonthlyCost) * 100;
}

export function getRecommendedPlan(userData: {
  usageCount: number;
  featuresUsed: string[];
  daysOnPlatform: number;
  engagementScore: number;
  familyMembers?: number;
  teamSize?: number;
}): PremiumPlan | FamilyPlan | null {
  const trigger = generateUpsellRecommendation(userData);
  
  if (!trigger) return null;
  
  const allPlans = [...premiumPlans, ...familyPlans];
  return allPlans.find(plan => plan.id === trigger.recommendedPlan) || null;
}

// Conversion optimization
export function optimizeUpsellMessage(trigger: UpsellTrigger, userData: any): string {
  let message = trigger.message;
  
  // Personalize based on usage
  if (userData.usageCount > 100) {
    message = message.replace('You\'re getting great value', 'You\'re a power user!');
  }
  
  // Add urgency for high-engagement users
  if (userData.engagementScore > 0.8) {
    message += ' Limited time offer: 20% off your first year!';
  }
  
  return message;
}
