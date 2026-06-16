import type { Metadata } from "next";
import "./globals.css";
import "./glass.css";
import "./hero.css";

export const metadata: Metadata = {
  title: "NexusAI — единый интерфейс к лучшим нейросетям",
  description: "NexusAI — премиальная платформа доступа к GPT-4o, Claude, Gemini и другим моделям с синхронизацией Telegram.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
