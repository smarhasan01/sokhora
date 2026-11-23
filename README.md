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

## 🛍️ Brand Categories

1. **Fashion & Clothing** (শাড়ি, কুর্তি, পাঞ্জাবি ও আধুনিক পোশাক)
2. **Cosmetics & Beauty Products** (ত্বকের যত্ন ও রূপচর্চা সামগ্রী)
3. **Kids Hairbands & Hair Clips** (শিশুদের চুলের আকর্ষণীয় ক্লিপ ও ব্যান্ড)
4. **Scrunchies & Hair Accessories** (সিল্ক ও সাটিন স্ক্রাঞ্চি)
5. **Jewellery & Fashion Accessories** (আধুনিক ও ট্রেডিশনাল গহনা)
6. **Gifts & Lifestyle Products** (উপহার সামগ্রী ও লাইফস্টাইল পণ্য)
7. **Other Everyday Products** (দৈনন্দিন নিত্যপ্রয়োজনীয় পণ্য)

---

## 🚀 Homepage Architecture (15+ Structured Sections)

The storefront strictly mirrors the master e-commerce composition with balanced spacing, high product density, and clear visual hierarchy:

1. **Top Announcement Bar**: Nationwide free delivery notice (`৳2,000+`), showroom hotline (`01568923850`), and working `EN | বাংলা` language switcher.
2. **Master Header**: Transparent official logo, integrated search bar with category filter dropdown, wishlist counter badge, shopping cart pill with live BDT subtotal, and user authentication portal.
3. **Horizontal Navigation Bar**: Deep Navy sub-bar with `All Category ▾` mega menu and `LIMITED SALE` promotional flame badge.
4. **Promotional Hero Slider (`HeroSlider.tsx`)**: Auto-advancing slider with smooth transitions, pausing on hover/touch, and direct category shop CTAs.
5. **Best Categories (`CategorySection.tsx`)**: 7 squircle category cards with interactive navigation arrows.
6. **For You / Recommended Products (`NewArrivalsSection.tsx`)**: 8 curated product cards in a 4x2 responsive grid.
7. **Campaign Banner (`CampaignBanner.tsx`)**: Promotional showcase highlighting seasonal discounts up to 50% OFF.
8. **Trending Products with Category Tabs (`TrendingSection.tsx`)**: Live filterable product grid with category pills (*All, Fashion, Cosmetics, Kids Clips, Scrunchies, Jewellery, Gifts*).
9. **Best Sellers (`BestSellersSection.tsx`)**: Verified customer favorites with quick-add actions.
10. **Dynamic Countdown Deal Banner (`CountdownBanner.tsx`)**: Real-time remaining countdown timer for genuine store discount campaigns.
11. **Most Popular Products (`RecommendedProducts.tsx`)**: 8 popular products with category tabs.
12. **Deals of the Day (`DealsOfTheDay.tsx`)**: Daily discounted products with circular `-XX%` gold discount badges and live stock counters.
13. **Lifestyle & Editorial Stories (`LifestyleBlogSection.tsx`)**: 3 curated lifestyle articles with reading times and tags.
14. **Interactive FAQ Accordion (`FaqAccordion.tsx`)**: Accordion answers covering ordering, payment methods, delivery, and returns.
15. **Service Benefits & Value Pillars (`ServiceBenefits.tsx`)**: 4 key trust pillars (Fast BD Delivery, 100% Authentic Quality, Cash on Delivery, Easy 7-Day Returns).
16. **Newsletter Subscription Strip (`NewsletterSection.tsx`)**: Email subscription form with instant feedback.
17. **Multi-Column Navy Footer (`Footer.tsx`)**: Deep Navy footer with company registration, showroom address, customer care, policy links, and payment method badges.

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
