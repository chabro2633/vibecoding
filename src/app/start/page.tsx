'use client'

import Link from "next/link";

export default function StartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Main Title with Gradient */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-[10rem] font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 animate-pulse">
              여기 맞습니다
            </span>
          </h1>
          <h2 className="text-4xl md:text-7xl font-bold text-white">
            바이브 코딩 세션!
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mt-4">
            Cursor와 함께하는 AI 개발 세션
          </p>
        </div>

        {/* Decorative Bar */}
        <div className="flex items-center justify-center gap-4 my-12">
          <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 rounded"></div>
          <span className="text-4xl">🚀</span>
          <div className="h-1 flex-1 bg-gradient-to-r from-purple-500 via-green-500 to-transparent rounded"></div>
        </div>

        {/* Windows Users Notice */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <span className="text-3xl flex-shrink-0">💻</span>
            <div className="text-left">
              <p className="text-xl font-bold text-blue-400 mb-2">
                Windows 사용자분들은 한 곳에 모여 앉아주세요
              </p>
              <p className="text-gray-400">
                (일부 과정이 다르기 때문입니다)
              </p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-green-500 text-white px-10 py-5 rounded-2xl font-bold text-2xl hover:from-blue-600 hover:to-green-600 transition-all transform hover:scale-105 shadow-3xl"
          >
            🎯 시작하기
          </Link>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center gap-4 pt-12">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse delay-100"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-200"></div>
        </div>

        {/* Contact */}
        <div className="pt-8">
          <Link href="/" className="text-gray-400 hover:text-gray-300 underline">
            문의하기
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
}
