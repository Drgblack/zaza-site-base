import { setRequestLocale } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, UserX, Download, Globe } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Zaza Technologies',
  description: 'Learn how Zaza Technologies protects your privacy and handles your personal data in compliance with GDPR and other privacy regulations.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function PrivacyPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const principles = [
    {
      icon: Shield,
      title: "Data Protection First",
      description: "We implement industry-leading security measures to protect your personal information and student data."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We clearly explain what data we collect, why we collect it, and how it's used."
    },
    {
      icon: Lock,
      title: "Secure Storage",
      description: "All data is encrypted in transit and at rest, with regular security audits and updates."
    },
    {
      icon: UserX,
      title: "Your Control",
      description: "You can access, modify, or delete your data at any time through your account settings."
    },
    {
      icon: Download,
      title: "Data Portability",
      description: "Export your data in standard formats whenever you need it."
    },
    {
      icon: Globe,
      title: "GDPR Compliant",
      description: "Full compliance with European data protection regulations and other privacy laws."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Your privacy is our priority. Learn how we protect your personal information 
              and ensure student data security in compliance with global privacy regulations.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: January 1, 2025 | Effective: January 1, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
              Our Privacy Principles
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <principle.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">{principle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="prose prose-lg mx-auto">
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  1. Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Account Information</h4>
                  <p>When you create an account, we collect your name, email address, school/organization name, and role (teacher, administrator, etc.).</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Usage Data</h4>
                  <p>We collect information about how you use our service, including features accessed, time spent, and interaction patterns to improve our platform.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Student Data (Limited)</h4>
                  <p>We only process student data that you voluntarily input for AI-powered feedback generation. We never collect student personal identifiers or contact information directly.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technical Information</h4>
                  <p>IP address, browser type, device information, and session data for security and technical optimization purposes.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                  2. How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <ul className="space-y-2">
                  <li>• <strong>Service Delivery:</strong> Provide AI-powered teaching tools and feedback generation</li>
                  <li>• <strong>Account Management:</strong> Manage your subscription, billing, and support requests</li>
                  <li>• <strong>Platform Improvement:</strong> Analyze usage patterns to enhance features and user experience</li>
                  <li>• <strong>Communication:</strong> Send important updates, security notifications, and optional educational content</li>
                  <li>• <strong>Legal Compliance:</strong> Meet regulatory requirements and protect against misuse</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-purple-600" />
                  3. Data Security & Storage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Encryption</h4>
                  <p>All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Centers</h4>
                  <p>Data is stored in secure, SOC 2 compliant data centers in the European Union and United States.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Access Controls</h4>
                  <p>Strict access controls ensure only authorized personnel can access data for legitimate business purposes.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Regular Audits</h4>
                  <p>We conduct regular security audits and penetration testing to identify and address vulnerabilities.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserX className="h-5 w-5 text-purple-600" />
                  4. Your Rights (GDPR & Privacy Laws)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>Under GDPR and other privacy regulations, you have the following rights:</p>
                <ul className="space-y-2">
                  <li>• <strong>Right to Access:</strong> Request a copy of your personal data</li>
                  <li>• <strong>Right to Rectification:</strong> Correct inaccurate personal data</li>
                  <li>• <strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                  <li>• <strong>Right to Portability:</strong> Export your data in a machine-readable format</li>
                  <li>• <strong>Right to Object:</strong> Object to processing of your personal data</li>
                  <li>• <strong>Right to Restrict:</strong> Request restriction of processing</li>
                </ul>
                <p className="text-sm">To exercise these rights, contact us at privacy@zaza.ai or use your account settings.</p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  5. Data Sharing & Third Parties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">We Never Sell Your Data</h4>
                  <p>We never sell, rent, or trade your personal information or student data to third parties.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Limited Sharing</h4>
                  <p>We only share data with:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• <strong>Service Providers:</strong> Cloud hosting (Vercel), payment processing (Stripe), email services (Brevo)</li>
                    <li>• <strong>Legal Requirements:</strong> When required by law or to protect our legal rights</li>
                    <li>• <strong>Business Transfers:</strong> In case of merger or acquisition (with same privacy protections)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">AI Processing</h4>
                  <p>Student work samples are processed by AI services (OpenAI, Anthropic) under strict data processing agreements that prohibit data retention or training use.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-purple-600" />
                  6. Data Retention & Deletion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <ul className="space-y-2">
                  <li>• <strong>Account Data:</strong> Retained while your account is active plus 30 days after cancellation</li>
                  <li>• <strong>Student Work Samples:</strong> Automatically deleted after feedback generation (not stored)</li>
                  <li>• <strong>Usage Analytics:</strong> Aggregated and anonymized data retained for up to 2 years for platform improvement</li>
                  <li>• <strong>Financial Records:</strong> Billing information retained for 7 years for legal compliance</li>
                  <li>• <strong>Immediate Deletion:</strong> Contact us for immediate account and data deletion</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>7. Cookies & Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>We use cookies and similar technologies for:</p>
                <ul className="space-y-2">
                  <li>• <strong>Essential Cookies:</strong> Account authentication and core functionality</li>
                  <li>• <strong>Analytics Cookies:</strong> Understanding usage patterns (anonymized)</li>
                  <li>• <strong>Preference Cookies:</strong> Remembering your settings and language choices</li>
                </ul>
                <p className="text-sm">See our <Link href="/cookies" className="text-purple-600 hover:underline">Cookie Policy</Link> for detailed information and opt-out options.</p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>8. Student Privacy (FERPA & COPPA Compliance)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <ul className="space-y-2">
                  <li>• We operate as a School Official under FERPA when processing student educational records</li>
                  <li>• Student data is only processed for legitimate educational purposes as directed by teachers</li>
                  <li>• We do not collect personal information from children under 13 without parental consent</li>
                  <li>• Student work samples are processed transiently and not stored in our systems</li>
                  <li>• Teachers maintain full control over what student data (if any) is processed through our platform</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>9. International Transfers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>If you&apos;re located outside the United States, your data may be transferred to and processed in the US. We ensure adequate protection through:</p>
                <ul className="space-y-2">
                  <li>• Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                  <li>• Adequacy decisions where available</li>
                  <li>• Additional safeguards including encryption and access controls</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>10. Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>For privacy-related questions or to exercise your rights:</p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p><strong>Privacy Officer:</strong> Dr. Greg Blackburn</p>
                  <p><strong>Email:</strong> greg@zazatechnologies.com</p>
                  <p><strong>Address:</strong><br />Zaza Technologies UG (haftungsbeschränkt)<br />Gumbertstraße 150<br />40229 Düsseldorf<br />Germany</p>
                  <p><strong>Response Time:</strong> Within 30 days of receipt</p>
                </div>
                <p className="text-sm">
                  EU residents can also contact your local data protection authority if you have concerns about our data processing practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}