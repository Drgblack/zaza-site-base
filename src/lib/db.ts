import { db } from './firebase';
import { User } from 'firebase/auth';

// Import Firebase functions dynamically to avoid build-time issues
const getFirebaseFunctions = async () => {
  if (!db || typeof window === 'undefined') {
    return null;
  }
  
  try {
    const { 
      doc, getDoc, setDoc, updateDoc, addDoc, collection, 
      query, where, orderBy, limit, getDocs, arrayUnion, serverTimestamp, increment
    } = await import('firebase/firestore');
    
    return {
      doc, getDoc, setDoc, updateDoc, addDoc, collection,
      query, where, orderBy, limit, getDocs, arrayUnion, serverTimestamp, increment
    };
  } catch (error) {
    console.warn('Firebase functions not available:', error);
    return null;
  }
};

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: any;
  lastLogin: any;
  savedSnippets: string[];
  downloadHistory: string[];
  referralCredits: number;
  referralCode: string;
  isTeacher: boolean;
  school?: string;
  subject?: string;
  // Phase 8: Time tracking and insights
  totalTimeSaved: number; // in minutes
  monthlyTimeSaved: number; // in minutes
  snippetsGenerated: number;
  customSnippets: string[]; // IDs of custom uploaded snippets
  // Phase 10: Referral and Gamification
  referredUsers: string[]; // UIDs of users they referred
  referredBy?: string; // UID of user who referred them
  streakDays: number; // consecutive days of usage
  lastActiveDate?: any;
  achievements: string[]; // achievement badges earned
  totalPoints: number; // gamification points
  level: number; // user level based on activity
  // Phase 11: Institutional Features
  organizationId?: string; // Organization membership
  role?: 'super_admin' | 'admin' | 'teacher' | 'viewer';
  department?: string;
  grade?: string;
  isActive: boolean;
  lastSeenAt?: any;
}

export interface SavedSnippet {
  id: string;
  userId: string;
  content: string;
  tone: string;
  category: string;
  context: string;
  createdAt: any;
  rating?: number;
  isShared: boolean;
  shareId?: string;
}

export interface SharedSnippet extends SavedSnippet {
  authorName: string;
  authorId: string;
  shareCount: number;
  saveCount: number;
  sharedAt: any;
  isAnonymous: boolean;
}

export interface SnippetRating {
  snippetId: string;
  userId: string;
  rating: number; // 1 for thumbs up, -1 for thumbs down
  createdAt: any;
}

// Phase 8: Custom Snippets
export interface CustomSnippet {
  id: string;
  userId: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  usageCount: number;
  createdAt: any;
  updatedAt: any;
}

// Phase 8: Analytics
export interface AnalyticsData {
  totalSnippets: number;
  totalUsers: number;
  totalTimeSaved: number;
  popularTones: { tone: string; count: number }[];
  popularCategories: { category: string; count: number }[];
  monthlyStats: {
    month: string;
    snippetsGenerated: number;
    timeSaved: number;
    newUsers: number;
  }[];
  topSnippets: {
    snippetId: string;
    content: string;
    usageCount: number;
    rating: number;
  }[];
}

// Phase 10: Referral and Gamification Interfaces
export interface ReferralData {
  referrerUid: string;
  referredUid: string;
  referralCode: string;
  completedAt: any;
  rewardClaimed: boolean;
  conversionType: 'signup' | 'first_snippet' | 'premium';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'referral' | 'usage' | 'streak' | 'social' | 'milestone';
  requirement: number;
  pointsReward: number;
}

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  photoURL?: string;
  score: number;
  rank: number;
  badge?: string;
}

// Phase 11: Institutional Interfaces
export interface Organization {
  id: string;
  name: string;
  type: 'school' | 'district' | 'university' | 'enterprise';
  domain?: string;
  logo?: string;
  adminUsers: string[];
  memberCount: number;
  activeSeats: number;
  totalSeats: number;
  settings: OrganizationSettings;
  subscription?: SubscriptionInfo;
  createdAt: any;
  updatedAt: any;
  createdBy: string;
}

