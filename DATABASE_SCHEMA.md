# SHOKHORA (শখোরা) — DATABASE ARCHITECTURE & SCHEMA

This document details the Cloud Firestore database architecture, collection schemas, relationships, indexing rules, and transaction safety constraints for SHOKHORA Bangladesh.

---

## 1. COLLECTIONS OVERVIEW

| Collection | Description | Access Control |
|---|---|---|
| `users` | Registered customer profiles & saved delivery addresses | Customer (Own) / Admin |
| `admins` | Authorized system administrators | Admin Only |
| `products` | Product catalog with variations, SKU, and stock | Public Read / Admin Write |
| `categories` | Product categories (English & Bengali) | Public Read / Admin Write |
| `orders` | Completed & provisional customer orders | Owner Read / Admin Full |
| `payments` | Verified and pending financial transactions | Admin Only |
| `receipts` | Immutable money receipts & invoice records | Public Read / Admin Write |
| `coupons` | Promotional vouchers & percentage discounts | Public Read / Admin Write |
| `inventory` | Stock-in, stock-out, and restock audit movement logs | Admin Only |
| `settings` | Storewide settings, hotline, and delivery rates | Public Read / Admin Write |
| `reviews` | Customer ratings and product testimonials | Public Read / Auth Write |
| `notifications` | System and order alerts | Admin Only |

---

## 2. DETAILED DOCUMENT SCHEMAS

### `products`
```typescript
interface Product {
  id: string; // e.g. "prod-001"
  name: string; // "Pure Mulberry Silk Cloud Scrunchie (Set of 3)"
  nameBn?: string; // "পিওর মালবেরি সিল্ক ক্লাউড স্ক্রাঞ্চি সেট"
  slug: string; // "mulberry-silk-cloud-scrunchie-set"
  description: string;
  descriptionBn?: string;
  regularPrice: number; // 650
  discountPrice?: number; // 490
  sku: string; // "SHK-SCR-001"
  category: string; // "scrunchies-hair-accessories"
  stock: number; // 35
  images: string[];
  variations?: {
    sizes?: string[];
    colors?: { name: string; hex: string }[];
  };
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isPublished: boolean;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  createdAt: string; // ISO 8601
  updatedAt?: string;
}
```

### `orders`
```typescript
interface Order {
  id: string; // "SHK-2026-842109"
  invoiceNumber: string; // "INV-2026-842109"
  customer: {
    fullName: string;
    phone: string; // "01711223344"
    email?: string;
    district: string; // "Dhaka"
    area: string; // "Dhanmondi"
    address: string; // "House 42, Road 9/A"
    deliveryZone: "inside-dhaka" | "outside-dhaka";
    notes?: string;
  };
  userId?: string;
  isGuest: boolean;
  items: {
    productId: string;
    name: string;
    sku: string;
    price: number;
    quantity: number;
    subtotal: number;
    selectedColor?: string;
    selectedSize?: string;
  }[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  paidAmount: number;
  dueAmount: number;
  couponCode?: string;
  paymentMethod: "Cash on Delivery" | "bKash" | "Nagad" | "Online Gateway (SSLCOMMERZ)";
  paymentStatus: "Unpaid" | "Partially Paid" | "Paid" | "Refunded";
  orderStatus: "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Returned";
  manualPaymentDetails?: {
    senderNumber?: string;
    transactionId?: string;
    verifiedAt?: string;
    verifiedBy?: string;
    paymentNote?: string;
  };
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
    updatedBy?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
```

### `inventory` (Stock Movement Audit)
```typescript
interface InventoryMovement {
  id: string; // "INV-LOG-17000000-123"
  productId: string;
  productName: string;
  sku: string;
  type: "stock-in" | "stock-out" | "adjustment" | "order-deduct" | "order-cancel-restock";
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  referenceId?: string; // Order ID
  performedBy: string;
  timestamp: string;
}
```

### `coupons`
```typescript
interface Coupon {
  id: string;
  code: string; // "SHOKHORA10"
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount: number;
  maxDiscount?: number;
  expiryDate: string; // "YYYY-MM-DD"
  usageLimit: number;
  timesUsed: number;
  isActive: boolean;
  createdAt: string;
}
```

---

## 3. ATOMIC TRANSACTIONS & INVENTORY SAFETY

To prevent duplicate stock deductions and ensure consistency:
1. **Order Creation Transaction**:
   - Reads current stock for each product item in cart.
   - Verifies `currentStock >= quantity`. If depleted, throws `OUT_OF_STOCK` error.
   - Atomically decrements product `stock`.
   - Records an `inventory` audit document of type `order-deduct`.
   - Creates the `order` document and generates the matching `invoiceNumber`.
2. **Order Cancellation / Return Restock**:
   - When an order transitions to `Cancelled` or `Returned`, stock is automatically restored to the product document.
   - Prevents duplicate restocks by checking prior status in `statusHistory`.
