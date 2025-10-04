import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const imageId = formData.get('imageId') as string
    const fileName = formData.get('fileName') as string

    if (!file || !imageId || !fileName) {
      return NextResponse.json({ error: '필수 정보가 누락되었습니다.' }, { status: 400 })
    }

    // 파일을 base64로 변환
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Content = buffer.toString('base64')

    // GitHub API 설정
    const owner = 'chahyeongtae' // GitHub 사용자명
    const repo = 'vibecoding' // 저장소 이름
    const path = `public/images/${fileName}`
    const token = process.env.GITHUB_TOKEN // GitHub Personal Access Token

    if (!token) {
      return NextResponse.json({ error: 'GitHub 토큰이 설정되지 않았습니다.' }, { status: 500 })
    }

    // 기존 파일 확인
    let sha = null
    try {
      const existingFileResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      )

      if (existingFileResponse.ok) {
        const existingFile = await existingFileResponse.json()
        sha = existingFile.sha
      }
    } catch (error) {
      // 파일이 없는 경우 무시
      console.log('기존 파일 없음:', error)
    }

    // GitHub에 파일 업로드/업데이트
    const uploadData = {
      message: `🖼️ 이미지 업데이트: ${fileName} (${imageId})`,
      content: base64Content,
      ...(sha && { sha }) // 기존 파일이 있으면 sha 포함
    }

    const uploadResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData)
      }
    )

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json()
      throw new Error(`GitHub 업로드 실패: ${errorData.message}`)
    }

    const result = await uploadResponse.json()

    return NextResponse.json({
      success: true,
      message: '이미지가 GitHub에 성공적으로 업로드되었습니다!',
      path: `/images/${fileName}`,
      githubUrl: result.content.html_url,
      commitSha: result.commit.sha
    })

  } catch (error) {
    console.error('GitHub 업로드 오류:', error)
    return NextResponse.json(
      { error: `업로드 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}` },
      { status: 500 }
    )
  }
}
