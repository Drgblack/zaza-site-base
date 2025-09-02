'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange } from '@/lib/auth';

interface UnifiedAuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  currentApp: 'promptly' | 'teach' | 'unknown';
  switchApp: (app: 'promptly' | 'teach') => void;
  getAppUrl: (app: 'promptly' | 'teach') => string;
}

const UnifiedAuthContext = createContext<UnifiedAuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  currentApp: 'unknown',
  switchApp: () => {},
  getAppUrl: () => '',
});

export const useUnifiedAuth = () => {
  const context = useContext(UnifiedAuthContext);
  if (!context) {
    throw new Error('useUnifiedAuth must be used within a UnifiedAuthProvider');
  }
  return context;
};

interface UnifiedAuthProviderProps {
  children: ReactNode;
  app: 'promptly' | 'teach';
}

export const UnifiedAuthProvider = ({ children, app }: UnifiedAuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentApp, setCurrentApp] = useState<'promptly' | 'teach' | 'unknown'>(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const switchApp = (targetApp: 'promptly' | 'teach') => {
    const appUrls = {
      promptly: process.env.NEXT_PUBLIC_PROMPTLY_URL || 'https://promptly.zaza.com',
      teach: process.env.NEXT_PUBLIC_TEACH_URL || 'https://teach.zaza.com'
    };

    // In a real implementation, this would handle cross-app navigation
    // with proper authentication token passing
    if (targetApp !== currentApp) {
      const targetUrl = appUrls[targetApp];
      
      // Store current app context for seamless transition
      if (typeof window !== 'undefined') {
        localStorage.setItem('zaza-current-app', currentApp);
        localStorage.setItem('zaza-user-context', JSON.stringify({
          uid: user?.uid,
          email: user?.email,
          displayName: user?.displayName,
          timestamp: Date.now()
        }));
      }

      // Redirect to target app
      window.location.href = targetUrl;
    }
  };

  const getAppUrl = (targetApp: 'promptly' | 'teach'): string => {
    const appUrls = {
      promptly: process.env.NEXT_PUBLIC_PROMPTLY_URL || 'https://promptly.zaza.com',
      teach: process.env.NEXT_PUBLIC_TEACH_URL || 'https://teach.zaza.com'
    };

    return appUrls[targetApp];
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    currentApp,
    switchApp,
    getAppUrl,
  };

  return (
    <UnifiedAuthContext.Provider value={value}>
      {children}
    </UnifiedAuthContext.Provider>
  );
};

// Hook for cross-app navigation
export const useCrossAppNavigation = () => {
  const { switchApp, getAppUrl, currentApp, isAuthenticated } = useUnifiedAuth();

  const navigateToApp = (targetApp: 'promptly' | 'teach') => {
    if (!isAuthenticated) {
      // If not authenticated, redirect to login with return URL
      const targetUrl = getAppUrl(targetApp);
      const loginUrl = `${targetUrl}/auth/login?returnTo=${encodeURIComponent(window.location.href)}`;
      window.location.href = loginUrl;
      return;
    }

    switchApp(targetApp);
  };

  const getCrossAppLink = (targetApp: 'promptly' | 'teach'): string => {
    const baseUrl = getAppUrl(targetApp);
    
    if (!isAuthenticated) {
      return `${baseUrl}/auth/login?returnTo=${encodeURIComponent(window.location.href)}`;
    }

    return baseUrl;
  };

  return {
    navigateToApp,
    getCrossAppLink,
    currentApp,
    isAuthenticated
  };
};
