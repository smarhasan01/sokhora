# SHOKHORA (শখোরা) — Multi-Category E-Commerce Platform

> **Brand Tagline:** *Your Choice, Our Passion.* / *আপনার পছন্দ, আমাদের ভালোবাসা।*  
> **Market:** Bangladesh (BDT ৳)  
> **Architecture:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Firebase + Hybrid In-Memory/Offline Store

A modern, production-grade e-commerce platform crafted specifically for the Bangladeshi lifestyle and fashion brand **SHOKHORA (শখোরা)**. Built from the ground up to support high-conversion shopping, guest checkout with 64 Bangladeshi districts, manual mobile financial services (bKash & Nagad) verification, atomic stock inventory management, and professional PDF/printable money receipts with Bengali Unicode font support.

---

## 🌟 Brand & Visual Identity

- **Original Logo Preserved**: The authentic SHOKHORA brand logo (`Logo-01.png`, `Logo colour-01.png`) is integrated across the storefront header, customer footer, hero section, admin portal, and official money receipts without color distortion or ratio alteration.
- **Bangladeshi Aesthetic**: Styled using a warm, neutral palette — ivory, charcoal, warm taupe, muted sage, and subtle terracotta.
- **Typography & Bengali Unicode**: Powered by Inter and Hind Siliguri for modern web typography, combined with embedded **Kalpurush** Bengali font for pixel-perfect invoice rendering of Bangla text and Bangladeshi Taka symbols (৳).
- **Mobile-First Responsiveness**: Designed for mobile shoppers across smartphones, tablets, and desktop displays.

---

## 🛍️ Brand Categories

1. **Fashion & Clothing** (শাড়ি, কুর্তি, পাঞ্জাবি ও আধুনিক পোশাক)
2. **Cosmetics & Beauty Products** (ত্বকের যত্ন ও রূপচর্চা সামগ্রী)
3. **Kids Hairbands & Hair Clips** (শিশুদের চুলের আকর্ষণীয় ক্লিপ ও ব্যান্ড)
4. **Scrunchies & Hair Accessories** (সিল্ক ও সাটিন স্ক্রাঞ্চি)
5. **Jewellery & Fashion Accessories** (আধুনিক ও ট্রেডিশনাল গহনা)
6. **Gifts & Lifestyle Products** (উপহার সামগ্রী ও লাইফস্টাইল পণ্য)
7. **Other Everyday Products** (দৈনন্দিন নিত্যপ্রয়োজনীয় পণ্য)

---

## 🚀 Key Features

### 🛒 1. Customer Storefront
- **Homepage (`/`)**:
  - Live announcement bar with free shipping threshold progress.
  - Original SHOKHORA branding with search bar, customer account link, and slide-over shopping bag.
  - Hero banner with genuine lifestyle imagery and primary call-to-actions.
  - Interactive "Shop by Category" grid.
  - Curated carousels for *Featured Products*, *New Arrivals*, and *Best Sellers*.
  - Customer trust guarantees (Fast Delivery across Bangladesh, Cash on Delivery, Easy Return Policy, 100% Genuine Quality).
  - Testimonials from verified Bangladeshi shoppers.
  - Newsletter discount subscription.
- **Shop Catalog (`/shop`)**:
  - Dynamic filtering by category, price slider, and availability status.
  - Live real-time search with instant results.
  - Multi-criteria sorting (Newest, Price: Low to High, Price: High to Low, Best Rating).
  - Pagination and stock availability badges.
- **Dynamic Category Pages (`/category/[slug]`)**:
  - Category-specific banners, breadcrumb navigation, and filtered product feeds.
- **Product Details (`/product/[slug]`)**:
  - Multi-image gallery with thumbnail selection and zoom hover.
  - Color and size variant pickers with instant stock quantity feedback.
  - Quick *Add to Cart* and instant *Buy Now* (one-click direct checkout).
  - Tabbed descriptions, delivery terms, and customer reviews.
  - Intelligent related products recommendation engine.
