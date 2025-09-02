// Enhanced Stripe configuration and utilities with EU VAT handling
import { toast } from 'sonner';

export const stripeConfig = {
  checkoutUrls: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_MONTHLY || '',
    yearly: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_YEARLY || '',
    zaraPro: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_ZARA_PRO || '',
    bundle: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_BUNDLE || '',
    school: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_SCHOOL || '',
  },
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  secretKey: process.env.STRIPE_SECRET_KEY || '',
};

export interface CheckoutOptions {
  successUrl?: string;
  cancelUrl?: string;
  customerEmail?: string;
  allowPromotionCodes?: boolean;
  billingAddressCollection?: 'auto' | 'required';
  shippingAddressCollection?: boolean;
  automaticTax?: boolean;
}

export const getCheckoutUrl = (
  planType: 'monthly' | 'yearly' | 'zaraPro' | 'bundle' | 'school',
  options?: CheckoutOptions
): string => {
  const baseUrl = stripeConfig.checkoutUrls[planType];
  
  if (!baseUrl) {
    console.error(`Stripe checkout URL not configured for plan: ${planType}`);
    return '';
  }

  // Add query parameters for enhanced checkout experience
  const url = new URL(baseUrl);
  
  if (options?.successUrl) {
    url.searchParams.set('success_url', options.successUrl);
  }
  
  if (options?.cancelUrl) {
    url.searchParams.set('cancel_url', options.cancelUrl);
  }
  
  if (options?.customerEmail) {
    url.searchParams.set('prefilled_email', options.customerEmail);
  }
  
  if (options?.allowPromotionCodes !== false) {
    url.searchParams.set('allow_promotion_codes', 'true');
  }
  
  // Enable automatic tax calculation for EU VAT compliance
  if (options?.automaticTax !== false) {
    url.searchParams.set('automatic_tax[enabled]', 'true');
  }
  
  // Require billing address for VAT purposes
  if (options?.billingAddressCollection !== 'auto') {
    url.searchParams.set('billing_address_collection', 'required');
  }

  return url.toString();
};

export const redirectToCheckout = (
  planType: 'monthly' | 'yearly' | 'zaraPro' | 'bundle' | 'school',
  options?: CheckoutOptions
) => {
  const url = getCheckoutUrl(planType, {
    successUrl: `${window.location.origin}/checkout/success`,
    cancelUrl: `${window.location.origin}/pricing`,
    allowPromotionCodes: true,
    automaticTax: true,
    billingAddressCollection: 'required',
    ...options,
  });
  
  if (url) {
    // Add loading state feedback
    toast.loading('Redirecting to secure checkout...', { duration: 2000 });
    
    // Track checkout initiation
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        event_category: 'ecommerce',
        event_label: planType,
      });
    }
    
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    toast.error('Checkout is temporarily unavailable. Please try again.');
    console.error(`Stripe checkout URL not configured for plan: ${planType}`);
  }
};

// Enhanced checkout button component props
export interface CheckoutButtonProps {
  planType: 'monthly' | 'yearly' | 'zaraPro' | 'bundle' | 'school';
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  customerEmail?: string;
  onCheckoutStart?: () => void;
  onCheckoutError?: (error: string) => void;
}

// Utility function to detect user's country for VAT handling
export const getUserCountry = async (): Promise<string | null> => {
  try {
    // Try to get country from browser's timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`);
    const data = await response.json();
    return data.country_code || null;
  } catch (error) {
    console.warn('Could not detect user country:', error);
    return null;
  }
};

// EU countries that require VAT handling
export const EU_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
];

export const isEUCountry = (countryCode: string): boolean => {
  return EU_COUNTRIES.includes(countryCode.toUpperCase());
};

// Price display utility with VAT indication
export const formatPriceWithVAT = (
  price: string,
  countryCode?: string,
  includeTaxNote: boolean = true
): string => {
  const isEU = countryCode ? isEUCountry(countryCode) : false;
  
  if (!includeTaxNote) {
    return price;
  }
  
  return isEU 
    ? `${price} (excl. VAT)` 
    : `${price}`;
};

// Trust badges configuration
export const TRUST_BADGES = [
  {
    name: 'Stripe',
    description: 'Secure payments',
    icon: '🔒',
  },
  {
    name: 'SSL',
    description: '256-bit encryption',
    icon: '🛡️',
  },
  {
    name: 'GDPR',
    description: 'Data protection',
    icon: '🇪🇺',
  },
  {
    name: 'Money-back',
    description: '30-day guarantee',
    icon: '💰',
  },
];

// Checkout success tracking
export const trackCheckoutSuccess = (planType: string, amount?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      event_category: 'ecommerce',
      event_label: planType,
      value: amount,
      currency: 'EUR',
    });
  }
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}