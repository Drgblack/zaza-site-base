import { NextRequest, NextResponse } from "next/server";
import { getClientIP } from "../route";

// Simple in-memory bonus tracking (replace with Redis/KV in production)
const bonusStore = new Map<string, { granted: boolean; date: string }>();

export async function POST(req: NextRequest) {
  try {
    const userIP = getClientIP(req);
    const today = new Date().toDateString();
    const bonusKey = `bonus:${userIP}:${today}`;
    
    const existing = bonusStore.get(bonusKey);
    if (existing && existing.granted) {
      return NextResponse.json({ 
        already_granted: true,
        message: "Bonus already claimed today"
      });
    }
    
    // Grant bonus
    bonusStore.set(bonusKey, { granted: true, date: today });
    
    return NextResponse.json({ 
      bonus_granted: true,
      message: "You've earned +1 free message today!"
    });
    
  } catch (error) {
    console.error('Bonus grant error:', error);
    return NextResponse.json({ 
      error: "Something went wrong." 
    }, { status: 500 });
  }
}