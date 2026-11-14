'use client';

import {
  Product,
  Category,
  Order,
  Coupon,
  StoreSettings,
  InventoryMovement,
  OrderStatus,
  PaymentStatus,
  AdminMember,
} from '@/types';
import {
  initialCategories,
  initialProducts,
  initialCoupons,
  initialOrders,
  initialSettings,
  initialAdminTeam,
} from './mock-data';
import { generateOrderId, generateInvoiceNumber } from '@/lib/utils/formatters';

const STORAGE_KEYS = {
  PRODUCTS: 'shokhora_products_v2',
  CATEGORIES: 'shokhora_categories_v2',
  ORDERS: 'shokhora_orders_v2',
  COUPONS: 'shokhora_coupons_v2',
  SETTINGS: 'shokhora_settings_v2',
  INVENTORY: 'shokhora_inventory_v2',
  ADMIN_TEAM: 'shokhora_admin_team_v2',
};

// Helper for LocalStorage
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return defaultValue;
  }
}

function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('shokhora-store-change'));
  } catch (error) {
    console.error(`Error writing ${key} to storage:`, error);
  }
}

// ---------------- PRODUCTS ----------------

export function getProducts(): Product[] {
  return getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getProducts();
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  const products = getProducts();
  return products.find((p) => p.id === id);
}

export function saveProduct(product: Product): Product {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === product.id);

  if (index >= 0) {
    // Inventory logging if stock changed
    const oldStock = products[index].stock;
    if (oldStock !== product.stock) {
      logInventoryMovement({
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        type: product.stock > oldStock ? 'stock-in' : 'stock-out',
        quantity: Math.abs(product.stock - oldStock),
        previousStock: oldStock,
        newStock: product.stock,
        reason: 'Manual admin adjustment in product editor',
        performedBy: 'Admin',
      });
    }

    products[index] = {
      ...product,
      updatedAt: new Date().toISOString(),
    };
  } else {
    products.unshift({
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    logInventoryMovement({
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      type: 'stock-in',
      quantity: product.stock,
      previousStock: 0,
      newStock: product.stock,
      reason: 'Initial stock on product creation',
      performedBy: 'Admin',
    });
  }

  setToStorage(STORAGE_KEYS.PRODUCTS, products);
  return product;
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length !== products.length) {
    setToStorage(STORAGE_KEYS.PRODUCTS, filtered);
    return true;
  }
  return false;
}

// ---------------- CATEGORIES ----------------

export function getCategories(): Category[] {
  return getFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, initialCategories);
}

export function saveCategory(category: Category): Category {
  const categories = getCategories();
  const index = categories.findIndex((c) => c.id === category.id);
  if (index >= 0) {
    categories[index] = category;
  } else {
    categories.push(category);
  }
  setToStorage(STORAGE_KEYS.CATEGORIES, categories);
  return category;
}

export function deleteCategory(id: string): boolean {
  const categories = getCategories();
  const filtered = categories.filter((c) => c.id !== id);
  if (filtered.length !== categories.length) {
    setToStorage(STORAGE_KEYS.CATEGORIES, filtered);
    return true;
  }
  return false;
}

// ---------------- ORDERS & TRANSACTIONS ----------------

export function getOrders(): Order[] {
  return getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, initialOrders);
}

export function getOrderById(id: string): Order | undefined {
  const orders = getOrders();
  return orders.find((o) => o.id === id || o.invoiceNumber === id);
}

export function createOrder(orderData: Omit<Order, 'id' | 'invoiceNumber' | 'createdAt' | 'updatedAt' | 'statusHistory' | 'dueAmount'> & { id?: string }): Order {
  const orders = getOrders();
  const products = getProducts();
  const orderId = orderData.id || generateOrderId();
  const invoiceNumber = generateInvoiceNumber(orderId);
  const now = new Date().toISOString();

  // Deduct stock safely
  const updatedProducts = products.map((prod) => {
    const itemInOrder = orderData.items.find((it) => it.productId === prod.id);
    if (itemInOrder) {
      const newStock = Math.max(0, prod.stock - itemInOrder.quantity);
      logInventoryMovement({
        productId: prod.id,
        productName: prod.name,
        sku: prod.sku,
        type: 'order-deduct',
        quantity: itemInOrder.quantity,
        previousStock: prod.stock,
        newStock: newStock,
        reason: `Deducted for order ${orderId}`,
        referenceId: orderId,
        performedBy: 'System Checkout',
      });
      return { ...prod, stock: newStock };
    }
    return prod;
  });
  setToStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);

  const dueAmount = Math.max(0, orderData.total - (orderData.paidAmount || 0));

  const newOrder: Order = {
    ...orderData,
    id: orderId,
    invoiceNumber,
    dueAmount,
    createdAt: now,
    updatedAt: now,
    statusHistory: [
      {
        status: orderData.orderStatus || 'Pending',
        timestamp: now,
        note: `Order placed via ${orderData.paymentMethod}`,
        updatedBy: orderData.customer.fullName,
      },
    ],
  };

  orders.unshift(newOrder);
  setToStorage(STORAGE_KEYS.ORDERS, orders);

  // Update coupon timesUsed if applicable
  if (orderData.couponCode) {
    const coupons = getCoupons();
    const cpn = coupons.find((c) => c.code.toUpperCase() === orderData.couponCode?.toUpperCase());
    if (cpn) {
      cpn.timesUsed += 1;
      setToStorage(STORAGE_KEYS.COUPONS, coupons);
    }
  }

  return newOrder;
}

