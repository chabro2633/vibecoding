'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageItem {
  id: string
  name: string
  path: string
  description: string
  maxWidth: number
  usedIn: string
}

const initialImages: ImageItem[] = [
  {
    id: 'cursor-start',
    name: 'Cursor 시작 화면',
    path: '/images/cursor-start-screen.png',
    description: 'Step 2에서 사용되는 Cursor 시작 화면',
    maxWidth: 600,
    usedIn: 'Step 2 - Cursor 실행'
  },
  {
    id: 'cursor-folder',
    name: 'Cursor Open Folder',
    path: '/images/cursor-open-folder.png',
    description: 'Step 2에서 사용되는 Cursor Open Folder 화면',
    maxWidth: 600,
    usedIn: 'Step 2 - Open Folder 클릭'
  },
  {
    id: 'cursor-chat',
    name: 'Cursor 채팅 화면',
    path: '/images/cursor-chat-screen.png',
    description: 'Step 3에서 사용되는 Cursor 채팅 화면',
    maxWidth: 600,
    usedIn: 'Step 3 - 로그인 확인하기'
  },
  {
    id: 'github-dashboard',
    name: 'GitHub 대시보드',
    path: '/images/github-dashboard.png',
    description: 'Step 1에서 사용되는 GitHub 대시보드',
    maxWidth: 700,
    usedIn: 'Step 1 - New repository 클릭'
  },
  {
    id: 'github-create',
    name: 'GitHub Repository 생성',
    path: '/images/github-create-repo.png',
    description: 'Step 1에서 사용되는 GitHub Repository 생성',
    maxWidth: 700,
    usedIn: 'Step 1 - Create repository'
  },
  {
    id: 'public-folder',
    name: 'Public 폴더 구조',
    path: '/images/public-folder.png',
    description: 'Step 8에서 사용되는 Public 폴더 구조',
    maxWidth: 600,
    usedIn: 'Step 8 - 이미지 사용법'
  },
  {
    id: 'inspect-menu',
    name: '검사 메뉴',
    path: '/images/inspect-menu.png',
    description: 'Step 8에서 사용되는 브라우저 검사 메뉴',
    maxWidth: 400,
    usedIn: 'Step 8 - 개발자 도구 열기'
  },
  {
    id: 'devtools',
    name: '개발자 도구',
    path: '/images/devtools.png',
    description: 'Step 8에서 사용되는 개발자 도구 화면',
    maxWidth: 700,
    usedIn: 'Step 8 - 콘솔과 모바일 뷰'
  },
  {
    id: 'cursor-download',
    name: 'Cursor 다운로드',
    path: '/images/cursor-download.png',
    description: '준비 페이지에서 사용되는 Cursor 다운로드',
    maxWidth: 600,
    usedIn: '준비 페이지 - Cursor 다운로드'
  }
]

