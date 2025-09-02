import { NextRequest, NextResponse } from 'next/server';
import { processReferral, getReferralStats } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { referralCode, newUserUid } = await request.json();
    
    if (!referralCode || !newUserUid) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const success = await processReferral(referralCode, newUserUid);
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Referral processed successfully' 
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid referral code' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Referral processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process referral' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    
    if (!uid) {
      return NextResponse.json(
        { error: 'Missing user ID' },
        { status: 400 }
      );
    }

    const stats = await getReferralStats(uid);
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Get referral stats error:', error);
    return NextResponse.json(
      { error: 'Failed to get referral stats' },
      { status: 500 }
    );
  }
}
