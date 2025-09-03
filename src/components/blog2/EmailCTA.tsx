"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface EmailCTAProps {
  variant: "newsletter" | "product";
}

export default function EmailCTA({ variant }: EmailCTAProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // TODO: Implement actual newsletter signup
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };
  
  if (variant === "newsletter") {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Get Weekly Teaching Tips
        </h3>
        <p className="text-gray-600 mb-6">
          Join 10,000+ educators receiving practical AI strategies every week
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={status === "loading" || status === "success"}
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {status === "loading" ? "..." : status === "success" ? "✓" : "Subscribe"}
          </button>
        </form>
        
        {status === "success" && (
          <p className="text-green-600 text-sm mt-3">Thanks for subscribing!</p>
        )}
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
      <h3 className="text-3xl font-bold mb-4">
        Ready to Transform Your Teaching with AI?
      </h3>
      <p className="text-lg mb-6 text-white/90">
        Join thousands of educators using Zaza to save hours on administrative tasks
      </p>
      <div className="space-y-4">
        <a
          href="https://app.zazapromptly.com/signup"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg"
        >
          Try Zaza Teach Free
          <ArrowRight className="w-5 h-5" />
        </a>
        <p className="text-sm text-white/80">
          No credit card required • 7-day free trial
        </p>
      </div>
    </div>
  );
}