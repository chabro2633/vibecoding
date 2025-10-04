import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url') || 'https://vibecoding-irbxsqtdj-chabro2633s-projects.vercel.app';
    
    // 사이트의 HTML을 가져오기
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    return NextResponse.json({
      success: true,
      html: html,
      url: url
    });

  } catch (error) {
    console.error('사이트 HTML 가져오기 오류:', error);
    return NextResponse.json(
      { 
        error: '사이트 HTML을 가져오는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    );
  }
}
