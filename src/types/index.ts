export type ProductCategory =
  | 'fashion-clothing'
  | 'cosmetics-beauty'
  | 'kids-hairbands-clips'
  | 'scrunchies-hair-accessories'
  | 'jewellery-fashion-accessories'
  | 'gifts-lifestyle'
  | 'other-everyday';

export interface Category {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  description?: string;
  image: string;
  featured?: boolean;
  itemCount?: number;
  createdAt?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price?: number;
  stock: number;
  sku?: string;
  colorHex?: string;
}

export interface Product {
  id: string;
  name: string;
  nameBn?: string;
  slug: string;
  description: string;
  descriptionBn?: string;
  regularPrice: number;
  discountPrice?: number;
  sku: string;
  category: ProductCategory | string;
  stock: number;
  images: string[];
  variations?: {
    sizes?: string[];
    colors?: { name: string; hex: string }[];
    options?: ProductVariant[];
  };
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isPublished: boolean;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface CartItem {
  id: string; // product id + variant keys
  productId: string;
  name: string;
  image: string;
  price: number;
  regularPrice: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  sku: string;
  maxStock: number;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned';

export type PaymentMethod =
  | 'Cash on Delivery'
  | 'bKash'
  | 'Nagad'
  | 'Online Gateway (SSLCOMMERZ)';

export type PaymentStatus =
  | 'Unpaid'
  | 'Partially Paid'
  | 'Paid'
  | 'Refunded';

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  email?: string;
  district: string;
  area: string; // Upazila or Area
  address: string;
  notes?: string;
  deliveryZone: 'inside-dhaka' | 'outside-dhaka';
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  sku: string;
  price: number;
  quantity: number;
  subtotal: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string; // SHK-2026-XXXXXX
  customer: DeliveryDetails;
  userId?: string;
  isGuest: boolean;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  paidAmount: number;
  dueAmount: number;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  manualPaymentDetails?: {
    senderNumber?: string;
    transactionId?: string;
    verifiedAt?: string;
    verifiedBy?: string;
    paymentNote?: string;
  };
  adminNotes?: string[];
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
    updatedBy?: string;
  }[];
  invoiceNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount?: number;
  expiryDate: string;
  usageLimit: number;
  timesUsed: number;
  isActive: boolean;
  createdAt: string;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  type: 'stock-in' | 'stock-out' | 'adjustment' | 'order-deduct' | 'order-cancel-restock';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  referenceId?: string; // Order ID or Invoice ID
  performedBy: string;
  timestamp: string;
}

export interface StoreSettings {
  storeName: string;
  storeNameBn: string;
  tagline: string;
  taglineBn: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  insideDhakaDeliveryFee: number;
  outsideDhakaDeliveryFee: number;
  freeDeliveryThreshold: number;
  bkashMerchantNumber: string;
  nagadMerchantNumber: string;
  enableCod: boolean;
  enableBkash: boolean;
  enableNagad: boolean;
  enableOnlineGateway: boolean;
  vatPercentage: number;
}

export type UserRole = 'owner' | 'admin' | 'customer';

export interface AdminPermissions {
  canManageProducts: boolean;
  canManageOrders: boolean;
  canManageInventory: boolean;
  canManageCoupons: boolean;
  canManageSettings: boolean;
  canManageTeam: boolean; // owner only
}

export interface AdminMember {
  id: string;
  email: string;
  fullName: string;
  role: 'owner' | 'admin';
  status: 'active' | 'revoked';
  permissions: AdminPermissions;
  invitedBy?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  phone?: string;
  addresses?: DeliveryDetails[];
  role: UserRole;
  createdAt: string;
}
