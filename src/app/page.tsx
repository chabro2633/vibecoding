'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const StepCard = ({ icon, title, time, description, isActive = false }: {
  icon: string;
  title: string;
  time: string;
  description: string;
  isActive?: boolean;
}) => (
  <div className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
    isActive ? 'border-orange-400 bg-orange-900/30' : 'border-gray-600 hover:border-gray-500'
  }`}>
    <div className={`text-3xl mb-2 ${isActive ? 'animate-pulse' : ''}`}>{icon}</div>
    <div className="text-center">
      <h3 className="font-bold text-lg mb-1 text-white">{title}</h3>
      <p className="text-sm text-orange-400 mb-2">{time}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  </div>
);

const ChecklistItem = ({ text, checked = true }: { text: string; checked?: boolean }) => (
  <div className="flex items-center space-x-2 mb-2">
    <span className={`text-lg ${checked ? 'text-green-400' : 'text-gray-500'}`}>
      {checked ? '✅' : '⬜'}
    </span>
    <span className={checked ? 'text-gray-200' : 'text-gray-400'}>{text}</span>
  </div>
);

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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/images/qanda-logo.png" alt="QANDA" width={120} height={40} className="h-8 w-auto" />
          </div>
          <div className="flex items-center space-x-2">
            <Image src="/images/mathpresso-logo.png" alt="Mathpresso" width={120} height={40} className="h-8 w-auto" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">바이브 코딩</h1>
          <p className="text-xl text-gray-300 mb-2">&quot;콴다의 모든 사람이 상상을 현실로 만들 수 있게&quot;</p>
          <p className="text-lg text-gray-400">AI와 함께하는 창의적인 개발 여정</p>
        </div>

        {/* Journey Steps */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">🚀 바이브 코딩 여정</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StepCard
              icon="📋"
              title="준비"
              time="10분"
              description="계정 설정"
              isActive={true}
            />
            <StepCard
              icon="⚙️"
              title="환경설정"
              time="15분"
              description="개발 도구 설치"
            />
            <StepCard
              icon="🛠️"
              title="프로젝트 생성"
              time="20분"
              description="Next.js 시작"
            />
            <StepCard
              icon="🔗"
              title="Git 연동"
              time="10분"
              description="버전 관리"
            />
            <StepCard
              icon="🌐"
              title="배포!"
              time="5분"
              description="웹사이트 공개"
            />
          </div>
          <p className="text-center mt-6 text-gray-400">총 약 1시간으로 나만의 웹사이트가 완성됩니다! ✨</p>
        </div>

        {/* Prerequisites */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 text-white">📌 사전 준비사항</h2>

          <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 max-w-2xl mx-auto shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-white">⚡ 준비물 체크리스트</h3>
            <p className="mb-4 text-gray-300">시작하기 전에 4가지를 미리 준비해주세요!</p>

            <div className="space-y-2">
              <ChecklistItem text="Cursor 설치" />
              <ChecklistItem text="Cursor Pro 2주 Trial 시작" />
              <ChecklistItem text="GitHub 계정" />
              <ChecklistItem text="Vercel 계정" />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/prepare" className="inline-block bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors">
                📋 상세 준비 가이드 보기
              </Link>
            </div>

            <div className="mt-4 p-3 bg-blue-900/50 rounded border-l-4 border-blue-400">
              <p className="text-blue-200 text-sm">💡 이미 준비가 끝났다면 바로 시작해도 좋아요!</p>
            </div>
          </div>
        </div>

        {/* What is Vibe Coding */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 text-white">🎯 바이브 코딩이란?</h2>
          <p className="text-lg text-gray-300 mb-4">AI와 함께 코딩하는 새로운 개발 방식입니다.</p>

          <div className="mt-4 p-3 bg-blue-900/50 rounded border-l-4 border-blue-400 max-w-2xl mx-auto">
            <p className="text-blue-200"><strong>💡 왜 Cursor?</strong><br/>
            한국어로 대화하듯 코딩할 수 있고, 설치부터 배포까지 한 번에 가능한<br/>
            <strong>가장 친절한 AI 코딩 도구</strong>입니다.</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Section 1: 개발 환경 세팅 */}
          <section className="border-t-4 border-orange-400 pt-6">
            <h2 className="text-3xl font-bold mb-6 text-white">📋 1부: 개발 환경 세팅</h2>

            {/* Step 1 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🌐 Step 1. 준비 작업</h3>
              <p className="text-gray-300 mb-4">프로젝트를 시작하기 전에 필요한 준비를 해둡니다.</p>

              <div className="bg-red-900/30 border-l-4 border-red-400 p-4 mb-4">
                <h4 className="font-bold text-red-300 mb-2">⚠️먼저 할 일: 프로젝트 폴더 만들기 (Cursor 열기 전!)</h4>
                <p className="text-red-200 mb-2"><strong>Cursor를 열기 전에</strong>, 먼저 우리가 작업할 폴더를 직접 만들어야 해요!</p>
                <ol className="list-decimal list-inside text-red-200 space-y-1">
                  <li>원하는 위치에 새 폴더 만들기 (예: 바탕화면, Documents, Downloads 등)</li>
                  <li>폴더 이름 예시: <code className="bg-red-800 px-1 rounded">vibe-coding</code></li>
                  <li>폴더 이름은 영어로, 띄어쓰기 없이! (하이픈 - 사용 가능)</li>
                </ol>
                <div className="mt-3 p-2 bg-blue-900/50 rounded border border-blue-600">
                  <p className="text-blue-200 text-sm">💡 이 폴더는 나중에 Cursor에서 열 폴더입니다. 반드시 먼저 만들어주세요!</p>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4 shadow-sm">
                <h4 className="font-bold mb-2 text-white">1. GitHub에서 새 Repository 생성</h4>
                <p className="mb-3 text-gray-300">github.com 로그인 → 우측 상단 + 버튼 → New repository 클릭</p>

                <div className="mb-4 rounded-lg overflow-hidden border border-gray-600">
                  <Image
                    src="/images/repo.png"
                    alt="GitHub 대시보드 - New repository 버튼"
                    width={700}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>

                <p className="mb-3 text-gray-300">Repository 이름 입력 → <strong>아무것도 체크하지 말고</strong> → Create repository</p>

                <div className="mb-4 rounded-lg overflow-hidden border border-gray-600">
                  <Image
                    src="/images/repo2.png"
                    alt="GitHub Repository 생성 폼"
                    width={700}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>

                <div className="bg-yellow-900/50 p-2 rounded border-l-4 border-yellow-600">
                  <p className="text-sm text-yellow-200">⚠️ 이름은 영어, 숫자, 하이픈(-)만 사용 (예: my-cute-website)</p>
                </div>
                <div className="mt-2 p-2 bg-blue-900/50 rounded border border-blue-600">
                  <p className="text-sm text-blue-200"><strong>💡 왜 빈 레포지토리를 만드나요?</strong><br/>
                  빈 레포지토리는 Vercel에 바로 연결할 수 없어요. 먼저 프로젝트를 만들고 나서 연결합니다!</p>
                </div>
              </div>

              <Collapsible title="Q. 왜 폴더를 먼저 열어야 하나요?">
                <div className="text-gray-300 space-y-3">
                  <p><strong>Cursor는 폴더 단위로 프로젝트를 관리해요!</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>폴더를 열어야 AI가 프로젝트 전체를 이해할 수 있어요</li>
                    <li>터미널도 해당 폴더 위치에서 실행돼요</li>
                    <li>나중에 파일을 찾기도 쉬워져요</li>
                  </ul>
                  <div className="bg-yellow-900/50 p-3 rounded border-l-4 border-yellow-600">
                    <p className="text-yellow-200 text-sm"><strong>꿀팁:</strong> 폴더 이름은 영어로, 띄어쓰기 없이 만드세요! (예: my-project)</p>
                  </div>
                </div>
              </Collapsible>
            </div>

            {/* Step 2 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🚀 Step 2. Cursor 열고 프로젝트 폴더 선택하기</h3>
              <p className="text-gray-300 mb-4">Cursor를 처음 실행하면 먼저 작업할 폴더를 열어야 해요!</p>

              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4 shadow-sm">
                <h4 className="font-bold mb-3 text-white">프로젝트 폴더 열기</h4>

                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li><strong>Cursor 실행</strong><br/>바탕화면이나 Dock에서 Cursor 아이콘 클릭

                    <div className="mt-3 mb-3 rounded-lg overflow-hidden border border-gray-600">
                      <Image
                        src="/images/start.png"
                        alt="Cursor 시작 화면"
                        width={600}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                  </li>
                  <li><strong>Open Folder 클릭</strong><br/>시작 화면에서 &quot;Open Folder&quot; 버튼을 찾아 클릭

                    <div className="mt-3 mb-3 rounded-lg overflow-hidden border border-gray-600">
                      <Image
                        src="/images/start.png"
                        alt="Cursor Open Folder 화면"
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
                    </div>
                  </li>
                  <li><strong>프로젝트 폴더 선택</strong><br/>아까 만든 폴더 (예: vibe-coding) 선택 → Open 클릭</li>
                </ol>
                <div className="mt-3 p-2 bg-blue-900/50 rounded border border-blue-600">
                  <p className="text-sm text-blue-200">💡 <strong>폴더를 열었나요?</strong><br/>
                  이제 Cursor 왼쪽 사이드바에 폴더 구조가 보일 거예요. 아직은 비어있지만 곧 채워집니다!</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🔐 Step 3. Cursor 로그인하기</h3>
              <p className="text-gray-300 mb-4">AI와 대화하려면 먼저 로그인이 필요해요!</p>

              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4 shadow-sm">
                <h4 className="font-bold mb-3 text-white">로그인 확인하기</h4>

                <div className="mb-4 rounded-lg overflow-hidden border border-gray-600">
                  <Image
                    src="/images/login.png"
                    alt="Cursor 로그인 화면"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>

                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li><strong>Settings 열기</strong><br/>Windows: Ctrl + , | Mac: Cmd + ,</li>
                  <li><strong>Cursor Settings 탭 클릭</strong></li>
                  <li><strong>Account 확인</strong><br/>로그인이 안 되어 있다면 &quot;Log In&quot; 버튼 클릭</li>
                </ol>
                <div className="mt-3 p-2 bg-blue-900/50 rounded border border-blue-600">
                  <p className="text-sm text-blue-200">💡 <strong>Pro Trial 확인:</strong> Settings에서 &quot;Pro Trial&quot; 또는 &quot;Free Trial&quot;이 보이면 성공!<br/>
                  만약 안 보인다면 준비 가이드를 다시 확인해주세요.</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🤖 Step 4. AI 모델 선택하기</h3>
              <p className="text-gray-300 mb-4">Cursor에서 사용할 AI 모델을 선택합니다.</p>

              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-sm">
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li><strong>Settings → Models 탭</strong></li>
                  <li><strong>Chat Model 선택</strong>
                    <ul className="ml-6 mt-2 space-y-2">
                      <li>✅ <strong>추천: claude-3.5-sonnet</strong><br/>
                      <span className="text-sm text-gray-400">가장 똑똑하고 한국어를 잘 이해해요</span></li>
                      <li>🚀 <strong>빠른 응답: gpt-4o</strong><br/>
                      <span className="text-sm text-gray-400">빠르게 답변이 필요할 때 좋아요</span></li>
                    </ul>
                  </li>
                </ol>
                <div className="mt-3 p-3 bg-green-900/50 rounded border border-green-600">
                  <p className="text-sm font-medium text-green-200">🎉 <strong>축하합니다!</strong> 이제 AI와 대화할 준비가 완료되었어요!<br/>
                  채팅창을 열려면: Cmd/Ctrl + L</p>
                </div>
              </div>
            </div>

            {/* Step 5 - AI 채팅으로 지시해보기 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🎯 Step 5. 이제 AI 채팅으로 지시해보세요!</h3>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-400 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-3 text-white">⚡ 축하합니다! 이제 AI와 대화할 준비가 모두 끝났어요!</h4>
                <p className="text-orange-200 mb-3">이제 터미널을 사용하지 않고 한국어로 편하게 개발할 수 있습니다.</p>
                <p className="text-orange-200 mb-3">예: &quot;Git 설치해줘&quot;, &quot;Node.js 설치해줘&quot;</p>

                <div className="bg-orange-100 rounded-lg p-3 border border-orange-400">
                  <p className="text-sm font-mono text-orange-100">
                    <strong>Cmd/Ctrl + L</strong> ← 채팅창 열기
                  </p>
                </div>
              </div>
            </div>

            {/* Step 6 - Git 설치 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🔧 Step 6. Git 설치</h3>
              <p className="text-gray-300 mb-4">코드의 변경사항을 기록하고 백업하는 도구입니다.</p>

              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4 shadow-sm">
                <div className="bg-blue-900/50 border border-blue-600 rounded-lg p-4 mb-4">
                  <h4 className="font-bold mb-2 text-white">🤖 Cursor AI 채팅에서 말하기:</h4>
                  <div className="bg-gray-800 rounded-lg p-3 border">
                    <p className="text-gray-200 font-mono">&quot;Git 설치해줘&quot;</p>
                  </div>
                </div>

                <Collapsible title="Q. Git이 뭔가요? 왜 필요한가요?">
                  <div className="text-sm text-gray-300 space-y-2">
                    <p><strong>Git은 코드의 변경사항을 기록하는 도구입니다.</strong></p>
                    <p>• 코드를 수정할 때마다 &quot;저장점&quot;을 만들어줍니다</p>
                    <p>• 실수로 코드를 망쳤을 때 이전 상태로 되돌릴 수 있어요</p>
                    <p>• GitHub에 코드를 올리려면 반드시 필요합니다</p>
                  </div>
                </Collapsible>
              </div>
            </div>

            {/* Step 7 - Node.js 설치 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🟢 Step 7. Node.js 설치</h3>
              <p className="text-gray-300 mb-4">웹사이트를 실행하고 테스트하는 도구입니다.</p>

              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4 shadow-sm">
                <div className="bg-green-900/50 border border-green-600 rounded-lg p-4 mb-4">
                  <h4 className="font-bold mb-2 text-white">🤖 Cursor AI 채팅에서 말하기:</h4>
                  <div className="bg-gray-800 rounded-lg p-3 border">
                    <p className="text-gray-200 font-mono">&quot;Node.js 설치해줘&quot;</p>
                  </div>
                </div>

                <Collapsible title="Q. Node.js가 뭔가요? 왜 필요한가요?">
                  <div className="text-sm text-gray-300 space-y-2">
                    <p><strong>Node.js는 JavaScript를 실행하는 환경입니다.</strong></p>
                    <p>• 웹사이트를 내 컴퓨터에서 미리 볼 수 있게 해줍니다</p>
                    <p>• Next.js 같은 최신 웹 기술을 사용할 수 있게 해줍니다</p>
                    <p>• 개발할 때 필수적인 도구입니다</p>
                  </div>
                </Collapsible>
              </div>
            </div>

            {/* Step 8 - Vercel CLI 설치 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">▲ Step 8. Vercel CLI 설치</h3>
              <p className="text-gray-300 mb-4">웹사이트를 인터넷에 공개하는 서비스입니다.</p>

              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4 shadow-sm">
                <div className="bg-purple-900/50 border border-purple-600 rounded-lg p-4 mb-4">
                  <h4 className="font-bold mb-2 text-white">🤖 Cursor AI 채팅에서 말하기:</h4>
                  <div className="bg-gray-800 rounded-lg p-3 border">
                    <p className="text-gray-200 font-mono">&quot;Vercel CLI 설치해줘&quot;</p>
                  </div>
                </div>

                <div className="bg-blue-900/50 p-2 rounded border-l-4 border-blue-400 mb-3">
                  <p className="text-sm text-blue-200">💡 만약 설치가 안된다면 터미널에서 직접 <code className="bg-blue-800 px-1 rounded">npm i -g vercel</code> 명령어를 사용하세요.</p>
                </div>

                <Collapsible title="Q. Vercel이 뭔가요? 왜 필요한가요?">
                  <div className="text-sm text-gray-300 space-y-2">
                    <p><strong>Vercel은 웹사이트를 인터넷에 공개하는 서비스입니다.</strong></p>
                    <p>• 내 컴퓨터에서만 보이던 웹사이트를 전 세계에 공개할 수 있어요</p>
                    <p>• 무료로 사용할 수 있고, Next.js와 궁합이 완벽해요</p>
                    <p>• 코드를 수정하면 자동으로 업데이트됩니다</p>
                  </div>
                </Collapsible>
              </div>
            </div>

            {/* Error Resolution */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🛡️ 에러 해결 마법 공식</h3>
              <p className="text-gray-300 mb-4">이제부터 AI와 본격적인 대화가 시작됩니다!</p>

              <div className="bg-blue-900/50 border border-blue-400 border-l-4 p-4 mb-4">
                <h4 className="font-bold mb-2 text-white">🎯 가장 중요한 마인드셋</h4>
                <p className="text-blue-200 mb-2"><strong>우리는 개발을 배우러 온 게 아닙니다.</strong><br/>바이브 코딩을 하러 왔습니다!</p>
                <p className="text-blue-200">AI를 잘 활용하는 것이 핵심입니다. 에러가 나도 당황하지 마세요.<br/>
                모든 문제는 AI가 해결할 수 있습니다. 그냥 물어보면 됩니다!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-900/50 rounded-lg p-4 border border-yellow-600">
                  <h4 className="font-bold mb-2 text-white">💬 AI가 이해 못했을 때</h4>
                  <p className="text-sm mb-2 text-yellow-200">AI가 잘못 이해했거나 다른 걸 했나요?</p>
                  <p className="text-sm font-medium text-yellow-100">해결: &quot;아니야, 내가 원한 건 ___야&quot; 라고 다시 설명</p>
                </div>
                <div className="bg-red-900/30 rounded-lg p-4 border border-red-400">
                  <h4 className="font-bold mb-2 text-white">🔴 에러가 났을 때</h4>
                  <p className="text-sm mb-2 text-red-200">빨간 글씨로 에러가 나타났나요?</p>
                  <p className="text-sm font-medium text-red-100">해결: 에러 메시지를 복사해서 AI에게 &quot;이 에러 해결해줘&quot;</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: 프로젝트 준비 및 배포 */}
          <section className="border-t-4 border-green-500 pt-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                🎉 1부 완료! 이제 프로젝트를 준비해봅시다
              </div>
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-400 rounded-2xl px-8 py-6 shadow-xl">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-white mb-2">📝 2부: 프로젝트 준비</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Step 1 - Next.js 프로젝트 생성 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">⚡ Step 1. Next.js 프로젝트 생성</h3>
              <p className="text-gray-300 mb-4">이제 AI와 함께 실제 웹사이트를 만들어봅시다!</p>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-600 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-2 text-white">🤖 Cursor AI 채팅에서 말하기:</h4>
                <div className="bg-gray-800 rounded-lg p-3 border">
                  <p className="text-gray-200 font-mono">&quot;create-next-app으로 [프로젝트-이름] 프로젝트 만들어줘&quot;</p>
                </div>
                <p className="text-purple-200 text-sm mt-2">AI가 자동으로 Next.js 프로젝트를 생성해줄 거예요!</p>

                <div className="mt-4 bg-blue-900/50 p-3 rounded border border-blue-600">
                  <p className="text-sm font-bold text-white mb-2">💡 프로젝트 이름 짓기 팁</p>
                  <ul className="text-sm text-blue-200 space-y-1 ml-4 list-disc">
                    <li><strong>영어로 지으세요:</strong> my-portfolio, todo-app, blog-site</li>
                    <li><strong>단어 사이에 - 사용:</strong> my-awesome-website (✅) myawesomewebsite (❌)</li>
                    <li><strong>직관적인 이름이 좋아요:</strong> shopping-list &gt; project1</li>
                    <li><strong>예시:</strong> my-first-site, vibe-coding-site, personal-blog</li>
                  </ul>
                </div>

                <Collapsible title="Q. Next.js가 뭔가요? create-next-app은 뭔가요?">
                  <div className="text-sm text-gray-300 space-y-2">
                    <p><strong>Next.js는 웹사이트를 쉽게 만드는 도구입니다.</strong></p>
                    <p>• React 기반의 최신 웹 프레임워크예요</p>
                    <p>• create-next-app은 Next.js 프로젝트를 자동으로 만들어주는 명령어입니다</p>
                    <p>• 복잡한 설정 없이 바로 시작할 수 있어요</p>
                  </div>
                </Collapsible>
              </div>
            </div>

            {/* Step 2 - 로컬 서버 실행 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🚀 Step 2. 로컬 서버 실행</h3>
              <p className="text-gray-300 mb-4">이제 만든 웹사이트를 실행해봅시다!</p>

              <div className="bg-green-900/50 border border-green-600 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-2 text-white">🤖 Cursor AI 채팅에서 말하기:</h4>
                <div className="bg-gray-800 rounded-lg p-3 border text-center">
                  <p className="text-gray-200 font-mono">&quot;로컬 서버 켜줘&quot;</p>
                </div>
                <p className="text-green-200 text-sm mt-2">AI가 자동으로 npm run dev 명령어를 실행해줄 거예요!</p>
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

                <div className="mt-4 p-3 bg-green-900/50 rounded border border-green-600">
                  <p className="text-green-200 text-sm">서버가 실행되면 브라우저에서 <code className="bg-green-800 px-1 rounded">http://localhost:3000</code> 링크를 클릭하거나 주소창에 입력하세요!</p>
                </div>

                <div className="mt-3 p-3 bg-yellow-900/50 rounded border border-yellow-600">
                  <p className="text-yellow-200 text-sm">😅 <strong>localhost 들어가도 안 되나요?</strong><br/>
                  걱정 마세요! Cursor에게 이렇게 물어보세요: <code className="bg-yellow-800 px-1 rounded">&quot;localhost:3000에 접속이 안 돼. 서버가 실행 중인지 확인해줘&quot;</code> Cursor가 문제를 찾아서 해결해드릴 거예요!</p>
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
            <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-600 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🎉 이제 실제로 웹사이트를 만들어봅시다!</h3>
              <p className="text-gray-300 mb-4">지금까지 배운 것들을 활용해서 나만의 웹사이트를 만들어볼 시간이에요!</p>

              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-3 text-white">💡 5분 브레인스토밍</h4>
                <p className="text-gray-300 mb-3">어떤 웹사이트를 만들지 고민해보세요!</p>

                <div className="bg-purple-900/50 p-3 rounded border border-purple-300 mb-3">
                  <p className="font-bold text-white mb-2">예시 아이디어</p>
                  <ul className="text-gray-300 space-y-1 ml-4 list-disc">
                    <li>[귀여운] 강아지 사진 갤러리</li>
                    <li>[여행자를 위한] 맛집 추천 사이트</li>
                    <li>[나만의] 포트폴리오 웹사이트</li>
                    <li>[친구들과 함께하는] 퀴즈 게임</li>
                  </ul>
                </div>

                <div className="bg-blue-900/50 p-3 rounded border border-blue-600 mb-3">
                  <p className="font-bold text-white mb-2">AI에게 요청하기</p>
                  <p className="text-sm text-blue-200 mb-2">이렇게 구체적으로 요청해보세요:</p>
                  <ul className="text-sm text-blue-200 space-y-1 ml-4 list-disc">
                    <li>&quot;귀여운 강아지 사진 갤러리 웹사이트 만들어줘&quot;</li>
                    <li>&quot;여행자를 위한 맛집 추천 사이트 만들어줘&quot;</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg font-bold text-white mb-4">🌟 준비되셨나요?</p>
                <p className="text-gray-300">이제 본격적으로 시작해봅시다! 아래 단계를 따라가면서 여러분만의 멋진 웹사이트를 만들어보세요!</p>
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
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-600 rounded-2xl px-8 py-6 shadow-xl">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-white mb-2">🌐 배포</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Step 3 - GitHub 연동 및 Vercel 배포 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🌐 Step 3. GitHub에 코드 올리고 Vercel로 배포하기</h3>

              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4 shadow-sm">
                <h4 className="font-bold mb-3 text-white">📋 GitHub 레포지토리 URL 복사</h4>
                <p className="mb-3 text-gray-300">아까 만든 빈 레포지토리로 가면 이런 화면이 나와요:</p>

                <div className="mb-4 rounded-lg overflow-hidden border border-gray-600">
                  <Image
                    src="/images/repolink.png"
                    alt="GitHub 레포지토리 URL"
                    width={700}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>

                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li><strong>Code 버튼 클릭</strong><br/>초록색 &quot;Code&quot; 버튼을 찾아서 클릭</li>
                  <li><strong>HTTPS URL 복사</strong><br/>https://github.com/[username]/[repo-name].git 형태의 URL 복사</li>
                </ol>
                <div className="mt-3 p-3 bg-blue-900/50 rounded border border-blue-600">
                  <p className="text-sm font-mono text-blue-200">💬 AI 채팅에서 말하기:<br/><strong>&quot;GitHub 레포지토리 [복사한 URL] 에 연결해줘&quot;</strong></p>
                </div>
              </div>

              <div className="bg-green-900/50 border border-green-600 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-3 text-white">🚀 그 다음, Vercel로 배포하기</h4>
                <p className="text-green-200 mb-2">GitHub에 연결했다면, 이제 Vercel로 배포해보세요!</p>
                <div className="p-3 bg-green-800 rounded border border-green-600">
                  <p className="font-mono text-green-100">💬 AI 채팅에서 말하기:<br/><strong>&quot;vercel에 로그인하고 배포까지 해줘&quot;</strong></p>
                </div>
                <p className="mt-2 text-sm text-green-200">AI가 Vercel CLI를 사용해서 자동으로 배포 프로세스를 진행해줄 거예요!</p>
              </div>

              {/* 중요 배포 설정 */}
              <div className="bg-red-900/30 border-l-4 border-red-400 p-4 mb-4">
                <h4 className="font-bold text-red-200 mb-2">🚨 중요! Vercel 배포 시 반드시 읽어주세요!</h4>
                <p className="text-red-300 mb-3">모두가 볼 수 있는 사이트를 만들려면 이 설정이 필요해요</p>

                <div className="bg-yellow-900/50 p-3 rounded mb-3 border border-yellow-600">
                  <h5 className="font-bold mb-2 text-white">💡 터미널 선택지 팁</h5>
                  <p className="text-sm text-yellow-200">터미널에서 <code className="bg-yellow-800 px-1 rounded">(y/N)</code> 형태로 물어볼 때:</p>
                  <ul className="text-sm mt-1 ml-4 list-disc text-yellow-200">
                    <li>대문자(N)가 기본값입니다</li>
                    <li>그냥 Enter = N 선택</li>
                    <li>y를 원하면 y 입력 후 Enter</li>
                  </ul>
                </div>

                <div className="bg-gray-800 p-3 rounded border border-gray-600">
                  <h5 className="font-bold mb-2 text-white">⚠️ 배포할 때 터미널에서 이런 질문이 나옵니다:</h5>
                  <p className="font-mono text-sm mb-2 text-gray-300"><code>Enable Vercel Authentication (y/N)?</code></p>
                  <p className="text-red-300 font-bold">👉 반드시 <code className="bg-red-800 px-1 rounded">n</code> 을 입력하세요!</p>
                  <ul className="mt-2 text-sm text-red-300 list-disc ml-4">
                    <li>그냥 Enter 치면 안돼요! (Enter = N이지만 다른 의미)</li>
                    <li>꼭 <strong>n</strong>을 타이핑하고 Enter를 눌러주세요</li>
                    <li>이렇게 해야 다른 사람들도 여러분의 사이트를 볼 수 있어요</li>
                  </ul>
                </div>

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
              <div className="bg-blue-900/50 border border-blue-400 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-3 text-white">💡 앞으로는 이렇게 하세요!</h4>
                <p className="text-blue-200 mb-2">이제 다 세팅했으니까, 앞으로는 이 말을 습관처럼 하면 됩니다:</p>
                <div className="p-3 bg-blue-800 rounded text-center border border-blue-400">
                  <p className="font-mono font-bold text-blue-100">&quot;커밋, 푸쉬, 배포해줘&quot;</p>
                </div>
                <p className="mt-2 text-sm text-blue-200">💡 코드를 수정할 때마다 이 마법의 주문을 외워보세요!<br/>
                AI가 자동으로 GitHub에 저장하고 Vercel에 배포해줄 거예요.</p>
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
              <div className="bg-green-900/50 rounded-lg p-4 text-center border border-green-600">
                <h4 className="font-bold text-green-200 mb-2">🎉 축하합니다!</h4>
                <p className="text-green-200">이제 전 세계에서 여러분의 웹사이트를 볼 수 있어요!<br/>
                배포가 완료되면 <code className="bg-green-800 px-1 rounded">https://프로젝트명.vercel.app</code> 같은 주소를 받게 됩니다.</p>
              </div>
            </div>

            {/* Step 3-2: 자동 배포 설정 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🔗 Step 3-2. 자동 배포 설정하기</h3>
              <p className="text-gray-300 mb-4">GitHub에 푸시할 때마다 자동으로 배포되도록 설정하면 편리합니다!</p>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-600 rounded-lg p-4 mb-4">
                <ol className="list-decimal list-inside space-y-2 text-green-200">
                  <li><strong>Vercel 대시보드에서 프로젝트 선택</strong></li>
                  <li><strong>Settings → Git → Deploy Hooks 설정</strong></li>
                  <li><strong>이제 git push만 하면 자동 배포!</strong></li>
                </ol>

                <div className="mt-4 p-3 bg-green-800 rounded border border-green-600">
                  <p className="text-sm text-green-100"><strong>💡 꿀팁:</strong> 이제부터는 코드를 수정하고 &quot;커밋, 푸쉬, 배포해줘&quot;라고 말하면 자동으로 웹사이트가 업데이트돼요!</p>
                </div>
              </div>
            </div>

            {/* Step 3-3: Pull */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">🔄 Step 3-3. 코드 가져오기 (Pull)</h3>
              <p className="text-gray-300 mb-4">다른 컴퓨터에서 작업하거나, 팀원이 수정한 내용을 가져올 때 사용해요.</p>

              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-600 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-2 text-white">🤖 Cursor AI 채팅에서 말하기:</h4>
                <div className="bg-gray-800 rounded-lg p-3 border text-center">
                  <p className="font-mono font-bold text-gray-200">&quot;풀(pull) 해줘&quot; 또는 &quot;최신 코드 가져와줘&quot;</p>
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
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">문의하기</p>
        </div>
      </footer>
    </div>
  );
}