export default function ImageEditor() {
  const [images] = useState<ImageItem[]>(initialImages)
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: string}>({})
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = async (imageId: string, file: File) => {
    setIsUploading(true)
    
    try {
      // 파일을 base64로 변환하여 미리보기
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUploadedFiles(prev => ({
          ...prev,
          [imageId]: result
        }))
      }
      reader.readAsDataURL(file)

      // 클라이언트 사이드 미리보기만 제공 (Vercel serverless 환경 제한으로 인해)
      console.log(`${imageId} 이미지 미리보기 준비 완료:`, file.name)
      alert('이미지 미리보기가 준비되었습니다! 실제 적용을 위해서는 개발자에게 이미지 파일을 전달해주세요.')
      
    } catch (error) {
      console.error('이미지 업로드 오류:', error)
      alert('이미지 업로드 중 오류가 발생했습니다.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileSelect = (imageId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB 제한
        alert('파일 크기는 5MB 이하여야 합니다.')
        return
      }
      
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.')
        return
      }

      handleImageUpload(imageId, file)
    }
  }

  const generateCode = () => {
    const codeChanges = images.map(img => {
      const uploadedFile = uploadedFiles[img.id]
      if (uploadedFile) {
        return `// ${img.name} 변경
// 기존: src="${img.path}"
// 새로운: src="${uploadedFile}" (업로드된 파일)`
      }
      return null
    }).filter(Boolean).join('\n\n')

    if (codeChanges) {
      navigator.clipboard.writeText(codeChanges)
      alert('변경사항이 클립보드에 복사되었습니다!')
    } else {
      alert('변경된 이미지가 없습니다.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🖼️ 바이브 코딩 이미지 에디터</h1>
          <p className="text-gray-300">이미지를 업로드해서 실시간으로 미리보기를 확인하세요!</p>
          <div className="mt-3 p-3 bg-yellow-900/50 border border-yellow-600 rounded-lg max-w-2xl mx-auto">
            <p className="text-yellow-200 text-sm">
              ⚠️ <strong>안내:</strong> 현재는 미리보기만 제공됩니다. 실제 이미지 변경을 위해서는 선택한 이미지 파일을 개발자에게 전달해주세요.
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={() => window.open('/', '_blank')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg mr-4"
            >
              📱 메인 사이트 보기
            </button>
            <button
              onClick={generateCode}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
            >
              📋 코드 변경사항 복사
            </button>
          </div>
        </div>

        {/* 이미지 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div key={img.id} className="bg-gray-800 border border-gray-600 rounded-lg p-6">
              {/* 이미지 정보 */}
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">{img.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{img.description}</p>
                <p className="text-xs text-blue-400">📍 사용 위치: {img.usedIn}</p>
              </div>

              {/* 현재 이미지 미리보기 */}
              <div className="mb-4 rounded-lg overflow-hidden border border-gray-600 bg-gray-700">
                <div className="relative" style={{ minHeight: '200px' }}>
                  {uploadedFiles[img.id] ? (
                  <Image
                    src={uploadedFiles[img.id]}
                    alt={img.name}
                    width={img.maxWidth}
                    height={300}
                    className="w-full h-auto"
                    style={{ maxWidth: `${img.maxWidth}px` }}
                  />
                  ) : (
                    <Image
                      src={img.path}
                      alt={img.name}
                      width={img.maxWidth}
                      height={300}
                      className="w-full h-auto"
                      onError={() => (
                        <div className="flex items-center justify-center h-48 text-gray-500">
                          이미지를 불러올 수 없습니다
                        </div>
                      )}
                    />
                  )}
                </div>
              </div>

              {/* 업로드 버튼 */}
              <div className="space-y-3">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(img.id, e)}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <div className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-4 py-2 rounded-lg text-center cursor-pointer transition-colors">
                    {isUploading ? '업로드 중...' : '📁 새 이미지 선택'}
                  </div>
                </label>

                {uploadedFiles[img.id] && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setUploadedFiles(prev => {
                        const newFiles = { ...prev }
                        delete newFiles[img.id]
                        return newFiles
                      })}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                    >
                      🗑️ 되돌리기
                    </button>
                    <button
                      onClick={() => setSelectedImage(img)}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                    >
                      🔍 크게 보기
                    </button>
                  </div>
                )}
              </div>

              {/* 파일 정보 */}
              <div className="mt-3 text-xs text-gray-400">
                <p>현재 크기: 최대 {img.maxWidth}px</p>
                <p>지원 형식: JPG, PNG, GIF, WebP</p>
                <p>최대 용량: 5MB</p>
              </div>
            </div>
          ))}
        </div>

        {/* 사용 안내 */}
        <div className="mt-12 bg-blue-900/50 border border-blue-600 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">📖 사용 방법</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-200">
            <div>
              <h3 className="font-bold mb-2">1. 이미지 업로드</h3>
              <ul className="space-y-1 text-sm">
                <li>• 각 카드에서 &ldquo;새 이미지 선택&rdquo; 클릭</li>
                <li>• 원하는 이미지 파일 선택 (5MB 이하)</li>
                <li>• 실시간으로 미리보기 확인</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">2. 변경사항 적용</h3>
              <ul className="space-y-1 text-sm">
                <li>• 미리보기로 원하는 이미지 확인</li>
                <li>• 이미지 파일을 개발자에게 전달</li>
                <li>• 어떤 위치에 사용할지 함께 알려주기</li>
                <li>• 개발자가 실제 사이트에 반영!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 통계 */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">📊 편집 현황</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">{images.length}</div>
              <div className="text-sm text-gray-400">전체 이미지</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{Object.keys(uploadedFiles).length}</div>
              <div className="text-sm text-gray-400">변경된 이미지</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{images.length - Object.keys(uploadedFiles).length}</div>
              <div className="text-sm text-gray-400">원본 이미지</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {Math.round((Object.keys(uploadedFiles).length / images.length) * 100)}%
              </div>
              <div className="text-sm text-gray-400">완료율</div>
            </div>
          </div>
        </div>
      </div>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-full overflow-auto">
            <Image
              src={uploadedFiles[selectedImage.id] || selectedImage.path}
              alt={selectedImage.name}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg"
            />
            <div className="text-center mt-4">
              <h3 className="text-xl font-bold">{selectedImage.name}</h3>
              <p className="text-gray-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
