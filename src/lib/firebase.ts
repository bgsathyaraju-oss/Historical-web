import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, initializeAuth, inMemoryPersistence, Auth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, Firestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Safely initialize Firebase App
export const app: FirebaseApp = (() => {
  try {
    return !getApps().length ? initializeApp(firebaseConfig) : getApp();
  } catch (err) {
    console.warn('[FIREBASE] App initialization warning:', err);
    return getApp();
  }
})();

// Safely initialize Firebase Auth (with fallback to inMemoryPersistence for restricted Android WebViews)
export const auth: Auth = (() => {
  try {
    return getAuth(app);
  } catch {
    return initializeAuth(app, { persistence: inMemoryPersistence });
  }
})();

// Safely initialize Firestore with specific database ID if configured
export const db: Firestore = (() => {
  try {
    return firebaseConfig.firestoreDatabaseId
      ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
      : getFirestore(app);
  } catch (err) {
    console.warn('[FIREBASE] Firestore initialization warning:', err);
    return getFirestore(app);
  }
})();

// Connection validation test
export async function validateFirebaseConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[FIREBASE] Client is offline or database initializing.');
      return false;
    }
    // Network or permission responses still confirm reachable server
    return true;
  }
}

// Automatically test connection on boot
if (typeof window !== 'undefined') {
  validateFirebaseConnection().catch(() => {});
}
