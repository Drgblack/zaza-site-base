"use client";

import { useState } from "react";
import { CheckCircle, Mail, Sparkles, Loader2, AlertCircle, Gift } from "lucide-react";

declare global {
  interface Window {
    gtag?: (event: string, action: string, params?: Record<string, unknown>) => void;
  }
}

interface EmailCaptureFormProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  source?: string;
  tags?: string[];
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "hero" | "sidebar" | "footer";
}

export function EmailCaptureForm({
  title = "Get Free AI Teaching Resources",
  subtitle = "Join 12,000+ teachers saving 5+ hours per week with AI-powered tools.",
  placeholder = "Enter your email address",
  buttonText = "Get Free Resources",
  source = "homepage_signup",
  tags = ["homepage", "lead_magnet"],
  className = "",
  size = "md",
  variant = "default",
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }
    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          name: firstName + (lastName ? ` ${lastName}` : "") || undefined,
          source,
          tags: [...tags, "email_capture_form"],
        }),
      });

      const data: { ok?: boolean; error?: string } = await res.json();

      if (res.ok && data?.ok) {
        setStatus("success");
        setMessage("?? Success! Check your email for your free resources.");
        setEmail("");
        setFirstName("");
        setLastName("");

        // Optional analytics
        if (typeof window !== "undefined") {
          window.gtag?.("event", "email_capture", {
            event_category: "engagement",
            event_label: source,
            value: 1,
          });
        }
      } else {
        setStatus("error");
        setMessage(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sizeClasses = {
    sm: "text-sm space-y-3",
    md: "text-base space-y-4",
    lg: "text-lg space-y-6",
  };

  const variantClasses = {
    default: "bg-white border border-gray-200 rounded-lg shadow-sm",
    hero: "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl shadow-lg",
    sidebar: "bg-gray-50 border border-gray-200 rounded-lg",
    footer: "bg-transparent border-0",
  };

  if (status === "success") {
    return (
      <div className={`${variantClasses[variant]} p-6 text-center ${className}`}>
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome to the AI Teaching Revolution! ??</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200"
            onClick={() => window.open("/free-resources", "_blank")}
          >
            <Gift className="w-4 h-4 mr-2 inline" />
            View Free Resources
          </button>
          <button
            className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-all duration-200"
            onClick={() => {
              setStatus("idle");
              setMessage("");
            }}
          >
            Subscribe Another Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${variantClasses[variant]} p-6 ${sizeClasses[size]} ${className}`}>
      {/* Header */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">100% Free</span>
        </div>
        <h3
          className={`font-bold text-gray-800 mb-2 ${
            size === "lg" ? "text-2xl" : size === "md" ? "text-xl" : "text-lg"
          }`}
        >
          {title}
        </h3>
        <p className={`text-gray-600 ${size === "lg" ? "text-lg" : size === "md" ? "text-base" : "text-sm"}`}>
          {subtitle}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {variant === "hero" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First name (optional)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isSubmitting}
            />
            <input
              type="text"
              placeholder="Last name (optional)"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !email}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2 inline" />
                {buttonText}
              </>
            )}
          </button>
        </div>

        {/* Status Messages */}
        {status === "error" && (
          <div className="flex items-center text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>{message}</span>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span>No spam, ever</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span>Unsubscribe anytime</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span>12,000+ teachers trust us</span>
          </div>
        </div>
      </form>

      {/* Social Proof */}
      {variant === "hero" && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-3">Trusted by teachers at leading schools:</p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-500">
            <span>Stanford Elementary</span>
            <span>•</span>
            <span>NYC Public Schools</span>
            <span>•</span>
            <span>London International</span>
            <span>•</span>
            <span>Sydney Grammar</span>
          </div>
        </div>
      )}
    </div>
  );
}
