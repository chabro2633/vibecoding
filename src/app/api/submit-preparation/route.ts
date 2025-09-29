import { NextRequest, NextResponse } from 'next/server';

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

    // 이메일 전송 로직 (EmailJS를 사용할 예정이므로 여기서는 성공 응답만 반환)
    // 실제 이메일 전송은 클라이언트 사이드에서 처리됩니다.
    
    // 로그 기록 (개발용)
    console.log('준비 완료 제출:', {
      name: name.trim(),
      message: message?.trim() || '(메시지 없음)',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { message: '성공적으로 제출되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
