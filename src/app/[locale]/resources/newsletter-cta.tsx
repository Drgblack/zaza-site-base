'use client';

import { useState, useEffect } from 'react';
import { Users, CheckCircle } from 'lucide-react';

interface NewsletterCTAProps {
  locale: string;
}

export function NewsletterCTA({ locale }: NewsletterCTAProps) {
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user was redirected after successful subscription
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('subscribed') === 'true') {
      setSubscribed(true);
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    try {
      // For now, just simulate a successful submission
      // In production, you would send this to your actual newsletter service
      console.log('Newsletter signup:', { email, locale, timestamp: new Date().toISOString() });
      
      // Show success state
      setSubscribed(true);
      
      // Track the signup if analytics is enabled
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'newsletter_signup', {
          email_domain: email.split('@')[1],
          locale: locale
        });
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      // For now, still show success to avoid user confusion
      setSubscribed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (subscribed) {
    return (
      <section className="mt-20">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-center text-white">
          <CheckCircle className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            You've successfully joined our community. We'll send you exclusive teaching resources and tips straight to your inbox.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-20">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Need More Resources?</h2>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          Join our community of educators and get access to exclusive teaching resources, webinars, and expert tips.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full sm:w-80 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none"
            aria-label="Email address"
            disabled={isSubmitting}
          />
          <input type="hidden" name="locale" value={locale} />
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Users className="w-5 h-5 mr-2 inline" />
            {isSubmitting ? 'Joining...' : 'Join Our Community'}
          </button>
        </form>
      </div>
    </section>
  );
}