export function updateOrderStatus(orderId: string, newStatus: OrderStatus, note?: string, updatedBy = 'Admin'): Order | undefined {
  const orders = getOrders();
  const orderIndex = orders.findIndex((o) => o.id === orderId);
  if (orderIndex === -1) return undefined;

  const currentOrder = orders[orderIndex];
  const oldStatus = currentOrder.orderStatus;

  // Stock restoration on Cancel or Return
  if ((newStatus === 'Cancelled' || newStatus === 'Returned') && (oldStatus !== 'Cancelled' && oldStatus !== 'Returned')) {
    const products = getProducts();
    const updatedProducts = products.map((prod) => {
      const itemInOrder = currentOrder.items.find((it) => it.productId === prod.id);
      if (itemInOrder) {
        const newStock = prod.stock + itemInOrder.quantity;
        logInventoryMovement({
          productId: prod.id,
          productName: prod.name,
          sku: prod.sku,
          type: 'order-cancel-restock',
          quantity: itemInOrder.quantity,
          previousStock: prod.stock,
          newStock: newStock,
          reason: `Restocked due to order ${orderId} marked as ${newStatus}`,
          referenceId: orderId,
          performedBy: updatedBy,
        });
        return { ...prod, stock: newStock };
      }
      return prod;
    });
    setToStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);
  }

  currentOrder.orderStatus = newStatus;
  currentOrder.updatedAt = new Date().toISOString();
  currentOrder.statusHistory.push({
    status: newStatus,
    timestamp: new Date().toISOString(),
    note: note || `Status updated from ${oldStatus} to ${newStatus}`,
    updatedBy,
  });

  orders[orderIndex] = currentOrder;
  setToStorage(STORAGE_KEYS.ORDERS, orders);
  return currentOrder;
}

export function updatePaymentStatus(
  orderId: string,
  paymentStatus: PaymentStatus,
  paidAmount: number,
  verificationDetails?: {
    verifiedBy?: string;
    note?: string;
    transactionId?: string;
    senderNumber?: string;
  }
): Order | undefined {
  const orders = getOrders();
  const orderIndex = orders.findIndex((o) => o.id === orderId);
  if (orderIndex === -1) return undefined;

  const order = orders[orderIndex];
  order.paymentStatus = paymentStatus;
  order.paidAmount = paidAmount;
  order.dueAmount = Math.max(0, order.total - paidAmount);
  order.updatedAt = new Date().toISOString();

  if (verificationDetails) {
    order.manualPaymentDetails = {
      ...order.manualPaymentDetails,
      transactionId: verificationDetails.transactionId || order.manualPaymentDetails?.transactionId,
      senderNumber: verificationDetails.senderNumber || order.manualPaymentDetails?.senderNumber,
      verifiedAt: new Date().toISOString(),
      verifiedBy: verificationDetails.verifiedBy || 'Admin',
      paymentNote: verificationDetails.note,
    };
  }

  orders[orderIndex] = order;
  setToStorage(STORAGE_KEYS.ORDERS, orders);
  return order;
}

// ---------------- COUPONS ----------------

export function getCoupons(): Coupon[] {
  return getFromStorage<Coupon[]>(STORAGE_KEYS.COUPONS, initialCoupons);
}

export function saveCoupon(coupon: Coupon): Coupon {
  const coupons = getCoupons();
  const index = coupons.findIndex((c) => c.id === coupon.id);
  if (index >= 0) {
    coupons[index] = coupon;
  } else {
    coupons.push(coupon);
  }
  setToStorage(STORAGE_KEYS.COUPONS, coupons);
  return coupon;
}

export function deleteCoupon(id: string): boolean {
  const coupons = getCoupons();
  const filtered = coupons.filter((c) => c.id !== id);
  if (filtered.length !== coupons.length) {
    setToStorage(STORAGE_KEYS.COUPONS, filtered);
    return true;
  }
  return false;
}

