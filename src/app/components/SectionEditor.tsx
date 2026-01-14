'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// 섹션 타입 정의
interface HeroSection {
  logoName: string;
  title: string;
  slogan: string;
  subtitle: string;
  tags: { icon: string; text: string; color: string }[];
}

interface JourneyStep {
  icon: string;
  title: string;
  time: string;
  description: string;
}

interface JourneySection {
  title: string;
  totalTime: string;
  completionMessage: string;
  steps: JourneyStep[];
}

interface PrerequisitesSection {
  title: string;
  icon: string;
  cardTitle: string;
  cardIcon: string;
  subtitle: string;
  items: string[];
  buttonText: string;
  buttonLink: string;
}

interface CursorStep {
  title: string;
  description: string;
  image: string;
}

interface CursorSection {
  title: string;
  icon: string;
  subtitle: string;
  steps: CursorStep[];
}

interface ContentData {
  hero: HeroSection;
  journey: JourneySection;
  prerequisites: PrerequisitesSection;
  cursor: CursorSection;
}

type SectionType = 'hero' | 'journey' | 'prerequisites' | 'cursor';

const sectionLabels: Record<SectionType, string> = {
  hero: '히어로 섹션',
  journey: '바이브 코딩 여정',
  prerequisites: '사전 준비사항',
  cursor: 'Cursor 가이드',
};

interface SectionEditorProps {
  onSave?: () => void;
}

