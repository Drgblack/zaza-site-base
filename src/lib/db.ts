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
      query, where, orderBy, limit, getDocs, arrayUnion, serverTimestamp 
    } = await import('firebase/firestore');
    
    return {
      doc, getDoc, setDoc, updateDoc, addDoc, collection,
      query, where, orderBy, limit, getDocs, arrayUnion, serverTimestamp
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