import { NextRequest, NextResponse } from 'next/server';
import { generateOrderId, generateInvoiceNumber, isValidBdPhone } from '@/lib/utils/formatters';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items, paymentMethod, couponCode, deliveryZone } = body;

    // Server-side validation
    if (!customer?.fullName || !customer?.phone || !customer?.district || !customer?.address) {
      return NextResponse.json(
        { success: false, error: 'Missing required customer delivery information.' },
        { status: 400 }
      );
    }

    if (!isValidBdPhone(customer.phone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid Bangladeshi phone number provided.' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart must contain at least one item.' },
        { status: 400 }
      );
    }

    // Calculate subtotal
    const subtotal = items.reduce(
      (sum: number, it: any) => sum + Number(it.price) * Number(it.quantity),
      0
    );

    // Delivery charge
    const deliveryFee = deliveryZone === 'inside-dhaka' ? 70 : 130;
    const finalDelivery = subtotal >= 2000 ? 0 : deliveryFee;

    // Discount
    let discount = 0;
    if (couponCode && couponCode.toUpperCase() === 'SHOKHORA10') {
      discount = Math.round((subtotal * 10) / 100);
      if (discount > 300) discount = 300;
    } else if (couponCode && couponCode.toUpperCase() === 'WELCOME50') {
      discount = 50;
    }

    const total = Math.max(0, subtotal - discount + finalDelivery);
    const orderId = generateOrderId();
    const invoiceNumber = generateInvoiceNumber(orderId);

    const orderRecord = {
      id: orderId,
      invoiceNumber,
      customer,
      items,
      subtotal,
      discount,
      deliveryCharge: finalDelivery,
      total,
      paidAmount: 0,
      dueAmount: total,
      paymentMethod,
      paymentStatus: 'Unpaid',
      orderStatus: 'Pending',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      order: orderRecord,
      orderId,
      invoiceNumber,
      message: 'Order created successfully.',
    });
  } catch (error: any) {
    console.error('Server checkout error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error processing checkout.' },
      { status: 500 }
    );
  }
}
