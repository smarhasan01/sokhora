import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, transactionId, val_id, amount, currency } = body;

    // Check if SSLCOMMERZ credentials exist in server environment
    const storeId = process.env.SSLCOMMERZ_STORE_ID;
    const storePass = process.env.SSLCOMMERZ_STORE_PASSWORD;
    const isLive = process.env.SSLCOMMERZ_IS_LIVE === 'true';

    if (!storeId || !storePass) {
      // Gateway is not yet activated with live credentials
      return NextResponse.json({
        success: false,
        gatewayStatus: 'UNCONFIGURED',
        message:
          'SSLCOMMERZ merchant credentials not set in server environment. Online payments are in sandbox/staging mode. Please configure SSLCOMMERZ_STORE_ID and SSLCOMMERZ_STORE_PASSWORD in .env.local to enable real processing.',
        verification: {
          verified: false,
          orderId,
          transactionId,
        },
      });
    }

    // Server-to-server validation URL
    const validationUrl = isLive
      ? `https://securepay.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${storeId}&store_passwd=${storePass}&v=1&format=json`
      : `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${storeId}&store_passwd=${storePass}&v=1&format=json`;

    const gatewayResponse = await fetch(validationUrl);
    const data = await gatewayResponse.json();

    if (data.status === 'VALID' || data.status === 'VALIDATED') {
      // Validate currency and amount
      if (data.currency !== 'BDT') {
        return NextResponse.json({
          success: false,
          error: `Currency mismatch: expected BDT but received ${data.currency}`,
        });
      }

      if (Math.abs(Number(data.amount) - Number(amount)) > 0.01) {
        return NextResponse.json({
          success: false,
          error: `Amount mismatch: expected ৳${amount} but received ৳${data.amount}`,
        });
      }

      return NextResponse.json({
        success: true,
        gatewayStatus: 'VERIFIED',
        bankTrxId: data.bank_tran_id,
        cardType: data.card_type,
        cardIssuer: data.card_issuer,
        amount: Number(data.amount),
        currency: data.currency,
        verifiedAt: new Date().toISOString(),
      });
    } else {
      return NextResponse.json({
        success: false,
        gatewayStatus: 'FAILED',
        error: data.failedreason || 'Gateway validation failed.',
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Payment verification endpoint error.' },
      { status: 500 }
    );
  }
}
