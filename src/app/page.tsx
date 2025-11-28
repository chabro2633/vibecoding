'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// StepCard and ChecklistItem components are not currently used but kept for future use
// const StepCard = ({ icon, title, time, description, isActive = false }: {
//   icon: string;
//   title: string;
//   time: string;
//   description: string;
//   isActive?: boolean;
// }) => (
//   <div className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
//     isActive ? 'border-orange-400 bg-orange-900/30' : 'border-gray-600 hover:border-gray-500'
//   }`}>
//     <div className={`text-3xl mb-2 ${isActive ? 'animate-pulse' : ''}`}>{icon}</div>
//     <div className="text-center">
//       <h3 className="font-bold text-lg mb-1 text-white">{title}</h3>
//       <p className="text-sm text-orange-400 mb-2">{time}</p>
//       <p className="text-sm text-gray-400">{description}</p>
//     </div>
//   </div>
// );

// const ChecklistItem = ({ text, checked = true }: { text: string; checked?: boolean }) => (
//   <div className="flex items-center space-x-2 mb-2">
//     <span className={`text-lg ${checked ? 'text-green-400' : 'text-gray-500'}`}>
//       {checked ? '✅' : '⬜'}
//     </span>
//     <span className={checked ? 'text-gray-200' : 'text-gray-400'}>{text}</span>
//   </div>
// );

