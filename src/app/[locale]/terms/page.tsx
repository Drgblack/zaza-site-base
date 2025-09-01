import { setRequestLocale } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, CreditCard, Shield, AlertTriangle, Gavel } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Zaza Technologies',
  description: 'Terms and conditions for using Zaza Technologies services including Promptly AI-powered teaching tools.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function TermsPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const keyTerms = [
    {
      icon: Users,
      title: "Account Responsibilities",
      description: "You're responsible for maintaining account security and compliance with educational policies."
    },
    {
      icon: CreditCard,
      title: "Billing & Subscriptions",
      description: "Transparent pricing with monthly or annual billing options and easy cancellation."
    },
    {
      icon: Shield,
      title: "Data Protection",
      description: "We protect student data and ensure compliance with educational privacy regulations."
    },
    {
      icon: FileText,
      title: "Acceptable Use",
      description: "Use our service responsibly and in compliance with educational standards and laws."
    },
    {
      icon: AlertTriangle,
      title: "Service Availability",
      description: "We strive for 99.9% uptime but may have planned maintenance and updates."
    },
    {
      icon: Gavel,
      title: "Dispute Resolution",
      description: "Clear process for resolving any issues or concerns with our service."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Clear and fair terms governing your use of Zaza Technologies services. 
              Designed with educators in mind and focused on transparency.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: January 1, 2025 | Effective: January 1, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Key Terms Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
              Key Terms at a Glance
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {keyTerms.map((term, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <term.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">{term.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {term.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="prose prose-lg mx-auto">
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  1. Agreement to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>By accessing or using Zaza Technologies services (&ldquo;Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you disagree with any part of these terms, you may not access the Service.</p>
                <p>These Terms apply to all visitors, users, and others who access or use the Service, including but not limited to:</p>
                <ul className="space-y-2">
                  <li>• Individual teachers and educators</li>
                  <li>• Educational institutions and schools</li>
                  <li>• School administrators and staff</li>
                  <li>• Any authorized representatives of the above</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  2. User Accounts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Account Creation</h4>
                  <p>You must provide accurate, complete, and current information when creating an account. You are responsible for safeguarding your password and all activities under your account.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Eligibility</h4>
                  <p>You must be at least 18 years old or have parental/guardian consent to use our Service. For educational institution accounts, you must be authorized to act on behalf of the institution.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Account Security</h4>
                  <ul className="space-y-1">
                    <li>• Use a strong, unique password</li>
                    <li>• Do not share your account credentials</li>
                    <li>• Notify us immediately of any unauthorized access</li>
                    <li>• Comply with your institution&apos;s IT and data policies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  3. Acceptable Use Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Permitted Uses</h4>
                  <ul className="space-y-1">
                    <li>• Generate AI-powered feedback for student work</li>
                    <li>• Create educational content and assessments</li>
                    <li>• Manage classroom communications with parents</li>
                    <li>• Use analytics to improve teaching effectiveness</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Prohibited Uses</h4>
                  <p>You may not use the Service to:</p>
                  <ul className="space-y-1">
                    <li>• Violate any laws or regulations</li>
                    <li>• Infringe on intellectual property rights</li>
                    <li>• Upload malicious code or attempt to hack the system</li>
                    <li>• Share or process inappropriate content involving minors</li>
                    <li>• Violate student privacy or educational regulations</li>
                    <li>• Use the service for commercial purposes outside of education</li>
                    <li>• Attempt to reverse engineer or copy our AI models</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  4. Billing and Subscriptions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Subscription Plans</h4>
                  <ul className="space-y-2">
                    <li>• <strong>Free Plan:</strong> Limited features with usage restrictions</li>
                    <li>• <strong>Pro Plan:</strong> €14.99/month with full feature access</li>
                    <li>• <strong>School Plans:</strong> Custom pricing for institutions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Payment Terms</h4>
                  <ul className="space-y-1">
                    <li>• Subscriptions are billed monthly or annually in advance</li>
                    <li>• All fees are non-refundable except as required by law</li>
                    <li>• Prices may change with 30 days notice</li>
                    <li>• Failed payments may result in service suspension</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cancellation</h4>
                  <p>You may cancel your subscription at any time through your account settings. Service continues until the end of your current billing period.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  5. Student Data and Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Educational Records</h4>
                  <p>We operate as a School Official under FERPA when processing student educational records at your direction. We only process data necessary for the educational services requested.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Minimization</h4>
                  <ul className="space-y-1">
                    <li>• We only collect data necessary for service delivery</li>
                    <li>• Student work samples are processed transiently, not stored</li>
                    <li>• No student personal contact information is collected</li>
                    <li>• Data is automatically purged after processing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Your Responsibilities</h4>
                  <p>You must ensure you have proper authority to process any student data through our Service and comply with applicable privacy laws and institutional policies.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  6. Intellectual Property
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Our Content</h4>
                  <p>The Service and its original content, features, and functionality are owned by Zaza Technologies and protected by international copyright, trademark, and other intellectual property laws.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Your Content</h4>
                  <p>You retain ownership of any content you upload to the Service. By using our Service, you grant us a license to process your content solely for the purpose of providing our educational services.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">AI-Generated Content</h4>
                  <p>AI-generated feedback and suggestions are provided for educational purposes. You are responsible for reviewing and validating all AI-generated content before use with students.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-purple-600" />
                  7. Service Availability and Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Service Level</h4>
                  <p>We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. Planned maintenance will be announced in advance when possible.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Limitations of AI</h4>
                  <ul className="space-y-1">
                    <li>• AI-generated content may contain errors or biases</li>
                    <li>• Suggestions should be reviewed by qualified educators</li>
                    <li>• AI cannot replace professional educational judgment</li>
                    <li>• Results may vary based on input quality and context</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Usage Limits</h4>
                  <p>Free and paid plans include usage limits to ensure fair access. Excessive usage may result in temporary rate limiting or account review.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5 text-purple-600" />
                  8. Disclaimers and Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Service &ldquo;As Is&rdquo;</h4>
                  <p>The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. We make no warranties, express or implied, regarding the Service&apos;s operation or content.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Educational Disclaimer</h4>
                  <p>Our AI tools are designed to assist educators, not replace professional judgment. You are responsible for all educational decisions and their appropriateness for your students.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Limitation of Liability</h4>
                  <p>To the fullest extent permitted by law, Zaza Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>9. Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">By You</h4>
                  <p>You may terminate your account at any time by contacting us or using account settings. Upon termination, your access to the Service will cease immediately.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">By Us</h4>
                  <p>We may terminate or suspend your account immediately if you breach these Terms or engage in activities that could harm our Service or other users.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Effect of Termination</h4>
                  <p>Upon termination, your data will be deleted according to our Privacy Policy. Some provisions of these Terms may survive termination as necessary.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>10. Governing Law and Disputes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Governing Law</h4>
                  <p>These Terms are governed by the laws of Queensland, Australia, without regard to its conflict of law provisions.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Dispute Resolution</h4>
                  <p>We encourage resolving disputes through direct communication. For formal disputes, you may contact us at legal@zaza.ai or pursue resolution through appropriate legal channels in Queensland, Australia.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>11. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Continued use of the Service constitutes acceptance of modified Terms.</p>
                <p>For material changes, we will provide notice through:</p>
                <ul className="space-y-1">
                  <li>• Email notification to registered users</li>
                  <li>• In-app notifications</li>
                  <li>• Website announcements</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>12. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>Questions about these Terms of Service should be sent to:</p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p><strong>Zaza Technologies</strong></p>
                  <p><strong>Email:</strong> legal@zaza.ai</p>
                  <p><strong>Support:</strong> support@zaza.ai</p>
                  <p><strong>Address:</strong> Brisbane, Queensland, Australia</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}