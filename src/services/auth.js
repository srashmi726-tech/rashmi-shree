import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

import { auth, googleProvider } from '../firebase/firebase.js';

const SESSION_STORAGE_KEY = 'rashmi-shree-session';
const memoryStore = {};

function getStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }

  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : null;
    },
    setItem(key, value) {
      memoryStore[key] = String(value);
    },
    removeItem(key) {
      delete memoryStore[key];
    }
  };
}

export const DEMO_ACCOUNTS = {
  buyer: {
    role: 'buyer',
    email: 'buyer@example.com',
    password: 'buyer123',
    name: 'Buyer Demo'
  },
  seller: {
    role: 'seller',
    email: 'seller@example.com',
    password: 'seller123',
    name: 'Seller Demo'
  },
  admin: {
    role: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin Demo'
  }
};

export function saveStoredSession(session) {
  const storage = getStorage();
  storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  return session;
}

export function getStoredSession() {
  const storage = getStorage();
  const rawValue = storage.getItem(SESSION_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    storage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }
}

export function clearStoredSession() {
  const storage = getStorage();
  storage.removeItem(SESSION_STORAGE_KEY);
}

export function getUserRole(email) {
  const normalizedEmail = (email || '').trim().toLowerCase();

  const matchedAccount = Object.values(DEMO_ACCOUNTS).find(
    (account) => account.email === normalizedEmail
  );

  if (matchedAccount) {
    return matchedAccount.role;
  }

  if (normalizedEmail.includes('seller')) {
    return 'seller';
  }

  if (normalizedEmail.includes('admin')) {
    return 'admin';
  }

  return 'buyer';
}

export function canUseFirebaseAuth() {
  const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
  const apiKey = env.VITE_FIREBASE_API_KEY;
  const authDomain = env.VITE_FIREBASE_AUTH_DOMAIN;
  const projectId = env.VITE_FIREBASE_PROJECT_ID;

  return Boolean(apiKey && authDomain && projectId && apiKey !== 'demo-api-key');
}

function mapFirebaseError(error) {
  switch (error?.code) {
    case 'auth/invalid-email':
      return 'Enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
      return 'No account matches that email.';
    case 'auth/wrong-password':
      return 'Password is incorrect.';
    case 'auth/invalid-credential':
      return 'Email or password is invalid.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was cancelled.';
    default:
      return error?.message || 'Unable to sign in right now. Please try again.';
  }
}

function buildSessionFromUser(user, role = getUserRole(user?.email || '')) {
  return {
    ok: true,
    source: 'firebase',
    user: {
      email: user?.email || '',
      role,
      name: user?.displayName || (user?.email ? user.email.split('@')[0] : 'User')
    },
    authenticatedAt: new Date().toISOString()
  };
}

export async function signInWithEmailPassword(email, password) {
  const normalizedEmail = (email || '').trim().toLowerCase();
  const normalizedPassword = (password || '').trim();

  if (!canUseFirebaseAuth()) {
    return authenticateDemoUser(normalizedEmail, normalizedPassword);
  }

  try {
    const credential = await signInWithEmailAndPassword(auth, normalizedEmail, normalizedPassword);
    const session = buildSessionFromUser(credential.user, getUserRole(credential.user.email));

    saveStoredSession(session);
    return session;
  } catch (error) {
    return {
      ok: false,
      message: mapFirebaseError(error)
    };
  }
}

export async function signInWithGoogle() {
  if (!canUseFirebaseAuth()) {
    return authenticateDemoUser(DEMO_ACCOUNTS.buyer.email, DEMO_ACCOUNTS.buyer.password);
  }

  try {
    const credential = await signInWithPopup(auth, googleProvider);
    const session = buildSessionFromUser(credential.user, getUserRole(credential.user.email));

    saveStoredSession(session);
    return session;
  } catch (error) {
    return {
      ok: false,
      message: mapFirebaseError(error)
    };
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
  } finally {
    clearStoredSession();
  }
}

export function authenticateDemoUser(email, password) {
  const normalizedEmail = (email || '').trim().toLowerCase();
  const normalizedPassword = (password || '').trim();

  const matchedAccount = Object.values(DEMO_ACCOUNTS).find(
    (account) =>
      account.email === normalizedEmail && account.password === normalizedPassword
  );

  if (!matchedAccount) {
    return {
      ok: false,
      message: 'Use one of the demo credentials shown below to continue.'
    };
  }

  const session = {
    ok: true,
    user: {
      email: matchedAccount.email,
      role: matchedAccount.role,
      name: matchedAccount.name
    },
    authenticatedAt: new Date().toISOString()
  };

  saveStoredSession(session);

  return session;
}
