'use client'

import Link from "next/link";
import { useState } from "react";

export default function PreparePage() {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-white">VIBEPICK</span>
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
          <h1 className="text-4xl font-bold mb-4 text-white">바이브 코딩 사전 준비</h1>
          <p className="text-xl text-gray-300 mb-2">원활한 세션을 위해 미리 준비해주세요</p>
          <div className="inline-block bg-white text-black px-4 py-2 rounded-full mt-4">
            ⏱️ 예상 소요시간: 약 15분
          </div>
        </div>

        {/* Preparation Checklist */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-white">⚡ 세션 시작 전 4가지 준비사항</h2>

          <div className="space-y-6">
            {/* 1. Cursor 설치 */}
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">Cursor 설치</h3>
                  <p className="text-gray-300 mb-4">AI 코딩 도구 Cursor를 다운로드하고 설치해주세요.</p>

                  <a
                    href="https://cursor.sh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    🔗 cursor.sh에서 다운로드
                  </a>

                  <div className="mt-4 p-3 bg-white/5 rounded border-l-4 border-gray-500">
                    <p className="text-sm text-gray-300">⏱️ 소요시간: 약 5분</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Cursor Pro 구독 */}
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">Cursor Pro 구독</h3>
                  <p className="text-gray-300 mb-4">AI 기능을 최대한 활용하기 위해 Pro 구독이 필요합니다.</p>

                  <div className="bg-white/5 border border-gray-600 rounded-lg p-4 mb-4">
                    <p className="text-gray-300 font-medium mb-2">💳 법인카드 등록 후 14일 무료체험 가능!</p>
                    <p className="text-gray-400 text-sm">무료 체험 기간 내 취소하면 비용이 청구되지 않습니다.</p>
                  </div>

                  <div className="bg-white/5 border-l-4 border-gray-600 p-3">
                    <p className="text-gray-300 text-sm">
                      <strong>결제 옵션:</strong> 비즈플레이 교육훈련비-일반
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. GitHub 가입 */}
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">GitHub 가입</h3>
                  <p className="text-gray-300 mb-4">코드를 저장하고 관리할 GitHub 계정을 만들어주세요.</p>

                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    🔗 github.com에서 가입
                  </a>

                  <div className="mt-4 p-3 bg-white/5 rounded border-l-4 border-gray-500">
                    <p className="text-sm text-gray-300">
                      <strong>⚠️ 주의:</strong> 개인 이메일 사용을 권장합니다
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Vercel 가입 */}
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">Vercel 가입</h3>
                  <p className="text-gray-300 mb-4">웹사이트를 배포할 Vercel 계정을 만들어주세요.</p>

                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    🔗 vercel.com에서 가입
                  </a>

                  <div className="mt-4 p-3 bg-white/5 rounded border-l-4 border-gray-500">
                    <p className="text-sm text-gray-300">
                      💡 <strong>권장:</strong> GitHub 계정으로 로그인하면 연동이 쉬워집니다
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Form */}
        <div className="mb-12">
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">준비 완료 제출</h2>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    이름 <span className="text-gray-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="홍길동"
                  />
                </div>

                <div>
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-2">
                    선택 사항 의견 (선택)
                  </label>
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="궁금한 점이나 의견을 자유롭게 작성해주세요"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black px-6 py-4 rounded-lg hover:bg-gray-200 transition-colors font-bold text-lg"
                >
                  ✅ 준비 완료!
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-white mb-2">제출 완료!</h3>
                <p className="text-gray-300 mb-6">{name}님, 준비가 완료되었습니다.</p>
                <Link
                  href="/"
                  className="inline-block bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  메인으로 돌아가기
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">💡 유용한 팁</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-gray-600 rounded-lg p-4">
              <h3 className="font-bold text-gray-300 mb-2">👤 개인 계정 사용</h3>
              <p className="text-gray-400 text-sm">GitHub와 Vercel은 개인 계정으로 가입하는 것을 권장합니다.</p>
            </div>

            <div className="bg-white/5 border border-gray-600 rounded-lg p-4">
              <h3 className="font-bold text-gray-300 mb-2">🎁 Cursor Pro 무료체험</h3>
              <p className="text-gray-400 text-sm">14일 무료체험 기간 동안 모든 기능을 사용해보세요.</p>
            </div>

            <div className="bg-white/5 border border-gray-600 rounded-lg p-4">
              <h3 className="font-bold text-gray-300 mb-2">🔗 GitHub-Vercel 연결</h3>
              <p className="text-gray-400 text-sm">Vercel 가입 시 GitHub 계정으로 로그인하면 연동이 자동으로 됩니다.</p>
            </div>

            <div className="bg-white/5 border border-gray-600 rounded-lg p-4">
              <h3 className="font-bold text-gray-300 mb-2">❓ 문제 발생 시</h3>
              <p className="text-gray-400 text-sm">준비 과정에서 문제가 발생하면 언제든지 문의해주세요.</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">준비 과정에서 도움이 필요하신가요?</p>
          <Link
            href="/"
            className="text-gray-300 hover:text-white underline"
          >
            문의하기
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 VIBEPICK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
