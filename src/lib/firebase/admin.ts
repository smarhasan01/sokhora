import * as admin from 'firebase-admin';

let adminApp: admin.app.App | null = null;
let adminDb: admin.firestore.Firestore | null = null;
let adminAuth: admin.auth.Auth | null = null;
let adminStorage: admin.storage.Storage | null = null;

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

export const isFirebaseAdminConfigured = Boolean(
  projectId && clientEmail && privateKey && !clientEmail.includes('your_')
);

if (isFirebaseAdminConfigured) {
  try {
    if (admin.apps.length > 0) {
      adminApp = admin.app();
    } else {
      adminApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    }

    adminDb = adminApp.firestore();
    adminAuth = adminApp.auth();
    adminStorage = adminApp.storage();
  } catch (error) {
    console.warn('Firebase admin initialization warning:', error);
  }
}

export { adminApp, adminDb, adminAuth, adminStorage };
