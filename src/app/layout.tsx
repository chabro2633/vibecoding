import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "바이브 코딩 - AI와 함께하는 개발 여정",
  description: "모든 사람이 상상을 현실로 만들 수 있게. Cursor와 함께하는 AI 개발 세션",
  openGraph: {
    title: "바이브 코딩 - AI와 함께하는 개발 여정",
    description: "모든 사람이 상상을 현실로 만들 수 있게. Cursor와 함께하는 AI 개발 세션",
    images: ["/images/og123.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "바이브 코딩 - AI와 함께하는 개발 여정",
    description: "모든 사람이 상상을 현실로 만들 수 있게. Cursor와 함께하는 AI 개발 세션",
    images: ["/images/og123.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
