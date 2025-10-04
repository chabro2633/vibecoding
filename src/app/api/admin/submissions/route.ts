import { NextResponse } from 'next/server';
import { readSubmissions } from '@/lib/storage';

export async function GET() {
  try {
    const submissions = readSubmissions();
    
    return NextResponse.json(
      { 
        submissions: submissions,
        total: submissions.length 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin API 오류:', error);
    return NextResponse.json(
      { error: '데이터를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

