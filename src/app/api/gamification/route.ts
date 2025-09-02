import { NextRequest, NextResponse } from 'next/server';
import { updateUserStreak, awardAchievement, getLeaderboard } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { action, uid, achievementId } = await request.json();
    
    if (!action || !uid) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'update_streak': {
        const newStreak = await updateUserStreak(uid);
        return NextResponse.json({ streak: newStreak });
      }
        
      case 'award_achievement': {
        if (!achievementId) {
          return NextResponse.json(
            { error: 'Achievement ID required' },
            { status: 400 }
          );
        }
        const awarded = await awardAchievement(uid, achievementId);
        return NextResponse.json({ awarded });
      }
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Gamification action error:', error);
    return NextResponse.json(
      { error: 'Failed to process gamification action' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    if (action === 'leaderboard') {
      const leaderboard = await getLeaderboard(limit);
      return NextResponse.json(leaderboard);
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Get gamification data error:', error);
    return NextResponse.json(
      { error: 'Failed to get gamification data' },
      { status: 500 }
    );
  }
}
