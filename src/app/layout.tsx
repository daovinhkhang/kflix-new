import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { generateBaseMetadata } from "@/lib/seo";
import AdsScript from "@/components/AdsScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...generateBaseMetadata(
    "KFLIX",
    "Stream and discover movies, TV shows, and entertainment content on KFLIX. Your ultimate streaming destination with the latest releases and classic favorites."
  ),
  icons: {
    icon: [
      { url: '/favicon.png', sizes: 'any' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="icon" href="/icon-192x192.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main content */}
          <div className="flex flex-1 flex-col lg:pl-72">
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
        <AdsScript />
      </body>
    </html>
  );
}
