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