import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { CommandPalette } from "@/components/search/CommandPalette";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { CloudCursor } from "@/components/ui/CloudCursor";
import { Geist, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: {
    default: "Gemini Enterprise AI Intelligence | Google Workspace AI Features & Capabilities",
    template: "%s | Gemini Enterprise AI Intelligence",
  },
  description: "Discover every Gemini and Google Workspace AI feature. Compare plans, explore enterprise capabilities, connectors, agents, and security — all in one premium intelligence platform.",
  keywords: ["Gemini", "Google Workspace", "AI", "Enterprise", "NotebookLM", "Google Workspace AI", "Gemini Enterprise", "AI features", "plan comparison"],
  authors: [{ name: "MarketStar" }],
  creator: "MarketStar",
  metadataBase: new URL("https://gemini-intelligence.marketstar.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Gemini Enterprise AI Intelligence",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
  ],
  width: "device-width",
  initialScale: 1,
};

const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      var d = document.documentElement;
      if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        d.classList.add('dark');
      } else {
        d.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable, outfit.variable)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-blue-500/25 selection:text-foreground">
        <LenisProvider>
          <ThemeProvider>
            <CloudCursor />
            <Header />
            <main className="min-h-[calc(100vh-4rem)] bg-background text-foreground">
              {children}
            </main>
            <Footer />
            <CommandPalette />
          </ThemeProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
