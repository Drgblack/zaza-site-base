'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Globe,
  Lock,
  Sparkles
} from 'lucide-react';

interface UnifiedAuthProps {
  variant?: 'default' | 'compact' | 'modal';
  onSuccess?: () => void;
  redirectTo?: string;
}

export function UnifiedAuth({ variant = 'default', onSuccess, redirectTo }: UnifiedAuthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSignIn = async (provider: 'google' | 'microsoft' | 'apple') => {
    setIsLoading(true);
    
    // Simulate unified authentication
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
      
      // Simulate redirect or callback
      if (onSuccess) {
        onSuccess();
      }
      
      if (redirectTo) {
        // In a real implementation, this would handle cross-app redirects
        console.log(`Redirecting to: ${redirectTo}`);
      }
    }, 2000);
  };

  const benefits = [
    {
      icon: Globe,
      title: "Access All Zaza Apps",
      description: "Single sign-on across Promptly, Teach, and future apps"
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Enterprise-grade security with full data protection"
    },
    {
      icon: Zap,
      title: "Instant Sync",
      description: "Your preferences and data sync across all platforms"
    }
  ];

  if (variant === 'compact') {
    return (
      <Card className="border-purple-200 dark:border-purple-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Unified Account</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Access all Zaza apps with one login</p>
              </div>
            </div>
            <Button 
              onClick={() => handleSignIn('google')}
              disabled={isLoading}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-3 w-3 ml-1" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'modal') {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full w-fit mx-auto mb-4">
            <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Join the Zaza Ecosystem
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            One account, unlimited access to all our teaching tools
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={() => handleSignIn('google')}
            disabled={isLoading}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>
          
          <Button 
            onClick={() => handleSignIn('microsoft')}
            disabled={isLoading}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#F25022" d="M1 1h10v10H1z"/>
              <path fill="#00A4EF" d="M13 1h10v10H13z"/>
              <path fill="#7FBA00" d="M1 13h10v10H1z"/>
              <path fill="#FFB900" d="M13 13h10v10H13z"/>
            </svg>
            Continue with Microsoft
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
      <CardHeader>
        <div className="text-center">
          <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full w-fit mx-auto mb-4">
            <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <CardTitle className="text-purple-900 dark:text-purple-100">
            Unified Zaza Account
          </CardTitle>
          <CardDescription className="text-purple-700 dark:text-purple-300">
            One login, access to all Zaza teaching tools
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentStep === 1 && (
          <>
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <benefit.icon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => handleSignIn('google')}
                disabled={isLoading}
                className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
              
              <Button 
                onClick={() => handleSignIn('microsoft')}
                disabled={isLoading}
                className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#F25022" d="M1 1h10v10H1z"/>
                  <path fill="#00A4EF" d="M13 1h10v10H13z"/>
                  <path fill="#7FBA00" d="M1 13h10v10H1z"/>
                  <path fill="#FFB900" d="M13 13h10v10H13z"/>
                </svg>
                Continue with Microsoft
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <div className="text-center space-y-4">
            <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full w-fit mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Welcome to Zaza!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your unified account is ready. You now have access to all Zaza apps.
              </p>
            </div>
            <div className="flex gap-2 justify-center">
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300">
                <Sparkles className="h-3 w-3 mr-1" />
                Promptly
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300">
                <Users className="h-3 w-3 mr-1" />
                Teach
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
