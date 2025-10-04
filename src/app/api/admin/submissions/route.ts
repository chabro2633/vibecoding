import { NextResponse } from 'next/server';

// 메모리 기반 저장소 (실제 운영에서는 데이터베이스 사용 권장)
let submissions: any[] = [];

export async function GET() {
  try {
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

