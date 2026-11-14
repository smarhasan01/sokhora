# SHOKHORA (শখোরা) — Production Deployment Guide

This guide covers deployment options for the SHOKHORA e-commerce platform to ensure optimal performance, high availability, and airtight security across Bangladeshi and international infrastructure.

---

## 1. Prerequisites & Environment Setup

Ensure the following tools are available:
- **Node.js**: v18.17.0 or v20+ LTS
- **npm**: v9+ or **pnpm** v8+
- **Firebase CLI**: `npm install -g firebase-tools` (for deploying security rules and indexes)

### Required Production Environment Variables
Configure these variables in your hosting provider's environment settings:

```env
# Node Environment
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://shokhora.com

# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=shokhora-store.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=shokhora-store
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=shokhora-store.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Firebase Admin SDK (Private Server-Side Only)
FIREBASE_PROJECT_ID=shokhora-store
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@shokhora-store.iam.gserviceaccount.com
# Note: Keep the raw multiline private key formatted with literal \n escapes:
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"

# Admin Bootstrap Secret
ADMIN_REGISTRATION_SECRET=YourSuperSecretKey2026!

# Online Payment Gateway (SSLCOMMERZ — Bangladesh)
SSLCOMMERZ_STORE_ID=shokhora_live
SSLCOMMERZ_STORE_PASS=your_live_store_passwd
SSLCOMMERZ_IS_SANDBOX=false
SSLCOMMERZ_INITIATE_URL=https://securepay.sslcommerz.com/gwprocess/v4/api.php
SSLCOMMERZ_VALIDATION_URL=https://securepay.sslcommerz.com/validator/api/validationserverAPI.php
```

---

## 2. Option A: Deploy to Vercel (Recommended)

Vercel provides native edge-caching, automated SSL, global CDN, and zero-configuration Next.js App Router support.

### Step 1: Connect Git Repository
1. Push the code to GitHub, GitLab, or Bitbucket.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `shokhora-ecommerce` repository.

### Step 2: Configure Build Settings
- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Step 3: Add Environment Variables
1. Expand **Environment Variables** in the Vercel project setup.
2. Add each key from the table above.
3. Make sure `FIREBASE_PRIVATE_KEY` preserves newline formatting (wrap in quotes or paste raw).

### Step 4: Deploy & Add Custom Domain
1. Click **Deploy**.
2. Once the build finishes, navigate to **Project Settings > Domains**.
3. Add your custom domain: `shokhora.com` and `www.shokhora.com`.
4. Update your domain DNS records:
   - `A` record pointing `@` to `76.76.21.21`
   - `CNAME` record pointing `www` to `cname.vercel-dns.com`

---

## 3. Option B: Docker Containerization (VPS / Cloud Run / Kubernetes)

For self-hosting on DigitalOcean, AWS EC2, Hetzner, or Google Cloud Run, use the following production multi-stage Docker build:

### Create `Dockerfile`
```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
```

### Enable Standalone Output in `next.config.mjs`
If deploying via Docker, configure standalone output:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
    ],
  },
};
export default nextConfig;
```

### Build & Run Container
```bash
# Build the Docker image
docker build -t shokhora-web:latest .

# Run container with environment file
docker run -d \
  --name shokhora-web \
  -p 3000:3000 \
  --env-file .env.production \
  --restart unless-stopped \
  shokhora-web:latest
```

---

## 4. Option C: Nginx Reverse Proxy with SSL (Ubuntu VPS)

If hosting on a Linux VPS with Nginx and Let's Encrypt Certbot:

### Nginx Configuration (`/etc/nginx/sites-available/shokhora.com`)
```nginx
server {
    listen 80;
    server_name shokhora.com www.shokhora.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name shokhora.com www.shokhora.com;

    ssl_certificate /etc/letsencrypt/live/shokhora.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/shokhora.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Gzip Compression
    gzip on;
    gzip_proxied any;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /images {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 30d;
        add_header Cache-Control "public, max-age=2592000";
    }

    location /fonts {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site & install SSL:
```bash
sudo ln -s /etc/nginx/sites-available/shokhora.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d shokhora.com -d www.shokhora.com
```

---

## 5. Firebase Security Rules & Indexes Deployment

Deploy the pre-configured production Firestore rules and composite indexes:

```bash
# Login to Firebase
firebase login

# Select or switch to production project
firebase use shokhora-store

# Deploy Firestore Security Rules & Indexes
firebase deploy --only firestore:rules,firestore:indexes

# Deploy Storage Security Rules (if using Firebase Storage)
firebase deploy --only storage
```

---

## 6. Post-Deployment Verification Checklist

1. **Brand Identity & Fonts**:
   - Verify the original SHOKHORA logo loads crisply from `/images/Logo-01.png`.
   - Verify Bengali font (`kalpurush.ttf`) renders properly on product descriptions and printable invoices.
2. **Checkout Flow**:
   - Place a test order using **Cash on Delivery**. Verify stock decrements correctly.
   - Place a test order using **bKash manual payment** with a dummy TrxID. Check that the order enters `Pending` status and payment shows `Unpaid`.
3. **Admin Verification**:
   - Log into `/admin` using the authorized admin email.
   - Verify the order appears in `/admin/orders`.
   - Verify the bKash TrxID in the order detail modal and mark payment as `Paid`.
   - Verify the Money Receipt regenerates with a green **VERIFIED** stamp and can be printed/downloaded in A4 or Thermal slip layout.
4. **Order Cancellation & Stock Restoration**:
   - Cancel a test order from the admin panel.
   - Verify that product stock is atomically restored in `/admin/inventory` and logged in the inventory movement history.
5. **Mobile Responsiveness**:
   - Test on iOS Safari, Android Chrome, and Desktop Chrome.
