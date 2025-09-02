'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange } from '@/lib/auth';
import { createOrUpdateUserProfile } from '@/lib/db';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const processReferralOnSignup = async (newUserUid: string) => {
  try {
    const referralCode = document.cookie
      .split('; ')
      .find(row => row.startsWith('referral_code='))
      ?.split('=')[1];
    
    if (referralCode) {
      await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referralCode, newUserUid })
      });
      
      // Clear the referral cookie
      document.cookie = 'referral_code=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }
  } catch (error) {
    console.error('Error processing referral:', error);
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasProcessedReferral, setHasProcessedReferral] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setUser(user);
      
      if (user && !hasProcessedReferral) {
        try {
          // Create or update user profile first
          await createOrUpdateUserProfile(user);
          
          // Process referral if exists
          await processReferralOnSignup(user.uid);
          
          // Update daily streak
          await fetch('/api/gamification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'update_streak', uid: user.uid })
          });
          
          setHasProcessedReferral(true);
        } catch (error) {
          console.error('Error processing user authentication:', error);
        }
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [hasProcessedReferral]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
