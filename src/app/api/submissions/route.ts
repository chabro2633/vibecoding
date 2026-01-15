import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'submissions.json');

// 데이터 파일 경로 확인 및 생성
function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
}

// GET: 제출 목록 조회
export async function GET() {
  try {
    ensureDataFile();
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const submissions = JSON.parse(data);
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error reading submissions:', error);
    return NextResponse.json([]);
  }
}

// POST: 새 제출 저장
export async function POST(request: NextRequest) {
  try {
    ensureDataFile();
    const body = await request.json();
    const { name, feedback } = body;

    if (!name) {
      return NextResponse.json({ error: '이름은 필수입니다.' }, { status: 400 });
    }

    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const submissions = JSON.parse(data);

    const newSubmission = {
      id: Date.now(),
      name,
      feedback: feedback || '',
      submittedAt: new Date().toISOString(),
    };

    submissions.unshift(newSubmission);
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));

    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json({ error: '저장에 실패했습니다.' }, { status: 500 });
  }
}
