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
