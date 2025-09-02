import { auth } from './firebase';

// Stub functions for when Firebase is not available
export const signInWithGoogle = async () => {
  if (!auth || typeof window === 'undefined') {
    throw new Error('Authentication not available');
  }
  
  try {
    const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
    const googleProvider = new GoogleAuthProvider();
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
    
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  if (!auth) {
    return;
  }
  
  try {
    const { signOut } = await import('firebase/auth');
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const onAuthStateChange = (callback: (user: any) => void) => {
  if (!auth) {
    callback(null);
    return () => {};
  }
  
  try {
    const { onAuthStateChanged } = require('firebase/auth');
    return onAuthStateChanged(auth, callback);
  } catch (error) {
    callback(null);
    return () => {};
  }
};
