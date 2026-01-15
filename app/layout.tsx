import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `${siteConfig.name}, ${siteConfig.age} — A Birthday Keepsake`,
  description: siteConfig.subtitle,
  robots: "noindex, nofollow", // Keep this private
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FAF7F2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
