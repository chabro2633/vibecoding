import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const HTML_FILE_PATH = path.join(process.cwd(), 'public', 'generated', 'index.html');

// HTML 파일 저장
export async function POST(request: NextRequest) {
  try {
    const { html } = await request.json();
    
    if (!html) {
      return NextResponse.json(
        { error: 'HTML 내용이 필요합니다.' },
        { status: 400 }
      );
    }

    // 디렉토리가 없으면 생성
    const dir = path.dirname(HTML_FILE_PATH);
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }

    // HTML 파일 저장
    await writeFile(HTML_FILE_PATH, html, 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'HTML이 성공적으로 저장되었습니다.',
      path: '/generated/index.html'
    });

  } catch (error) {
    console.error('HTML 저장 중 오류:', error);
    return NextResponse.json(
      { error: 'HTML 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// HTML 파일 로드
export async function GET() {
  try {
    // 파일이 존재하는지 확인
    if (!existsSync(HTML_FILE_PATH)) {
      // 기본 HTML 템플릿 반환
      const defaultHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vibe Coding</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: rgba(255,255,255,0.2);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            transition: all 0.3s ease;
            border: 2px solid rgba(255,255,255,0.3);
        }
        .btn:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 Vibe Coding</h1>
        <p>HTML 에디터로 만든 페이지입니다!</p>
        <a href="#" class="btn">시작하기</a>
    </div>
</body>
</html>`;
      
      return NextResponse.json({
        success: true,
        html: defaultHtml,
        isDefault: true
      });
    }

    // 기존 HTML 파일 읽기
    const html = await readFile(HTML_FILE_PATH, 'utf-8');
    
    return NextResponse.json({
      success: true,
      html,
      isDefault: false
    });

  } catch (error) {
    console.error('HTML 로드 중 오류:', error);
    return NextResponse.json(
      { error: 'HTML 로드 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// HTML 파일 삭제
export async function DELETE() {
  try {
    if (existsSync(HTML_FILE_PATH)) {
      const { unlink } = await import('fs/promises');
      await unlink(HTML_FILE_PATH);
    }

    return NextResponse.json({
      success: true,
      message: 'HTML 파일이 삭제되었습니다.'
    });

  } catch (error) {
    console.error('HTML 삭제 중 오류:', error);
    return NextResponse.json(
      { error: 'HTML 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
