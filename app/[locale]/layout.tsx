import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { CommandPalette } from "@/components/search/CommandPalette";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { CloudCursor } from "@/components/ui/CloudCursor";
import { PageTransition } from "@/components/navigation/PageTransition";
import { Geist, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import { siteUrl } from "@/lib/siteUrl";
import {
  defaultLocale,
  htmlLang,
  isLocale,
  locales,
  stripLocaleFromPathname,
  type Locale,
} from "@/lib/i18n/config";
import { LocaleProvider } from "@/lib/i18n/locale-context";
import { getDictionary } from "@/lib/i18n/dictionaries";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-display" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const siteDescriptions: Record<Locale, string> = {
  en: "Discover every Gemini and Google Workspace AI feature. Compare plans, explore enterprise capabilities, connectors, agents, and security — all in one premium intelligence platform.",
  es: "Descubre todas las funciones de IA de Gemini y Google Workspace. Compara planes y explora capacidades empresariales, conectores, agentes y seguridad, todo en una plataforma de inteligencia premium.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dictionary = getDictionary(locale);

  return {
    title: {
      default: dictionary.metadata.titleDefault,
      template: "%s | Gemini Enterprise AI Intelligence",
    },
    description: siteDescriptions[locale],
    keywords: dictionary.metadata.keywords,
    authors: [{ name: "MarketStar" }],
    creator: "MarketStar",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale === defaultLocale ? "" : locale}`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [htmlLang(l), l === defaultLocale ? "/" : `/${l}`]),
        ),
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
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
}

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
      var stored = localStorage.getItem('theme');
      var d = document.documentElement;
      var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
      d.style.colorScheme = isDark ? 'dark' : 'light';
      d.dataset.theme = isDark ? 'dark' : 'light';
      if (isDark) {
        d.classList.add('dark');
      } else {
        d.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    notFound();
  }
  const locale: Locale = raw;
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={htmlLang(locale)}
      suppressHydrationWarning
      className={cn("font-sans", geist.variable, outfit.variable)}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative min-h-screen bg-background text-foreground antialiased selection:bg-blue-500/25 selection:text-foreground overflow-x-hidden">
        {/* Ambient Subtle Accent Lighting (CSS-composited for zero scroll lag) */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(124,58,237,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(124,58,237,0.12),transparent_70%)]" aria-hidden="true" />

        <LocaleProvider locale={locale}>
          <LenisProvider>
            <ThemeProvider>
              <CloudCursor />
              <Header labels={dictionary.nav} />
              <main className="min-h-[calc(100vh-4rem)]">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer labels={dictionary.footer} locale={locale} />
              <CommandPalette />
            </ThemeProvider>
          </LenisProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
