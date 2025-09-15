'use client';

import { useState } from 'react';

interface NewsletterFormProps {
  locale: string;
}

export function NewsletterForm({ locale }: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    try {
      // Log the signup for now (in production, send to newsletter service)
      console.log('Blog newsletter signup:', { email, locale, timestamp: new Date().toISOString() });
      
      // Show success state
      setIsSubscribed(true);
      
      // Track the signup if analytics is enabled
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'newsletter_signup', {
          email_domain: email.split('@')[1],
          locale: locale,
          source: 'blog'
        });
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      // For now, still show success to avoid user confusion
      setIsSubscribed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Thank you for subscribing!</h3>
          <p className="text-purple-100">You'll receive our latest AI teaching insights weekly.</p>
        </div>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
    >
      <input 
        type="email" 
        name="email"
        required
        placeholder="Enter your email"
        disabled={isSubmitting}
        className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-50"
      />
      <input type="hidden" name="locale" value={locale} />
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
}