import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { User } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Timestamp;
  lastLogin: Timestamp;
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
  createdAt: Timestamp;
  rating?: number;
  isShared: boolean;
  shareId?: string;
}

export interface SharedSnippet extends SavedSnippet {
  authorName: string;
  authorId: string;
  shareCount: number;
  saveCount: number;
  sharedAt: Timestamp;
  isAnonymous: boolean;
}

export interface SnippetRating {
  snippetId: string;
  userId: string;
  rating: number; // 1 for thumbs up, -1 for thumbs down
  createdAt: Timestamp;
}

// User Profile Functions
export const createOrUpdateUserProfile = async (user: User) => {
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
      createdAt: serverTimestamp() as Timestamp,
      lastLogin: serverTimestamp() as Timestamp,
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
  const ratingData: SnippetRating = {
    snippetId,
    userId,
    rating,
    createdAt: serverTimestamp() as Timestamp
  };

  await addDoc(collection(db, 'snippet_ratings'), ratingData);
};

export const getSnippetRating = async (snippetId: string, userId: string): Promise<number | null> => {
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
    sharedAt: serverTimestamp() as Timestamp,
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