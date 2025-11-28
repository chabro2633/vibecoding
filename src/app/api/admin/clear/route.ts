import { NextResponse } from 'next/server';

// 메모리 기반 저장소 (실제 운영에서는 데이터베이스 사용 권장)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let submissions: unknown[] = [];

export async function DELETE() {
  try {
    submissions = [];
    
    return NextResponse.json(
      { message: '모든 데이터가 삭제되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin Clear API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

