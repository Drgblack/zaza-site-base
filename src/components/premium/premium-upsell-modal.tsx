'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Crown, 
  Users, 
  Zap, 
  Star, 
  Check, 
  ArrowRight,
  Clock,
  TrendingUp,
  Shield,
  Globe
} from 'lucide-react';
import { PremiumPlan, FamilyPlan, getRecommendedPlan, calculateSavings } from '@/lib/premium-upsells';

interface PremiumUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    usageCount: number;
    featuresUsed: string[];
    daysOnPlatform: number;
    engagementScore: number;
    familyMembers?: number;
    teamSize?: number;
  };
}

export function PremiumUpsellModal({ isOpen, onClose, userData }: PremiumUpsellModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<PremiumPlan | FamilyPlan | null>(null);
  const [isAnnual, setIsAnnual] = useState(true);

  const recommendedPlan = getRecommendedPlan(userData);

  const handlePlanSelect = (plan: PremiumPlan | FamilyPlan) => {
    setSelectedPlan(plan);
  };

  const handleUpgrade = () => {
    if (selectedPlan) {
      // Handle upgrade logic
      console.log('Upgrading to:', selectedPlan.id);
      onClose();
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'zaza-pro-pack':
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 'zaza-enterprise':
        return <Shield className="h-6 w-6 text-blue-500" />;
      case 'zaza-family-plan':
        return <Users className="h-6 w-6 text-green-500" />;
      case 'zaza-team-plan':
        return <Globe className="h-6 w-6 text-purple-500" />;
      default:
        return <Star className="h-6 w-6 text-purple-500" />;
    }
  };

  const getSavingsPercentage = (plan: PremiumPlan | FamilyPlan) => {
    return calculateSavings(plan, isAnnual);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Crown className="h-6 w-6 text-yellow-500" />
            Unlock Your Full Potential
          </DialogTitle>
          <DialogDescription className="text-lg">
            Based on your usage, we think you'd love these premium features
          </DialogDescription>
        </DialogHeader>

        {/* Usage Summary */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userData.usageCount}</div>
              <div className="text-sm text-gray-600">Resources Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userData.daysOnPlatform}</div>
              <div className="text-sm text-gray-600">Days Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userData.featuresUsed.length}</div>
              <div className="text-sm text-gray-600">Features Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{Math.round(userData.engagementScore * 100)}%</div>
              <div className="text-sm text-gray-600">Engagement</div>
            </div>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center p-1 rounded-lg bg-gray-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isAnnual
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Annual
              <Badge className="ml-2 bg-green-500 text-white text-xs">
                Save up to 33%
              </Badge>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !isAnnual
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Monthly
            </Button>
          </div>
        </div>

        {/* Plan Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {recommendedPlan && (
            <Card className={`relative border-2 ${
              selectedPlan?.id === recommendedPlan.id 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 hover:border-purple-300'
            }`}>
              {recommendedPlan.id === 'zaza-pro-pack' && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2">
                  <Badge className="bg-white text-purple-600 font-semibold">
                    <Star className="h-3 w-3 mr-1" />
                    Recommended for you
                  </Badge>
                </div>
              )}
              
              <CardHeader className={recommendedPlan.id === 'zaza-pro-pack' ? 'pt-16' : 'pt-6'}>
                <div className="flex items-center gap-3 mb-2">
                  {getPlanIcon(recommendedPlan.id)}
                  <CardTitle className="text-xl">{recommendedPlan.name}</CardTitle>
                </div>
                <p className="text-gray-600">{recommendedPlan.description}</p>
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">
                      €{isAnnual ? recommendedPlan.price.annual / 12 : recommendedPlan.price.monthly}
                    </span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm text-green-600 mt-1">
                      Save {getSavingsPercentage(recommendedPlan)}% with annual billing
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 mb-6">
                  {recommendedPlan.features.slice(0, 5).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {recommendedPlan.features.length > 5 && (
                    <div className="text-sm text-gray-500">
                      +{recommendedPlan.features.length - 5} more features
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => handlePlanSelect(recommendedPlan)}
                  variant={selectedPlan?.id === recommendedPlan.id ? "default" : "outline"}
                  className="w-full"
                >
                  {selectedPlan?.id === recommendedPlan.id ? 'Selected' : 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Alternative Plan */}
          <Card className={`relative border-2 ${
            selectedPlan?.id !== recommendedPlan?.id 
              ? 'border-purple-500 bg-purple-50' 
              : 'border-gray-200 hover:border-purple-300'
          }`}>
            <CardHeader className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-6 w-6 text-green-500" />
                <CardTitle className="text-xl">Zaza Family Plan</CardTitle>
              </div>
              <p className="text-gray-600">Perfect for families with multiple educators</p>
              <div className="mt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">€{isAnnual ? 25 : 34.99}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <div className="text-sm text-gray-500">Up to 4 teacher accounts</div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Up to 4 teacher accounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Shared resource library</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Family collaboration tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unified billing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Cross-account sharing</span>
                </div>
              </div>

              <Button
                onClick={() => handlePlanSelect({
                  id: 'zaza-family-plan',
                  name: 'Zaza Family Plan',
                  description: 'Perfect for families with multiple educators',
                  price: { monthly: 34.99, annual: 299.99, currency: 'EUR', perMember: 8.75 },
                  maxMembers: 4,
                  features: ['Up to 4 teacher accounts', 'Shared resource library'],
                  benefits: ['Save money with family pricing'],
                  targetAudience: ['Families with multiple teachers'],
                  upsellTriggers: ['Multiple family members'],
                  conversionRate: 0.12,
                  priority: 1
                })}
                variant={selectedPlan?.id !== recommendedPlan?.id ? "default" : "outline"}
                className="w-full"
              >
                {selectedPlan?.id !== recommendedPlan?.id ? 'Selected' : 'Choose Plan'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Button */}
        {selectedPlan && (
          <div className="text-center">
            <Button
              onClick={handleUpgrade}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
            >
              <Zap className="h-5 w-5 mr-2" />
              Upgrade to {selectedPlan.name}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Cancel anytime. No commitment required.
            </p>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-600">Secure & Private</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600">Cancel Anytime</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-gray-600">Instant Access</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
