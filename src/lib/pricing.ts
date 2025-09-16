// src/lib/pricing.ts
export type PlanId = 'starter' | 'pro';
export type Cadence = 'annual' | 'monthly';

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