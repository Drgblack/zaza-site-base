import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import { SoftwareApplicationJsonLd, FAQJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Check, Clock, Shield, FileText, MessageCircle, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Zaza Promptly - AI Tool for Teachers",
  description: "Educator-first AI for lesson planning, report comments, and parent communication. Save 3-5 hours/week with GDPR-conscious design and 30-day guarantee.",
  alternates: { canonical: canonical("/tool/zaza-promptly") },
  openGraph: {
    title: "Zaza Promptly - AI Tool for Teachers",
    description: "Educator-first AI for lesson planning, report comments, and parent communication. Save 3-5 hours/week.",
    url: canonical("/tool/zaza-promptly"),
  },
  robots: {
    index: true,
    follow: true,
  },
};

const toolFAQs = [
  {
    question: "Is there a free trial?",
    answer: "Yes—try Zaza Promptly free for 14 days. You're also covered by a 30-day money-back guarantee."
  },
  {
    question: "Is Zaza Promptly GDPR-conscious and safe for schools?",
    answer: "Yes. Zaza Promptly is designed for EU schools and does not store student data. Workflows follow GDPR-conscious practices suitable for education."
  },
  {
    question: "Can I export clean documents?",
    answer: "Absolutely. Export clean DOC/PDF in one click for easy sharing or archiving."
  },
  {
    question: "Does it support different tones and languages?",
    answer: "Yes—choose empathetic, formal, or neutral tone, and translate drafts to many languages while keeping messages parent-friendly."
  },
  {
    question: "How much time do teachers typically save?",
    answer: "Most educators report saving 3–5 hours per week across parent communication and report comments."
  }
];

const breadcrumbItems = [
  { name: "Home", url: canonical("/") },
  { name: "Tools", url: canonical("/tool") },
  { name: "Zaza Promptly", url: canonical("/tool/zaza-promptly") }
];

export default function ZazaPromptlyToolPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-12">
      <SoftwareApplicationJsonLd pageUrl={canonical("/tool/zaza-promptly")} />
      <FAQJsonLd faqs={toolFAQs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Zaza Promptly</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Educator-first AI for lesson planning, report comments, and parent communication
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              🎯 Built for Teachers
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              🔒 GDPR-Conscious
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              ⏰ Save 3-5 Hours/Week
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/pricing" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start 14-Day Free Trial
            </a>
            <a 
              href="/pricing" 
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">What Makes Zaza Promptly Different</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Time Savings</h3>
            <p className="text-muted-foreground">
              Teachers report saving 3-5 hours per week on administrative tasks
            </p>
          </div>
          <div className="text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Privacy-First</h3>
            <p className="text-muted-foreground">
              GDPR-conscious design with no student data storage
            </p>
          </div>
          <div className="text-center">
            <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Educator-Focused</h3>
            <p className="text-muted-foreground">
              Built specifically for classroom needs, not generic AI
            </p>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Zaza Promptly vs Generic AI</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Zaza Promptly</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Generic AI (ChatGPT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Teacher-specific templates</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400">—</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Report comment database</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400">—</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">GDPR-conscious design</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400">—</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">DOC/PDF exports</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400">—</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Curriculum packs</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400">—</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Educator support</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400">Generic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Plans Overview */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Starter</h3>
            <p className="text-3xl font-bold mb-4">€99<span className="text-base font-normal text-muted-foreground">/year</span></p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Comment Coach</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Report Bank</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Plan templates</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Export to DOC/PDF</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Classroom notes locker</span>
              </li>
            </ul>
            <a href="/pricing" className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded transition-colors">
              Choose Starter
            </a>
          </div>

          {/* Pro Plan */}
          <div className="border-2 border-blue-500 rounded-lg p-6 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Best Value
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Pro</h3>
            <p className="text-3xl font-bold mb-4">€149<span className="text-base font-normal text-muted-foreground">/year</span></p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">All Starter features</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Full AI Rewriter/Planner</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Curriculum packs</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Batch exports</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Priority updates</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Shared templates</span>
              </li>
            </ul>
            <a href="/pricing" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors">
              Choose Pro
            </a>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="mb-12">
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Risk-Free 30-Day Trial</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <Check className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm">Full refund within 30 days</p>
            </div>
            <div>
              <Check className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm">Cancel anytime — no questions asked</p>
            </div>
            <div>
              <Check className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm">No student data stored</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {toolFAQs.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Save 3-5 Hours Per Week?</h2>
        <p className="text-xl text-muted-foreground mb-6">
          Join thousands of educators who've already reclaimed their time with Zaza Promptly
        </p>
        <a 
          href="/pricing" 
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-block"
        >
          Start Your Free Trial Today
        </a>
        <p className="text-sm text-muted-foreground mt-3">
          14-day free trial • 30-day money-back guarantee • No credit card required
        </p>
      </section>
    </main>
  );
}