export interface OrganizationSettings {
  allowPublicSharing: boolean;
  requireApproval: boolean;
  customBranding: boolean;
  ssoEnabled: boolean;
  domainRestricted: boolean;
  allowedDomains: string[];
  defaultRole: 'teacher' | 'viewer';
  contentFiltering: boolean;
  analyticsEnabled: boolean;
}

export interface SubscriptionInfo {
  planId: string;
  planName: string;
  seats: number;
  price: number;
  billingCycle: 'monthly' | 'annual';
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  currentPeriodStart: any;
  currentPeriodEnd: any;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
}

export interface OrganizationMember {
  userId: string;
  organizationId: string;
  role: 'super_admin' | 'admin' | 'teacher' | 'viewer';
  department?: string;
  grade?: string;
  joinedAt: any;
  invitedBy?: string;
  status: 'active' | 'invited' | 'suspended';
}

export interface SharedSnippetBank {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  snippets: string[]; // snippet IDs
  createdBy: string;
  createdAt: any;
  updatedAt: any;
  permissions: {
    canView: string[]; // user IDs or roles
    canEdit: string[]; // user IDs or roles
    canShare: string[]; // user IDs or roles
  };
}

export interface OrganizationAnalytics {
  organizationId: string;
  period: string; // e.g., '2024-01'
  activeUsers: number;
  totalSnippets: number;
  totalTimeSaved: number;
  topUsers: {
    userId: string;
    displayName: string;
    snippetsGenerated: number;
    timeSaved: number;
  }[];
  topCategories: {
    category: string;
    count: number;
  }[];
  usageByDepartment: {
    department: string;
    userCount: number;
    snippetCount: number;
  }[];
}