export function validateCoupon(code: string, subtotal: number): { valid: boolean; discount: number; message: string; coupon?: Coupon } {
  const coupons = getCoupons();
  const coupon = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());

  if (!coupon) {
    return { valid: false, discount: 0, message: 'Invalid coupon code.' };
  }

  if (!coupon.isActive) {
    return { valid: false, discount: 0, message: 'This coupon is currently inactive.' };
  }

  if (new Date(coupon.expiryDate) < new Date()) {
    return { valid: false, discount: 0, message: 'This coupon has expired.' };
  }

  if (coupon.timesUsed >= coupon.usageLimit) {
    return { valid: false, discount: 0, message: 'This coupon has reached its maximum usage limit.' };
  }

  if (subtotal < coupon.minOrderAmount) {
    return {
      valid: false,
      discount: 0,
      message: `Minimum order amount of ৳${coupon.minOrderAmount} required for this coupon.`,
    };
  }

  let discount = 0;
  if (coupon.discountType === 'percentage') {
    discount = Math.round((subtotal * coupon.discountValue) / 100);
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  } else {
    discount = coupon.discountValue;
  }

  return {
    valid: true,
    discount,
    message: `Coupon applied successfully! You save ৳${discount}.`,
    coupon,
  };
}

// ---------------- INVENTORY ----------------

export function getInventoryMovements(): InventoryMovement[] {
  return getFromStorage<InventoryMovement[]>(STORAGE_KEYS.INVENTORY, []);
}

export function logInventoryMovement(movement: Omit<InventoryMovement, 'id' | 'timestamp'>): void {
  const movements = getInventoryMovements();
  const newMovement: InventoryMovement = {
    ...movement,
    id: `INV-LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
  };
  movements.unshift(newMovement);
  setToStorage(STORAGE_KEYS.INVENTORY, movements.slice(0, 300)); // keep last 300 logs
}

// ---------------- SETTINGS ----------------

export function getSettings(): StoreSettings {
  return getFromStorage<StoreSettings>(STORAGE_KEYS.SETTINGS, initialSettings);
}

export function updateSettings(settings: StoreSettings): StoreSettings {
  setToStorage(STORAGE_KEYS.SETTINGS, settings);
  return settings;
}

// ---------------- DASHBOARD METRICS ----------------

export function getDashboardMetrics() {
  const orders = getOrders();
  const products = getProducts();

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'Paid' || o.orderStatus === 'Delivered')
    .reduce((sum, o) => sum + o.total, 0);

  const todayStr = new Date().toISOString().slice(0, 10);
  const todaySales = orders
    .filter((o) => o.createdAt.slice(0, 10) === todayStr && o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending').length;
  const deliveredOrders = orders.filter((o) => o.orderStatus === 'Delivered').length;
  const lowStockProducts = products.filter((p) => p.stock <= 5).length;
  const outstandingDue = orders
    .filter((o) => o.orderStatus !== 'Cancelled' && o.orderStatus !== 'Returned')
    .reduce((sum, o) => sum + o.dueAmount, 0);

  const customerPhones = new Set(orders.map((o) => o.customer.phone));

  return {
    totalRevenue,
    todaySales,
    totalOrders: orders.length,
    pendingOrders,
    deliveredOrders,
    totalProducts: products.length,
    lowStockProducts,
    totalCustomers: customerPhones.size,
    outstandingDue,
    recentOrders: orders.slice(0, 6),
  };
}

// ---------------- ADMIN & ACCESS CONTROL ----------------

export function getAdminTeam(): AdminMember[] {
  return getFromStorage<AdminMember[]>(STORAGE_KEYS.ADMIN_TEAM, initialAdminTeam);
}

export function saveAdminMember(member: AdminMember): AdminMember {
  const team = getAdminTeam();
  const index = team.findIndex((m) => m.id === member.id || m.email.toLowerCase() === member.email.toLowerCase());

  if (index >= 0) {
    team[index] = { ...team[index], ...member };
  } else {
    team.push({
      ...member,
      id: member.id || `adm-${Date.now()}`,
      createdAt: member.createdAt || new Date().toISOString(),
    });
  }

  setToStorage(STORAGE_KEYS.ADMIN_TEAM, team);
  return member;
}

export function revokeAdminMember(id: string): boolean {
  const team = getAdminTeam();
  const index = team.findIndex((m) => m.id === id);
  if (index >= 0) {
    if (team[index].role === 'owner') {
      console.warn('Cannot revoke store owner');
      return false;
    }
    team[index].status = 'revoked';
    setToStorage(STORAGE_KEYS.ADMIN_TEAM, team);
    return true;
  }
  return false;
}

export function isAuthorizedAdmin(email: string): { authorized: boolean; member?: AdminMember } {
  if (!email) return { authorized: false };
  const team = getAdminTeam();
  const normalized = email.toLowerCase().trim();
  const member = team.find((m) => m.email.toLowerCase() === normalized);

  if (member && member.status === 'active') {
    return { authorized: true, member };
  }
  return { authorized: false };
}

