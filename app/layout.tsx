import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import { EFCircular } from "@/lib";
import { SiteThemeProvider } from "@/hooks";
import { Header } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LoadingScreen, PageTransition } from "@/components/motion";
import { ROUTES, getPageMetadata } from "@/constants";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = getPageMetadata(ROUTES.home);

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${EFCircular.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      
      <body className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning>

  
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem('portfolio-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){document.documentElement.classList.add('dark')}}catch(e){}`}
        </Script>

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
