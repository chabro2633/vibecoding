import { NextRequest, NextResponse } from 'next/server';
import { addSubmission } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { name, message } = await request.json();

    // 간단한 유효성 검사
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: '이름을 입력해주세요.' },
        { status: 400 }
      );
    }

    // 데이터 저장
    const success = addSubmission(name, message || '');
    
    if (success) {
      console.log('준비 완료 제출 저장됨:', {
        name: name.trim(),
        message: message?.trim() || '(메시지 없음)',
        timestamp: new Date().toISOString()
      });

      return NextResponse.json(
        { message: '성공적으로 제출되었습니다.' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: '데이터 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
