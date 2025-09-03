"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle } from "lucide-react";

interface EmailCTAProps {
  variant?: "newsletter" | "product";
  className?: string;
}

export default function EmailCTA({ variant = "newsletter", className = "" }: EmailCTAProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const content = {
    newsletter: {
      headline: "Get weekly AI-in-education tips",
      description: "Join 10,000+ educators getting actionable AI strategies, tools, and insights delivered to your inbox.",
      buttonText: "Get Free Tips",
      successMessage: "Thanks! Check your email for confirmation.",
    },
    product: {
      headline: "Ready to save 3+ hours per week?",
      description: "Try Zaza Teach - AI-powered tools that help teachers write better reports, emails, and feedback in minutes.",
      buttonText: "Try Zaza Teach",
      successMessage: "Thanks! We'll be in touch soon.",
    },
  };

  const currentContent = content[variant];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // TODO: Implement actual submission to Brevo/ConvertKit
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
      setEmail("");
      
      // Analytics event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'cta_submit', {
          event_category: 'engagement',
          event_label: variant,
        });
      }
    } catch (error) {
      console.error('CTA submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center ${className}`}>
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-900 mb-2">
          {currentContent.successMessage}
        </h3>
        <p className="text-green-700">
          We'll send you valuable content soon!
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white ${className}`}>
      <h3 className="text-2xl font-bold mb-3">
        {currentContent.headline}
      </h3>
      <p className="text-purple-100 mb-6 max-w-md mx-auto leading-relaxed">
        {currentContent.description}
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 focus:border-white"
        />
        <Button
          type="submit"
          disabled={isSubmitting || !email}
          className="bg-white text-purple-600 hover:bg-gray-100 font-semibold whitespace-nowrap"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              {currentContent.buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
      
      <p className="text-xs text-purple-200 mt-4">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}