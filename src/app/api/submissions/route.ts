import { NextRequest, NextResponse } from 'next/server';

const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || '$2a$10$7hXfsxlTbemvEDUOw6DVUexOKrI8GHassxoXtMQ/pVRedgevE3WAS';
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || '6968e473ae596e708fde2cee';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// GET: 제출 목록 조회
export async function GET() {
  try {
    const response = await fetch(`${JSONBIN_URL}/latest`, {
      headers: {
        'X-Master-Key': JSONBIN_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from JSONBin');
    }

    const data = await response.json();
    return NextResponse.json(data.record.submissions || []);
  } catch (error) {
    console.error('Error reading submissions:', error);
    return NextResponse.json([]);
  }
}

// POST: 새 제출 저장
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, feedback } = body;

    if (!name) {
      return NextResponse.json({ error: '이름은 필수입니다.' }, { status: 400 });
    }

    // 기존 데이터 조회
    const getResponse = await fetch(`${JSONBIN_URL}/latest`, {
      headers: {
        'X-Master-Key': JSONBIN_API_KEY,
      },
    });

    let submissions = [];
    if (getResponse.ok) {
      const data = await getResponse.json();
      submissions = data.record.submissions || [];
    }

    // 새 제출 추가
    const newSubmission = {
      id: Date.now(),
      name,
      feedback: feedback || '',
      submittedAt: new Date().toISOString(),
    };

    submissions.unshift(newSubmission);

    // JSONBin 업데이트
    const updateResponse = await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY,
      },
      body: JSON.stringify({ submissions }),
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update JSONBin');
    }

    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json({ error: '저장에 실패했습니다.' }, { status: 500 });
  }
}
