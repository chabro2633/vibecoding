import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'public', 'content', 'sections.json');

// 기본 콘텐츠 데이터
const defaultContent = {
  hero: {
    logoName: "chabro",
    title: "바이브 코딩",
    slogan: "모든 사람이 상상을 현실로 만들 수 있게",
    subtitle: "AI와 함께하는 창의적인 개발 여정",
    tags: [
      { icon: "📋", text: "1부: 개발 환경 세팅", color: "primary" },
      { icon: "🚀", text: "2부: 프로젝트 준비 및 배포", color: "success" }
    ]
  },
  journey: {
    title: "바이브 코딩 여정",
    totalTime: "약 1시간",
    completionMessage: "나만의 웹사이트가 완성됩니다!",
    steps: [
      { icon: "📋", title: "준비", time: "10분", description: "계정 설정" },
      { icon: "⚙️", title: "환경설정", time: "15분", description: "개발 도구 설치" },
      { icon: "🛠️", title: "프로젝트 생성", time: "20분", description: "Next.js 시작" },
      { icon: "🔗", title: "Git 연동", time: "10분", description: "버전 관리" },
      { icon: "🌐", title: "배포!", time: "5분", description: "웹사이트 공개" }
    ]
  },
  prerequisites: {
    title: "사전 준비사항",
    icon: "📌",
    cardTitle: "준비물 체크리스트",
    cardIcon: "⚡",
    subtitle: "시작하기 전에 4가지를 미리 준비해주세요!",
    items: [
      "Cursor 설치",
      "Cursor Pro 2주 Trial 시작",
      "GitHub 계정",
      "Vercel 계정"
    ],
    buttonText: "상세 준비 가이드 보기",
    buttonLink: "/prepare"
  },
  intro: {
    title: "소개",
    icon: "💡",
    content: "바이브 코딩은 AI와 함께 웹사이트를 만드는 세션입니다."
  },
  cursor: {
    title: "Cursor 시작하기",
    icon: "🚀",
    subtitle: "AI 코딩 도구",
    steps: [
      {
        title: "Cursor 다운로드",
        description: "cursor.com에서 다운로드하세요",
        image: "/images/cursor-download.png"
      },
      {
        title: "Cursor 시작 화면",
        description: "Cursor를 실행하면 시작 화면이 나타납니다",
        image: "/images/cursor-start.png"
      },
      {
        title: "폴더 열기",
        description: "Open Folder를 클릭하여 프로젝트 폴더를 선택합니다",
        image: "/images/cursor-folder.png"
      },
      {
        title: "채팅 화면",
        description: "Cmd+L로 AI 채팅을 열 수 있습니다",
        image: "/images/cursor-chat.png"
      }
    ]
  }
};

// 콘텐츠 로드
export async function GET() {
  try {
    // 파일이 존재하는지 확인
    if (!existsSync(CONTENT_FILE_PATH)) {
      // 기본 콘텐츠 반환
      return NextResponse.json({
        success: true,
        content: defaultContent,
        isDefault: true
      });
    }

    // 기존 콘텐츠 파일 읽기
    const fileContent = await readFile(CONTENT_FILE_PATH, 'utf-8');
    const content = JSON.parse(fileContent);

    return NextResponse.json({
      success: true,
      content,
      isDefault: false
    });

  } catch (error) {
    console.error('콘텐츠 로드 중 오류:', error);
    return NextResponse.json(
      { error: '콘텐츠 로드 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 콘텐츠 저장
export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: '콘텐츠가 필요합니다.' },
        { status: 400 }
      );
    }

    // 디렉토리가 없으면 생성
    const dir = path.dirname(CONTENT_FILE_PATH);
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }

    // JSON 파일 저장 (포맷팅)
    await writeFile(CONTENT_FILE_PATH, JSON.stringify(content, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: '콘텐츠가 성공적으로 저장되었습니다.',
      path: '/content/sections.json'
    });

  } catch (error) {
    console.error('콘텐츠 저장 중 오류:', error);
    return NextResponse.json(
      { error: '콘텐츠 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 특정 섹션만 업데이트
export async function PATCH(request: NextRequest) {
  try {
    const { sectionId, sectionData } = await request.json();

    if (!sectionId || !sectionData) {
      return NextResponse.json(
        { error: '섹션 ID와 데이터가 필요합니다.' },
        { status: 400 }
      );
    }

    // 기존 콘텐츠 로드
    let content = defaultContent;
    if (existsSync(CONTENT_FILE_PATH)) {
      const fileContent = await readFile(CONTENT_FILE_PATH, 'utf-8');
      content = JSON.parse(fileContent);
    }

    // 섹션 업데이트
    content[sectionId as keyof typeof content] = sectionData;

    // 디렉토리가 없으면 생성
    const dir = path.dirname(CONTENT_FILE_PATH);
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }

    // JSON 파일 저장
    await writeFile(CONTENT_FILE_PATH, JSON.stringify(content, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: `'${sectionId}' 섹션이 업데이트되었습니다.`,
      updatedSection: sectionData
    });

  } catch (error) {
    console.error('섹션 업데이트 중 오류:', error);
    return NextResponse.json(
      { error: '섹션 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
