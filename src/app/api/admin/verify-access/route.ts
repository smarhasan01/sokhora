import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { authorized: false, error: 'Email parameter required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Default authorized admin whitelist & verification
    const authorizedOwners = ['owner@shokhora.com'];
    const authorizedStaff = ['admin@shokhora.com'];

    const isOwner = authorizedOwners.includes(cleanEmail);
    const isStaff = authorizedStaff.includes(cleanEmail);

    if (isOwner) {
      return NextResponse.json({
        authorized: true,
        role: 'owner',
        permissions: {
          canManageProducts: true,
          canManageOrders: true,
          canManageInventory: true,
          canManageCoupons: true,
          canManageSettings: true,
          canManageTeam: true,
        },
      });
    }

    if (isStaff) {
      return NextResponse.json({
        authorized: true,
        role: 'admin',
        permissions: {
          canManageProducts: true,
          canManageOrders: true,
          canManageInventory: true,
          canManageCoupons: true,
          canManageSettings: false,
          canManageTeam: false,
        },
      });
    }

    // Unauthorized
    return NextResponse.json(
      {
        authorized: false,
        error: 'Access Denied: You do not have administrator permissions.',
      },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { authorized: false, error: 'Verification failed.' },
      { status: 500 }
    );
  }
}
