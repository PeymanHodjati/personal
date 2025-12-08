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
  title: {
    default: "Peyman Hodjati | Creative Portfolio",
    template: "%s | Peyman Hodjati",
  },
  description: "Creative professional specializing in videography, photography, virtual tours, graphic design, motion graphics, and web development. View my portfolio and get in touch.",
  keywords: ["Peyman Hodjati", "portfolio", "videography", "photography", "virtual tour", "360 tour", "graphic design", "motion graphics", "web development", "Cyprus", "creative"],
  authors: [{ name: "Peyman Hodjati", url: "https://peymanhodjati.com" }],
  creator: "Peyman Hodjati",
  metadataBase: new URL("https://peymanhodjati.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://peymanhodjati.com",
    siteName: "Peyman Hodjati",
    title: "Peyman Hodjati | Creative Portfolio",
    description: "Creative professional specializing in videography, photography, virtual tours, graphic design, motion graphics, and web development.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Peyman Hodjati Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peyman Hodjati | Creative Portfolio",
    description: "Creative professional specializing in videography, photography, virtual tours, graphic design, motion graphics, and web development.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Peyman Hodjati",
    url: "https://peymanhodjati.com",
    image: "https://peymanhodjati.com/og-image.jpg",
    jobTitle: "Creative Professional",
    description: "Videographer, Photographer, Web Developer, and Graphic Designer based in Cyprus",
    sameAs: [
      "https://www.linkedin.com/in/peymanhodjati",
    ],
    knowsAbout: ["Videography", "Photography", "Virtual Tours", "Graphic Design", "Motion Graphics", "Web Development"],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${limelight.variable}`}>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
