import { setRequestLocale } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Mail, 
  Download, 
  BookOpen,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import {Link} from '@/i18n/routing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Successful - Welcome to Zaza Promptly!',
  description: 'Thank you for your purchase. Your account is now active and ready to use.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function CheckoutSuccessPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50/30 to-pink-50/30 dark:from-green-900/20 dark:via-purple-900/10 dark:to-pink-900/10">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Welcome to Zaza Promptly! 🎉
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your payment was successful and your account is now active.
            </p>
          </div>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                What's Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Check Your Email</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We've sent you a welcome email with your account details and getting started guide.
                  </p>
                </div>
                <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Create Your First Message</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Start using the snippet tool to generate your first AI-powered parent communication.
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-purple-500 flex-shrink-0" />
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Explore Resources</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Check out our teacher resources and join the community gallery for inspiration.
                  </p>
                </div>
                <BookOpen className="h-5 w-5 text-green-500 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Start Creating</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Generate your first AI message now
                </p>
                <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Link href="/#snippet-tool">
                    Create Message →
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Your Dashboard</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Manage your account and saved snippets
                </p>
                <Button asChild variant="outline">
                  <Link href="/dashboard">
                    Go to Dashboard →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Support */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-2">Need Help Getting Started?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Our support team is here to help you make the most of Zaza Promptly.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/resources">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Help Center
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Receipt Info */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>A receipt has been sent to your email address.</p>
            <p>Questions about billing? Contact us at billing@zazapromptly.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}