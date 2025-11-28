import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const imageId = formData.get('imageId') as string

    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 })
    }

    if (!imageId) {
      return NextResponse.json({ error: '이미지 ID가 없습니다.' }, { status: 400 })
    }

    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: '파일 크기는 5MB 이하여야 합니다.' }, { status: 400 })
    }

    // 파일 타입 체크
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: '이미지 파일만 업로드 가능합니다.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // public/images 디렉토리 확인 및 생성
    const imagesDir = join(process.cwd(), 'public', 'images')
    if (!existsSync(imagesDir)) {
      await mkdir(imagesDir, { recursive: true })
    }

    // 파일 확장자 추출
    const fileExtension = file.name.split('.').pop() || 'png'
    
    // 새 파일명 생성 (imageId 기반)
    const fileName = `${imageId}-new.${fileExtension}`
    const filePath = join(imagesDir, fileName)

    // 파일 저장
    await writeFile(filePath, buffer)

    // 웹 경로 반환
    const webPath = `/images/${fileName}`

    return NextResponse.json({
      success: true,
      message: '이미지가 성공적으로 업로드되었습니다.',
      path: webPath,
      originalName: file.name,
      size: file.size,
      type: file.type
    })

  } catch (error) {
    console.error('이미지 업로드 오류:', error)
    return NextResponse.json(
      { error: '이미지 업로드 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}




