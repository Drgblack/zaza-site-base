import { auth } from './firebase';

// Stub functions for when Firebase is not available
export const signInWithGoogle = async () => {
  if (!auth || typeof window === 'undefined') {
    throw new _error('Authentication not available');
  }
  
  try {
    const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
    const googleProvider = new GoogleAuthProvider();
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
    
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (_error) {
    console._error('_error signing in with Google:', _error);
    throw _error;
  }
};

export const signOutUser = async () => {
  if (!auth) {
    return;
  }
  
  try {
    const { signOut } = await import('firebase/auth');
    await signOut(auth);
  } catch (_error) {
    console._error('_error signing out:', _error);
    throw _error;
  }
};

export const onAuthStateChange = (callback: (_user: unknown) => void) => {
  if (!auth) {
    callback(null);
    return () => {};
  }
  
  try {
    const { onAuthStateChanged } = require('firebase/auth');
    return onAuthStateChanged(auth, callback);
  } catch (_error) {
    callback(null);
    return () => {};
  }
};

