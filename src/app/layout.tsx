import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { generateBaseMetadata } from "@/lib/seo";
import { TelegramProvider } from "@/components/providers/TelegramProvider";

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
        
        {/* Telegram Mini App Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="telegram-web-app" content="true" />
        <script src="https://telegram.org/js/telegram-web-app.js" async></script>
      </head>
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        <TelegramProvider>
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
        </TelegramProvider>
      </body>
    </html>
  );
}
