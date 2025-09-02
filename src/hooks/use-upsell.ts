'use client';

import { useState, useEffect } from 'react';
import { generateUpsellRecommendation, UpsellTrigger } from '@/lib/premium-upsells';

interface UserData {
  usageCount: number;
  featuresUsed: string[];
  daysOnPlatform: number;
  engagementScore: number;
  familyMembers?: number;
  teamSize?: number;
}

interface UpsellState {
  isModalOpen: boolean;
  currentTrigger: UpsellTrigger | null;
  userData: UserData;
  hasShownUpsell: boolean;
}

export function useUpsell() {
  const [upsellState, setUpsellState] = useState<UpsellState>({
    isModalOpen: false,
    currentTrigger: null,
    userData: {
      usageCount: 0,
      featuresUsed: [],
      daysOnPlatform: 0,
      engagementScore: 0
    },
    hasShownUpsell: false
  });

  // Track user behavior
  const trackFeatureUsage = (feature: string) => {
    setUpsellState(prev => ({
      ...prev,
      userData: {
        ...prev.userData,
        usageCount: prev.userData.usageCount + 1,
        featuresUsed: prev.userData.featuresUsed.includes(feature) 
          ? prev.userData.featuresUsed 
          : [...prev.userData.featuresUsed, feature]
      }
    }));
  };

  const trackEngagement = (score: number) => {
    setUpsellState(prev => ({
      ...prev,
      userData: {
        ...prev.userData,
        engagementScore: Math.max(prev.userData.engagementScore, score)
      }
    }));
  };

  const setFamilyMembers = (count: number) => {
    setUpsellState(prev => ({
      ...prev,
      userData: {
        ...prev.userData,
        familyMembers: count
      }
    }));
  };

  const setTeamSize = (size: number) => {
    setUpsellState(prev => ({
      ...prev,
      userData: {
        ...prev.userData,
        teamSize: size
      }
    }));
  };

  // Check for upsell opportunities
  const checkUpsellOpportunity = () => {
    if (upsellState.hasShownUpsell) return;

    const trigger = generateUpsellRecommendation(upsellState.userData);
    
    if (trigger) {
      setUpsellState(prev => ({
        ...prev,
        currentTrigger: trigger,
        isModalOpen: true,
        hasShownUpsell: true
      }));
    }
  };

  // Auto-check for upsell opportunities on certain actions
  useEffect(() => {
    const { usageCount, daysOnPlatform } = upsellState.userData;
    
    // Check after significant usage milestones
    if (usageCount === 25 || usageCount === 50 || usageCount === 100) {
      setTimeout(checkUpsellOpportunity, 2000); // Delay to let user complete their action
    }
    
    // Check after time milestones
    if (daysOnPlatform === 7 || daysOnPlatform === 14 || daysOnPlatform === 30) {
      setTimeout(checkUpsellOpportunity, 1000);
    }
  }, [upsellState.userData.usageCount, upsellState.userData.daysOnPlatform]);

  // Initialize user data from localStorage or API
  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedData = localStorage.getItem('zaza-user-data');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setUpsellState(prev => ({
            ...prev,
            userData: {
              ...prev.userData,
              ...parsedData
            }
          }));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  // Save user data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('zaza-user-data', JSON.stringify(upsellState.userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }, [upsellState.userData]);

  const openUpsellModal = () => {
    setUpsellState(prev => ({
      ...prev,
      isModalOpen: true
    }));
  };

  const closeUpsellModal = () => {
    setUpsellState(prev => ({
      ...prev,
      isModalOpen: false
    }));
  };

  const resetUpsellState = () => {
    setUpsellState(prev => ({
      ...prev,
      hasShownUpsell: false
    }));
  };

  return {
    // State
    isModalOpen: upsellState.isModalOpen,
    currentTrigger: upsellState.currentTrigger,
    userData: upsellState.userData,
    
    // Actions
    trackFeatureUsage,
    trackEngagement,
    setFamilyMembers,
    setTeamSize,
    checkUpsellOpportunity,
    openUpsellModal,
    closeUpsellModal,
    resetUpsellState
  };
}