// User Profile Functions
export const createOrUpdateUserProfile = async (user: User): Promise<UserProfile> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    throw new Error('Firebase not available');
  }

  const { doc, getDoc, setDoc, updateDoc, serverTimestamp } = firebase;
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);

  const referralCode = `TEACH${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  if (!userDoc.exists()) {
    // Create new user profile
    const newProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName || 'Teacher',
      photoURL: user.photoURL || undefined,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      savedSnippets: [],
      downloadHistory: [],
      referralCredits: 0,
      referralCode,
      isTeacher: true,
      school: undefined,
      subject: undefined,
      // Phase 8: Initialize new fields
      totalTimeSaved: 0,
      monthlyTimeSaved: 0,
      snippetsGenerated: 0,
      customSnippets: [],
      // Phase 10: Initialize referral and gamification fields
      referredUsers: [],
      streakDays: 1,
      lastActiveDate: serverTimestamp(),
      achievements: [],
      totalPoints: 0,
      level: 1,
      // Phase 11: Initialize institutional fields
      isActive: true,
      lastSeenAt: serverTimestamp(),
    };

    await setDoc(userRef, newProfile);
    return newProfile;
  } else {
    // Update last login
    await updateDoc(userRef, {
      lastLogin: serverTimestamp()
    });
    return userDoc.data() as UserProfile;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return null;
  }

  const { doc, getDoc } = firebase;
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists()) {
    return userDoc.data() as UserProfile;
  }
  return null;
};

// Snippet Functions
export const saveSnippetToLibrary = async (
  userId: string, 
  snippet: Omit<SavedSnippet, 'id' | 'userId' | 'createdAt' | 'isShared'>
): Promise<string> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    throw new Error('Database not available');
  }

  const { doc, addDoc, collection, updateDoc, arrayUnion, serverTimestamp } = firebase;
  const snippetData = {
    ...snippet,
    userId,
    createdAt: serverTimestamp(),
    isShared: false
  };

  const docRef = await addDoc(collection(db, 'snippets'), snippetData);
  
  // Add to user's saved snippets
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    savedSnippets: arrayUnion(docRef.id)
  });

  return docRef.id;
};

export const getUserSnippets = async (userId: string): Promise<SavedSnippet[]> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return [];
  }

  const { query, collection, where, orderBy, getDocs } = firebase;
  const q = query(
    collection(db, 'snippets'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as SavedSnippet[];
};

// Snippet Rating Functions
export const rateSnippet = async (snippetId: string, userId: string, rating: number) => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    throw new Error('Database not available');
  }

  const { addDoc, collection, serverTimestamp } = firebase;
  const ratingData: SnippetRating = {
    snippetId,
    userId,
    rating,
    createdAt: serverTimestamp()
  };

  await addDoc(collection(db, 'snippet_ratings'), ratingData);
};

export const getSnippetRating = async (snippetId: string, userId: string): Promise<number | null> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return null;
  }

  const { query, collection, where, limit, getDocs } = firebase;
  const q = query(
    collection(db, 'snippet_ratings'),
    where('snippetId', '==', snippetId),
    where('userId', '==', userId),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data().rating;
  }
  return null;
};

// Sharing Functions
export const shareSnippet = async (
  snippetId: string, 
  isAnonymous: boolean = false
): Promise<string> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    throw new Error('Database not available');
  }

  const { doc, getDoc, addDoc, collection, updateDoc, serverTimestamp } = firebase;
  const snippetRef = doc(db, 'snippets', snippetId);
  const snippetDoc = await getDoc(snippetRef);
  
  if (!snippetDoc.exists()) {
    throw new Error('Snippet not found');
  }

  const snippetData = snippetDoc.data() as SavedSnippet;
  const userProfile = await getUserProfile(snippetData.userId);
  
  if (!userProfile) {
    throw new Error('User not found');
  }

  const shareId = `share_${Math.random().toString(36).substring(2, 15)}`;
  
  const sharedSnippet: SharedSnippet = {
    ...snippetData,
    shareId,
    authorName: isAnonymous ? 'Anonymous' : userProfile.displayName,
    authorId: userProfile.uid,
    shareCount: 0,
    saveCount: 0,
    sharedAt: serverTimestamp(),
    isAnonymous
  };

  await addDoc(collection(db, 'shared_snippets'), sharedSnippet);
  
  // Update original snippet
  await updateDoc(snippetRef, {
    isShared: true,
    shareId
  });

  return shareId;
};

export const getSharedSnippets = async (): Promise<SharedSnippet[]> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return [];
  }

  const { query, collection, orderBy, limit, getDocs } = firebase;
  const q = query(
    collection(db, 'shared_snippets'),
    orderBy('sharedAt', 'desc'),
    limit(50)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as SharedSnippet[];
};

export const getSharedSnippetByShareId = async (shareId: string): Promise<SharedSnippet | null> => {
  // Skip Firebase calls during build
  if (!db || (typeof process !== 'undefined' && process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)) {
    return null;
  }

  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return null;
  }

  const { query, collection, where, limit, getDocs } = firebase;
  const q = query(
    collection(db, 'shared_snippets'),
    where('shareId', '==', shareId),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as SharedSnippet;
  }
  return null;
};

// Phase 8: Custom Snippet Functions
export const createCustomSnippet = async (
  userId: string,
  snippet: Omit<CustomSnippet, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'usageCount'>
): Promise<string> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    throw new Error('Database not available');
  }

  const { addDoc, collection, updateDoc, doc, arrayUnion, serverTimestamp } = firebase;
  const snippetData = {
    ...snippet,
    userId,
    usageCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  const docRef = await addDoc(collection(db, 'custom_snippets'), snippetData);
  
  // Add to user's custom snippets
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    customSnippets: arrayUnion(docRef.id)
  });

  return docRef.id;
};

export const getUserCustomSnippets = async (userId: string): Promise<CustomSnippet[]> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return [];
  }

  const { query, collection, where, orderBy, getDocs } = firebase;
  const q = query(
    collection(db, 'custom_snippets'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as CustomSnippet[];
};

// Phase 8: Time Tracking Functions
export const trackSnippetGeneration = async (userId: string, estimatedTimeSaved: number = 15) => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return;
  }

  const { doc, updateDoc, increment, serverTimestamp } = firebase;
  const userRef = doc(db, 'users', userId);
  
  // Update time tracking and snippet count
  await updateDoc(userRef, {
    totalTimeSaved: increment(estimatedTimeSaved),
    monthlyTimeSaved: increment(estimatedTimeSaved),
    snippetsGenerated: increment(1),
    lastLogin: serverTimestamp()
  });
};

// Phase 8: Analytics Functions
export const getAnalyticsData = async (): Promise<AnalyticsData> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return {
      totalSnippets: 0,
      totalUsers: 0,
      totalTimeSaved: 0,
      popularTones: [],
      popularCategories: [],
      monthlyStats: [],
      topSnippets: []
    };
  }

  const { collection, getDocs, query, orderBy, limit } = firebase;
  
  // Get basic counts
  const [snippetsSnapshot, usersSnapshot] = await Promise.all([
    getDocs(collection(db, 'snippets')),
    getDocs(collection(db, 'users'))
  ]);

  const totalSnippets = snippetsSnapshot.size;
  const totalUsers = usersSnapshot.size;
  
  // Calculate total time saved
  let totalTimeSaved = 0;
  usersSnapshot.forEach(doc => {
    const userData = doc.data();
    totalTimeSaved += userData.totalTimeSaved || 0;
  });

  // Get popular tones and categories
  const toneCounts: { [key: string]: number } = {};
  const categoryCounts: { [key: string]: number } = {};
  
  snippetsSnapshot.forEach(doc => {
    const data = doc.data();
    toneCounts[data.tone] = (toneCounts[data.tone] || 0) + 1;
    categoryCounts[data.category] = (categoryCounts[data.category] || 0) + 1;
  });

  const popularTones = Object.entries(toneCounts)
    .map(([tone, count]) => ({ tone, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const popularCategories = Object.entries(categoryCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalSnippets,
    totalUsers,
    totalTimeSaved,
    popularTones,
    popularCategories,
    monthlyStats: [], // TODO: Implement monthly stats
    topSnippets: [] // TODO: Implement top snippets
  };
};

// Phase 10: Referral Functions
export const processReferral = async (
  referralCode: string, 
  newUserUid: string
): Promise<boolean> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return false;
  }

  const { query, collection, where, limit, getDocs, doc, updateDoc, arrayUnion, addDoc, serverTimestamp, increment } = firebase;
  
  // Find the referrer by referral code
  const q = query(
    collection(db, 'users'),
    where('referralCode', '==', referralCode),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return false;
  }

  const referrerDoc = querySnapshot.docs[0];
  const referrerUid = referrerDoc.id;

  // Update referrer - add to referred users and give credits
  const referrerRef = doc(db, 'users', referrerUid);
  await updateDoc(referrerRef, {
    referredUsers: arrayUnion(newUserUid),
    referralCredits: increment(5),
    totalPoints: increment(100)
  });

  // Update new user - set referredBy
  const newUserRef = doc(db, 'users', newUserUid);
  await updateDoc(newUserRef, {
    referredBy: referrerUid
  });

  // Create referral record
  await addDoc(collection(db, 'referrals'), {
    referrerUid,
    referredUid: newUserUid,
    referralCode,
    completedAt: serverTimestamp(),
    rewardClaimed: false,
    conversionType: 'signup'
  } as Omit<ReferralData, 'id'>);

  return true;
};

export const getReferralStats = async (uid: string) => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return { referredCount: 0, creditsEarned: 0 };
  }

  const { doc, getDoc } = firebase;
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    return { referredCount: 0, creditsEarned: 0 };
  }

  const userData = userDoc.data() as UserProfile;
  return {
    referredCount: userData.referredUsers?.length || 0,
    creditsEarned: userData.referralCredits || 0,
    referralCode: userData.referralCode
  };
};

// Phase 10: Gamification Functions
export const updateUserStreak = async (uid: string): Promise<number> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return 1;
  }

  const { doc, getDoc, updateDoc, serverTimestamp } = firebase;
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    return 1;
  }

  const userData = userDoc.data() as UserProfile;
  const lastActive = userData.lastActiveDate?.toDate() || new Date();
  const today = new Date();
  const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
  
  let newStreak = 1;
  if (daysDiff === 0) {
    // Same day, no change
    newStreak = userData.streakDays || 1;
  } else if (daysDiff === 1) {
    // Consecutive day, increment streak
    newStreak = (userData.streakDays || 0) + 1;
  } else {
    // Streak broken, reset to 1
    newStreak = 1;
  }

  await updateDoc(userRef, {
    streakDays: newStreak,
    lastActiveDate: serverTimestamp()
  });

  return newStreak;
};

export const awardAchievement = async (uid: string, achievementId: string): Promise<boolean> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return false;
  }

  const { doc, getDoc, updateDoc, arrayUnion, increment } = firebase;
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    return false;
  }

  const userData = userDoc.data() as UserProfile;
  const achievements = userData.achievements || [];
  
  if (achievements.includes(achievementId)) {
    return false; // Already has this achievement
  }

  // Award achievement and points
  const pointsReward = getAchievementPoints(achievementId);
  await updateDoc(userRef, {
    achievements: arrayUnion(achievementId),
    totalPoints: increment(pointsReward)
  });

  return true;
};

const getAchievementPoints = (achievementId: string): number => {
  const pointsMap: { [key: string]: number } = {
    'first_referral': 50,
    'referral_champion': 200,
    'week_streak': 75,
    'month_streak': 300,
    'hundred_snippets': 150,
    'time_master': 250
  };
  return pointsMap[achievementId] || 25;
};

export const getLeaderboard = async (limit: number = 10): Promise<LeaderboardEntry[]> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return [];
  }

  const { query, collection, orderBy, limit: queryLimit, getDocs } = firebase;
  const q = query(
    collection(db, 'users'),
    orderBy('totalPoints', 'desc'),
    queryLimit(limit)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc, index) => {
    const data = doc.data() as UserProfile;
    return {
      uid: doc.id,
      displayName: data.displayName,
      photoURL: data.photoURL,
      score: data.totalPoints || 0,
      rank: index + 1,
      badge: getTopBadge(data.achievements || [])
    };
  });
};

const getTopBadge = (achievements: string[]): string | undefined => {
  const badgePriority = [
    'referral_champion',
    'time_master', 
    'month_streak',
    'hundred_snippets',
    'week_streak',
    'first_referral'
  ];
  
  for (const badge of badgePriority) {
    if (achievements.includes(badge)) {
      return badge;
    }
  }
  return undefined;
};

// Phase 11: Organizational Functions
export const createOrganization = async (
  orgData: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>,
  createdByUserId: string
): Promise<string> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    throw new Error('Database not available');
  }

  const { addDoc, collection, serverTimestamp } = firebase;
  
  const organization: Omit<Organization, 'id'> = {
    ...orgData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: createdByUserId
  };

  const docRef = await addDoc(collection(db, 'organizations'), organization);
  return docRef.id;
};

export const getOrganization = async (orgId: string): Promise<Organization | null> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return null;
  }

  const { doc, getDoc } = firebase;
  const orgRef = doc(db, 'organizations', orgId);
  const orgDoc = await getDoc(orgRef);
  
  if (orgDoc.exists()) {
    return { id: orgDoc.id, ...orgDoc.data() } as Organization;
  }
  return null;
};

export const addOrganizationMember = async (
  organizationId: string,
  userId: string,
  role: 'super_admin' | 'admin' | 'teacher' | 'viewer',
  invitedBy: string,
  department?: string,
  grade?: string
): Promise<void> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    throw new Error('Database not available');
  }

  const { addDoc, collection, doc, updateDoc, serverTimestamp } = firebase;
  
  // Create membership record
  const membership: Omit<OrganizationMember, 'id'> = {
    userId,
    organizationId,
    role,
    department,
    grade,
    joinedAt: serverTimestamp(),
    invitedBy,
    status: 'active'
  };

  await addDoc(collection(db, 'organization_members'), membership);

  // Update user profile
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    organizationId,
    role,
    department,
    grade
  });

  // Update organization member count
  const orgRef = doc(db, 'organizations', organizationId);
  await updateDoc(orgRef, {
    memberCount: increment(1),
    updatedAt: serverTimestamp()
  });
};

export const getOrganizationMembers = async (organizationId: string): Promise<(OrganizationMember & { userProfile?: UserProfile })[]> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return [];
  }

  const { query, collection, where, getDocs, doc, getDoc } = firebase;
  const membersQuery = query(
    collection(db, 'organization_members'),
    where('organizationId', '==', organizationId),
    where('status', '==', 'active')
  );

  const membersSnapshot = await getDocs(membersQuery);
  const members = await Promise.all(
    membersSnapshot.docs.map(async (memberDoc) => {
      const memberData = { id: memberDoc.id, ...memberDoc.data() } as OrganizationMember;
      
      // Get user profile data
      try {
        const userRef = doc(db, 'users', memberData.userId);
        const userDoc = await getDoc(userRef);
        const userProfile = userDoc.exists() ? userDoc.data() as UserProfile : undefined;
        
        return {
          ...memberData,
          userProfile
        };
      } catch (error) {
        console.error('Error fetching user profile:', error);
        return memberData;
      }
    })
  );

  return members;
};

export const getOrganizationAnalytics = async (
  organizationId: string,
  period?: string
): Promise<OrganizationAnalytics> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    throw new Error('Database not available');
  }

  const { query, collection, where, getDocs } = firebase;
  
  // Get organization members
  const membersQuery = query(
    collection(db, 'organization_members'),
    where('organizationId', '==', organizationId),
    where('status', '==', 'active')
  );

  const membersSnapshot = await getDocs(membersQuery);
  const memberIds = membersSnapshot.docs.map(doc => doc.data().userId);

  // Get user analytics for organization members
  const userAnalytics = await Promise.all(
    memberIds.map(async (userId) => {
      try {
        const userProfile = await getUserProfile(userId);
        return userProfile;
      } catch (error) {
        console.error(`Error fetching analytics for user ${userId}:`, error);
        return null;
      }
    })
  );

  const validUsers = userAnalytics.filter(user => user !== null) as UserProfile[];
  
  // Calculate analytics
  const analytics: OrganizationAnalytics = {
    organizationId,
    period: period || new Date().toISOString().slice(0, 7),
    activeUsers: validUsers.filter(user => {
      const lastActive = user.lastSeenAt?.toDate();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return lastActive && lastActive > thirtyDaysAgo;
    }).length,
    totalSnippets: validUsers.reduce((sum, user) => sum + (user.snippetsGenerated || 0), 0),
    totalTimeSaved: validUsers.reduce((sum, user) => sum + (user.totalTimeSaved || 0), 0),
    topUsers: validUsers
      .map(user => ({
        userId: user.uid,
        displayName: user.displayName,
        snippetsGenerated: user.snippetsGenerated || 0,
        timeSaved: user.totalTimeSaved || 0
      }))
      .sort((a, b) => b.snippetsGenerated - a.snippetsGenerated)
      .slice(0, 10),
    topCategories: [], // TODO: Implement category tracking
    usageByDepartment: [] // TODO: Implement department analytics
  };

  return analytics;
};

export const createSharedSnippetBank = async (
  organizationId: string,
  bankData: Omit<SharedSnippetBank, 'id' | 'createdAt' | 'updatedAt'>,
  createdBy: string
): Promise<string> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    throw new Error('Database not available');
  }

  const { addDoc, collection, serverTimestamp } = firebase;
  
  const bank: Omit<SharedSnippetBank, 'id'> = {
    ...bankData,
    organizationId,
    createdBy,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  const docRef = await addDoc(collection(db, 'shared_snippet_banks'), bank);
  return docRef.id;
};

export const getOrganizationSnippetBanks = async (organizationId: string): Promise<SharedSnippetBank[]> => {
  const firebase = await getFirebaseFunctions();
  if (!firebase) {
    return [];
  }

  const { query, collection, where, orderBy, getDocs } = firebase;
  const banksQuery = query(
    collection(db, 'shared_snippet_banks'),
    where('organizationId', '==', organizationId),
    orderBy('createdAt', 'desc')
  );

  const banksSnapshot = await getDocs(banksQuery);
  return banksSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as SharedSnippetBank[];
};