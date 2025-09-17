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

// New suite-based pricing structure with billing cycles (simplified for Teacher Suite focus)
export type BillingCycle = 'annual' | 'monthly';

export const SUITE_PRICING: Record<SuiteKey, Record<BillingCycle, {
  plans: {
    starter: { 
      price: number; 
      priceSuffix: string;
      ctaHref: string; 
    };
    pro: { 
      price: number; 
      priceSuffix: string;
      ctaHref: string; 
    };
  };
}>> = {
  teacher: {
    annual: {
      plans: {
        starter: {
          price: 99,
          priceSuffix: '/year',
          ctaHref: '/checkout?product=teacher-starter-annual'
        },
        pro: {
          price: 149,
          priceSuffix: '/year',
          ctaHref: '/checkout?product=teacher-pro-annual'
        }
      }
    },
    monthly: {
      plans: {
        starter: {
          price: 9.99,
          priceSuffix: '/month',
          ctaHref: '/checkout?product=teacher-starter-monthly'
        },
        pro: {
          price: 14.99,
          priceSuffix: '/month',
          ctaHref: '/checkout?product=teacher-pro-monthly'
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
          ctaHref: '/checkout?product=close-starter-annual'
        },
        pro: {
          price: 348,
          priceSuffix: '/year',
          ctaHref: '/checkout?product=close-pro-annual'
        }
      }
    },
    monthly: {
      plans: {
        starter: {
          price: 14.99,
          priceSuffix: '/month',
          ctaHref: '/checkout?product=close-starter-monthly'
        },
        pro: {
          price: 29,
          priceSuffix: '/month',
          ctaHref: '/checkout?product=close-pro-monthly'
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