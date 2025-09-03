interface EmailCTA2Props {
  variant: "newsletter" | "product";
}

export default function EmailCTA2({ variant }: EmailCTA2Props) {
  if (variant === "newsletter") {
    return (
      <div className="not-prose my-10 rounded-2xl border-2 border-purple-200 bg-purple-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-purple-900">
          Get AI teaching tips in your inbox
        </h3>
        <p className="mt-2 text-sm text-purple-700">
          Join thousands of educators getting weekly AI insights and practical classroom strategies.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors">
            Subscribe
          </button>
        </div>
        <p className="mt-2 text-xs text-purple-600">
          No spam, unsubscribe anytime.
        </p>
      </div>
    );
  }

  return (
    <div className="not-prose my-10 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
      <h3 className="text-xl font-bold">
        Ready to transform your teaching with AI?
      </h3>
      <p className="mt-3 text-blue-100">
        Get personalized lesson plans, instant feedback tools, and time-saving templates designed specifically for educators.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white transition-colors">
          Try Zaza Free
        </button>
        <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white transition-colors">
          View Pricing
        </button>
      </div>
    </div>
  );
}