// Vercel 서버리스 환경에서 작동하는 메모리 기반 저장소

interface SubmissionData {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

// 메모리에 데이터 저장 (서버 재시작 시 초기화됨)
let submissionsStore: SubmissionData[] = [];

// 모든 제출 데이터 읽기
export const readSubmissions = (): SubmissionData[] => {
  try {
    return [...submissionsStore]; // 복사본 반환
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
};

// 제출 데이터 전체 덮어쓰기
export const writeSubmissions = (submissions: SubmissionData[]): boolean => {
  try {
    submissionsStore = [...submissions]; // 복사본 저장
    return true;
  } catch (error) {
    console.error('Error writing submissions:', error);
    return false;
  }
};

// 새 제출 추가
export const addSubmission = (name: string, message: string): boolean => {
  try {
    const newSubmission: SubmissionData = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };
    
    submissionsStore.push(newSubmission);
    console.log('새 제출 추가됨:', newSubmission);
    console.log('현재 총 제출 수:', submissionsStore.length);
    return true;
  } catch (error) {
    console.error('Error adding submission:', error);
    return false;
  }
};

// 모든 데이터 삭제
export const clearAllSubmissions = (): boolean => {
  try {
    submissionsStore = [];
    console.log('모든 제출 데이터 삭제됨');
    return true;
  } catch (error) {
    console.error('Error clearing submissions:', error);
    return false;
  }
};
