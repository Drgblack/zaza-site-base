import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsData } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const analytics = await getAnalyticsData();
    
    return NextResponse.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch analytics data' 
      },
      { status: 500 }
    );
  }
}
