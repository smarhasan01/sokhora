'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, Coupon, StoreSettings } from '@/types';
import { getSettings, validateCoupon } from '@/lib/db/store';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  deliveryCharge: number;
  deliveryZone: 'inside-dhaka' | 'outside-dhaka';
  setDeliveryZone: (zone: 'inside-dhaka' | 'outside-dhaka') => void;
  coupon: Coupon | null;
  couponDiscount: number;
  couponError: string | null;
  applyCouponCode: (code: string) => boolean;
  removeCoupon: () => void;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  settings: StoreSettings;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shokhora_cart_items_v1';
const CART_COUPON_KEY = 'shokhora_cart_coupon_v1';
const CART_ZONE_KEY = 'shokhora_cart_zone_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliveryZone, setDeliveryZoneState] = useState<'inside-dhaka' | 'outside-dhaka'>('inside-dhaka');
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [settings, setSettings] = useState<StoreSettings>(getSettings());
  const [isMounted, setIsMounted] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    setIsMounted(true);
    setSettings(getSettings());
    try {
      const savedItems = localStorage.getItem(CART_STORAGE_KEY);
      if (savedItems) setItems(JSON.parse(savedItems));

      const savedZone = localStorage.getItem(CART_ZONE_KEY);
      if (savedZone === 'inside-dhaka' || savedZone === 'outside-dhaka') {
        setDeliveryZoneState(savedZone);
      }

      const savedCoupon = localStorage.getItem(CART_COUPON_KEY);
      if (savedCoupon) {
        const cpn: Coupon = JSON.parse(savedCoupon);
        setCoupon(cpn);
      }
    } catch (e) {
      console.error('Failed to load cart from storage:', e);
    }
  }, []);

  // Save items to LocalStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage:', e);
    }
  }, [items, isMounted]);

  // Recalculate coupon discount whenever subtotal or coupon changes
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (!coupon) {
      setCouponDiscount(0);
      return;
    }
    const result = validateCoupon(coupon.code, subtotal);
    if (result.valid) {
      setCouponDiscount(result.discount);
      setCouponError(null);
    } else {
      setCouponDiscount(0);
      setCouponError(result.message);
    }
  }, [coupon, subtotal]);

  const setDeliveryZone = (zone: 'inside-dhaka' | 'outside-dhaka') => {
    setDeliveryZoneState(zone);
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_ZONE_KEY, zone);
    }
  };

  // Delivery charge calculation
  let deliveryCharge = deliveryZone === 'inside-dhaka' ? settings.insideDhakaDeliveryFee : settings.outsideDhakaDeliveryFee;
  if (subtotal >= settings.freeDeliveryThreshold && subtotal > 0) {
    deliveryCharge = 0;
  }

  const total = Math.max(0, subtotal - couponDiscount + deliveryCharge);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    const unitPrice = product.discountPrice ?? product.regularPrice;
    const cartItemId = `${product.id}_${selectedColor || ''}_${selectedSize || ''}`;

    setItems((prevItems) => {
      const existing = prevItems.find((it) => it.id === cartItemId);
      if (existing) {
        const newQty = Math.min(product.stock, existing.quantity + quantity);
        return prevItems.map((it) => (it.id === cartItemId ? { ...it, quantity: newQty } : it));
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          image: product.images[0] || '',
          price: unitPrice,
          regularPrice: product.regularPrice,
          quantity: Math.min(product.stock, Math.max(1, quantity)),
          selectedColor,
          selectedSize,
          sku: product.sku,
          maxStock: product.stock,
        };
        return [...prevItems, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          const clamped = Math.min(it.maxStock, quantity);
          return { ...it, quantity: clamped };
        }
        return it;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
    setCouponDiscount(0);
    setCouponError(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(CART_COUPON_KEY);
    }
  };

  const applyCouponCode = (code: string): boolean => {
    setCouponError(null);
    const result = validateCoupon(code, subtotal);
    if (result.valid && result.coupon) {
      setCoupon(result.coupon);
      setCouponDiscount(result.discount);
      if (typeof window !== 'undefined') {
        localStorage.setItem(CART_COUPON_KEY, JSON.stringify(result.coupon));
      }
      return true;
    } else {
      setCouponError(result.message);
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponDiscount(0);
    setCouponError(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_COUPON_KEY);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        deliveryCharge,
        deliveryZone,
        setDeliveryZone,
        coupon,
        couponDiscount,
        couponError,
        applyCouponCode,
        removeCoupon,
        total,
        isCartOpen,
        setIsCartOpen,
        settings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
