'use client';

import { useState } from 'react';

interface HTMLEditorProps {
  initialHtml?: string;
  onSave?: (html: string) => void;
  onLoad?: () => Promise<string>;
}

const HTMLEditor = ({ initialHtml = '', onSave, onLoad }: HTMLEditorProps) => {
  const [html, setHtml] = useState(initialHtml);
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoadingSite, setIsLoadingSite] = useState(false);
  const [isUpdatingSite, setIsUpdatingSite] = useState(false);

  // HTML 로드
  const handleLoad = async () => {
    if (!onLoad) return;
    
    setIsLoading(true);
    try {
      const loadedHtml = await onLoad();
      setHtml(loadedHtml);
      setMessage('HTML이 성공적으로 로드되었습니다.');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('HTML 로드 중 오류가 발생했습니다.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // HTML 저장
  const handleSave = async () => {
    if (!onSave) return;
    
    setIsSaving(true);
    try {
      await onSave(html);
      setMessage('HTML이 성공적으로 저장되었습니다.');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('HTML 저장 중 오류가 발생했습니다.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // 새로고침
  const handleRefresh = () => {
    if (onLoad) {
      handleLoad();
    }
  };

  // 사이트 HTML 가져오기
  const handleLoadSite = async () => {
    setIsLoadingSite(true);
    try {
      const response = await fetch('/api/fetch-site-html?url=https://vibecoding-irbxsqtdj-chabro2633s-projects.vercel.app');
      const data = await response.json();
      
      if (data.success) {
        setHtml(data.html);
        setMessage('사이트 HTML이 성공적으로 로드되었습니다.');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('사이트 HTML 로드 중 오류가 발생했습니다.');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('사이트 HTML 로드 중 오류가 발생했습니다.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsLoadingSite(false);
    }
  };

  // 사이트 업데이트
  const handleUpdateSite = async () => {
    setIsUpdatingSite(true);
    try {
      const response = await fetch('/api/update-site', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('사이트가 성공적으로 업데이트되었습니다!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('사이트 업데이트 중 오류가 발생했습니다.');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('사이트 업데이트 중 오류가 발생했습니다.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsUpdatingSite(false);
    }
  };

  // 미리보기 토글
  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  // HTML 포맷팅
  const formatHtml = () => {
    try {
      // 간단한 HTML 포맷팅 (실제로는 더 정교한 포맷터를 사용하는 것이 좋습니다)
      const formatted = html
        .replace(/></g, '>\n<')
        .replace(/^\s+|\s+$/g, '')
        .split('\n')
        .map(line => {
          const trimmed = line.trim();
          if (trimmed.startsWith('</')) {
            return '  ' + trimmed;
          }
          return trimmed;
        })
        .join('\n');
      setHtml(formatted);
    } catch {
      setMessage('HTML 포맷팅 중 오류가 발생했습니다.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">📝 HTML 에디터</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleLoadSite}
            disabled={isLoadingSite}
            className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingSite ? '로딩...' : '🌐 사이트 가져오기'}
          </button>
          <button
            onClick={handleLoad}
            disabled={isLoading || !onLoad}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '로딩...' : '📁 로드'}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !onSave}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? '저장중...' : '💾 저장'}
          </button>
          <button
            onClick={handleUpdateSite}
            disabled={isUpdatingSite}
            className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdatingSite ? '업데이트중...' : '🚀 사이트 업데이트'}
          </button>
          <button
            onClick={handleRefresh}
            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
          >
            🔄 새로고침
          </button>
        </div>
      </div>

      {/* 메시지 표시 */}
      {message && (
        <div className={`mb-4 p-3 rounded text-sm ${
          message.includes('성공') 
            ? 'bg-green-900/30 text-green-300 border border-green-600' 
            : 'bg-red-900/30 text-red-300 border border-red-600'
        }`}>
          {message}
        </div>
      )}

      {/* 컨트롤 버튼들 */}
      <div className="flex items-center space-x-2 mb-4">
        <button
          onClick={togglePreview}
          className={`px-3 py-1 rounded text-sm ${
            isPreview 
              ? 'bg-purple-600 text-white hover:bg-purple-700' 
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          {isPreview ? '✏️ 편집 모드' : '👁️ 미리보기'}
        </button>
        <button
          onClick={formatHtml}
          className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
        >
          🎨 포맷팅
        </button>
        <div className="text-gray-400 text-sm">
          {html.length} 문자
        </div>
      </div>

      {/* 에디터/미리보기 영역 */}
      <div className="border border-gray-600 rounded-lg overflow-hidden">
        {isPreview ? (
          <div className="bg-white p-4 min-h-[400px]">
            <div 
              dangerouslySetInnerHTML={{ __html: html || '<p>미리보기를 위해 HTML을 입력하세요.</p>' }}
              className="prose max-w-none"
            />
          </div>
        ) : (
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="HTML 코드를 입력하세요..."
            className="w-full h-[400px] bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
          />
        )}
      </div>

      {/* 도움말 */}
      <div className="mt-4 text-sm text-gray-400">
        <p><strong>💡 팁:</strong></p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>🌐 사이트 가져오기:</strong> 현재 배포된 사이트의 HTML을 가져와서 수정할 수 있습니다</li>
          <li><strong>🚀 사이트 업데이트:</strong> 수정한 HTML을 사이트에 적용합니다</li>
          <li>미리보기 모드에서 HTML 렌더링 결과를 확인할 수 있습니다</li>
          <li>포맷팅 버튼으로 HTML 코드를 정리할 수 있습니다</li>
          <li>저장된 HTML은 서버에 저장됩니다</li>
          <li>Ctrl+A로 전체 선택, Ctrl+Z로 실행 취소가 가능합니다</li>
        </ul>
      </div>
    </div>
  );
};

export default HTMLEditor;
