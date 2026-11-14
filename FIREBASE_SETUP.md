# SHOKHORA (শখোরা) — FIREBASE INTEGRATION & SETUP GUIDE

This step-by-step guide explains how to connect a production Google Firebase project to SHOKHORA E-Commerce.

---

## 1. CREATE FIREBASE PROJECT

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and name it `shokhora-ecommerce` (or your preferred name).
3. Disable Google Analytics (optional) or leave it enabled, then click **Create project**.

---

## 2. CONFIGURE AUTHENTICATION

1. In the Firebase console left menu, click **Authentication** > **Get started**.
2. Under the **Sign-in method** tab, enable **Email/Password**.
3. Under the **Settings** > **Authorized domains** tab, ensure `localhost` is listed, and add your custom production domain (e.g. `shokhora.com`).

---

## 3. CONFIGURE CLOUD FIRESTORE

1. In the Firebase console, click **Firestore Database** > **Create database**.
2. Select your server location (recommended for Bangladesh: `asia-south1` Mumbai or `asia-southeast1` Singapore for lowest latency).
3. Choose **Production mode**.
4. Click **Rules** tab, paste the contents of `firestore.rules`, and click **Publish**.
5. Click **Indexes** tab, paste `firestore.indexes.json` or deploy via Firebase CLI.

---

## 4. CONFIGURE FIREBASE STORAGE

1. In the Firebase console, click **Storage** > **Get started**.
2. Select bucket location matching your Firestore database.
3. Allow public read on product images:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 5. GENERATE SERVICE ACCOUNT FOR SERVER ACTIONS

1. In the Firebase console, navigate to **Project settings** (gear icon) > **Service accounts**.
2. Click **Generate new private key** and confirm.
3. A JSON file will download. Open the file and copy:
   - `project_id`
   - `client_email`
   - `private_key`

---

## 6. UPDATE ENVIRONMENT VARIABLES

Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="shokhora-ecommerce.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="shokhora-ecommerce"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="shokhora-ecommerce.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abcdef"

# Server Admin SDK
FIREBASE_PROJECT_ID="shokhora-ecommerce"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@shokhora-ecommerce.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"

# Payment Gateway (Optional / Sandbox)
SSLCOMMERZ_STORE_ID=""
SSLCOMMERZ_STORE_PASSWORD=""
SSLCOMMERZ_IS_LIVE=false
```

---

## 7. OFFLINE / LOCAL TESTING WITHOUT FIREBASE

SHOKHORA includes a resilient hybrid persistence layer. If `.env.local` credentials are not yet supplied, the application automatically uses local state persistence with initial mock data. This allows full testing of the storefront, cart, checkout, admin portal, inventory audit, and receipt generation out of the box!
