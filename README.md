# SHOKHORA (শখোরা) — Premium Multi-Category E-Commerce Platform

> **Brand Tagline:** *Your Choice, Our Passion.* / *আপনার পছন্দ, আমাদের ভালোবাসা।*  
> **Market:** Bangladesh (BDT ৳)  
> **Official Palette:** Deep Navy Blue (`#012D51`), Golden Accent (`#C78703`), White (`#FFFFFF`), Soft Grey (`#F6F7F8`), Dark Text (`#252525`)  
> **Architecture:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Firebase + Hybrid Store  
> **Repository:** [`https://github.com/smarhasan01/sokhora`](https://github.com/smarhasan01/sokhora)

A modern, high-conversion e-commerce platform crafted for Bangladeshi lifestyle and fashion brand **SHOKHORA (শখোরা)**. Re-engineered strictly according to the master e-commerce reference visual hierarchy, section composition, and the official Navy & Gold brand identity.

---

## 🌟 Brand Identity & Visual System

- **Official Brand Logo**: The authentic SHOKHORA brand logo (`/images/shokhora-official-logo.png`) is integrated across the storefront header, customer footer, invoice receipts, and order tracker with pure RGBA transparency on clean white surfaces without color distortion or artificial boxes.
- **Official Brand Colors**:
  - **Primary Brand Color**: Deep Navy Blue (`#012D51`) — Headers, navigation accents, primary buttons, footers.
  - **Secondary Brand Color**: Golden Accent (`#C78703`) — Sale pills, discount badges, gold ratings, hover highlights.
  - **Neutrals**: Crisp White (`#FFFFFF`) storefront canvas, Soft Grey (`#F6F7F8`) alternating sections and card backgrounds, Dark Charcoal (`#252525`) high-contrast text.
- **Hardware-Accelerated Animation**: Smooth fade-in, slide-up, and subtle product card lift transitions with full `prefers-reduced-motion` compliance.
- **Bilingual Interface**: Built-in toggle supporting seamless switching between English (`EN`) and Bangla (`বাংলা`).
- **Typography & Bengali Unicode**: Powered by Inter and Hind Siliguri for modern web typography, combined with embedded **Kalpurush** Bengali font for pixel-perfect invoice rendering of Bangla text and Bangladeshi Taka symbols (৳).
- **Responsive Across All Devices**: Native layouts optimized for 1440px desktop, 1024px tablet, and 390px mobile screens with zero horizontal overflow.

---

## 🛍️ Approved Product Categories (5 Strict Categories)

1. **Fashion & Clothing** (পোশাক ও ফ্যাশন)
2. **Cosmetics & Beauty** (কসমেটিক্স ও বিউটি)
3. **Kids Hair Clips & Accessories** (কিডস হেয়ার ক্লিপ ও এক্সেসরিজ)
4. **Scrunchies & Hair Accessories** (স্ক্রাঞ্চি ও হেয়ার এক্সেসরিজ)
5. **Everyday Products** (দৈনন্দিন পণ্য)

---

## 🚀 Homepage Architecture (MegaMart-Inspired Commercial Composition)

The storefront strictly mirrors the master commercial MegaMart composition with balanced spacing, clean card density, and clear visual hierarchy:

1. **Top Announcement Bar**: Welcome announcement, location indicator ("Deliver to Dhaka"), order tracking shortcut (`/track-order`), special offers link (`/shop?filter=sale`), and working `EN | বাংলা` language switcher.
2. **MegaMart Main Header**: Original transparent SHOKHORA logo, wide product search bar with category quick-selector dropdown, user sign-in portal, wishlist counter badge, and shopping cart pill with live item count and subtotal.
3. **Horizontal Category Navigation**: Full horizontal category bar with `All Categories ▾` mega menu button and dropdown previews for the 5 approved categories.
4. **Hero Promotional Slider (`HeroSlider.tsx`)**: Rounded-3xl dark navy banner card with huge bold typography, gold discount callouts ("UP TO 50% OFF"), showcase product cutout, prev/next circular arrows, bottom slide dots, and auto-play with pause.
5. **Best Deals / Horizontal Product Cards (`BestDealsSection.tsx`)**: "Grab the best deal on **Scrunchies & Fashion**" with 5-column product cards featuring corner discount badges, clean square image containers, bold pricing, and highlighted savings tags (`Save - ৳...`).
6. **Top Categories (`CircularCategories.tsx`)**: "Shop From Top Categories" featuring 5 circular category image cards with border rings and hover zoom animations.
7. **Featured Brands / Collections (`FeaturedBrands.tsx`)**: "Top Featured Collections" with 3 wide banner cards (SHOKHORA Originals Navy card, Aura Beauty Gold card, Little Bloom Charcoal card) with product cutouts and "UP TO 40% OFF".
8. **Recommended Products (`RecommendedProducts.tsx`)**: 5-column showcase of top-rated lifestyle products with quick Add-to-Cart.
9. **Trending Products (`TrendingSection.tsx`)**: Interactive category filter tabs for the 5 approved categories with live filtering and "View All" link.
10. **Daily Essentials (`DailyEssentialsSection.tsx`)**: "Daily Essentials" showcase featuring everyday lifestyle cards with "UP TO 30% OFF".
11. **Promotional Campaign Banner (`CampaignBanner.tsx`)**: Seasonal campaign showcase with discount highlights and Cash on Delivery reassurance.
12. **Service Benefits & Value Pillars (`ServiceBenefits.tsx`)**: 4 trust pillars (Fast BD Delivery, 100% Genuine Quality, 7-Day Easy Exchange, Customer Support Hotline).
13. **Customer FAQ Accordion (`FaqAccordion.tsx`)**: Clean interactive accordion with instant expand/collapse.
14. **Multi-Column Navy Footer (`Footer.tsx`)**: 4-column Deep Navy footer with original SHOKHORA logo, 5 approved categories, customer service links, hotline `01568923850`, and working newsletter subscription.

---

## 🛒 Complete Storefront & Checkout Flow

- **Catalog & Shop (`/shop`)**:
  - Live filtering by category, price ranges, and limited-sale deals.
  - Instant client-side search and multi-criteria sorting (*Newest, Popularity, Price: Low to High, Price: High to Low, Rating*).
- **Product Details (`/product/[slug]`)**:
  - Multi-image zoom gallery, real stock badges, SKU codes, and variant selectors.
  - Direct *Add to Cart* and one-click *Buy Now* instant checkout.
- **Shopping Bag & Cart Drawer (`/cart` & `CartDrawer.tsx`)**:
  - Persistent cart state across browser sessions.
  - Dynamic delivery charge calculation based on destination (Inside Dhaka `৳70` vs. Outside Dhaka `৳130`).
  - Active coupon validation (e.g., `SHOKHORA10`, `WELCOME50`) with instant deduction.
- **Streamlined Checkout (`/checkout`)**:
  - Guest checkout with no mandatory account creation required.
  - Full dropdown selection covering all **64 Districts of Bangladesh**.
  - Bangladeshi mobile phone validation (`01XXXXXXXXX`).
  - **Payment Methods**:
    - **Cash on Delivery (COD)** (ক্যাশ অন ডেলিভারি).
    - **bKash Payment** (Merchant/Personal `01568923850` with one-click copy and Transaction ID submission).
    - **Nagad Payment** (Merchant/Personal `01568923850` with Transaction ID submission).
- **Order Tracking & Confirmation (`/track-order` & `/order/[id]`)**:
  - Live tracking by Order ID (`SHK-2026-XXXXXX`) or Customer Mobile Number.
  - Printable official money receipt / delivery challan with Kalpurush Bengali Unicode font.
- **Customer Account Portal (`/account`)**:
  - Customer login, registration, password reset, order history, address book, and saved wishlist.

---

## 🛡️ Admin Dashboard (`/admin`)

- **Strict Access Control**: Zero public exposure on storefront navigation.
- **Full Operational Suite**:
  - Overview KPI metrics: Sales, orders, stock alerts, and due payments.
  - Product catalog management with multiple image uploads and inventory controls.
  - Order verification workflow for bKash / Nagad Transaction IDs with atomic stock reconciliation.
  - Coupon management and delivery fee threshold controls.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) with Navy & Gold theme tokens |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database & Auth** | [Cloud Firestore](https://firebase.google.com/docs/firestore) + Resilient In-Memory/Offline Store |
| **Receipts & Invoicing** | [jsPDF](https://github.com/parallax/jsPDF) + Native `@media print` with embedded Kalpurush Unicode font |

---

## 💻 Setup & Development

### 1. Clone and Install
```bash
git clone https://github.com/smarhasan01/sokhora.git
cd sokhora

# Install dependencies
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Production Check
```bash
npm run build
```

---

## 📄 License & Intellectual Property

Copyright © 2026 **SHOKHORA (শখোরা)**. All rights reserved.  
Original brand marks, logos, and product assets are the exclusive property of SHOKHORA.
