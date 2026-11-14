import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const orderId = params.id;

  return NextResponse.json({
    success: true,
    orderId,
    receiptEndpoint: `/order/${orderId}`,
    message: 'Official money receipt printable layout available via /order/' + orderId,
  });
}
