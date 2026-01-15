'use client'

import Link from "next/link";
import { useState, useEffect } from "react";

interface Submission {
  id: number;
  name: string;
  feedback: string;
  submittedAt: string;
}

export default function AnswerPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions');
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error('데이터 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-blue-900 py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-white">chabro</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            ← 메인으로 돌아가기
          </Link>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white">준비 완료 현황</h1>
          <p className="text-xl text-gray-300 mb-2">세션 준비를 완료한 참여자 목록</p>
          <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full mt-4">
            총 {submissions.length}명 완료
          </div>
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-2xl text-gray-400">로딩 중...</div>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <div className="text-xl text-gray-400">아직 제출된 내용이 없습니다.</div>
            </div>
          ) : (
            submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-slate-900 border border-blue-500/50 rounded-lg p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">👤</span>
                      <h3 className="text-xl font-bold text-white">{submission.name}</h3>
                    </div>
                    <div className="text-sm text-blue-400 mb-3">
                      {formatDate(submission.submittedAt)}
                    </div>
                    {submission.feedback && (
                      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-3">
                        <p className="text-gray-300 text-sm whitespace-pre-wrap">{submission.feedback}</p>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <span className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                      ✅ 완료
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button
            onClick={fetchSubmissions}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            🔄 새로고침
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-900 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 chabro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
