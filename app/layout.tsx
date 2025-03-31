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
  title: "PlanetEarth",
  description: "오픈월드 타우니 지구서버 PlanetEarth",
  keywords: '마인크래프트, Minecraft, PlanetEarth, 타우니, 국전, 국가전쟁, 지구맛, 시즈워, 플어, 플래닛어스',
  icons: {
    icon: '/favicon.png'
  },
  openGraph: {
    type: 'website',
    title: 'PlanetEarth',
    description: '오픈월드 타우니 지구서버 PlanetEarth',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
