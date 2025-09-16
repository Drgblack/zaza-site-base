export interface PricingTier {
  name: string;
  annualPrice: number;
  monthlyPrice: number;
  annualEffectiveMonthly: number;
  features: string[];
  badge?: string;
  popular?: boolean;
}

export interface PricingConfig {
  tiers: PricingTier[];
  footnotes: string[];
  benefits: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

export const pricingConfig: PricingConfig = {
  tiers: [
    {
      name: "Starter",
      annualPrice: 99,
      monthlyPrice: 14.99,
      annualEffectiveMonthly: 8.25,
      features: [
        "Comment Coach",
        "Tone and translation",
        "Light AutoPlanner caps",
        "Export to DOC/PDF",
        "Classroom memory basic"
      ],
      popular: false
    },
    {
      name: "Pro",
      annualPrice: 149,
      monthlyPrice: 19.99,
      annualEffectiveMonthly: 12.42,
      features: [
        "Full AutoPlanner",
        "Unit libraries",
        "Curriculum packs",
        "Batch exports",
        "Priority runs",
        "Shared templates"
      ],
      badge: "Best value",
      popular: true
    }
  ],
  footnotes: [
    "Prices excl. VAT",
    "Billed annually for annual plans",
    "Cancel anytime"
  ],
  benefits: [
    "Minutes to quality comments",
    "Plans ready to export",
    "Remembers your classes"
  ],
  faq: [
    {
      question: "Can I pay monthly?",
      answer: "Yes. Monthly is available. Annual is the best value for teachers."
    },
    {
      question: "Invoices and reimbursement",
      answer: "Yes. Download invoices. PD budgets supported."
    },
    {
      question: "What happens if I cancel?",
      answer: "You keep access until the end of your period. Drafts remain in your account."
    }
  ]
};

export const closeSuiteUrl = "https://close.com"; // Replace with actual Close URL

export const suites = {
  teacher: {
    badge: 'Annual is best value',
    plans: [
      { 
        id: 'starter', 
        name: 'Starter', 
        price: '€99', 
        cadence: '/year', 
        features: [
          'Comment Coach',
          'Report Bank', 
          'Plan templates',
          'Export to DOC/PDF',
          'Classroom notes locker'
        ] 
      },
      { 
        id: 'pro', 
        name: 'Pro', 
        price: '€149', 
        cadence: '/year', 
        best: true, 
        features: [
          'All Starter features',
          'Full AI Rewriter/Planner',
          'Curriculum packs',
          'Batch exports',
          'Priority updates',
          'Shared templates'
        ] 
      },
    ],
    ctas: { 
      starter: '/signup?plan=teacher-starter', 
      pro: '/signup?plan=teacher-pro' 
    },
  },
  close: {
    badge: 'Monthly available',
    plans: [
      { 
        id: 'close-starter', 
        name: 'Close Agent', 
        price: '€14.99', 
        cadence: '/month', 
        features: [
          'AI communication assistant',
          'Email manager',
          'Browser tool',
          'Unlimited follow-up sequences'
        ] 
      },
      { 
        id: 'close-pro', 
        name: 'Close Suite', 
        price: '€29', 
        cadence: '/month', 
        best: true, 
        features: [
          'All email drafting',
          'CRM integration',
          'Advanced analytics',
          'Priority support'
        ] 
      },
    ],
    ctas: { 
      starter: '/signup?plan=close-agent', 
      pro: '/signup?plan=close-suite' 
    },
  },
} as const;

export type SuiteKey = keyof typeof suites;
export type Plan = typeof suites[SuiteKey]['plans'][number];
