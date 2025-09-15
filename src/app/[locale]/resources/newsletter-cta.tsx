'use client';

import { useState, useEffect } from 'react';
import { Users, CheckCircle } from 'lucide-react';

interface NewsletterCTAProps {
  locale: string;
}

export function NewsletterCTA({ locale }: NewsletterCTAProps) {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // Check if user was redirected after successful subscription
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('subscribed') === 'true') {
      setSubscribed(true);
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

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
          action={process.env.NEXT_PUBLIC_NEWSLETTER_ACTION || "/api/newsletter"}
          method="POST"
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full sm:w-80 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none"
            aria-label="Email address"
          />
          <input type="hidden" name="locale" value={locale} />
          <button
            type="submit"
            className="rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg whitespace-nowrap"
          >
            <Users className="w-5 h-5 mr-2 inline" />
            Join Our Community
          </button>
        </form>
      </div>
    </section>
  );
}