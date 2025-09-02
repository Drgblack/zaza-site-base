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
      <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
      {faqItems.map((item, index) => (
        <Card key={index} className="border border-gray-200 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={() => toggleItem(index)}
          >
            <CardTitle className="flex items-center justify-between text-lg">
              {item.question}
              {openItems.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </CardTitle>
          </CardHeader>
          {openItems.includes(index) && (
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
