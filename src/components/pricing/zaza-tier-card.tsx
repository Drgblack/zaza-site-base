'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { PricingTier } from '@/lib/pricingConfig';

interface ZazaTierCardProps {
  tier: PricingTier;
  isAnnual: boolean;
  onSelect: (tier: PricingTier) => void;
}

export function ZazaTierCard({ tier, isAnnual, onSelect }: ZazaTierCardProps) {
  const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
  const period = isAnnual ? '/year' : '/month';
  const effectiveMonthly = isAnnual ? tier.annualEffectiveMonthly : null;

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 ${
      tier.popular 
        ? 'border-purple-200 dark:border-purple-800 shadow-xl transform scale-105 hover:scale-110' 
        : 'border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-600'
    }`}>
      {tier.badge && (
        <div className="absolute top-0 left-0 right-0">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse opacity-50"></div>
            <Badge className="bg-white text-purple-600 font-semibold relative z-10">
              <Star className="h-3 w-3 mr-1 animate-spin" />
              {tier.badge}
            </Badge>
          </div>
        </div>
      )}
      
      <CardHeader className={tier.badge ? 'pt-16' : 'pt-8'}>
        <CardTitle className="text-xl text-gray-900 dark:text-white">{tier.name}</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          {isAnnual ? `€${effectiveMonthly}/mo billed yearly` : `or €${tier.monthlyPrice}/mo`}
        </CardDescription>
        <div className="mt-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              €{price}
            </span>
            <span className="text-lg text-gray-600 dark:text-gray-400 ml-1">
              {period}
            </span>
          </div>
          {isAnnual && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Billed annually
            </p>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          onClick={() => onSelect(tier)}
          variant={tier.popular ? "default" : "outline"}
          size="lg"
          className={`w-full ${
            tier.popular 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0' 
              : ''
          }`}
        >
          Choose {tier.name}
        </Button>
      </CardContent>
    </Card>
  );
}