const Collapsible = ({ title, children, defaultOpen = false }: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-600 rounded-lg overflow-hidden mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-gray-700 hover:bg-gray-600 transition-colors text-left flex items-center justify-between"
      >
        <span className="font-medium text-white">{title}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-800 border-t border-gray-600">
          {children}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>
        <div
          className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"
          style={{
            background: "radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 107, 53, 0.05) 0%, transparent 50%)"
          }}
        ></div>
      </div>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-black/95 backdrop-blur-[10px] border-b border-border-color">
        <nav className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/images/qanda-logo.png" alt="QANDA" width={80} height={80} className="object-contain" />
          </div>
          <div className="flex items-center">
            <Image src="/images/mathpresso-logo.png" alt="Mathpresso" width={120} height={120} className="object-contain" />
          </div>
        </nav>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-[65px] left-0 right-0 h-[2px] bg-border-color z-[999]">
        <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: "0%" }}></div>
      </div>

      {/* Main Content */}
      <div>
        <section className="hero mt-12 px-4 py-16 text-center relative">
          {/* Logo Images */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <Image src="/images/mathpresso-logo.png" alt="Mathpresso Logo" width={120} height={120} className="h-20 w-auto opacity-80" />
            <Image src="/images/qanda-logo.png" alt="Qanda Logo" width={120} height={120} className="h-20 w-auto opacity-90" />
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            바이브 코딩
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            <span className="text-xl md:text-2xl font-bold text-primary mb-2 inline-block">&quot;콴다의 모든 사람이 상상을 현실로 만들 수 있게&quot;</span>
            <br />
            AI와 함께하는 창의적인 개발 여정
          </p>

          {/* Section Tags */}
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <span className="bg-bg-card border border-primary px-4 py-2 rounded-full text-sm">📋 1부: 개발 환경 세팅</span>
            <span className="bg-bg-card border border-success px-4 py-2 rounded-full text-sm">🚀 2부: 프로젝트 준비 및 배포</span>
          </div>

          {/* Journey Roadmap */}
          <div className="w-full max-w-5xl mx-auto mt-8 mb-6 px-2 sm:px-4">
            <div className="bg-gradient-to-r from-bg-card to-bg-dark rounded-xl p-4 sm:p-6 border border-border-color">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-4 sm:mb-6 text-primary">🚀 바이브 코딩 여정</h3>

              {/* Desktop View */}
              <div className="hidden sm:block">
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-success/20 -z-10"></div>

                  <div className="relative flex flex-col items-center px-1 lg:px-2">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl mb-2 shadow-lg hover:scale-110 transition-transform">📋</div>
                    <div className="text-center">
                      <h4 className="font-bold text-primary text-xs sm:text-sm">준비</h4>
                      <p className="text-xs text-success font-semibold">10분</p>
                      <p className="text-xs text-text-secondary mt-1 max-w-[80px] sm:max-w-[100px] lg:max-w-[120px]">계정 설정</p>
                    </div>
                  </div>

                  <div className="relative flex flex-col items-center px-1 lg:px-2">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl mb-2 shadow-lg hover:scale-110 transition-transform">⚙️</div>
                    <div className="text-center">
                      <h4 className="font-bold text-primary text-xs sm:text-sm">환경설정</h4>
                      <p className="text-xs text-success font-semibold">15분</p>
                      <p className="text-xs text-text-secondary mt-1 max-w-[80px] sm:max-w-[100px] lg:max-w-[120px]">개발 도구 설치</p>
                    </div>
                  </div>

                  <div className="relative flex flex-col items-center px-1 lg:px-2">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl mb-2 shadow-lg hover:scale-110 transition-transform">🛠️</div>
                    <div className="text-center">
                      <h4 className="font-bold text-primary text-xs sm:text-sm">프로젝트 생성</h4>
                      <p className="text-xs text-success font-semibold">20분</p>
                      <p className="text-xs text-text-secondary mt-1 max-w-[80px] sm:max-w-[100px] lg:max-w-[120px]">Next.js 시작</p>
                    </div>
                  </div>

                  <div className="relative flex flex-col items-center px-1 lg:px-2">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl mb-2 shadow-lg hover:scale-110 transition-transform">🔗</div>
                    <div className="text-center">
                      <h4 className="font-bold text-primary text-xs sm:text-sm">Git 연동</h4>
                      <p className="text-xs text-success font-semibold">10분</p>
                      <p className="text-xs text-text-secondary mt-1 max-w-[80px] sm:max-w-[100px] lg:max-w-[120px]">버전 관리</p>
                    </div>
                  </div>

                  <div className="relative flex flex-col items-center px-1 lg:px-2">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl mb-2 shadow-lg hover:scale-110 transition-transform">🌐</div>
                    <div className="text-center">
                      <h4 className="font-bold text-primary text-xs sm:text-sm">배포!</h4>
                      <p className="text-xs text-success font-semibold">5분</p>
                      <p className="text-xs text-text-secondary mt-1 max-w-[80px] sm:max-w-[100px] lg:max-w-[120px]">웹사이트 공개</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile View */}
              <div className="sm:hidden">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-lg flex-shrink-0">📋</div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <h4 className="font-bold text-primary text-sm">준비</h4>
                        <p className="text-xs text-success font-semibold">10분</p>
                      </div>
                      <p className="text-xs text-text-secondary">계정 설정</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-lg flex-shrink-0">⚙️</div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <h4 className="font-bold text-primary text-sm">환경설정</h4>
                        <p className="text-xs text-success font-semibold">15분</p>
                      </div>
                      <p className="text-xs text-text-secondary">개발 도구 설치</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-lg flex-shrink-0">🛠️</div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <h4 className="font-bold text-primary text-sm">프로젝트 생성</h4>
                        <p className="text-xs text-success font-semibold">20분</p>
                      </div>
                      <p className="text-xs text-text-secondary">Next.js 시작</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-lg flex-shrink-0">🔗</div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <h4 className="font-bold text-primary text-sm">Git 연동</h4>
                        <p className="text-xs text-success font-semibold">10분</p>
                      </div>
                      <p className="text-xs text-text-secondary">버전 관리</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-lg flex-shrink-0">🌐</div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <h4 className="font-bold text-primary text-sm">배포!</h4>
                        <p className="text-xs text-success font-semibold">5분</p>
                      </div>
                      <p className="text-xs text-text-secondary">웹사이트 공개</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-text-secondary">
                  총 <span className="text-primary font-bold">약 1시간</span>으로
                  <span className="text-success font-bold"> 나만의 웹사이트</span>가 완성됩니다! ✨
                </p>
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 pb-16">

          {/* Prerequisites */}
          <section id="prepare" className="section mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-border-color">
              📌 사전 준비사항
            </h2>

            <div className="bg-bg-card border border-border-color rounded-xl p-8 mb-6 transition-all duration-200 hover:bg-bg-card-hover hover:border-[#333333] hover:-translate-y-0.5">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-primary">⚡ 준비물 체크리스트</h3>
                <p className="text-lg text-text-secondary mb-6">시작하기 전에 4가지를 미리 준비해주세요!</p>

                <div className="flex flex-wrap gap-3 justify-center mb-8">
                  <span className="bg-black/50 border border-primary/50 px-4 py-2 rounded-full text-sm">✅ Cursor 설치</span>
                  <span className="bg-black/50 border border-primary/50 px-4 py-2 rounded-full text-sm">✅ Cursor Pro 2주 Trial 시작</span>
                  <span className="bg-black/50 border border-primary/50 px-4 py-2 rounded-full text-sm">✅ GitHub 계정</span>
                  <span className="bg-black/50 border border-primary/50 px-4 py-2 rounded-full text-sm">✅ Vercel 계정</span>
                </div>

                <Link
                  href="/prepare"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  📋 상세 준비 가이드 보기
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>

                <p className="mt-6 text-sm text-text-secondary">💡 이미 준비가 끝났다면 바로 시작해도 좋아요!</p>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="my-8 flex items-center justify-center">
            <div className="h-0.5 w-full max-w-xs bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>

          {/* What is Vibe Coding */}
          <section id="intro" className="section mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-border-color">
              🎯 바이브 코딩이란?
            </h2>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 mb-6 transition-all duration-200 hover:bg-bg-card-hover hover:border-[#333333] hover:-translate-y-0.5">
              <p className="mb-4">AI와 함께 코딩하는 새로운 개발 방식입니다.</p>
              <div className="bg-[#050505] border border-border-color rounded-lg p-4 overflow-hidden">
                <p className="text-text-secondary whitespace-normal break-words">
                  <strong className="text-primary">💡 왜 Cursor?</strong>
                  <span className="inline-block">한국어로 대화하듯 코딩할 수 있고, 설치부터 배포까지 한 번에 가능한</span>
                  <strong className="inline-block">가장 친절한 AI 코딩 도구</strong>
                  <span className="inline">입니다.</span>
                </p>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="my-8 flex items-center justify-center">
            <div className="h-0.5 w-full max-w-xs bg-gradient-to-r from-transparent via-sky-400/50 to-transparent"></div>
          </div>

          {/* Section 1: 개발 환경 세팅 */}
          <section id="cursor" className="section mb-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-border-color">
              📋 1부: 개발 환경 세팅
            </h2>

            <h3 className="text-2xl font-bold mb-6 text-primary">🌐 Step 1. 준비 작업</h3>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 mb-6 transition-all duration-200 hover:bg-bg-card-hover hover:border-[#333333] hover:-translate-y-0.5" style={{ borderColor: "#ff6b35" }}>
              <p className="text-text-secondary mb-4">프로젝트를 시작하기 전에 필요한 준비를 해둡니다.</p>

              <div className="bg-gradient-to-r from-warning/20 to-primary/20 border-2 border-warning rounded-lg p-6 mb-6">
                <h4 className="text-xl font-bold text-warning mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  먼저 할 일: 프로젝트 폴더 만들기 (Cursor 열기 전!)
                </h4>
                <div className="bg-black/50 border border-warning/50 rounded-lg p-4">
                  <p className="text-base mb-3">
                    <strong className="text-warning">Cursor를 열기 전에</strong>, 먼저 우리가 작업할 폴더를 직접 만들어야 해요!
                  </p>
                  <ol className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-warning font-bold">1.</span>
                      <span>원하는 위치에 새 폴더 만들기 (예: 바탕화면, Documents, Downloads 등)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-warning font-bold">2.</span>
                      <span>폴더 이름 예시: <code className="bg-gray-800 px-2 py-1 rounded">vibe-coding</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-warning font-bold">3.</span>
                      <span className="text-warning font-semibold">폴더 이름은 영어로, 띄어쓰기 없이! (하이픈 - 사용 가능)</span>
                    </li>
                  </ol>
                </div>
                <div className="rounded-lg px-5 py-4 my-4 flex items-start gap-3 border bg-primary/10 border-primary/30 mt-4">
                  <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
                  <div>이 폴더는 나중에 Cursor에서 열 폴더입니다. 반드시 먼저 만들어주세요!</div>
                </div>
              </div>

              <div className="bg-[#050505] border border-border-color rounded-lg p-6">
                <ol className="space-y-4" start={2}>
                  <li className="relative pl-8">
                    <span className="absolute left-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                    <div>
                      <strong className="text-primary">GitHub에서 새 Repository 생성</strong>
                      <p className="text-sm text-text-secondary mt-1">github.com 로그인 → 우측 상단 + 버튼 → New repository 클릭</p>
                      <div className="mt-3">
                        <Image src="/images/repo.png" alt="GitHub New repository 버튼" width={700} height={500} className="w-full h-auto rounded-lg border border-border-color shadow-lg" />
                      </div>
                      <p className="text-sm text-text-secondary mt-2">
                        Repository 이름 입력 → <strong className="text-warning">아무것도 체크하지 말고</strong> → Create repository
                      </p>
                      <div className="mt-3">
                        <Image src="/images/repo2.png" alt="Repository 생성 화면" width={700} height={500} className="w-full h-auto rounded-lg border border-border-color shadow-lg" />
                      </div>
                      <p className="text-sm text-warning mt-2">⚠️ 이름은 영어, 숫자, 하이픈(-)만 사용 (예: my-cute-website)</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="rounded-lg px-5 py-4 my-4 flex items-start gap-3 border bg-primary/5 border-primary/20 mt-4">
                <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
                <div>
                  <strong>왜 빈 레포지토리를 만드나요?</strong><br />
                  빈 레포지토리는 Vercel에 바로 연결할 수 없어요. 먼저 프로젝트를 만들고 나서 연결합니다!
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 mt-8 text-primary">🚀 Step 2. Cursor 열고 프로젝트 폴더 선택하기</h3>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 mb-6 transition-all duration-200 hover:bg-bg-card-hover hover:border-[#333333] hover:-translate-y-0.5" style={{ borderColor: "#ff6b35" }}>
              <p className="text-text-secondary mb-4">Cursor를 처음 실행하면 먼저 작업할 폴더를 열어야 해요!</p>

              <div className="bg-[#050505] border border-border-color rounded-lg p-6">
                <h4 className="font-semibold text-primary mb-4">프로젝트 폴더 열기</h4>

                <div className="mb-6">
                  <Image src="/images/start.png" alt="Cursor Open Folder 화면" width={600} height={400} className="w-full max-w-2xl mx-auto rounded-lg border border-border-color shadow-lg" />
                </div>

                <ol className="space-y-4">
                  <li className="relative pl-8">
                    <span className="absolute left-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                    <strong>Cursor 실행</strong>
                    <p className="text-sm text-text-secondary mt-1">바탕화면이나 Dock에서 Cursor 아이콘 클릭</p>
                  </li>
                  <li className="relative pl-8">
                    <span className="absolute left-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                    <strong>Open Folder 클릭</strong>
                    <p className="text-sm text-text-secondary mt-1">시작 화면에서 &quot;Open Folder&quot; 버튼을 찾아 클릭</p>
                  </li>
                  <li className="relative pl-8">
                    <span className="absolute left-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                    <strong>프로젝트 폴더 선택</strong>
                    <p className="text-sm text-text-secondary mt-1">아까 만든 폴더 (예: vibe-coding) 선택 → Open 클릭</p>
                  </li>
                </ol>
              </div>

              <div className="rounded-lg px-5 py-4 my-4 flex items-start gap-3 border bg-primary/5 border-primary/20 mt-4">
                <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
                <div>
                  <strong>폴더를 열었나요?</strong><br />
                  이제 Cursor 왼쪽 사이드바에 폴더 구조가 보일 거예요. 아직은 비어있지만 곧 채워집니다!
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full bg-gradient-to-r from-sky-500/20 to-cyan-500/20 border border-sky-500/50 rounded-lg p-4 text-left hover:from-sky-500/30 hover:to-cyan-500/30 transition-all duration-200 group">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-sky-400 flex items-center gap-2">
                      <span className="text-2xl font-bold text-red-500">Q.</span>
                      왜 폴더를 먼저 열어야 하나요?
                    </h4>
                    <svg className="w-6 h-6 text-sky-400 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                  <p className="text-sm text-sky-300/70 mt-1">클릭해서 답변 보기</p>
                </button>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 mt-8 text-primary">🔐 Step 3. Cursor 로그인하기</h3>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 mb-6 transition-all duration-200 hover:bg-bg-card-hover hover:border-[#333333] hover:-translate-y-0.5" style={{ borderColor: "#a855f7" }}>
              <p className="text-text-secondary mb-4">AI와 대화하려면 먼저 로그인이 필요해요!</p>

              <div className="bg-[#050505] border border-border-color rounded-lg p-6">
                <h4 className="font-semibold text-primary mb-4">로그인 확인하기</h4>

                <div className="mb-6">
                  <Image src="/images/login.png" alt="Cursor 로그인 화면" width={600} height={400} className="w-full max-w-2xl mx-auto rounded-lg border border-border-color" />
                </div>

                <ol className="space-y-3">
                  <li className="relative pl-8">
                    <span className="absolute left-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                    <strong>Settings 열기</strong>
                    <p className="text-sm text-text-secondary">Windows: <kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">Ctrl + ,</kbd> | Mac: <kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">Cmd + ,</kbd></p>
                  </li>
                  <li className="relative pl-8">
                    <span className="absolute left-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                    <strong>Cursor Settings 탭 클릭</strong>
                  </li>
                  <li className="relative pl-8">
                    <span className="absolute left-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                    <strong>Account 확인</strong>
                    <p className="text-sm text-text-secondary">로그인이 안 되어 있다면 &quot;Log In&quot; 버튼 클릭</p>
                  </li>
                </ol>
              </div>

              <div className="rounded-lg px-5 py-4 my-4 flex items-start gap-3 border bg-primary/5 border-primary/20 mt-4">
                <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
                <div>
                  <strong>Pro Trial 확인:</strong> Settings에서 &quot;Pro Trial&quot; 또는 &quot;Free Trial&quot;이 보이면 성공!<br />
                  만약 안 보인다면 준비 가이드를 다시 확인해주세요.
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 mt-8 text-primary">🤖 Step 4. AI 모델 선택하기</h3>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 mb-6 transition-all duration-200 hover:bg-bg-card-hover hover:border-[#333333] hover:-translate-y-0.5" style={{ borderColor: "#a855f7" }}>
              <p className="text-text-secondary mb-4">Cursor에서 사용할 AI 모델을 선택합니다.</p>

              <div className="bg-[#050505] border border-border-color rounded-lg p-6">
                <ol className="space-y-4">
                  <li className="relative pl-8">
                    <span className="absolute left-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                    <strong>Settings → Models 탭</strong>
                  </li>
                  <li className="relative pl-8">
                    <span className="absolute left-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                    <strong>Chat Model 선택</strong>
                    <div className="mt-3 space-y-2">
                      <div className="bg-success/10 border border-success/30 rounded-lg p-3">
                        <strong className="text-success">✅ 추천: claude-3.5-sonnet</strong>
                        <p className="text-sm text-text-secondary">가장 똑똑하고 한국어를 잘 이해해요!</p>
                      </div>
                      <div className="bg-info/10 border border-info/30 rounded-lg p-3">
                        <strong className="text-info">🚀 빠른 응답: gpt-4o</strong>
                        <p className="text-sm text-text-secondary">빠르게 답변이 필요할 때 좋아요</p>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="rounded-lg px-5 py-4 my-4 flex items-start gap-3 border bg-success/10 border-success/30 mt-4">
                <span className="text-xl flex-shrink-0 mt-0.5">🎉</span>
                <div>
                  <strong>축하합니다!</strong> 이제 AI와 대화할 준비가 완료되었어요!<br />
                  채팅창을 열려면: <kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">Cmd/Ctrl + L</kbd>
                </div>
              </div>
            </div>

            {/* 에러 해결 마법 공식 */}
            <div className="bg-gradient-to-br from-primary/10 to-transparent border-2 border-primary rounded-xl p-6 my-6 text-center">
              <h3 className="text-2xl mb-4 text-primary font-semibold">🛡️ 에러 해결 마법 공식</h3>
              <p className="text-lg text-text-secondary mb-6">이제부터 AI와 본격적인 대화가 시작됩니다!</p>

              <div className="bg-gradient-to-r from-purple-500/10 to-primary/10 border border-purple-500/30 rounded-lg p-6 mb-6">
                <h4 className="text-xl font-bold text-purple-400 mb-4">🎯 가장 중요한 마인드셋</h4>
                <p className="text-lg mb-3">
                  <strong className="text-purple-400">우리는 개발을 배우러 온 게 아닙니다.</strong><br />
                  <span className="text-primary font-bold">바이브 코딩을 하러 왔습니다!</span>
                </p>
                <p className="text-text-secondary">
                  AI를 잘 활용하는 것이 핵심입니다. 에러가 나도 당황하지 마세요.<br />
                  모든 문제는 AI가 해결할 수 있습니다. 그냥 물어보면 됩니다!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
                <div className="bg-black/50 border border-border-color rounded-lg p-5">
                  <h4 className="text-primary mb-2 text-lg">💬 AI가 이해 못했을 때</h4>
                  <p className="mb-2">AI가 잘못 이해했거나 다른 걸 했나요?</p>
                  <strong className="text-primary font-semibold">해결:</strong>
                  <p className="text-sm mt-1">&quot;아니야, 내가 원한 건 ___야&quot; 라고 다시 설명</p>
                </div>
                <div className="bg-black/50 border border-border-color rounded-lg p-5">
                  <h4 className="text-primary mb-2 text-lg">🔴 에러 메시지가 떴을 때</h4>
                  <p className="mb-2">터미널이나 브라우저에 빨간 글씨?</p>
                  <strong className="text-primary font-semibold">해결:</strong>
                  <p className="text-sm mt-1">에러 전체를 복사해서 AI에게 &quot;이거 해결해줘&quot;</p>
                </div>
                <div className="bg-black/50 border border-border-color rounded-lg p-5">
                  <h4 className="text-primary mb-2 text-lg">⏳ 뭔가 안 될 때</h4>
                  <p className="mb-2">예상대로 작동하지 않나요?</p>
                  <strong className="text-primary font-semibold">해결:</strong>
                  <p className="text-sm mt-1">&quot;이게 안 되는데 확인해줘&quot; 라고 요청</p>
                </div>
                <div className="bg-black/50 border border-border-color rounded-lg p-5">
                  <h4 className="text-primary mb-2 text-lg">❓ 터미널이 물어볼 때</h4>
                  <p className="mb-2">(y/N) 같은 선택지가 나왔나요?</p>
                  <strong className="text-primary font-semibold">해결:</strong>
                  <p className="text-sm mt-1">대문자가 기본값! 잘 모르면 Enter</p>
                </div>
              </div>

              <div className="rounded-lg px-5 py-4 my-4 flex items-start gap-3 border bg-success/10 border-success/30 mt-6">
                <span className="text-xl flex-shrink-0 mt-0.5">💪</span>
                <div>
                  <strong>기억하세요!</strong> AI는 여러분의 개발 파트너입니다.<br />
                  &quot;이거 왜 안 돼?&quot;, &quot;이거 고쳐줘&quot;, &quot;다시 해줘&quot; - 이런 말들을 편하게 하세요!<br />
                  <strong className="text-success">에러는 AI와 대화할 기회일 뿐입니다.</strong>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-primary mt-8">💬 Step 5. 이제 AI 채팅으로 지시해보세요!</h3>
            <div className="bg-gradient-to-r from-primary/20 to-success/20 border-2 border-primary rounded-lg p-6">
              <p className="text-lg font-semibold mb-3 text-center">
                🎉 <span className="text-primary">축하합니다!</span> 이제부터 AI와 대화하면서 모든 걸 해결할 수 있어요!
              </p>
              <p className="text-center text-text-secondary">
                아래 단계들부터는 전부 <strong className="text-success">AI 채팅에 한국어로 말하면</strong> 됩니다.<br />
                예: &quot;Git 설치해줘&quot;, &quot;Node.js 설치 도와줘&quot;, &quot;에러 났어 도와줘&quot;
              </p>
              <div className="text-center mt-4">
                <kbd className="bg-gray-700 px-3 py-1.5 rounded text-sm">Cmd/Ctrl + L</kbd>
                <span className="text-sm text-text-secondary ml-2">← 채팅창 열기</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-primary mt-8">📦 Step 6. Git 설치</h3>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 mb-6 transition-all duration-200 hover:bg-bg-card-hover hover:border-[#333333] hover:-translate-y-0.5">
              <p className="text-text-secondary mb-6">코드의 변경사항을 기록하고 백업하는 도구입니다.</p>

              <div className="bg-gradient-to-r from-primary/10 to-warning/10 border-2 border-primary/50 rounded-lg p-6">
                <p className="mb-3 text-lg font-semibold text-primary flex items-center gap-2">
                  <span className="text-2xl">💬</span> Cursor AI 채팅에서 말하기:
                </p>
                <div className="bg-white text-black p-5 rounded-lg border-3 border-primary shadow-lg font-mono text-xl font-bold text-center">
                  &quot;Git 설치해줘&quot;
                </div>
              </div>

              <div className="mt-6">
                <Collapsible title="Q. Git이 뭔가요? 왜 필요한가요?">
                  <div className="text-text-secondary leading-relaxed">
                    <p><strong>Git은 코드의 변경 이력을 기록하는 도구</strong>예요! 📝</p>
                    <ul className="mt-2 space-y-1">
                      <li>• 게임 세이브처럼 코드를 저장하고 되돌릴 수 있어요</li>
                      <li>• 여러 사람이 함께 작업할 때 필수예요</li>
                      <li>• GitHub와 연동하려면 꼭 필요해요</li>
                    </ul>
                  </div>
                </Collapsible>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-primary mt-8">🟢 Step 7. Node.js 설치</h3>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 mb-6 transition-all duration-200 hover:bg-bg-card-hover hover:border-[#333333] hover:-translate-y-0.5">
              <p className="text-text-secondary mb-6">웹사이트를 실행하고 테스트하는데 필요한 환경입니다.</p>

              <div className="bg-gradient-to-r from-success/10 to-primary/10 border-2 border-success/50 rounded-lg p-6">
                <p className="mb-3 text-lg font-semibold text-success flex items-center gap-2">
                  <span className="text-2xl">💬</span> Cursor AI 채팅에서 말하기:
                </p>
                <div className="bg-white text-black p-5 rounded-lg border-3 border-success shadow-lg font-mono text-xl font-bold text-center">
                  &quot;Node.js 설치해줘&quot;
                </div>
              </div>

              <div className="mt-6">
                <Collapsible title="Q. Node.js가 뭔가요? 왜 필요한가요?">
                  <div className="text-text-secondary leading-relaxed">
                    <p><strong>Node.js는 JavaScript를 실행하는 환경</strong>이에요! 🚀</p>
                    <ul className="mt-2 space-y-1">
                      <li>• 웹사이트를 내 컴퓨터에서 실행하려면 필요해요</li>
                      <li>• Next.js가 Node.js 위에서 동작해요</li>
                      <li>• npm (Node Package Manager)도 함께 설치돼요</li>
                    </ul>
                  </div>
                </Collapsible>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-primary mt-8">▲ Step 8. Vercel CLI 설치</h3>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 mb-6 transition-all duration-200 hover:bg-bg-card-hover hover:border-[#333333] hover:-translate-y-0.5">
              <p className="text-text-secondary mb-6">웹사이트를 인터넷에 공개하는 서비스입니다.</p>

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/50 rounded-lg p-6">
                <p className="mb-3 text-lg font-semibold text-purple-400 flex items-center gap-2">
                  <span className="text-2xl">💬</span> Cursor AI 채팅에서 말하기:
                </p>
                <div className="bg-white text-black p-5 rounded-lg border-3 border-purple-500 shadow-lg font-mono text-xl font-bold text-center">
                  &quot;Vercel CLI 설치해줘&quot;
                </div>
              </div>

              <div className="mt-6 bg-blue-900/50 p-3 rounded border-l-4 border-blue-400">
                <p className="text-sm text-blue-200">💡 만약 설치가 안된다면 터미널에서 직접 <code className="bg-blue-800 px-1 rounded">npm i -g vercel</code> 명령어를 사용하세요.</p>
              </div>

              <div className="mt-6">
                <Collapsible title="Q. Vercel이 뭔가요? 왜 필요한가요?">
                  <div className="text-text-secondary leading-relaxed">
                    <p><strong>Vercel은 웹사이트를 인터넷에 공개하는 서비스</strong>입니다! 🌐</p>
                    <ul className="mt-2 space-y-1">
                      <li>• 내 컴퓨터에서만 보이던 웹사이트를 전 세계에 공개할 수 있어요</li>
                      <li>• 무료로 사용할 수 있고, Next.js와 궁합이 완벽해요</li>
                      <li>• 코드를 수정하면 자동으로 업데이트됩니다</li>
                    </ul>
                  </div>
                </Collapsible>
              </div>
            </div>
          </section>

          {/* Section 2: 프로젝트 준비 및 배포 */}
          <section className="border-t-4 border-green-500 pt-6">
            <div className="text-center my-20">
              <hr className="border-none border-t border-border-color max-w-[200px] mx-auto" />
              <p className="mt-8 text-2xl text-text-secondary">🎉 <strong className="text-primary">1부 완료!</strong> 이제 프로젝트를 준비해봅시다</p>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-border-color">
              📝 2부: 프로젝트 준비
            </h2>

            <h3 className="text-2xl font-bold mb-6 text-primary mt-8">⚡ Step 1. Next.js 프로젝트 생성</h3>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 mb-6 transition-all duration-200 hover:bg-bg-card-hover hover:border-[#333333] hover:-translate-y-0.5">
              <p className="text-text-secondary mb-6">이제 AI와 함께 실제 웹사이트를 만들어봅시다!</p>

              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-2 border-purple-500/50 rounded-lg p-6">
                <p className="mb-3 text-lg font-semibold text-purple-400 flex items-center gap-2">
                  <span className="text-2xl">💬</span> Cursor AI 채팅에서 말하기:
                </p>
                <div className="bg-white text-black p-5 rounded-lg border-3 border-purple-500 shadow-lg font-mono text-xl font-bold text-center">
                  &quot;create-next-app으로 [프로젝트-이름] 프로젝트 만들어줘&quot;
                </div>
                <p className="text-purple-300 text-sm mt-3">AI가 자동으로 Next.js 프로젝트를 생성해줄 거예요!</p>
              </div>

              <div className="mt-6 bg-blue-900/50 p-4 rounded border border-blue-600">
                <p className="text-sm font-bold text-white mb-3">💡 프로젝트 이름 짓기 팁</p>
                <ul className="text-sm text-blue-200 space-y-2 ml-4 list-disc">
                  <li><strong>영어로 지으세요:</strong> my-portfolio, todo-app, blog-site</li>
                  <li><strong>단어 사이에 - 사용:</strong> my-awesome-website (✅) myawesomewebsite (❌)</li>
                  <li><strong>직관적인 이름이 좋아요:</strong> shopping-list &gt; project1</li>
                  <li><strong>예시:</strong> my-first-site, vibe-coding-site, personal-blog</li>
                </ul>
              </div>

              <div className="mt-6">
                <Collapsible title="Q. Next.js가 뭔가요? create-next-app은 뭔가요?">
                  <div className="text-text-secondary leading-relaxed">
                    <p><strong>Next.js</strong>는 <strong>웹사이트를 만드는 레고 세트</strong>예요! 🧺</p>
                    <ul className="mt-2 space-y-1">
                      <li>• 복잡한 설정 없이 바로 웹사이트를 만들 수 있어요</li>
                      <li>• Vercel이 만들어서 배포할 때 호환성이 완벽해요!</li>
                      <li>• 많은 개발자들이 사용하는 인기 있는 도구예요</li>
                    </ul>
                    <p className="mt-3"><strong>create-next-app</strong>은 <strong>Next.js 프로젝트를 자동으로 만들어주는 마법사</strong>예요! 🪄</p>
                    <ul className="mt-1 space-y-1">
                      <li>• 필요한 파일과 폴더를 자동으로 생성해줘요</li>
                      <li>• 마치 집을 지을 때 기초공사를 대신 해주는 것과 같아요</li>
                      <li>• 몇 가지 질문에 답하면 알아서 다 준비해줘요</li>
                    </ul>
                  </div>
                </Collapsible>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-primary mt-8">🚀 Step 2. 로컬 서버 실행</h3>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 mb-6 transition-all duration-200 hover:bg-bg-card-hover hover:border-[#333333] hover:-translate-y-0.5">
              <p className="text-text-secondary mb-6">이제 만든 웹사이트를 실행해봅시다!</p>

              <div className="bg-gradient-to-r from-success/10 to-blue-500/10 border-2 border-success/50 rounded-lg p-6">
                <p className="mb-3 text-lg font-semibold text-success flex items-center gap-2">
                  <span className="text-2xl">💬</span> Cursor AI 채팅에서 말하기:
                </p>
                <div className="bg-white text-black p-5 rounded-lg border-3 border-success shadow-lg font-mono text-xl font-bold text-center">
                  &quot;로컬 서버 켜줘&quot;
                </div>
                <p className="text-green-300 text-sm mt-3">AI가 자동으로 npm run dev 명령어를 실행해줄 거예요!</p>
              </div>

              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4 shadow-sm">
                <h4 className="font-bold mb-3 text-white">위 방법이 안 되면 아래 단계를 따라해주세요:</h4>

                <ol className="list-decimal list-inside space-y-3 text-gray-300">
                  <li><strong>터미널 열기:</strong> Cursor 하단 패널에서 PowerShell(Mac은 Terminal) 선택 또는 <code className="bg-gray-700 px-1 rounded">Ctrl + `</code></li>

                  <li><strong>프로젝트 폴더로 이동 (필요한 경우만!)</strong>
                    <div className="ml-6 mt-2 bg-blue-900/50 p-3 rounded border border-blue-600">
                      <p className="text-sm text-blue-200 mb-2">👀 <strong>먼저 터미널 경로를 확인하세요!</strong></p>
                      <p className="text-sm text-blue-200">터미널 왼쪽에 현재 위치가 표시되어 있어요. 이미 프로젝트 폴더에 있다면 이 단계는 건너뛰세요!</p>
                    </div>
                    <div className="ml-6 mt-2">
                      <code className="bg-gray-700 px-2 py-1 rounded">cd [프로젝트 이름]</code>
                      <p className="text-sm text-gray-400 mt-1">💡 <strong>cd</strong> = &quot;Change Directory&quot; (폴더 이동하기)</p>
                      <p className="text-sm text-gray-400">예시: <code className="bg-gray-700 px-1 rounded">cd vibe-coding-site</code></p>
                    </div>
                  </li>

                  <li><strong>서버를 깨우는 마법 주문 🪄</strong>
                    <div className="ml-6 mt-2">
                      <code className="bg-gray-700 px-2 py-1 rounded text-lg">npm run dev</code>
                      <p className="text-sm text-gray-400 mt-1">💫 해리포터의 &quot;윙가르디움 레비오사&quot;처럼 서버를 띄우는 마법 주문이에요! 이 주문을 입력하면 웹사이트가 살아납니다 ✨</p>
                    </div>
                  </li>
                </ol>

                <div className="rounded-lg px-5 py-4 my-4 flex items-start gap-3 border bg-success/10 border-success/30">
                  <span className="text-xl flex-shrink-0 mt-0.5">✅</span>
                  <div className="text-sm">
                    서버가 실행되면 브라우저에서 <code className="bg-success/20 px-1 rounded">http://localhost:3000</code> 링크를 클릭하거나 주소창에 입력하세요!
                  </div>
                </div>

                <div className="rounded-lg px-5 py-4 my-4 flex items-start gap-3 border bg-warning/10 border-warning/30">
                  <span className="text-xl flex-shrink-0 mt-0.5">😅</span>
                  <div className="text-sm">
                    <strong>localhost 들어가도 안 되나요?</strong><br/>
                    걱정 마세요! Cursor에게 이렇게 물어보세요: <code className="bg-warning/20 px-1 rounded">&quot;localhost:3000에 접속이 안 돼. 서버가 실행 중인지 확인해줘&quot;</code> Cursor가 문제를 찾아서 해결해드릴 거예요!
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <Collapsible title="Q. 서버인데 로컬? 무슨 뜻이죠?">
                    <div className="text-sm text-gray-300 space-y-2">
                      <p><strong>로컬 서버는 여러분 컴퓨터에서만 돌아가는 서버예요!</strong></p>
                      <p>• Local = 내 컴퓨터 안에서만</p>
                      <p>• 아직 인터넷에 공개되지 않은 상태예요</p>
                      <p>• 개발하면서 미리 확인하기 위한 용도입니다</p>
                    </div>
                  </Collapsible>

                  <Collapsible title="Q. 친구에게 보여주고 싶은데 안 돼요!">
                    <div className="text-sm text-gray-300 space-y-2">
                      <p><strong>로컬 서버는 여러분 컴퓨터에서만 볼 수 있어요.</strong></p>
                      <p>친구에게 보여주려면 배포를 해야 합니다! 조금만 기다리면 배포 방법을 알려드릴게요.</p>
                    </div>
                  </Collapsible>

                  <Collapsible title="Q. localhost:3000이 뭔가요?">
                    <div className="text-sm text-gray-300 space-y-2">
                      <p><strong>localhost:3000은 내 컴퓨터 주소예요!</strong></p>
                      <p>• localhost = 내 컴퓨터를 가리키는 주소</p>
                      <p>• 3000 = 포트 번호 (문 번호 같은 거예요)</p>
                      <p>• 집 주소처럼, 웹사이트가 있는 위치를 알려주는 거예요</p>
                    </div>
                  </Collapsible>
                </div>
              </div>
            </div>

            {/* 웹사이트 만들기 섹션 */}
            <div className="bg-gray-900 rounded-lg p-8 text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                🎉 이제 실제로 웹사이트를 만들어봅시다!
              </h2>
              <p className="text-xl mb-6 text-gray-300">지금까지 배운 것들을 활용해서 나만의 웹사이트를 만들어볼 시간이에요!</p>

              <div className="bg-black/50 border border-purple-500/50 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">💡 5분 브레인스토밍</h3>
                <p className="text-lg mb-4 text-gray-300">어떤 웹사이트를 만들지 고민해보세요!</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <h4 className="font-bold text-purple-400 mb-2">예시 아이디어</h4>
                    <ul className="text-sm space-y-1 text-gray-300">
                      <li>• [귀여운] 강아지 사진 갤러리</li>
                      <li>• [여행자를 위한] 맛집 추천 사이트</li>
                      <li>• [나만의] 포트폴리오 웹사이트</li>
                      <li>• [친구들과 함께하는] 퀴즈 게임</li>
                    </ul>
                  </div>

                  <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                    <h4 className="font-bold text-pink-400 mb-2">AI에게 요청하기</h4>
                    <p className="text-sm text-gray-300">
                      &quot;귀여운 강아지 사진 갤러리 웹사이트 만들어줘&quot;<br/>
                      &quot;여행자를 위한 맛집 추천 사이트 만들어줘&quot;<br/>
                      이렇게 구체적으로 요청해보세요!
                    </p>
                  </div>
                </div>

                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
                >
                  ⏱️ 5분 타이머 시작하고 아이디어 정하기
                </Link>
              </div>

              <div className="rounded-lg px-5 py-4 my-4 flex items-start gap-3 border bg-green-500/10 border-green-500/30">
                <span className="text-xl flex-shrink-0 mt-0.5">🌟</span>
                <div className="text-left">
                  <strong className="text-green-400">준비되셨나요?</strong>
                  <span className="text-gray-300"> 이제 본격적으로 시작해봅시다!<br/>
                  아래 단계를 따라가면서 여러분만의 멋진 웹사이트를 만들어보세요!</span>
                </div>
              </div>
            </div>

            {/* Hot Reload */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🔥 실시간 수정 확인하기 (Hot Reload)</h3>
              <p className="text-gray-300 mb-4">코드를 수정하면 브라우저에서 바로 확인할 수 있어요! (Hot Reload)</p>

              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-sm">
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>코드 수정 → 저장 (Ctrl+S 또는 Cmd+S)</li>
                  <li>브라우저가 자동으로 새로고침됩니다</li>
                  <li>변경사항이 즉시 반영됩니다!</li>
                </ol>
              </div>
            </div>

            {/* 이미지 사용법 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🖼️ AI와 이미지에 대한 중요한 사실</h3>

              <div className="bg-red-900/30 border border-red-400 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-3 text-white">⚠️ 아니요!</h4>
                <p className="text-red-200 mb-3">AI는 이미지를 직접 찾거나 생성하지 못합니다.</p>
              </div>

              <div className="bg-yellow-900/50 border border-yellow-600 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-3 text-white">💡 이미지를 웹사이트에 넣는 방법</h4>

                <ol className="list-decimal list-inside space-y-2 text-yellow-200">
                  <li><strong>public 폴더를 만듭니다</strong></li>
                  <li><strong>이미지 파일을 그 폴더에 넣습니다</strong><br/>
                  <span className="text-sm">예: <code className="bg-yellow-800 px-1 rounded">public/logo.png</code></span></li>
                  <li><strong>AI 채팅에서 이렇게 말합니다:</strong><br/>
                  <span className="text-sm font-mono">&quot;public 폴더에 있는 logo.png를 메인 페이지 상단에 보여줘&quot;</span></li>
                </ol>

                <div className="mt-4">
                  <h5 className="font-bold mb-2 text-white">📁 public 폴더 구조 예시:</h5>

                  <div className="mb-4 rounded-lg overflow-hidden border border-gray-600">
                    <Image
                      src="/images/public.png"
                      alt="Public 폴더 구조"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div className="mt-3 p-2 bg-yellow-800 rounded border border-yellow-500">
                  <p className="text-sm text-yellow-100"><strong>💡 핵심 포인트:</strong> 이미지는 직접 준비해야 하고, AI는 그 이미지를 코드로 연결하는 일만 도와줍니다.</p>
                </div>
              </div>
            </div>

            {/* 개발자 도구 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🔍 브라우저 개발자 도구 사용법</h3>
              <p className="text-gray-300 mb-4">웹사이트 디버깅의 핵심 도구입니다!</p>

              <p className="text-gray-300 mb-4">웹사이트에서 문제가 생겼을 때, 브라우저 개발자 도구를 사용하면 AI가 문제를 더 빠르게 해결할 수 있어요!</p>

              <div className="bg-blue-900/50 border border-blue-400 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-3 text-white">🖱️ 개발자 도구 열기</h4>
                <p className="text-blue-200 mb-3">웹사이트에서 <strong>마우스 오른쪽 클릭</strong> → <strong>&quot;검사&quot;</strong> 클릭</p>

                <div className="mb-4 rounded-lg overflow-hidden border border-gray-600">
                  <Image
                    src="/images/inspect2.png"
                    alt="검사 메뉴"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>

                <p className="text-sm text-blue-300">단축키: Windows (F12 또는 Ctrl+Shift+I) / Mac (Cmd+Opt+I)</p>
              </div>

              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4 shadow-sm">
                <h4 className="font-bold mb-3 text-white">📱 콘솔과 모바일 뷰</h4>

                <div className="mb-4 rounded-lg overflow-hidden border border-gray-600">
                  <Image
                    src="/images/inspect.png"
                    alt="개발자 도구 화면"
                    width={700}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>

                <ul className="space-y-1 text-gray-300 mb-4">
                  <li><strong>Console 탭:</strong> 에러 메시지가 표시되는 곳</li>
                  <li><strong>모바일 아이콘:</strong> 모바일 화면에서 어떻게 보이는지 확인</li>
                </ul>

                <div className="bg-red-900/30 border border-red-400 rounded-lg p-3">
                  <h5 className="font-bold mb-2 text-white">🚨 콘솔 에러가 나타났을 때</h5>
                  <p className="text-red-200 mb-2">콘솔에 빨간색 에러 메시지가 보이면?</p>
                  <ol className="list-decimal list-inside space-y-1 text-red-200 text-sm">
                    <li>에러 메시지를 드래그해서 선택</li>
                    <li>복사 (Ctrl+C 또는 Cmd+C)</li>
                    <li>AI 채팅에 붙여넣고 <strong>&quot;이 에러를 해결해줘&quot;</strong></li>
                  </ol>
                </div>

                <div className="mt-3 p-2 bg-blue-900/50 rounded border border-blue-600">
                  <p className="text-sm text-blue-200"><strong>💡 꿀팁:</strong> 개발자 도구를 잘 활용하면 AI가 여러분의 문제를 정확히 이해하고 빠르게 해결할 수 있어요!</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: 배포 */}
          <section className="border-t-4 border-purple-500 pt-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-border-color">
              🌐 3부: 배포
            </h2>

            <h3 className="text-2xl font-bold mb-6 text-primary mt-8">🌐 Step 3. GitHub에 코드 올리고 Vercel로 배포하기</h3>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 mb-6 transition-all duration-200 hover:bg-bg-card-hover hover:border-[#333333] hover:-translate-y-0.5">
              <h4 className="font-bold mb-4 text-white text-xl">📋 GitHub 레포지토리 URL 복사</h4>
              <p className="mb-4 text-text-secondary">아까 만든 빈 레포지토리로 가면 이런 화면이 나와요:</p>

              <div className="mb-6 rounded-lg overflow-hidden border border-gray-600">
                <Image
                  src="/images/repolink.png"
                  alt="GitHub 레포지토리 URL"
                  width={700}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              <ol className="list-decimal list-inside space-y-2 text-text-secondary mb-6">
                <li><strong>Code 버튼 클릭</strong><br/>초록색 &quot;Code&quot; 버튼을 찾아서 클릭</li>
                <li><strong>HTTPS URL 복사</strong><br/>https://github.com/[username]/[repo-name].git 형태의 URL 복사</li>
              </ol>

              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/50 rounded-lg p-6 mb-6">
                <p className="mb-3 text-lg font-semibold text-blue-400 flex items-center gap-2">
                  <span className="text-2xl">💬</span> Cursor AI 채팅에서 말하기:
                </p>
                <div className="bg-white text-black p-5 rounded-lg border-3 border-blue-500 shadow-lg font-mono text-xl font-bold text-center">
                  &quot;GitHub 레포지토리 [복사한 URL] 에 연결해줘&quot;
                </div>
              </div>

              <h4 className="font-bold mb-4 text-white text-xl">🚀 그 다음, Vercel로 배포하기</h4>
              <p className="text-text-secondary mb-4">GitHub에 연결했다면, 이제 Vercel로 배포해보세요!</p>

              <div className="bg-gradient-to-r from-success/10 to-primary/10 border-2 border-success/50 rounded-lg p-6 mb-6">
                <p className="mb-3 text-lg font-semibold text-success flex items-center gap-2">
                  <span className="text-2xl">💬</span> Cursor AI 채팅에서 말하기:
                </p>
                <div className="bg-white text-black p-5 rounded-lg border-3 border-success shadow-lg font-mono text-xl font-bold text-center">
                  &quot;vercel에 로그인하고 배포까지 해줘&quot;
                </div>
                <p className="mt-3 text-sm text-green-300">AI가 Vercel CLI를 사용해서 자동으로 배포 프로세스를 진행해줄 거예요!</p>
              </div>

              {/* 중요 배포 설정 */}
              <div className="rounded-lg px-5 py-4 my-4 flex items-start gap-3 border bg-red-500/10 border-red-500/30">
                <span className="text-xl flex-shrink-0 mt-0.5">🚨</span>
                <div>
                  <strong className="text-red-300">중요! Vercel 배포 시 반드시 읽어주세요!</strong><br />
                  <span className="text-text-secondary">모두가 볼 수 있는 사이트를 만들려면 이 설정이 필요해요</span>
                </div>
              </div>

              <div className="rounded-lg px-5 py-4 my-4 flex items-start gap-3 border bg-primary/10 border-primary/30">
                <span className="text-xl flex-shrink-0 mt-0.5">⚠️</span>
                <div>
                  <strong>터미널 선택지 팁</strong><br />
                  터미널에서 <code className="bg-primary/20 px-1 rounded">(y/N)</code> 형태로 물어볼 때:<br />
                  • <strong>대문자(N)가 기본값</strong>입니다<br />
                  • 그냥 Enter = N 선택<br />
                  • y를 원하면 y 입력 후 Enter
                </div>
              </div>

              <div className="rounded-lg px-5 py-4 my-4 flex items-start gap-3 border bg-red-500/10 border-red-500/30">
                <span className="text-xl flex-shrink-0 mt-0.5">⚠️</span>
                <div>
                  <strong className="text-red-300">배포할 때 터미널에서 이런 질문이 나옵니다:</strong><br />
                  <code className="font-mono text-sm">Enable Vercel Authentication (y/N)?</code><br />
                  <strong className="text-red-300">👉 반드시 <code className="bg-red-800 px-1 rounded">n</code> 을 입력하세요!</strong><br />
                  <span className="text-sm text-text-secondary">
                  • 그냥 Enter 치면 안돼요! (Enter = N이지만 다른 의미)<br />
                  • 꼭 <strong>n</strong>을 타이핑하고 Enter를 눌러주세요<br />
                  • 이렇게 해야 다른 사람들도 여러분의 사이트를 볼 수 있어요
                  </span>
                </div>
              </div>

              <div className="my-4">
                <Collapsible title="Q. 실수로 Y를 눌렀다면?">
                  <div className="text-gray-300 space-y-3">
                    <p><strong>걱정하지 마세요! 다시 설정할 수 있어요.</strong></p>
                    <div className="bg-blue-900/50 p-3 rounded border-l-4 border-blue-400">
                      <p className="text-blue-200 text-sm"><strong>해결 방법:</strong></p>
                      <ol className="list-decimal list-inside mt-2 space-y-1 text-sm text-blue-200">
                        <li>Vercel 대시보드로 이동</li>
                        <li>프로젝트 설정에서 &quot;Password Protection&quot; 비활성화</li>
                        <li>또는 새 프로젝트로 다시 배포</li>
                      </ol>
                    </div>
                  </div>
                </Collapsible>
              </div>

              {/* 앞으로의 작업 플로우 */}
              <div className="rounded-lg px-5 py-4 my-4 flex items-start gap-3 border bg-info/10 border-info/30">
                <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
                <div>
                  <strong className="text-info">앞으로는 이렇게 하세요!</strong><br />
                  <span className="text-text-secondary">이제 다 세팅했으니까, 앞으로는 이 말을 습관처럼 하면 됩니다:</span><br />
                  <div className="p-3 bg-info/20 rounded text-center border border-info/50 my-2">
                    <p className="font-mono font-bold text-white">&quot;커밋, 푸쉬, 배포해줘&quot;</p>
                  </div>
                  <span className="text-sm text-text-secondary">💡 코드를 수정할 때마다 이 마법의 주문을 외워보세요! AI가 자동으로 GitHub에 저장하고 Vercel에 배포해줄 거예요.</span>
                </div>
              </div>

              <div className="space-y-3">
                <Collapsible title="Q. 커밋(Commit)? 그게 뭔가요?">
                  <div className="text-gray-300 space-y-3">
                    <p><strong>커밋은 &quot;세이브&quot;와 비슷해요!</strong></p>
                    <div className="bg-gray-700 p-3 rounded">
                      <p className="text-sm">🎮 <strong>게임으로 비유하면:</strong></p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm ml-4">
                        <li>커밋 = 게임 세이브</li>
                        <li>언제든 이 지점으로 돌아갈 수 있어요</li>
                        <li>&quot;홈페이지 디자인 완료&quot; 같은 메모도 남길 수 있어요</li>
                      </ul>
                    </div>
                  </div>
                </Collapsible>

                <Collapsible title="Q. Push? 그게 뭔가요?">
                  <div className="text-gray-300 space-y-3">
                    <p><strong>Push는 &quot;백업&quot;과 비슷해요!</strong></p>
                    <div className="bg-gray-700 p-3 rounded">
                      <p className="text-sm">☁️ <strong>클라우드 저장소로 비유하면:</strong></p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm ml-4">
                        <li>Push = 구글 드라이브에 업로드</li>
                        <li>컴퓨터가 고장나도 코드가 안전해요</li>
                        <li>다른 컴퓨터에서도 작업할 수 있어요</li>
                      </ul>
                    </div>
                  </div>
                </Collapsible>

                <Collapsible title="Q. 저는 혼자 만드는 건데 왜 Push를 해야하나요?">
                  <div className="text-gray-300 space-y-3">
                    <p><strong>혼자여도 Push가 꼭 필요해요!</strong></p>
                    <div className="bg-gray-700 p-3 rounded">
                      <p className="text-sm">🔗 <strong>Vercel이 GitHub에서 코드를 가져와요:</strong></p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm ml-4">
                        <li>Vercel = GitHub의 코드를 보고 웹사이트 만듦</li>
                        <li>Push 안 하면 = Vercel이 최신 코드를 못 봄</li>
                        <li>결국 = 업데이트된 사이트가 안 만들어짐</li>
                      </ul>
                    </div>
                  </div>
                </Collapsible>

                <Collapsible title="Q. Repository가 뭔가요?">
                  <div className="text-gray-300 space-y-3">
                    <p><strong>Repository는 &quot;프로젝트 보관함&quot;이에요!</strong></p>
                    <div className="bg-gray-700 p-3 rounded">
                      <p className="text-sm">📁 <strong>폴더로 비유하면:</strong></p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm ml-4">
                        <li>Repository = 프로젝트 전체를 담는 큰 폴더</li>
                        <li>모든 파일과 변경 기록이 들어있어요</li>
                        <li>GitHub = 이런 폴더들을 모아두는 창고</li>
                      </ul>
                    </div>
                  </div>
                </Collapsible>

                <Collapsible title="Q. 배포가 뭔가요?">
                  <div className="text-gray-300 space-y-3">
                    <p><strong>배포는 &quot;전세계에 공개&quot;하는 거예요!</strong></p>
                    <div className="bg-gray-700 p-3 rounded">
                      <p className="text-sm">🌍 <strong>쉽게 설명하면:</strong></p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm ml-4">
                        <li>지금까지는 내 컴퓨터에서만 볼 수 있었어요</li>
                        <li>배포하면 = 인터넷 주소가 생겨요</li>
                        <li>이제 누구나 그 주소로 들어와서 볼 수 있어요</li>
                      </ul>
                    </div>
                  </div>
                </Collapsible>
              </div>

              {/* 축하 메시지 */}
              <div className="rounded-lg px-5 py-4 my-4 flex items-start gap-3 border bg-success/10 border-success/30">
                <span className="text-xl flex-shrink-0 mt-0.5">🎉</span>
                <div>
                  <strong className="text-success">축하합니다!</strong><br />
                  <span className="text-text-secondary">이제 전 세계에서 여러분의 웹사이트를 볼 수 있어요! 배포가 완료되면 <code className="bg-success/20 px-1 rounded">https://프로젝트명.vercel.app</code> 같은 주소를 받게 됩니다.</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-primary mt-8">🔗 Step 3-2. 자동 배포 설정하기</h3>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 mb-6 transition-all duration-200 hover:bg-bg-card-hover hover:border-[#333333] hover:-translate-y-0.5">
              <p className="text-text-secondary mb-6">GitHub에 푸시할 때마다 자동으로 배포되도록 설정하면 편리합니다!</p>

              <div className="bg-gradient-to-r from-success/10 to-blue-500/10 border-2 border-success/50 rounded-lg p-6">
                <ol className="list-decimal list-inside space-y-3 text-green-200">
                  <li><strong>Vercel 대시보드에서 프로젝트 선택</strong></li>
                  <li><strong>Settings → Git → Deploy Hooks 설정</strong></li>
                  <li><strong>이제 git push만 하면 자동 배포!</strong></li>
                </ol>

                <div className="mt-6 p-4 bg-green-900/50 rounded border border-green-600">
                  <p className="text-sm text-green-100"><strong>💡 꿀팁:</strong> 이제부터는 코드를 수정하고 &quot;커밋, 푸쉬, 배포해줘&quot;라고 말하면 자동으로 웹사이트가 업데이트돼요!</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-primary mt-8">🔄 Step 3-3. 코드 가져오기 (Pull)</h3>
            <div className="bg-bg-card border border-border-color rounded-xl p-8 mb-6 transition-all duration-200 hover:bg-bg-card-hover hover:border-[#333333] hover:-translate-y-0.5">
              <p className="text-text-secondary mb-6">다른 컴퓨터에서 작업하거나, 팀원이 수정한 내용을 가져올 때 사용해요.</p>

              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/50 rounded-lg p-6">
                <p className="mb-3 text-lg font-semibold text-cyan-400 flex items-center gap-2">
                  <span className="text-2xl">💬</span> Cursor AI 채팅에서 말하기:
                </p>
                <div className="bg-white text-black p-5 rounded-lg border-3 border-cyan-500 shadow-lg font-mono text-xl font-bold text-center">
                  &quot;풀(pull) 해줘&quot; 또는 &quot;최신 코드 가져와줘&quot;
                </div>
              </div>

              <Collapsible title="Q. Pull? 언제 사용하나요?">
                <div className="text-gray-300 space-y-3">
                  <p><strong>이런 상황에서 Pull을 사용해요:</strong></p>
                  <div className="bg-gray-700 p-3 rounded">
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li><strong>다른 컴퓨터에서 작업할 때:</strong><br/>
                      집 컴퓨터 → 회사 컴퓨터로 옮겨서 작업</li>
                      <li><strong>팀원과 함께 작업할 때:</strong><br/>
                      동료가 수정한 내용을 내 컴퓨터로 가져오기</li>
                      <li><strong>브라우저에서 GitHub 수정했을 때:</strong><br/>
                      GitHub 웹사이트에서 직접 파일을 수정한 경우</li>
                    </ul>
                  </div>
                  <div className="bg-blue-900/50 p-3 rounded border-l-4 border-blue-400">
                    <p className="text-blue-200 text-sm"><strong>💡 기억하세요:</strong> Push는 올리기, Pull은 가져오기!</p>
                  </div>
                </div>
              </Collapsible>
            </div>

            {/* 도메인 변경 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🌐 도메인 이름 바꾸기 (선택사항)</h3>
              <p className="text-gray-300 mb-4">기본 주소가 너무 길다고요? Vercel에서 더 짧고 예쁜 주소로 바꿀 수 있어요!</p>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-600 rounded-lg p-4 mb-4">
                <div className="mb-4 rounded-lg overflow-hidden border border-gray-600">
                  <Image
                    src="/images/domain.png"
                    alt="Vercel 도메인 설정"
                    width={700}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>

                <ol className="list-decimal list-inside space-y-2 text-purple-200">
                  <li><strong>Vercel 대시보드 접속</strong><br/>
                  <span className="text-sm text-purple-300">vercel.com에 로그인 → 여러분의 프로젝트 클릭</span></li>
                  <li><strong>Settings → Domains 메뉴로 이동</strong><br/>
                  <span className="text-sm text-purple-300">프로젝트 설정에서 도메인 관리 페이지로 들어가요</span></li>
                  <li><strong>원하는 이름 입력하고 Add 클릭</strong><br/>
                  <span className="text-sm text-purple-300">예: my-awesome-site.vercel.app → coolsite.vercel.app</span></li>
                </ol>
              </div>

              <div className="bg-purple-900/50 rounded-lg p-4 text-center border border-purple-600">
                <h4 className="font-bold text-purple-200 mb-2">🌟 축하합니다!</h4>
                <p className="text-purple-200">이제 더 멋진 주소로 여러분의 웹사이트를 공유할 수 있어요!<br/>
                친구들에게 자랑해보세요! 🎊</p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-border-color py-8 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-text-secondary">© 2024 QANDA. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Floating Contact Button */}
      <a
        href="https://mathpresso-workspace.slack.com/team/U01GH3ZD9RR"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary-light text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 z-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        문의하기
      </a>
    </div>
  );
}
