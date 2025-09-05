'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface PricingFAQProps {
  faqItems: FAQItem[];
}

export function PricingFAQ({ faqItems }: PricingFAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Frequently Asked Questions</h3>
      {faqItems.map((item, index) => (
        <Card key={index} className="border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-gray-800">
          <CardHeader 
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
            onClick={() => toggleItem(index)}
          >
            <CardTitle className="flex items-center justify-between text-lg text-gray-900 dark:text-white">
              {item.question}
              {openItems.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </CardTitle>
          </CardHeader>
          {openItems.includes(index) && (
            <CardContent className="animate-in slide-in-from-top-2 duration-300">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.answer}</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
