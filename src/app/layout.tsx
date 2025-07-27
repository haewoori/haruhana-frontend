import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "haruhana",
  description: "처음이라 뜨겁게, 우리라서 강하게, 하루하나",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
      <html lang="ko">
      <body>
        {children}
      </body>
      </html>
  );
}
