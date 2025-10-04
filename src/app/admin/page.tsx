'use client';

import { useState } from 'react';
import Link from 'next/link';
import HTMLEditor from '../components/HTMLEditor';

interface SubmissionData {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

const AdminPage = () => {
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [activeTab, setActiveTab] = useState<'submissions' | 'html-editor'>('submissions');

  // 간단한 비밀번호 인증 (실제 운영에서는 더 안전한 인증 시스템 필요)
  const adminPassword = 'chabro2024';

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      fetchSubmissions();
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/submissions');
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
      }
    } catch (error) {
      console.error('데이터 로딩 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sortedSubmissions = [...submissions].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const clearAllData = async () => {
    if (confirm('정말로 모든 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        const response = await fetch('/api/admin/clear', {
          method: 'DELETE',
        });
        if (response.ok) {
          setSubmissions([]);
          alert('모든 데이터가 삭제되었습니다.');
        }
      } catch (error) {
        console.error('데이터 삭제 중 오류:', error);
        alert('데이터 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // HTML 에디터 관련 함수들
  const handleHtmlSave = async (html: string) => {
    const response = await fetch('/api/html-editor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html }),
    });

    if (!response.ok) {
      throw new Error('HTML 저장에 실패했습니다.');
    }

    return response.json();
  };

  const handleHtmlLoad = async (): Promise<string> => {
    const response = await fetch('/api/html-editor');
    
    if (!response.ok) {
      throw new Error('HTML 로드에 실패했습니다.');
    }

    const data = await response.json();
    return data.html;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-600 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">🔐 Admin 로그인</h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              로그인
            </button>
            <div className="text-center">
              <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
                ← 메인 페이지로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">🛠️ 차브로 Admin</h1>
            {/* 탭 네비게이션 */}
            <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('submissions')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'submissions'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                📋 제출 현황
              </button>
              <button
                onClick={() => setActiveTab('html-editor')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'html-editor'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                📝 HTML 에디터
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-blue-400 hover:text-blue-300">
              메인 페이지
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-gray-400 hover:text-gray-300"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* System Status */}
        <div className="mb-6 bg-blue-900/30 border border-blue-600 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="text-blue-400">ℹ️</div>
            <p className="text-blue-200 text-sm">
              <strong>저장 방식:</strong> {activeTab === 'submissions' ? '메모리 기반 저장 (서버 재시작 시 데이터 초기화됨)' : '파일 기반 저장 (public/generated/index.html)'}
            </p>
          </div>
        </div>

        {/* HTML 에디터 (임시로 항상 표시) */}
        <div className="mb-6">
          <HTMLEditor
            onSave={handleHtmlSave}
            onLoad={handleHtmlLoad}
          />
        </div>

        {/* HTML 에디터 탭 */}
        {activeTab === 'html-editor' && (
          <div className="space-y-6">
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">📝 HTML 에디터</h2>
              <p className="text-gray-400 mb-6">
                HTML 코드를 편집하고 미리보기할 수 있습니다. 저장된 HTML은 <code className="bg-gray-700 px-2 py-1 rounded">/generated/index.html</code>에 저장됩니다.
              </p>
              <HTMLEditor
                onSave={handleHtmlSave}
                onLoad={handleHtmlLoad}
              />
            </div>
            
            {/* 생성된 HTML 미리보기 링크 */}
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">🔗 생성된 페이지 링크</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <a
                    href="/generated/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    🌐 새 탭에서 열기
                  </a>
                  <span className="text-gray-400 text-sm">
                    /generated/index.html
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href="/site/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
                  >
                    🚀 업데이트된 사이트 보기
                  </a>
                  <span className="text-gray-400 text-sm">
                    /site/index.html
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 제출 현황 탭 */}
        {activeTab === 'submissions' && (
          <>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
            <div className="flex items-center">
              <div className="text-3xl mr-4">👥</div>
              <div>
                <p className="text-2xl font-bold text-white">{submissions.length}</p>
                <p className="text-gray-400">총 참가자</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📝</div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {submissions.filter(s => s.message && s.message.trim()).length}
                </p>
                <p className="text-gray-400">메시지 작성자</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📅</div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {submissions.length > 0 
                    ? new Date(submissions[0]?.timestamp).toLocaleDateString('ko-KR')
                    : '-'
                  }
                </p>
                <p className="text-gray-400">최신 제출일</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">📋 제출 현황</h2>
            <button
              onClick={fetchSubmissions}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              🔄 새로고침
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            >
              <option value="newest">최신순</option>
              <option value="oldest">오래된순</option>
            </select>
            <button
              onClick={clearAllData}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              🗑️ 전체 삭제
            </button>
          </div>
        </div>

        {/* Submissions List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-400">데이터를 불러오는 중...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-gray-400">아직 제출된 데이터가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedSubmissions.map((submission, index) => (
              <div
                key={submission.id}
                className="bg-gray-800 border border-gray-600 rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-400 font-bold">#{index + 1}</div>
                    <h3 className="text-xl font-bold text-white">{submission.name}</h3>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {new Date(submission.timestamp).toLocaleString('ko-KR')}
                  </div>
                </div>
                {submission.message && (
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-300 whitespace-pre-wrap">{submission.message}</p>
                  </div>
                )}
                {!submission.message && (
                  <div className="text-gray-500 italic">메시지 없음</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Export Options */}
        {submissions.length > 0 && (
          <div className="mt-8 bg-gray-800 border border-gray-600 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">📊 내보내기 옵션</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  const csv = [
                    ['번호', '이름', '메시지', '제출시간'],
                    ...submissions.map((s, i) => [
                      i + 1,
                      s.name,
                      s.message || '',
                      new Date(s.timestamp).toLocaleString('ko-KR')
                    ])
                  ].map(row => row.join(',')).join('\n');
                  
                  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
                  const link = document.createElement('a');
                  link.href = URL.createObjectURL(blob);
                  link.download = `vibe-coding-submissions-${new Date().toISOString().split('T')[0]}.csv`;
                  link.click();
                }}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                📁 CSV 다운로드
              </button>
              <button
                onClick={() => {
                  const json = JSON.stringify(submissions, null, 2);
                  const blob = new Blob([json], { type: 'application/json' });
                  const link = document.createElement('a');
                  link.href = URL.createObjectURL(blob);
                  link.download = `vibe-coding-submissions-${new Date().toISOString().split('T')[0]}.json`;
                  link.click();
                }}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
              >
                📄 JSON 다운로드
              </button>
            </div>
          </div>
        )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
