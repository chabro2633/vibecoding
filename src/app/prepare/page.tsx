'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';

const PreparePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS를 사용해서 이메일 전송
      const templateParams = {
        to_email: 'gudxock@gmail.com',
        from_name: formData.name,
        user_name: formData.name,
        user_message: formData.message || '메시지 없음',
        submission_time: new Date().toLocaleString('ko-KR'),
      };

      // EmailJS 설정 (공개 키들이므로 클라이언트에서 사용 가능)
      const serviceId = 'service_vibecoding'; // EmailJS에서 제공받은 Service ID
      const templateId = 'template_preparation'; // EmailJS에서 생성한 Template ID  
      const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY'; // EmailJS 공개 키

      // EmailJS로 이메일 전송 시도
      try {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        console.log('이메일 전송 성공');
      } catch (emailError) {
        console.log('EmailJS 전송 실패, 백업 방법 사용:', emailError);
        // EmailJS 실패 시 백업으로 API 라우트 사용
        await fetch('/api/submit-preparation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      setIsSubmitted(true);
      setFormData({ name: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">바이브 코딩 사전 준비</h1>
          <p className="text-xl text-gray-300 mb-2">원활한 세션을 위해 미리 준비해주세요</p>
          <div className="flex items-center justify-center space-x-2 text-blue-400">
            <span>⏱️</span>
            <span className="font-medium">총 소요시간: 약 15분</span>
          </div>
        </div>

        {/* Alert */}
        <div className="bg-yellow-900/50 border-l-4 border-yellow-400 p-4 mb-8">
          <h2 className="text-lg font-bold text-yellow-200 mb-2">⚡ 세션 시작 전에 미리 준비해주세요!</h2>
          <p className="text-yellow-100">원활한 진행을 위해 아래 4가지를 반드시 미리 완료해주세요</p>
        </div>

        {/* Preparation Steps */}
        <div className="space-y-6 mb-12">
          {/* Step 1 */}
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">1️⃣</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-white">Cursor 설치</h3>
                <p className="text-gray-300 mb-2">cursor.sh에서 다운로드</p>
                <div className="text-blue-400 font-medium">소요시간: 5분</div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">2️⃣</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3 text-white">Cursor Pro 구독</h3>
                <div className="bg-green-900/30 border border-green-600 rounded-lg p-4 mb-4">
                  <p className="text-green-300 font-bold mb-2">🎉 법인카드 등록 후 14일 무료체험 가능!</p>
                  <p className="text-green-200 text-sm">처음 가입하면 Pro 플랜을 바로 사용할 수 있어요</p>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p><strong className="text-white">핵심:</strong> Cursor에서 올인원 개발을 할 수 있어요!</p>
                  <p><strong className="text-red-300">⚠️ 중요:</strong> 14일 이내로 취소하는 거 잊지 마세요!</p>
                  <p><strong className="text-white">추후:</strong> 무료 리밋을 넘으면 필요시 결제 이어가주세요</p>
                  <p><strong className="text-white">결제:</strong> 필요시 비즈플레이 교육훈련비-일반</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">3️⃣</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-white">GitHub 가입</h3>
                <p className="text-gray-300 mb-3">github.com에서 개인 계정 생성</p>
                <div className="space-y-2 text-gray-300">
                  <p><strong className="text-red-300">중요:</strong> 개인 이메일로 가입하세요!</p>
                  <p><strong className="text-blue-300">팁:</strong> 회사 계정보다 관리가 편해요</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">4️⃣</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-white">Vercel 가입</h3>
                <p className="text-gray-300 mb-3">vercel.com에서 GitHub으로 가입</p>
                <p className="text-blue-300"><strong>핵심:</strong> GitHub 계정으로 로그인하면 편해요 ✨</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white">준비 완료하셨나요?</h2>
          <p className="text-gray-300 mb-6">위의 4가지 준비를 모두 마치셨다면, 준비 완료한 본인 이름을 써주세요!</p>
          
          {isSubmitted ? (
            <div className="bg-green-900/30 border border-green-600 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-green-300 mb-2">준비 완료 확인!</h3>
              <p className="text-green-200">제출해주신 정보가 확인되었습니다. 세션에서 뵙겠습니다!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="이름을 입력해주세요"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  오늘 세션 전 남길 말 (선택)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="세션에 대한 기대나 궁금한 점을 자유롭게 적어주세요"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || !formData.name.trim()}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? '제출 중...' : '✅ 준비 완료!'}
              </button>
            </form>
          )}
          
          <p className="text-sm text-gray-400 mt-4 text-center">
            💡 이름을 제출하면 준비 완료 상태가 기록됩니다
          </p>
        </div>

        {/* Tips Section */}
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-white">💡 중요한 팁</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tip 1 */}
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-bold mb-2 text-white">개인 계정 사용</h3>
              <p className="text-gray-300 text-sm">
                GitHub과 Vercel은 반드시 개인 이메일로 가입해주세요. 회사 계정보다 관리가 편해요!
              </p>
            </div>
            
            {/* Tip 2 */}
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-3xl mb-3">💳</div>
              <h3 className="font-bold mb-2 text-white">Cursor Pro 무료 체험</h3>
              <p className="text-gray-300 text-sm">
                처음 가입하면 <strong className="text-green-400">14일 무료 체험</strong>이 가능해요! 법인카드 등록 후 Pro 기능을 바로 사용할 수 있습니다.
              </p>
            </div>
            
            {/* Tip 3 */}
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-3xl mb-3">🔗</div>
              <h3 className="font-bold mb-2 text-white">연결이 핵심</h3>
              <p className="text-gray-300 text-sm">
                GitHub repo 생성 → Vercel 프로젝트 생성 시 연결 → 자동 배포 설정 완료!
              </p>
            </div>
            
            {/* Tip 4 */}
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-3xl mb-3">❓</div>
              <h3 className="font-bold mb-2 text-white">막히면 바로 문의</h3>
              <p className="text-gray-300 text-sm">
                설치나 가입 중 문제가 생기면 주저하지 말고 바로 말씀해주세요!
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>←</span>
            <span>메인 페이지로 돌아가기</span>
          </a>
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
};

export default PreparePage;
