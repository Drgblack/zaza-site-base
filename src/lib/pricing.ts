// src/lib/pricing.ts
export type PlanId = 'starter' | 'pro';
export type Cadence = 'annual' | 'monthly';
export type SuiteKey = 'teacher' | 'close';

// Legacy pricing structure (keep for compatibility)
export const PRICING: Record<Cadence, Record<PlanId, {
  id: PlanId;
  price: number;         // numeric value only
  priceSuffix: '/year' | '/month';
  stripeCheckoutUrl: string;
  badge?: 'best_value' | 'teacher_favorite';
  bullets: string[];
}>> = {
  annual: {
    starter: {
      id: 'starter',
      price: 99,
      priceSuffix: '/year',
      stripeCheckoutUrl: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_ANNUAL_STARTER || '#',
      bullets: [
        'Comment Coach',
        'Report Bank',
        'Plan templates',
        'Export to DOC/PDF',
        'Classroom notes locker',
      ],
    },
    pro: {
      id: 'pro',
      price: 149,
      priceSuffix: '/year',
      stripeCheckoutUrl: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_ANNUAL_PRO || '#',
      badge: 'best_value',
      bullets: [
        'All Starter features',
        'Full AI Rewriter/Planner',
        'Curriculum packs',
        'Batch exports',
        'Priority updates',
        'Shared templates',
      ],
    },
  },
  monthly: {
    // Keep monthly available (values can match current live: 9.99 / 14.99)
    starter: {
      id: 'starter',
      price: 9.99,
      priceSuffix: '/month',
      stripeCheckoutUrl: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_MONTHLY_STARTER || '#',
      bullets: [
        'Comment Coach',
        'Report Bank',
        'Plan templates',
        'Export to DOC/PDF',
        'Classroom notes locker',
      ],
    },
    pro: {
      id: 'pro',
      price: 14.99,
      priceSuffix: '/month',
      stripeCheckoutUrl: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_MONTHLY_PRO || '#',
      bullets: [
        'All Starter features',
        'Full AI Rewriter/Planner',
        'Curriculum packs',
        'Batch exports',
        'Priority updates',
        'Shared templates',
      ],
    },
  },
};

// New suite-based pricing structure with billing cycles
export type BillingCycle = 'annual' | 'monthly';

