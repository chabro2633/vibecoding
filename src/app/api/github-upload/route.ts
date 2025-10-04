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
    const owner = 'chabro2633' // GitHub 사용자명 (실제 GitHub 계정명)
    const repo = 'vibecoding' // 저장소 이름
    const path = `public/images/${fileName}`
    const token = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT // GitHub Personal Access Token
    
    console.log('GitHub API 호출 정보:', {
      owner,
      repo,
      path,
      hasToken: !!token,
      tokenType: token ? (token.startsWith('ghp_') ? 'Personal Access Token' : 'Fine-grained token or 기타') : 'No token'
    })

    if (!token) {
      console.error('환경 변수 확인:', {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN ? '설정됨' : '없음',
        GITHUB_PAT: process.env.GITHUB_PAT ? '설정됨' : '없음',
        NODE_ENV: process.env.NODE_ENV
      })
      return NextResponse.json({ 
        error: 'GitHub 토큰이 설정되지 않았습니다.',
        debug: `NODE_ENV: ${process.env.NODE_ENV}, 토큰 확인: ${!!process.env.GITHUB_TOKEN}`,
        help: '환경 변수에 GITHUB_TOKEN 또는 GITHUB_PAT를 설정해주세요.'
      }, { status: 500 })
    }
    
    // 토큰 형식 검증
    if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
      console.warn('토큰 형식이 일반적이지 않습니다:', token.substring(0, 10) + '...')
    }

    // GitHub API 테스트 - 저장소 접근 권한 확인
    try {
      const repoTestResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'vibecoding-app/1.0',
          },
        }
      )
      
      if (!repoTestResponse.ok) {
        const repoError = await repoTestResponse.json()
        console.error('저장소 접근 실패:', {
          status: repoTestResponse.status,
          statusText: repoTestResponse.statusText,
          error: repoError,
          url: `https://api.github.com/repos/${owner}/${repo}`
        })
        
        let errorMessage = ''
        if (repoTestResponse.status === 401) {
          errorMessage = '토큰이 유효하지 않습니다. 토큰을 확인하고 다시 시도해주세요.'
        } else if (repoTestResponse.status === 403) {
          errorMessage = '토큰 권한이 부족합니다. 토큰에 다음 권한이 필요합니다: repo (전체 저장소 접근), contents:write'
        } else if (repoTestResponse.status === 404) {
          errorMessage = '저장소가 존재하지 않거나 접근 권한이 없습니다.'
        } else {
          errorMessage = repoError.message || '저장소에 접근할 수 없습니다.'
        }
        
        return NextResponse.json({ 
          error: `저장소 접근 실패 (${repoTestResponse.status}): ${errorMessage}`,
          debug: {
            status: repoTestResponse.status,
            statusText: repoTestResponse.statusText,
            help: 'GitHub 토큰 권한을 확인해주세요. 다음 권한이 필요합니다: repo, contents:write'
          }
        }, { status: repoTestResponse.status })
      }
      
      console.log('저장소 접근 성공')
    } catch (error) {
      console.error('저장소 접근 테스트 오류:', error)
      return NextResponse.json({ error: '저장소 접근 테스트 실패', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
    }

    // 기존 파일 확인
    let sha = null
    try {
      const existingFileResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'vibecoding-app/1.0',
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
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': 'vibecoding-app/1.0',
        },
        body: JSON.stringify(uploadData)
      }
    )

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json()
      console.error('GitHub API 오류:', {
        status: uploadResponse.status,
        statusText: uploadResponse.statusText,
        errorData,
        url: `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        fileName,
        fileSize: file.size
      })
      
      let errorMessage = ''
      if (uploadResponse.status === 401) {
        errorMessage = '인증 실패 - 토큰이 유효하지 않습니다.'
      } else if (uploadResponse.status === 403) {
        errorMessage = '권한 부족 - 토큰에 contents:write 권한이 필요합니다.'
      } else if (uploadResponse.status === 422) {
        errorMessage = '잘못된 요청 - 파일 이름이나 내용에 문제가 있을 수 있습니다.'
      } else {
        errorMessage = errorData.message || errorData.error || '알 수 없는 오류'
      }
      
      throw new Error(`GitHub 업로드 실패 (${uploadResponse.status}): ${errorMessage}`)
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
