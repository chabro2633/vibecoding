// import Image from "next/image";

const StepCard = ({ icon, title, time, description, isActive = false }: {
  icon: string;
  title: string;
  time: string;
  description: string;
  isActive?: boolean;
}) => (
  <div className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
    isActive ? 'border-blue-400 bg-blue-900/30' : 'border-gray-600 hover:border-gray-500'
  }`}>
    <div className={`text-3xl mb-2 ${isActive ? 'animate-pulse' : ''}`}>{icon}</div>
    <div className="text-center">
      <h3 className="font-bold text-lg mb-1 text-white">{title}</h3>
      <p className="text-sm text-gray-300 mb-2">{time}</p>
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

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">차브로</div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">차브로 로고</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">바이브 코딩</h1>
          <p className="text-xl text-gray-300 mb-2">&ldquo;차브로의 모든 사람이 상상을 현실로 만들 수 있게&rdquo;</p>
          <p className="text-lg text-gray-400">AI와 함께하는 창의적인 개발 여정</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            📋 1부: 개발 환경 세팅
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            🚀 2부: 프로젝트 준비 및 배포
          </button>
        </div>

        {/* Journey Steps */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">🚀 바이브 코딩 여정</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StepCard icon="📋" title="준비" time="10분" description="계정 설정" />
            <StepCard icon="⚙️" title="환경설정" time="15분" description="개발 도구 설치" />
            <StepCard icon="🛠️" title="프로젝트 생성" time="20분" description="Next.js 시작" isActive />
            <StepCard icon="🔗" title="Git 연동" time="10분" description="버전 관리" />
            <StepCard icon="🌐" title="배포!" time="5분" description="웹사이트 공개" />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-gray-300">총 약 1시간으로 나만의 웹사이트가 완성됩니다! ✨</p>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="bg-gray-800 rounded-lg p-6 mb-12 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-white">📌 사전 준비사항</h2>
          <h3 className="text-xl font-semibold mb-4 text-gray-200">⚡ 준비물 체크리스트</h3>
          <p className="text-gray-300 mb-4">시작하기 전에 4가지를 미리 준비해주세요!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <ChecklistItem text="Cursor 설치" />
              <ChecklistItem text="Cursor Pro 2주 Trial 시작" />
            </div>
            <div>
              <ChecklistItem text="GitHub 계정" />
              <ChecklistItem text="Vercel 계정" />
            </div>
          </div>
          <a href="/prepare" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            📋 상세 준비 가이드 보기
          </a>
          <div className="mt-4 p-3 bg-yellow-900/50 rounded border-l-4 border-yellow-400">
            <p className="text-sm text-yellow-200">💡 이미 준비가 끝났다면 바로 시작해도 좋아요!</p>
          </div>
        </div>

        {/* What is Vibe Coding */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">🎯 바이브 코딩이란?</h2>
          <p className="text-lg text-gray-300 mb-4">AI와 함께 코딩하는 새로운 개발 방식입니다.</p>
          <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-2 text-white text-blue-300">💡 왜 Cursor?</h3>
            <p className="text-gray-300">
              한국어로 대화하듯 코딩할 수 있고, 설치부터 배포까지 한 번에 가능한
              <strong className="text-blue-400"> 가장 친절한 AI 코딩 도구</strong>입니다.
            </p>
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section className="border-t-4 border-blue-400 pt-6">
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
                  <li>폴더 이름 예시: <code className="bg-red-100 px-1 rounded">vibe-coding</code></li>
                  <li>폴더 이름은 영어로, 띄어쓰기 없이! (하이픈 - 사용 가능)</li>
                </ol>
                <div className="mt-3 p-2 bg-blue-100 rounded">
                  <p className="text-blue-800 text-sm">💡 이 폴더는 나중에 Cursor에서 열 폴더입니다. 반드시 먼저 만들어주세요!</p>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-2 text-white">1. GitHub에서 새 Repository 생성</h4>
                <p className="mb-2">github.com 로그인 → 우측 상단 + 버튼 → New repository 클릭</p>
                <p className="mb-2">Repository 이름 입력 → <strong>아무것도 체크하지 말고</strong> → Create repository</p>
                <div className="bg-yellow-100 p-2 rounded border-l-4 border-yellow-500">
                  <p className="text-sm">⚠️ 이름은 영어, 숫자, 하이픈(-)만 사용 (예: my-cute-website)</p>
                </div>
                <div className="mt-2 p-2 bg-blue-100 rounded">
                  <p className="text-sm"><strong>💡 왜 빈 레포지토리를 만드나요?</strong><br/>
                  빈 레포지토리는 Vercel에 바로 연결할 수 없어요. 먼저 프로젝트를 만들고 나서 연결합니다!</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">🚀 Step 2. Cursor 열고 프로젝트 폴더 선택하기</h3>
              <p className="text-gray-300 mb-4">Cursor를 처음 실행하면 먼저 작업할 폴더를 열어야 해요!</p>
              
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-3 text-white">프로젝트 폴더 열기</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li><strong>Cursor 실행</strong><br/>바탕화면이나 Dock에서 Cursor 아이콘 클릭</li>
                  <li><strong>Open Folder 클릭</strong><br/>시작 화면에서 &ldquo;Open Folder&rdquo; 버튼을 찾아 클릭</li>
                  <li><strong>프로젝트 폴더 선택</strong><br/>아까 만든 폴더 (예: vibe-coding) 선택 → Open 클릭</li>
                </ol>
                <div className="mt-3 p-2 bg-blue-100 rounded">
                  <p className="text-sm">💡 <strong>폴더를 열었나요?</strong><br/>
                  이제 Cursor 왼쪽 사이드바에 폴더 구조가 보일 거예요. 아직은 비어있지만 곧 채워집니다!</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">🔐 Step 3. Cursor 로그인하기</h3>
              <p className="text-gray-300 mb-4">AI와 대화하려면 먼저 로그인이 필요해요!</p>
              
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-3 text-white">로그인 확인하기</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li><strong>Settings 열기</strong><br/>Windows: Ctrl + , | Mac: Cmd + ,</li>
                  <li><strong>Cursor Settings 탭 클릭</strong></li>
                  <li><strong>Account 확인</strong><br/>로그인이 안 되어 있다면 &ldquo;Log In&rdquo; 버튼 클릭</li>
                </ol>
                <div className="mt-3 p-2 bg-blue-100 rounded">
                  <p className="text-sm">💡 <strong>Pro Trial 확인:</strong> Settings에서 &ldquo;Pro Trial&rdquo; 또는 &ldquo;Free Trial&rdquo;이 보이면 성공!<br/>
                  만약 안 보인다면 준비 가이드를 다시 확인해주세요.</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">🤖 Step 4. AI 모델 선택하기</h3>
              <p className="text-gray-300 mb-4">Cursor에서 사용할 AI 모델을 선택합니다.</p>
              
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4">
                <ol className="list-decimal list-inside space-y-2">
                  <li><strong>Settings → Models 탭</strong></li>
                  <li><strong>Chat Model 선택</strong>
                    <ul className="mt-2 ml-4 space-y-1">
                      <li>✅ <strong>추천: claude-3.5-sonnet</strong><br/>
                      <span className="text-sm text-gray-400">가장 똑똑하고 한국어를 잘 이해해요!</span></li>
                      <li>🚀 <strong>빠른 응답: gpt-4o</strong><br/>
                      <span className="text-sm text-gray-400">빠르게 답변이 필요할 때 좋아요</span></li>
                    </ul>
          </li>
        </ol>
                <div className="mt-3 p-3 bg-green-100 rounded">
                  <p className="text-sm font-medium">🎉 <strong>축하합니다!</strong> 이제 AI와 대화할 준비가 완료되었어요!<br/>
                  채팅창을 열려면: Cmd/Ctrl + L</p>
                </div>
              </div>
            </div>

            {/* Error Resolution */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">🛡️ 에러 해결 마법 공식</h3>
              <p className="text-gray-300 mb-4">이제부터 AI와 본격적인 대화가 시작됩니다!</p>
              
              <div className="bg-blue-900/30 border border-blue-600 border-l-4 border-blue-500 p-4 mb-4">
                <h4 className="font-bold text-blue-800 mb-2">🎯 가장 중요한 마인드셋</h4>
                <p className="text-blue-300 mb-2"><strong>우리는 개발을 배우러 온 게 아닙니다.</strong><br/>바이브 코딩을 하러 왔습니다!</p>
                <p className="text-blue-300">AI를 잘 활용하는 것이 핵심입니다. 에러가 나도 당황하지 마세요.<br/>
                모든 문제는 AI가 해결할 수 있습니다. 그냥 물어보면 됩니다!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-bold mb-2 text-white">💬 AI가 이해 못했을 때</h4>
                  <p className="text-sm mb-2">AI가 잘못 이해했거나 다른 걸 했나요?</p>
                  <p className="text-sm font-medium text-yellow-800">해결: &ldquo;아니야, 내가 원한 건 ___야&rdquo; 라고 다시 설명</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-bold mb-2 text-white">🔴 에러가 났을 때</h4>
                  <p className="text-sm mb-2">빨간 글씨로 에러가 나타났나요?</p>
                  <p className="text-sm font-medium text-red-300">해결: 에러 메시지를 복사해서 AI에게 &ldquo;이 에러 해결해줘&rdquo;</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: 배포 */}
          <section className="border-t-4 border-green-500 pt-6">
            <h2 className="text-3xl font-bold mb-6">🌐 배포</h2>
            
            {/* Step 3 - GitHub 연동 및 Vercel 배포 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">🌐 Step 3. GitHub에 코드 올리고 Vercel로 배포하기</h3>
              
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-3 text-white">📋 GitHub 레포지토리 URL 복사</h4>
                <p className="mb-3">아까 만든 빈 레포지토리로 가면 이런 화면이 나와요:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li><strong>Code 버튼 클릭</strong><br/>초록색 &ldquo;Code&rdquo; 버튼을 찾아서 클릭</li>
                  <li><strong>HTTPS URL 복사</strong><br/>https://github.com/[username]/[repo-name].git 형태의 URL 복사</li>
                </ol>
                <div className="mt-3 p-3 bg-blue-100 rounded">
                  <p className="text-sm font-mono">&ldquo;💬 GitHub 레포지토리 [복사한 URL] 에 연결해줘&rdquo;</p>
                </div>
              </div>

              <div className="bg-green-900/30 border border-green-600 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-3 text-white">🚀 그 다음, Vercel로 배포하기</h4>
                <p className="mb-2">GitHub에 연결했다면, 이제 Vercel로 배포해보세요!</p>
                <div className="p-3 bg-green-200 rounded">
                  <p className="font-mono">&ldquo;💬 vercel에 로그인하고 배포까지 해줘&rdquo;</p>
                </div>
                <p className="mt-2 text-sm text-green-300">AI가 Vercel CLI를 사용해서 자동으로 배포 프로세스를 진행해줄 거예요!</p>
              </div>

              {/* 중요 배포 설정 */}
              <div className="bg-red-900/30 border-l-4 border-red-400 p-4 mb-4">
                <h4 className="font-bold text-red-300 mb-2">🚨 중요! Vercel 배포 시 반드시 읽어주세요!</h4>
                <p className="text-red-200 mb-3">모두가 볼 수 있는 사이트를 만들려면 이 설정이 필요해요</p>
                
                <div className="bg-yellow-100 p-3 rounded mb-3">
                  <h5 className="font-bold mb-2 text-white">💡 터미널 선택지 팁</h5>
                  <p className="text-sm">터미널에서 <code>(y/N)</code> 형태로 물어볼 때:</p>
                  <ul className="text-sm mt-1 ml-4 list-disc">
                    <li>대문자(N)가 기본값입니다</li>
                    <li>그냥 Enter = N 선택</li>
                    <li>y를 원하면 y 입력 후 Enter</li>
                  </ul>
                </div>

                <div className="bg-white p-3 rounded border">
                  <h5 className="font-bold mb-2 text-white">⚠️ 배포할 때 터미널에서 이런 질문이 나옵니다:</h5>
                  <p className="font-mono text-sm mb-2">`Enable Vercel Authentication (y/N)?`</p>
                  <p className="text-red-200 font-bold">👉 반드시 `n` 을 입력하세요!</p>
                  <ul className="mt-2 text-sm text-red-200 list-disc ml-4">
                    <li>그냥 Enter 치면 안돼요! (Enter = N이지만 다른 의미)</li>
                    <li>꼭 <strong>n</strong>을 타이핑하고 Enter를 눌러주세요</li>
                    <li>이렇게 해야 다른 사람들도 여러분의 사이트를 볼 수 있어요</li>
                  </ul>
                </div>
              </div>

              {/* 앞으로의 작업 플로우 */}
              <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-3 text-white">💡 앞으로는 이렇게 하세요!</h4>
                <p className="mb-2">이제 다 세팅했으니까, 앞으로는 이 말을 습관처럼 하면 됩니다:</p>
                <div className="p-3 bg-blue-200 rounded text-center">
                  <p className="font-mono font-bold">&ldquo;커밋, 푸쉬, 배포해줘&rdquo;</p>
                </div>
                <p className="mt-2 text-sm text-blue-300">💡 코드를 수정할 때마다 이 마법의 주문을 외워보세요!<br/>
                AI가 자동으로 GitHub에 저장하고 Vercel에 배포해줄 거예요.</p>
              </div>

              {/* 축하 메시지 */}
              <div className="bg-green-100 rounded-lg p-4 text-center">
                <h4 className="font-bold text-green-800 mb-2">🎉 축하합니다!</h4>
                <p className="text-green-300">이제 전 세계에서 여러분의 웹사이트를 볼 수 있어요!<br/>
                배포가 완료되면 <code>https://프로젝트명.vercel.app</code> 같은 주소를 받게 됩니다.</p>
              </div>
            </div>

            {/* 도메인 변경 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">🌐 도메인 이름 바꾸기 (선택사항)</h3>
              <p className="text-gray-300 mb-4">기본 주소가 너무 길다고요? Vercel에서 더 짧고 예쁜 주소로 바꿀 수 있어요!</p>
              
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4">
                <ol className="list-decimal list-inside space-y-2">
                  <li><strong>Vercel 대시보드 접속</strong><br/>vercel.com에 로그인 → 여러분의 프로젝트 클릭</li>
                  <li><strong>Settings → Domains 메뉴로 이동</strong><br/>프로젝트 설정에서 도메인 관리 페이지로 들어가요</li>
                  <li><strong>원하는 이름 입력하고 Add 클릭</strong><br/>
                  예: my-awesome-site.vercel.app → coolsite.vercel.app</li>
                </ol>
              </div>

              <div className="bg-purple-100 rounded-lg p-4 text-center">
                <h4 className="font-bold text-purple-800 mb-2">🌟 축하합니다!</h4>
                <p className="text-purple-700">이제 더 멋진 주소로 여러분의 웹사이트를 공유할 수 있어요!<br/>
                친구들에게 자랑해보세요! 🎊</p>
              </div>
            </div>
          </section>

          {/* 추가 팁들 */}
          <section className="border-t-4 border-purple-500 pt-6">
            <h2 className="text-3xl font-bold mb-6">💡 유용한 팁들</h2>
            
            {/* 이미지 추가 방법 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">🖼️ 이미지 추가하는 방법</h3>
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                <p className="mb-3">웹사이트에 이미지를 추가하고 싶다면:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li><strong>public 폴더를 만듭니다</strong></li>
                  <li><strong>이미지 파일을 그 폴더에 넣습니다</strong><br/>예: <code>public/logo.png</code></li>
                  <li><strong>AI 채팅에서 이렇게 말합니다:</strong><br/>
                  &ldquo;public 폴더에 있는 logo.png를 메인 페이지 상단에 보여줘&rdquo;</li>
                </ol>
                <div className="mt-3 p-2 bg-blue-100 rounded">
                  <p className="text-sm"><strong>💡 핵심 포인트:</strong> 이미지는 직접 준비해야 하고, AI는 그 이미지를 코드로 연결하는 일만 도와줍니다.</p>
                </div>
              </div>
            </div>

            {/* 개발자 도구 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">🔍 브라우저 개발자 도구 사용법</h3>
              <p className="text-gray-300 mb-4">웹사이트 디버깅의 핵심 도구입니다!</p>
              
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                <h4 className="font-bold mb-3 text-white">🖱️ 개발자 도구 열기</h4>
                <p className="mb-2">웹사이트에서 <strong>마우스 오른쪽 클릭</strong> → <strong>&ldquo;검사&rdquo;</strong> 클릭</p>
                <p className="text-sm text-gray-400 mb-3">단축키: Windows (F12 또는 Ctrl+Shift+I) / Mac (Cmd+Opt+I)</p>
                
                <div className="bg-yellow-100 p-3 rounded">
                  <h5 className="font-bold mb-2 text-white">🚨 콘솔 에러가 나타났을 때</h5>
                  <p className="text-sm mb-2">콘솔에 빨간색 에러 메시지가 보이면?</p>
                  <ol className="text-sm list-decimal list-inside">
                    <li>에러 메시지를 드래그해서 선택</li>
                    <li>복사 (Ctrl+C 또는 Cmd+C)</li>
                    <li>AI 채팅에 붙여넣고 <strong>&ldquo;이 에러를 해결해줘&rdquo;</strong></li>
                  </ol>
                </div>
                
                <div className="mt-3 p-2 bg-blue-100 rounded">
                  <p className="text-sm"><strong>꿀팁:</strong> 개발자 도구를 잘 활용하면 AI가 여러분의 문제를 정확히 이해하고 빠르게 해결할 수 있어요!</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-300">문의하기</p>
        </div>
      </footer>
    </div>
  );
}
