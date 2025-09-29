import fs from 'fs';
import path from 'path';

interface SubmissionData {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'submissions.json');

// 데이터 디렉토리 생성
const ensureDataDirectory = () => {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// 데이터 파일 읽기
export const readSubmissions = (): SubmissionData[] => {
  try {
    ensureDataDirectory();
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
};

// 데이터 파일 쓰기
export const writeSubmissions = (submissions: SubmissionData[]): boolean => {
  try {
    ensureDataDirectory();
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing submissions:', error);
    return false;
  }
};

// 새 제출 추가
export const addSubmission = (name: string, message: string): boolean => {
  try {
    const submissions = readSubmissions();
    const newSubmission: SubmissionData = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };
    
    submissions.push(newSubmission);
    return writeSubmissions(submissions);
  } catch (error) {
    console.error('Error adding submission:', error);
    return false;
  }
};

// 모든 데이터 삭제
export const clearAllSubmissions = (): boolean => {
  try {
    return writeSubmissions([]);
  } catch (error) {
    console.error('Error clearing submissions:', error);
    return false;
  }
};
