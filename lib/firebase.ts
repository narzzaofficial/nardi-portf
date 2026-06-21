import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const isFirebaseConfigured = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

// Prevent re-initialization on hot reload in dev
// If no API key is provided, we skip initialization so the server doesn't crash with auth/invalid-api-key
const app = getApps().length
  ? getApp()
  : (isFirebaseConfigured ? initializeApp(firebaseConfig) : null as any);

export const auth = isFirebaseConfigured ? getAuth(app) : null as any;
export const db = isFirebaseConfigured ? getFirestore(app) : null as any;
export default app;
