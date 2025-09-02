'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Check, 
  Building, 
  Users, 
  Shield, 
  BarChart3,
  Crown,
  Zap,
  Clock,
  Mail,
  Phone,
  Calculator
} from 'lucide-react';

interface InstitutionalPlan {
  name: string;
  description: string;
  minSeats: number;
  maxSeats: number | null;
  monthlyPricePerSeat: number;
  annualPricePerSeat: number;
  features: string[];
  popular?: boolean;
  enterprise?: boolean;
}

const institutionalPlans: InstitutionalPlan[] = [
  {
    name: 'School Starter',
    description: 'Perfect for small schools and departments',
    minSeats: 5,
    maxSeats: 24,
    monthlyPricePerSeat: 12.99,
    annualPricePerSeat: 9.99,
    features: [
      'All individual features included',
      'Shared snippet libraries',
      'Basic admin dashboard',
      'Email support',
      'Usage analytics',
      'Bulk user management'
    ]
  },
  {
    name: 'School Professional',
    description: 'Most popular for medium-sized schools',
    minSeats: 25,
    maxSeats: 99,
    monthlyPricePerSeat: 9.99,
    annualPricePerSeat: 7.99,
    popular: true,
    features: [
      'Everything in School Starter',
      'Advanced admin controls',
      'Custom snippet approval workflows',
      'Department-level organization',
      'Priority support',
      'Advanced analytics & reporting',
      'SSO integration (Google Workspace)',
      'Custom branding options'
    ]
  },
  {
    name: 'District Scale',
    description: 'For large schools and multi-school districts',
    minSeats: 100,
    maxSeats: 499,
    monthlyPricePerSeat: 7.99,
    annualPricePerSeat: 5.99,
    features: [
      'Everything in School Professional',
      'Multi-school management',
      'District-wide analytics',
      'Advanced SSO (SAML, OIDC)',
      'API access for integrations',
      'Dedicated customer success manager',
      'Custom training & onboarding',
      'Advanced compliance features'
    ]
  },
  {
    name: 'Enterprise',
    description: 'Large districts and education organizations',
    minSeats: 500,
    maxSeats: null,
    monthlyPricePerSeat: 0, // Custom pricing
    annualPricePerSeat: 0,
    enterprise: true,
    features: [
      'Everything in District Scale',
      'Unlimited schools & districts',
      'Custom feature development',
      'White-label options',
      'On-premise deployment options',
      'Advanced security controls',
      '24/7 phone & email support',
      'Dedicated infrastructure',
      'Custom SLA agreements'
    ]
  }
];

