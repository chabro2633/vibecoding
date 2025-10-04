import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const SITE_HTML_PATH = path.join(process.cwd(), 'public', 'site', 'index.html');

// 사이트 HTML 업데이트
export async function POST(request: NextRequest) {
  try {
    const { html, page = 'index' } = await request.json();
    
    if (!html) {
      return NextResponse.json(
        { error: 'HTML 내용이 필요합니다.' },
        { status: 400 }
      );
    }

    // 디렉토리가 없으면 생성
    const dir = path.dirname(SITE_HTML_PATH);
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }

    // HTML 파일 저장
    await writeFile(SITE_HTML_PATH, html, 'utf-8');

    return NextResponse.json({
      success: true,
      message: '사이트 HTML이 성공적으로 업데이트되었습니다.',
      path: `/site/index.html`,
      url: `${process.env.VERCEL_URL || 'http://localhost:3000'}/site/index.html`
    });

  } catch (error) {
    console.error('사이트 HTML 업데이트 중 오류:', error);
    return NextResponse.json(
      { error: '사이트 HTML 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 사이트 HTML 로드
export async function GET() {
  try {
    // 파일이 존재하는지 확인
    if (!existsSync(SITE_HTML_PATH)) {
      return NextResponse.json({
        success: true,
        html: '',
        isDefault: true,
        message: '저장된 사이트 HTML이 없습니다.'
      });
    }

    // 기존 HTML 파일 읽기
    const html = await readFile(SITE_HTML_PATH, 'utf-8');
    
    return NextResponse.json({
      success: true,
      html,
      isDefault: false
    });

  } catch (error) {
    console.error('사이트 HTML 로드 중 오류:', error);
    return NextResponse.json(
      { error: '사이트 HTML 로드 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
