import type { Metadata } from "next";
import { EFCircular, geistMono, BOOTSTRAP_SCRIPT } from "@/lib";
import { SiteThemeProvider } from "@/hooks";
import { Header } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BootSplash, LoadingScreen, PageTransition } from "@/components/motion";
import { ROUTES, getPageMetadata } from "@/constants";
import "./globals.css";

export const metadata: Metadata = getPageMetadata(ROUTES.home);

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${EFCircular.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP_SCRIPT }} />
      </head>

      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <noscript>
          <style>{`html{overflow:auto!important}.boot-splash{display:none!important}`}</style>
        </noscript>

        <BootSplash />

        <SiteThemeProvider>
          <LoadingScreen />
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SiteThemeProvider>
      </body>
    </html>
  );
}