export default function SectionEditor({ onSave }: SectionEditorProps) {
  const [content, setContent] = useState<ContentData | null>(null);
  const [selectedSection, setSelectedSection] = useState<SectionType>('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentImageField, setCurrentImageField] = useState<{ stepIndex: number } | null>(null);

  // 콘텐츠 로드
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        setContent(data.content);
      }
    } catch (error) {
      console.error('콘텐츠 로드 실패:', error);
      setMessage({ type: 'error', text: '콘텐츠를 불러오는데 실패했습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async () => {
    if (!content) return;

    try {
      setIsSaving(true);
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: '저장되었습니다!' });
        onSave?.();
      } else {
        throw new Error('저장 실패');
      }
    } catch (error) {
      console.error('저장 실패:', error);
      setMessage({ type: 'error', text: '저장에 실패했습니다.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleImageUpload = async (file: File, stepIndex: number) => {
    if (!content) return;

    const imageId = `cursor-step-${stepIndex}`;
    const fileName = `cursor-step-${stepIndex}.${file.name.split('.').pop()}`;

    setUploadingImage(imageId);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('imageId', imageId);
      formData.append('fileName', fileName);

      const response = await fetch('/api/github-upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        // 콘텐츠 업데이트
        const newContent = { ...content };
        newContent.cursor.steps[stepIndex].image = result.path;
        setContent(newContent);
        setMessage({ type: 'success', text: '이미지가 업로드되었습니다!' });
      } else {
        const error = await response.json();
        throw new Error(error.error || '업로드 실패');
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      setMessage({ type: 'error', text: `이미지 업로드 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}` });
    } finally {
      setUploadingImage(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const updateHero = (field: keyof HeroSection, value: string) => {
    if (!content) return;
    setContent({
      ...content,
      hero: { ...content.hero, [field]: value },
    });
  };

  const updateJourney = (field: keyof JourneySection, value: string) => {
    if (!content) return;
    setContent({
      ...content,
      journey: { ...content.journey, [field]: value },
    });
  };

  const updateJourneyStep = (index: number, field: keyof JourneyStep, value: string) => {
    if (!content) return;
    const newSteps = [...content.journey.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setContent({
      ...content,
      journey: { ...content.journey, steps: newSteps },
    });
  };

  const updatePrerequisites = (field: keyof PrerequisitesSection, value: string | string[]) => {
    if (!content) return;
    setContent({
      ...content,
      prerequisites: { ...content.prerequisites, [field]: value },
    });
  };

  const updateCursorStep = (index: number, field: keyof CursorStep, value: string) => {
    if (!content) return;
    const newSteps = [...content.cursor.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setContent({
      ...content,
      cursor: { ...content.cursor, steps: newSteps },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-400">콘텐츠 로딩 중...</span>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="p-8 text-center text-red-400">
        콘텐츠를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-600">
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-600 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-white">섹션 편집기</h2>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value as SectionType)}
            className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(sectionLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          {message && (
            <span className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {message.text}
            </span>
          )}
          <button
            onClick={loadContent}
            className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors"
          >
            되돌리기
          </button>
          <button
            onClick={saveContent}
            disabled={isSaving}
            className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 rounded-md text-white transition-colors flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                저장 중...
              </>
            ) : (
              '저장'
            )}
          </button>
        </div>
      </div>

      {/* 편집 영역 */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {/* 히어로 섹션 편집 */}
        {selectedSection === 'hero' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">로고명</label>
              <input
                type="text"
                value={content.hero.logoName}
                onChange={(e) => updateHero('logoName', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">메인 타이틀</label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => updateHero('title', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">슬로건</label>
              <input
                type="text"
                value={content.hero.slogan}
                onChange={(e) => updateHero('slogan', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">부제목</label>
              <input
                type="text"
                value={content.hero.subtitle}
                onChange={(e) => updateHero('subtitle', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 미리보기 */}
            <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
              <h3 className="text-sm text-gray-400 mb-3">미리보기</h3>
              <div className="text-center">
                <span className="text-2xl font-bold text-white">{content.hero.logoName}</span>
                <h1 className="text-3xl font-extrabold mt-4 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                  {content.hero.title}
                </h1>
                <p className="text-orange-400 mt-2">&quot;{content.hero.slogan}&quot;</p>
                <p className="text-gray-400 mt-1">{content.hero.subtitle}</p>
              </div>
            </div>
          </div>
        )}

        {/* 여정 섹션 편집 */}
        {selectedSection === 'journey' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">섹션 제목</label>
                <input
                  type="text"
                  value={content.journey.title}
                  onChange={(e) => updateJourney('title', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">총 소요시간</label>
                <input
                  type="text"
                  value={content.journey.totalTime}
                  onChange={(e) => updateJourney('totalTime', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">완료 메시지</label>
              <input
                type="text"
                value={content.journey.completionMessage}
                onChange={(e) => updateJourney('completionMessage', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-300 mb-3">단계별 설정</h3>
              <div className="space-y-3">
                {content.journey.steps.map((step, index) => (
                  <div key={index} className="p-3 bg-gray-700 rounded-lg">
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">아이콘</label>
                        <input
                          type="text"
                          value={step.icon}
                          onChange={(e) => updateJourneyStep(index, 'icon', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">제목</label>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => updateJourneyStep(index, 'title', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">시간</label>
                        <input
                          type="text"
                          value={step.time}
                          onChange={(e) => updateJourneyStep(index, 'time', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">설명</label>
                        <input
                          type="text"
                          value={step.description}
                          onChange={(e) => updateJourneyStep(index, 'description', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 준비사항 섹션 편집 */}
        {selectedSection === 'prerequisites' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">섹션 제목</label>
                <input
                  type="text"
                  value={content.prerequisites.title}
                  onChange={(e) => updatePrerequisites('title', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">섹션 아이콘</label>
                <input
                  type="text"
                  value={content.prerequisites.icon}
                  onChange={(e) => updatePrerequisites('icon', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">카드 제목</label>
                <input
                  type="text"
                  value={content.prerequisites.cardTitle}
                  onChange={(e) => updatePrerequisites('cardTitle', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">카드 아이콘</label>
                <input
                  type="text"
                  value={content.prerequisites.cardIcon}
                  onChange={(e) => updatePrerequisites('cardIcon', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">부제목</label>
              <input
                type="text"
                value={content.prerequisites.subtitle}
                onChange={(e) => updatePrerequisites('subtitle', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">체크리스트 항목</label>
              <div className="space-y-2">
                {content.prerequisites.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-green-400">✅</span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newItems = [...content.prerequisites.items];
                        newItems[index] = e.target.value;
                        updatePrerequisites('items', newItems);
                      }}
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">버튼 텍스트</label>
              <input
                type="text"
                value={content.prerequisites.buttonText}
                onChange={(e) => updatePrerequisites('buttonText', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Cursor 가이드 섹션 편집 */}
        {selectedSection === 'cursor' && (
          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && currentImageField !== null) {
                  handleImageUpload(file, currentImageField.stepIndex);
                }
                e.target.value = '';
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">섹션 제목</label>
                <input
                  type="text"
                  value={content.cursor.title}
                  onChange={(e) => setContent({ ...content, cursor: { ...content.cursor, title: e.target.value } })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">부제목</label>
                <input
                  type="text"
                  value={content.cursor.subtitle}
                  onChange={(e) => setContent({ ...content, cursor: { ...content.cursor, subtitle: e.target.value } })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-300 mb-3">단계별 가이드</h3>
              <div className="space-y-4">
                {content.cursor.steps.map((step, index) => (
                  <div key={index} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-start gap-4">
                      {/* 이미지 미리보기 */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-24 bg-gray-600 rounded-lg overflow-hidden relative">
                          {step.image ? (
                            <Image
                              src={step.image}
                              alt={step.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <span className="text-2xl">🖼️</span>
                            </div>
                          )}
                          {uploadingImage === `cursor-step-${index}` && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setCurrentImageField({ stepIndex: index });
                            fileInputRef.current?.click();
                          }}
                          className="mt-2 w-full px-2 py-1 text-xs bg-gray-600 hover:bg-gray-500 rounded text-gray-300"
                        >
                          이미지 변경
                        </button>
                      </div>

                      {/* 텍스트 필드 */}
                      <div className="flex-1 space-y-2">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">단계 {index + 1} 제목</label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => updateCursorStep(index, 'title', e.target.value)}
                            className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">설명</label>
                          <textarea
                            value={step.description}
                            onChange={(e) => updateCursorStep(index, 'description', e.target.value)}
                            rows={2}
                            className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
