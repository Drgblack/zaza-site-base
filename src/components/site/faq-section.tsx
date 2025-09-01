'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is Zaza Promptly safe to use with student data?",
    answer: "Yes. We are GDPR compliant, don't sell your data, and never share your content outside your account. Your messages and student information remain completely private and secure."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. You can upgrade, downgrade, or cancel in a single click. No hidden fees, no long-term contracts, no questions asked."
  },
  {
    question: "What makes Zaza different from other AI tools?",
    answer: "Zaza Promptly is designed by a PhD in Professional Education. Unlike generic tools, it's built to truly understand teacher workflows and classroom realities. Every feature is crafted with deep educational expertise."
  },
  {
    question: "What if I just want to try it first?",
    answer: "Start with the free plan - you'll still get access to essential features and can upgrade anytime. No credit card required, no pressure, just try it and see how it works for you."
  },
  {
    question: "How does the AI understand education context?",
    answer: "Our AI is specifically trained on educational communication patterns and best practices. It understands the nuances of parent-teacher communication, appropriate tone for different situations, and educational terminology."
  },
  {
    question: "Will this replace my personal teaching style?",
    answer: "Not at all. Zaza Promptly enhances your communication by providing professional frameworks you can customize. You maintain your authentic voice while saving time on structure and wording."
  },
  {
    question: "What kind of support do you offer?",
    answer: "All users get email support. Pro users receive priority support with faster response times. School plans include live chat and dedicated account management with custom training sessions."
  },
  {
    question: "Can I use this for languages other than English?",
    answer: "Pro and School plans include multi-language translation support. You can write in English and translate messages into your students' family languages, or vice versa."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Everything you need to know about Zaza Promptly
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="font-semibold text-lg pr-4">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:support@zazatechnologies.com"
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
}