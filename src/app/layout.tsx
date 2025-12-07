import type { Metadata } from "next";
import { Geist, Geist_Mono, Limelight } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const limelight = Limelight({
  variable: "--font-limelight",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Website",
  description: "My personal portfolio and blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${limelight.variable}`}>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
