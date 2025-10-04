import { NextResponse } from 'next/server';
import { clearAllSubmissions } from '@/lib/storage';

export async function DELETE() {
  try {
    const success = clearAllSubmissions();
    
    if (success) {
      return NextResponse.json(
        { message: '모든 데이터가 삭제되었습니다.' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: '데이터 삭제 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Admin Clear API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

