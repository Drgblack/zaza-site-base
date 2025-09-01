// Stripe configuration and utilities
export const stripeConfig = {
  checkoutUrls: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_MONTHLY || '',
    yearly: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_YEARLY || '',
    school: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_SCHOOL || '',
  },
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  secretKey: process.env.STRIPE_SECRET_KEY || '',
};

export const redirectToCheckout = (planType: 'monthly' | 'yearly' | 'school') => {
  const url = stripeConfig.checkoutUrls[planType];
  if (url) {
    window.open(url, '_blank');
  } else {
    console.error(`Stripe checkout URL not configured for plan: ${planType}`);
  }
};