export function InstitutionalPricing() {
  const [selectedPlan, setSelectedPlan] = useState<InstitutionalPlan | null>(null);
  const [seatCount, setSeatCount] = useState(25);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  // Quote form states
  const [organizationName, setOrganizationName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [estimatedSeats, setEstimatedSeats] = useState('');
  const [organizationType, setOrganizationType] = useState('');

  const calculatePrice = (plan: InstitutionalPlan, seats: number) => {
    if (plan.enterprise) return 'Custom';
    
    const pricePerSeat = billingCycle === 'monthly' ? plan.monthlyPricePerSeat : plan.annualPricePerSeat;
    const totalPrice = pricePerSeat * seats;
    const period = billingCycle === 'monthly' ? '/month' : '/year';
    
    return `$${totalPrice.toLocaleString()}${period}`;
  };

  const getApplicablePlan = (seats: number) => {
    return institutionalPlans.find(plan => 
      seats >= plan.minSeats && (plan.maxSeats === null || seats <= plan.maxSeats)
    );
  };

  const handleGetQuote = (plan?: InstitutionalPlan) => {
    if (plan) {
      setSelectedPlan(plan);
    }
    setShowQuoteForm(true);
  };

  const handleSubmitQuote = async () => {
    // In a real implementation, this would send the quote request
    console.log('Quote request submitted:', {
      plan: selectedPlan?.name,
      organizationName,
      contactName,
      contactEmail,
      contactPhone,
      estimatedSeats,
      organizationType,
      billingCycle
    });
    
    // Reset form
    setShowQuoteForm(false);
    setSelectedPlan(null);
    // Show success message
    alert('Quote request submitted! We\'ll contact you within 24 hours.');
  };

  const applicablePlan = getApplicablePlan(seatCount);

  if (showQuoteForm) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-600" />
              Request Institutional Quote
            </CardTitle>
            <CardDescription>
              {selectedPlan && `Get pricing for ${selectedPlan.name} - `}
              We'll provide a customized quote within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Organization Name</label>
                <Input
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="Springfield School District"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Organization Type</label>
                <Select value={organizationType} onValueChange={setOrganizationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elementary">Elementary School</SelectItem>
                    <SelectItem value="middle">Middle School</SelectItem>
                    <SelectItem value="high">High School</SelectItem>
                    <SelectItem value="k12">K-12 School</SelectItem>
                    <SelectItem value="district">School District</SelectItem>
                    <SelectItem value="university">University/College</SelectItem>
                    <SelectItem value="private">Private School</SelectItem>
                    <SelectItem value="charter">Charter School</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Contact Name</label>
                <Input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Dr. Jane Smith"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Estimated Teachers</label>
                <Input
                  value={estimatedSeats}
                  onChange={(e) => setEstimatedSeats(e.target.value)}
                  placeholder="50"
                  type="number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Email Address</label>
                <Input
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="jane.smith@school.edu"
                  type="email"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number</label>
                <Input
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  type="tel"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowQuoteForm(false)}
              >
                Back to Pricing
              </Button>
              <Button 
                onClick={handleSubmitQuote}
                disabled={!organizationName || !contactName || !contactEmail}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Request Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Institutional Pricing
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Designed for schools, districts, and educational organizations of all sizes
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingCycle === 'annual'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Annual
            <Badge className="ml-2 bg-green-100 text-green-800 text-xs">Save 25%</Badge>
          </button>
        </div>
      </div>

      {/* Seat Calculator */}
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-purple-600" />
            Pricing Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Number of Teachers</label>
              <Input
                type="number"
                value={seatCount}
                onChange={(e) => setSeatCount(parseInt(e.target.value) || 0)}
                min={5}
                max={10000}
              />
            </div>
            {applicablePlan && (
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100">
                  {applicablePlan.name}
                </h4>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                  {calculatePrice(applicablePlan, seatCount)}
                </p>
                <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                  ${billingCycle === 'monthly' ? applicablePlan.monthlyPricePerSeat : applicablePlan.annualPricePerSeat} per teacher
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {institutionalPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${
              plan.popular
                ? 'border-2 border-purple-500 shadow-lg scale-105'
                : 'border border-gray-200 dark:border-gray-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 hover:bg-purple-600 text-white px-3 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-2">
                {plan.enterprise ? (
                  <Crown className="h-6 w-6 text-yellow-500" />
                ) : (
                  <Building className="h-6 w-6 text-purple-600" />
                )}
              </div>
              
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription className="text-sm">
                {plan.description}
              </CardDescription>
              
              <div className="py-4">
                {plan.enterprise ? (
                  <div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      Custom
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Contact for pricing
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      ${billingCycle === 'monthly' ? plan.monthlyPricePerSeat : plan.annualPricePerSeat}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      per teacher / {billingCycle === 'monthly' ? 'month' : 'year'}
                    </p>
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-2">
                  {plan.minSeats}+ teachers required
                </p>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleGetQuote(plan)}
                className={`w-full ${
                  plan.popular
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.enterprise ? 'Contact Sales' : 'Get Quote'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Enterprise Security</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              SOC 2 compliance, SSO integration, and advanced admin controls
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Department-level insights, usage reports, and ROI tracking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Dedicated Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Customer success manager, training, and priority support
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contact CTA */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Need a Custom Solution?
          </h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            We work with large districts and education organizations to create 
            tailored solutions that meet your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => handleGetQuote()}
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              <Mail className="h-4 w-4 mr-2" />
              Request Custom Quote
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4 mr-2" />
              Schedule a Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}