- **Shopping Cart (`/cart` & Slide-Out Drawer)**:
  - Persistent cart state synchronized across browser sessions.
  - Dynamic delivery charge calculation based on destination (Dhaka vs. Outside Dhaka).
  - Coupon code validation with instant discount deduction (e.g., `SHOKHORA10`, `WELCOME50`).
- **Streamlined Checkout (`/checkout`)**:
  - **Guest Checkout**: Customers can place orders without mandatory registration.
  - Bangladeshi mobile phone validation (`01XXXXXXXXX`).
  - Full dropdown coverage of all **64 Districts of Bangladesh**.
  - **Payment Options**:
    - **Cash on Delivery (COD)** (ক্যাশ অন ডেলিভারি).
    - **Manual bKash** (বিকাশ মার্চেন্ট / পার্সোনাল নম্বর ও TrxID ইনপুট).
    - **Manual Nagad** (নগদ মার্চেন্ট / পার্সোনাল নম্বর ও TrxID ইনপুট).
    - **Online Payment Gateway** (Modular architecture prepared for SSLCOMMERZ integration).
- **Order Confirmation & Tracking (`/order/[id]` & `/track-order`)**:
  - Immediate order confirmation with celebratory confetti.
  - Real-time order progress timeline (Pending ➔ Confirmed ➔ Processing ➔ Shipped ➔ Delivered).
  - Public order tracking using Order ID + Phone Number (no login required).
  - Integrated button to view, download, or print official SHOKHORA money receipt.
- **Customer Account (`/account`)**:
  - Order history with status tags.
  - Saved delivery addresses and profile management.
  - Direct reprint access for all past receipts.
- **Complete Policy Pages**:
  - About Us, Contact Us, FAQ, Privacy Policy, Terms & Conditions, Delivery Policy, and Return & Refund Policy.

---

### 🛡️ 2. Secure Admin Dashboard (`/admin`)

- **Dashboard Overview (`/admin`)**:
  - Real-time financial and operational metrics: Total Revenue, Today's Sales, Total Orders, Pending Orders, Delivered Orders, Total Products, Low-Stock Warnings, and Outstanding Due.
  - Recent orders quick-action feed.
- **Product Management (`/admin/products`)**:
  - Create, view, edit, and delete products.
  - Multiple image upload support with gallery management.
  - Category assignments, regular price, discount price, SKU codes, and stock quantity tracking.
  - Size and color variant configurations.
  - Instant one-click publish / unpublish toggle.
- **Category Management (`/admin/categories`)**:
  - Add, edit, and organize product categories with custom image banners and descriptions.
- **Order Management & Payment Verification (`/admin/orders` & `/admin/orders/[id]`)**:
  - Filter orders by status (*Pending, Confirmed, Processing, Shipped, Delivered, Cancelled, Returned*) and payment status (*Unpaid, Partially Paid, Paid, Refunded*).
  - Detailed order view with customer contact, shipping address, and order items.
  - **bKash & Nagad Payment Verification**: Review customer's submitted Sender Mobile Number and Transaction ID (TrxID). Verify and approve payment with an audit timestamp.
  - Internal administrative notes for customer service records.
  - **Atomic Stock Management**: Cancelling or returning an order automatically restores stock quantities and logs an audit entry.
- **Inventory & Stock Audit (`/admin/inventory`)**:
  - Real-time inventory table with low-stock warnings.
  - Stock Adjustment modal: perform **Stock In** (new replenishment), **Stock Out** (damaged/removed), or manual adjustment with mandatory reason notes.
  - Complete chronological inventory movement history.
- **Coupon Engine (`/admin/coupons`)**:
  - Create percentage-based or flat BDT discount codes.
  - Minimum order requirements, expiry dates, and usage limits.
  - One-click active/inactive toggle.
- **Delivery Fee Configuration (`/admin/delivery`)**:
  - Admin-configurable delivery charges: Inside Dhaka (`৳70`), Outside Dhaka (`৳130`), and Free Delivery Threshold (`৳2,000`).
- **Customer Management (`/admin/customers`)**:
  - View registered and guest customer profiles, lifetime spend, order count, and purchase history.
- **Receipt & Invoice Center (`/admin/receipts`)**:
  - Search, view, and reprint official receipts for any order in the system.
