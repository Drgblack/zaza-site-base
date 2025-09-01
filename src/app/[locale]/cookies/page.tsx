import { setRequestLocale } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie, Settings, BarChart3, Shield, Globe, Users } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy - Zaza Technologies',
  description: 'Learn about how Zaza Technologies uses cookies and similar technologies on our website and services.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function CookiePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const cookieTypes = [
    {
      icon: Shield,
      title: "Essential Cookies",
      description: "Required for basic website functionality, security, and user authentication.",
      examples: "Login sessions, security tokens, language preferences"
    },
    {
      icon: BarChart3,
      title: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website to improve user experience.",
      examples: "Page views, click tracking, user journey analysis (anonymized)"
    },
    {
      icon: Settings,
      title: "Functional Cookies",
      description: "Remember your preferences and settings to enhance your experience.",
      examples: "Theme preferences, dashboard layout, notification settings"
    },
    {
      icon: Users,
      title: "Performance Cookies",
      description: "Monitor website performance and identify areas for improvement.",
      examples: "Load times, error tracking, feature usage statistics"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Cookie Policy
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Learn about how we use cookies and similar technologies to improve your experience, 
              ensure security, and provide our educational services effectively.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: January 1, 2025 | Effective: January 1, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Types Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
              Types of Cookies We Use
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {cookieTypes.map((cookie, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                      <cookie.icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">{cookie.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    {cookie.description}
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">Examples:</p>
                    <p className="text-sm text-gray-600">{cookie.examples}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Cookie Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="prose prose-lg mx-auto">
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cookie className="h-5 w-5 text-purple-600" />
                  What Are Cookies?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>Cookies are small text files that websites place on your device (computer, tablet, or mobile) when you visit them. They help websites remember information about your visit, making your next visit easier and more useful.</p>
                <div>
                  <h4 className="font-semibold mb-2">Similar Technologies</h4>
                  <p>We also use similar technologies including:</p>
                  <ul className="space-y-1">
                    <li>• <strong>Local Storage:</strong> Stores data locally in your browser</li>
                    <li>• <strong>Session Storage:</strong> Temporary storage that expires when you close your browser</li>
                    <li>• <strong>Web Beacons:</strong> Small tracking pixels for analytics</li>
                    <li>• <strong>Pixel Tags:</strong> Help us understand email engagement</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  Essential Cookies (Always Active)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>These cookies are necessary for our website to function properly and cannot be disabled. They are usually set in response to your actions such as logging in, filling forms, or setting privacy preferences.</p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Examples of Essential Cookies:</h4>
                  <div className="grid gap-3 md:grid-cols-2 text-sm">
                    <div>
                      <p><strong>Authentication:</strong> Keep you logged in</p>
                      <p><strong>Security:</strong> Protect against attacks</p>
                      <p><strong>Preferences:</strong> Language and region settings</p>
                    </div>
                    <div>
                      <p><strong>Forms:</strong> Remember form progress</p>
                      <p><strong>Load Balancing:</strong> Distribute traffic efficiently</p>
                      <p><strong>Privacy:</strong> Cookie consent status</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Analytics Cookies (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our services and user experience.</p>
                <div>
                  <h4 className="font-semibold mb-2">What We Track:</h4>
                  <ul className="space-y-1">
                    <li>• Page views and popular content</li>
                    <li>• User journey and navigation patterns</li>
                    <li>• Feature usage and engagement metrics</li>
                    <li>• Error rates and technical performance</li>
                    <li>• Geographic regions (country level only)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Privacy Protection:</h4>
                  <ul className="space-y-1">
                    <li>• All data is anonymized and aggregated</li>
                    <li>• IP addresses are masked</li>
                    <li>• No personal information is collected</li>
                    <li>• Data is used solely for website improvement</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-600" />
                  Functional Cookies (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>These cookies allow us to remember choices you make and provide enhanced, more personal features. They may be set by us or third-party providers whose services we use.</p>
                <div>
                  <h4 className="font-semibold mb-2">Enhanced Features:</h4>
                  <ul className="space-y-1">
                    <li>• Remember your dashboard layout preferences</li>
                    <li>• Save your notification settings</li>
                    <li>• Maintain your theme selection (light/dark mode)</li>
                    <li>• Store your preferred language</li>
                    <li>• Remember expanded/collapsed sections</li>
                  </ul>
                </div>
                <p className="text-sm bg-yellow-50 p-3 rounded-lg">
                  <strong>Note:</strong> If you disable functional cookies, some features may not work as expected, and you may need to re-enter your preferences each time you visit.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  Third-Party Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>Some cookies are placed by third-party services that appear on our pages. We carefully select these partners and ensure they meet our privacy standards.</p>
                <div>
                  <h4 className="font-semibold mb-2">Our Third-Party Partners:</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p><strong>Stripe (Payment Processing)</strong></p>
                      <p className="text-sm text-gray-600">Secure payment processing and fraud prevention</p>
                      <p className="text-xs text-gray-500">Privacy Policy: stripe.com/privacy</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p><strong>Vercel (Hosting & Analytics)</strong></p>
                      <p className="text-sm text-gray-600">Website hosting and basic performance analytics</p>
                      <p className="text-xs text-gray-500">Privacy Policy: vercel.com/legal/privacy-policy</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p><strong>Brevo (Email Services)</strong></p>
                      <p className="text-sm text-gray-600">Newsletter delivery and email marketing</p>
                      <p className="text-xs text-gray-500">Privacy Policy: brevo.com/legal/privacypolicy</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-600" />
                  Managing Your Cookie Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Cookie Consent Banner</h4>
                  <p>When you first visit our website, you&apos;ll see a cookie consent banner where you can:</p>
                  <ul className="space-y-1">
                    <li>• Accept all cookies</li>
                    <li>• Reject optional cookies</li>
                    <li>• Customize your preferences</li>
                    <li>• Learn more about each cookie type</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Browser Controls</h4>
                  <p>Most web browsers allow you to control cookies through their settings. You can:</p>
                  <ul className="space-y-1">
                    <li>• Block all cookies</li>
                    <li>• Block third-party cookies only</li>
                    <li>• Delete existing cookies</li>
                    <li>• Set up notifications when cookies are sent</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">⚠️ Important Note</h4>
                  <p className="text-sm">Disabling essential cookies may affect website functionality. Our educational services may not work properly if certain cookies are blocked.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Cookie Retention Periods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Session Cookies</h4>
                    <p className="text-sm">Deleted when you close your browser</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Login sessions</li>
                      <li>• Form data</li>
                      <li>• Shopping cart contents</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Persistent Cookies</h4>
                    <p className="text-sm">Stored for specific periods</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Remember login: 30 days</li>
                      <li>• Preferences: 1 year</li>
                      <li>• Analytics: 2 years</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Updates to This Cookie Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make significant changes, we will notify you by:</p>
                <ul className="space-y-2">
                  <li>• Updating the &ldquo;Last updated&rdquo; date at the top of this policy</li>
                  <li>• Displaying a notification on our website</li>
                  <li>• Sending an email to registered users (for major changes)</li>
                  <li>• Requesting renewed consent when required by law</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>If you have questions about our use of cookies or this Cookie Policy, please contact us:</p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p><strong>Zaza Technologies</strong></p>
                  <p><strong>Email:</strong> privacy@zaza.ai</p>
                  <p><strong>Subject Line:</strong> Cookie Policy Inquiry</p>
                  <p><strong>Address:</strong> Brisbane, Queensland, Australia</p>
                </div>
                <p className="text-sm">
                  You can also manage your cookie preferences through your browser settings or by using the cookie consent controls on our website.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}