export const SUITE_PRICING: Record<SuiteKey, Record<BillingCycle, {
  plans: {
    starter: { 
      price: number; 
      priceSuffix: string;
      features: string[]; 
      ctaHref: string; 
      ctaLabel: string; 
    };
    pro: { 
      price: number; 
      priceSuffix: string;
      features: string[]; 
      ctaHref: string; 
      ctaLabel: string; 
    };
  };
}>> = {
  teacher: {
    annual: {
      plans: {
        starter: {
          price: 99,
          priceSuffix: '/year',
          features: [
            'pricing.suites.teacher.features.comment_coach',
            'pricing.suites.teacher.features.report_bank',
            'pricing.suites.teacher.features.plan_templates',
            'pricing.suites.teacher.features.export_docs',
            'pricing.suites.teacher.features.classroom_notes'
          ],
          ctaHref: '/checkout?product=teacher-starter-annual',
          ctaLabel: 'pricing.cta.choose_starter'
        },
        pro: {
          price: 149,
          priceSuffix: '/year',
          features: [
            'pricing.suites.teacher.features.all_starter',
            'pricing.suites.teacher.features.ai_rewriter',
            'pricing.suites.teacher.features.curriculum_packs',
            'pricing.suites.teacher.features.batch_exports',
            'pricing.suites.teacher.features.priority_updates',
            'pricing.suites.teacher.features.shared_templates'
          ],
          ctaHref: '/checkout?product=teacher-pro-annual',
          ctaLabel: 'pricing.cta.choose_pro'
        }
      }
    },
    monthly: {
      plans: {
        starter: {
          price: 9.99,
          priceSuffix: '/month',
          features: [
            'pricing.suites.teacher.features.comment_coach',
            'pricing.suites.teacher.features.report_bank',
            'pricing.suites.teacher.features.plan_templates',
            'pricing.suites.teacher.features.export_docs',
            'pricing.suites.teacher.features.classroom_notes'
          ],
          ctaHref: '/checkout?product=teacher-starter-monthly',
          ctaLabel: 'pricing.cta.choose_starter'
        },
        pro: {
          price: 14.99,
          priceSuffix: '/month',
          features: [
            'pricing.suites.teacher.features.all_starter',
            'pricing.suites.teacher.features.ai_rewriter',
            'pricing.suites.teacher.features.curriculum_packs',
            'pricing.suites.teacher.features.batch_exports',
            'pricing.suites.teacher.features.priority_updates',
            'pricing.suites.teacher.features.shared_templates'
          ],
          ctaHref: '/checkout?product=teacher-pro-monthly',
          ctaLabel: 'pricing.cta.choose_pro'
        }
      }
    }
  },
  close: {
    annual: {
      plans: {
        starter: {
          price: 179,
          priceSuffix: '/year',
          features: [
            'pricing.suites.close.features.close_agent',
            'pricing.suites.close.features.email_manager',
            'pricing.suites.close.features.browser_tool',
            'pricing.suites.close.features.follow_up_sequences'
          ],
          ctaHref: '/checkout?product=close-starter-annual',
          ctaLabel: 'pricing.cta.choose_starter'
        },
        pro: {
          price: 348,
          priceSuffix: '/year',
          features: [
            'pricing.suites.close.features.all_starter',
            'pricing.suites.close.features.all_email_drafting',
            'pricing.suites.close.features.crm_integration',
            'pricing.suites.close.features.advanced_analytics',
            'pricing.suites.close.features.priority_support'
          ],
          ctaHref: '/checkout?product=close-pro-annual',
          ctaLabel: 'pricing.cta.choose_pro'
        }
      }
    },
    monthly: {
      plans: {
        starter: {
          price: 14.99,
          priceSuffix: '/month',
          features: [
            'pricing.suites.close.features.close_agent',
            'pricing.suites.close.features.email_manager',
            'pricing.suites.close.features.browser_tool',
            'pricing.suites.close.features.follow_up_sequences'
          ],
          ctaHref: '/checkout?product=close-starter-monthly',
          ctaLabel: 'pricing.cta.choose_starter'
        },
        pro: {
          price: 29,
          priceSuffix: '/month',
          features: [
            'pricing.suites.close.features.all_starter',
            'pricing.suites.close.features.all_email_drafting',
            'pricing.suites.close.features.crm_integration',
            'pricing.suites.close.features.advanced_analytics',
            'pricing.suites.close.features.priority_support'
          ],
          ctaHref: '/checkout?product=close-pro-monthly',
          ctaLabel: 'pricing.cta.choose_pro'
        }
      }
    }
  }
};

// Helper functions for pricing display
export function formatPrice(price: number, suffix: string): string {
  return `€${price}${suffix}`;
}

export function getPlan(cadence: Cadence, planId: PlanId) {
  return PRICING[cadence][planId];
}

export function getAllPlans(cadence: Cadence) {
  return Object.values(PRICING[cadence]);
}

// New suite helper functions
export function getSuiteFromSearchParams(searchParams?: { suite?: string }): SuiteKey {
  return searchParams?.suite === 'close' ? 'close' : 'teacher';
}

export function getBillingCycleFromSearchParams(searchParams?: { billing?: string }): BillingCycle {
  return searchParams?.billing === 'monthly' ? 'monthly' : 'annual';
}

export function getSuiteData(suite: SuiteKey, cycle: BillingCycle) {
  return SUITE_PRICING[suite][cycle];
}

export function formatSuitePrice(price: number, suffix: string): string {
  return `€${price}${suffix}`;
}