- **Store Settings (`/admin/settings`)**:
  - Edit store contact details, hotline number, email address, physical showroom address, social media links, and merchant bKash/Nagad account numbers.

---

### 🧾 3. Money Receipt & Invoice System

Every confirmed order receives a unique, sequential invoice identifier (`SHK-2026-XXXXXX` / `INV-2026-XXXXXX`).

- **Official Brand Design**: Displays the original SHOKHORA logo, company registration, and contact information.
- **Dual Printing Layouts**:
  - **Standard A4 Invoice**: Designed for full-sheet delivery package slips and accounting archives.
  - **Compact POS / Thermal Slip (80mm)**: Tailored for fast receipt printers and delivery parcel dispatch.
- **Itemized Financial Breakdown**: Product name, SKU, unit price, quantity, subtotal, coupon discount, delivery fee, total bill, paid amount, and outstanding due.
- **Truthful Payment Stamp**:
  - **PAID**: Renders a bold green **VERIFIED** badge displaying payment method, transaction ID, and verification timestamp.
  - **UNPAID / COD**: Renders a clear amber **PAYMENT DUE** badge stating the exact cash amount to be collected by the courier upon delivery.
  - Never generates false "Paid" receipts for unverified orders.
- **Bengali Unicode Compatibility**: Uses the embedded **Kalpurush** font (`/fonts/kalpurush.ttf`) to ensure Bangla product names, customer addresses, and BDT symbols (৳) render without font corruption or missing glyphs.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/) + Custom Design System |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Authentication** | [Firebase Authentication](https://firebase.google.com/docs/auth) (Email/Password, Admin Roles) |
| **Database** | [Cloud Firestore](https://firebase.google.com/docs/firestore) + Resilient In-Memory/Offline Store |
| **Storage** | [Firebase Storage](https://firebase.google.com/docs/storage) |
| **PDF Generation** | [jsPDF](https://github.com/parallax/jsPDF) + Native `@media print` CSS engine |
| **Payment Gateways** | Cash on Delivery, Manual bKash/Nagad, SSLCOMMERZ integration scaffold |

---

## 💻 Local Development Setup

### 1. Prerequisites
- Node.js v18.17.0+ or v20+ LTS
- npm or pnpm

### 2. Clone and Install
```bash
git clone https://github.com/shokhora/ecommerce.git
cd "Shokhora website"

# Install dependencies
npm install
```

### 3. Environment Variables (Optional for Development)
Copy the example environment template:
```bash
cp .env.example .env.local
```
> **Note**: The application is architected with a **hybrid data layer**. If Firebase credentials are not yet configured in `.env.local`, the application automatically activates the local offline mock database with full CRUD capabilities, allowing immediate full-flow testing without API blockers!

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🔑 Demo Access & Admin Credentials

To make testing and evaluation seamless:

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Super Admin** | `admin@shokhora.com` | `admin123456` | Full access to `/admin` dashboard |
| **Demo Customer** | `customer@shokhora.com` | `customer123456` | Access to `/account` & order history |

On the `/login` page, convenient **"Quick Admin Demo"** and **"Quick Customer Demo"** buttons are available for instant one-click login.

---

## 📁 Project Directory Structure

```text
d:\Shokhora website\
├── public/
│   ├── fonts/
│   │   └── kalpurush.ttf           # Embedded Bengali Unicode font for PDF invoices
│   └── images/
│       ├── Logo-01.png             # Original SHOKHORA logo
│       ├── Logo colour-01.png      # Original full-color logo
│       ├── Cover Photo.jpg         # Brand cover banner
│       └── Content/                # Authentic product photos
├── src/
│   ├── app/
│   │   ├── (storefront)/
│   │   │   ├── page.tsx            # Homepage
│   │   │   ├── shop/page.tsx       # Catalog with search & multi-filter
│   │   │   ├── category/[slug]/    # Dynamic category feed
│   │   │   ├── product/[slug]/     # Product details with variants & reviews
│   │   │   ├── cart/page.tsx       # Shopping bag & coupon applicator
│   │   │   ├── checkout/page.tsx   # 64-district checkout & bKash/Nagad
│   │   │   ├── order/[id]/         # Confirmation & invoice download
│   │   │   ├── track-order/        # Public order status tracker
│   │   │   ├── account/page.tsx    # Customer dashboard & order history
│   │   │   ├── login/page.tsx      # Customer & Admin login
│   │   │   ├── register/page.tsx   # Customer registration
│   │   │   └── (policies)/         # About, Contact, Delivery, FAQ, etc.
│   │   ├── admin/
│   │   │   ├── layout.tsx          # Protected admin layout & sidebar
│   │   │   ├── page.tsx            # KPI Overview & sales statistics
│   │   │   ├── products/           # Product CRUD & image uploads
│   │   │   ├── categories/         # Category management
│   │   │   ├── orders/             # Order processing & payment verification
│   │   │   ├── inventory/          # Stock adjustment & movement logs
│   │   │   ├── coupons/            # Discount coupon manager
│   │   │   ├── delivery/           # Delivery fee settings
│   │   │   ├── customers/          # Customer directory & lifetime spend
│   │   │   ├── receipts/           # Receipt lookup & reprint center
│   │   │   └── settings/           # Store & bKash/Nagad configuration
│   │   ├── api/
│   │   │   ├── checkout/route.ts   # Server-side checkout validation
│   │   │   ├── orders/             # Order lookups & receipts
│   │   │   └── payment/verify/     # SSLCOMMERZ gateway verification
│   │   ├── globals.css             # Tailwind rules & print styling
│   │   └── layout.tsx              # Root HTML layout & font declarations
│   ├── components/
│   │   ├── cart/                   # Slide-over cart drawer & calculations
│   │   ├── home/                   # HeroBanner, CategoryGrid, FeaturedProducts...
│   │   ├── invoice/                # InvoiceView (A4 & Thermal slip layouts)
│   │   ├── layout/                 # Header with live search & Footer
│   │   └── product/                # ProductCard, badges, variant selectors
│   ├── lib/
│   │   ├── context/
│   │   │   ├── AuthContext.tsx     # Session management & demo auth
│   │   │   └── CartContext.tsx     # Persistent shopping cart & delivery fee
│   │   ├── db/
│   │   │   ├── mock-data.ts        # Authentic initial Bangladeshi mock data
│   │   │   └── store.ts            # Hybrid store (Firestore + Offline store)
│   │   ├── firebase/
│   │   │   ├── config.ts           # Firebase client initialization
│   │   │   └── admin.ts            # Firebase Admin SDK server initialization
│   │   └── utils/
│   │       └── formatters.ts       # BDT currency, BD phone regex, 64 districts
│   └── types/
│       └── index.ts                # TypeScript domain models
├── firestore.rules                 # Restrictive production security rules
├── firestore.indexes.json          # Firestore composite query indexes
├── DATABASE_SCHEMA.md              # Collection schemas & atomic transaction docs
├── FIREBASE_SETUP.md               # Firebase configuration step-by-step
└── DEPLOYMENT.md                   # Vercel, Docker & Nginx deployment guide
```

---

## 🔒 Security Best Practices

1. **Role-Based Access Control**:
   - `/admin` routes are protected. Non-admin users attempting to access the admin portal are automatically redirected with unauthorized notifications.
2. **Server-Side Verification**:
   - Total prices, delivery fees, and discount calculations are recomputed and validated on the server to prevent client-side price tampering.
3. **Atomic Stock Decrements**:
   - Stock counts are decremented atomically when orders are placed. If an order is cancelled or marked returned in the admin panel, stock is automatically restored with an audit entry.
4. **No Sensitive Keys in Client Bundles**:
   - Firebase Admin SDK credentials and future payment gateway secret keys remain strictly isolated on server-side Route Handlers.
5. **Truth in Receipts**:
   - Receipts never display false "Paid" status unless verified by an administrator through transaction ID audit or authenticated gateway callback.

---

## 📄 License & Intellectual Property

Copyright © 2026 **SHOKHORA (শখোরা)**. All rights reserved.  
Original brand marks, logos, and product assets are the exclusive property of SHOKHORA.
