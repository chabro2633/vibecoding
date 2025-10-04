# vibecoding

A Next.js web-app showcasing essential tools for front-end development, including GitHub integration, image editing capabilities, and public folder management.

## GitHub 토큰 설정

이 앱은 GitHub API를 사용하여 이미지를 업로드합니다. 작동하기 위해 GitHub Personal Access Token이 필요합니다.

### GitHub 토큰 생성 방법

1. [GitHub.com](https://github.com)에 로그인
2. Settings > Developer settings > Personal access tokens > Tokens (classic)
3. "Generate new token (classic)" 클릭
4. 필요한 권한 선택:
   - `repo` (전체 저장소 접근 권한)
   - `Contents: Write` (파일 업로드 권한)
5. 토큰 생성 후 복사

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
GITHUB_TOKEN=your_github_personal_access_token_here
```

### 개발 서버 실행 방법

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
