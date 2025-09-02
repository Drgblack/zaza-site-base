import { setRequestLocale } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Check, 
  Shield, 
  Users, 
  Building2,
  GraduationCap,
  BarChart3,
  Settings,
  HeadphonesIcon,
  Zap,
  Star,
  Clock,
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Institutional Solutions - Zaza Promptly for Schools & Districts',
  description: 'Empower your entire teaching staff with AI-powered communication tools. Bulk pricing for 20+ teachers, admin dashboards, and dedicated support.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function InstitutionsPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const pricingTiers = [
    {
      range: "20-49 teachers",
      pricePerTeacher: "€12.99",
      totalSavings: "30% off individual plans",
      features: [
        "Admin dashboard",
        "Bulk account management",
        "Basic analytics",
        "Email support"
      ]
    },
    {
      range: "50-99 teachers", 
      pricePerTeacher: "€9.99",
      totalSavings: "45% off individual plans",
      features: [
        "Everything in 20-49",
        "Advanced analytics",
        "Custom branding",
        "Priority support"
      ],
      popular: true
    },
    {
      range: "100+ teachers",
      pricePerTeacher: "€7.99",
      totalSavings: "55% off individual plans",
      features: [
        "Everything in 50-99",
        "Dedicated account manager",
        "SSO integration",
        "Custom training sessions",
        "24/7 phone support"
      ]
    }
  ];

  const benefits = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Usage Analytics",
      description: "Track adoption, engagement, and ROI across your institution with detailed dashboards."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Centralized Management",
      description: "Add, remove, and manage teacher accounts from a single admin interface."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Data Security",
      description: "Enterprise-grade security with FERPA compliance and data residency options."
    },
    {
      icon: <HeadphonesIcon className="h-6 w-6" />,
      title: "Dedicated Support",
      description: "Priority support with dedicated account managers for larger institutions."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-pink-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full px-6 py-2 mb-6">
              <Building2 className="h-4 w-4" />
              <span className="font-semibold">For Schools & Districts</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transform Your School's Communication
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Empower every teacher in your institution with AI-powered parent communication tools. 
              Save thousands of hours while improving family engagement school-wide.
            </p>
            
            {/* Key Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Schools using Zaza</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">15,000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Teachers empowered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">2.5M+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Parent messages sent</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Bulk Pricing for Schools</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              The more teachers you bring, the more you save. All plans include everything your school needs.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative overflow-hidden ${
                tier.popular 
                  ? 'border-purple-200 dark:border-purple-800 shadow-xl ring-2 ring-purple-200 dark:ring-purple-800' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}>
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2">
                      <Badge className="bg-white text-purple-600 font-semibold">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  </div>
                )}
                
                <CardHeader className={tier.popular ? 'pt-12' : 'pt-8'}>
                  <CardTitle className="text-xl text-center">{tier.range}</CardTitle>
                  <div className="text-center mt-4">
                    <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                      {tier.pricePerTeacher}
                    </div>
                    <div className="text-lg text-gray-600 dark:text-gray-400">per teacher/month</div>
                    <Badge className="bg-green-100 text-green-700 mt-2">{tier.totalSavings}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ready to get started? Book a demo or request a quote below.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Calendar className="h-4 w-4 mr-2" />
                Book Demo Call
              </Button>
              <Button size="lg" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Schools Choose Zaza Promptly</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Built specifically for educational institutions with enterprise features and compliance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                Join hundreds of schools already using Zaza Promptly to transform their parent communication.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Free 30-day trial for your entire school</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span>White-glove onboarding and training</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Dedicated success manager</span>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Request Information</CardTitle>
                <CardDescription>
                  Tell us about your school and we'll send you a custom proposal within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">First Name*</label>
                      <Input placeholder="John" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Last Name*</label>
                      <Input placeholder="Smith" required />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Work Email*</label>
                    <Input type="email" placeholder="john.smith@school.edu" required />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number</label>
                    <Input type="tel" placeholder="+1 (555) 123-4567" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">School/District*</label>
                      <Input placeholder="Lincoln Elementary" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Role*</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2" required>
                        <option value="">Select role</option>
                        <option value="superintendent">Superintendent</option>
                        <option value="principal">Principal</option>
                        <option value="it-director">IT Director</option>
                        <option value="curriculum-director">Curriculum Director</option>
                        <option value="teacher">Teacher</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Number of Teachers*</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2" required>
                      <option value="">Select range</option>
                      <option value="20-49">20-49 teachers</option>
                      <option value="50-99">50-99 teachers</option>
                      <option value="100-299">100-299 teachers</option>
                      <option value="300+">300+ teachers</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Current Challenges</label>
                    <Textarea 
                      placeholder="Tell us about your current parent communication challenges..."
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Timeline</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <option value="">When would you like to start?</option>
                      <option value="immediately">Immediately</option>
                      <option value="next-month">Next month</option>
                      <option value="next-quarter">Next quarter</option>
                      <option value="next-school-year">Next school year</option>
                    </select>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Request Custom Proposal
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to receive communications from Zaza Technologies. 
                    We'll never share your information.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Leading Schools</h2>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>4.9/5 rating from school admins</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>FERPA & COPPA compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>99.9% uptime guarantee</span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Zaza Promptly has transformed how our teachers communicate with parents. We've seen a 40% increase in parent engagement.",
                author: "Dr. Sarah Johnson",
                role: "Principal, Lincoln Elementary",
                location: "Austin, TX"
              },
              {
                quote: "The analytics dashboard helps us track communication effectiveness across all our schools. Essential for modern districts.",
                author: "Michael Chen",
                role: "Superintendent",
                location: "Mesa School District"
              },
              {
                quote: "Our teachers love how easy it is to send personalized messages. It's saved them hours each week.",
                author: "Jennifer Martinez",
                role: "Curriculum Director",
                location: "Riverside Unified"
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 inline" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Building2 className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your School?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of schools using Zaza Promptly to improve parent communication and teacher efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Sales: 1-800-ZAZAPRO
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-6">
            Free 30-day trial • No setup fees • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}