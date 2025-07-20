import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import { QueryProvider } from "@/lib/Providers/QueryCliantProvider";
import { siteName, siteDescription, siteUrl } from "@/lib/config";
import dynamic from "next/dynamic";
import { ReactNode, Suspense } from "react";

const CookieConsentBanner = dynamic(() => import("@/components/CookieConsentBanner"), {
  ssr: false,
  loading: () => null,
});

const PixelTracker = dynamic(() => import("@/lib/PixelTracker"), {
  ssr: false,
  loading: () => null,
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: siteName,
  description: siteDescription,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName: siteName,
    images: [{
      url: "/og.jpg",
      width: 1200,
      height: 630,
    }],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?                         
              n.callMethod.apply(n,arguments):n.queue.push   
              (arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!
              0;n.version='2.0';n.queue=[];t=b.createElement(e);
              t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,
              'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1282721469953160');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1282721469953160&ev=
            PageView&noscript=1"/>
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
       
        {/* Server-rendered parts */}
        <QueryProvider>
          <SiteHeader />
          {children}
          <CommonClient />
          <Footer />
        </QueryProvider>

        {/* Client-side only components */}
        <Suspense fallback={
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="loader"></div> isLoading
          </div>
        }>
          <PixelTracker />
          <CookieConsentBanner />
        </Suspense>
      </body>
    </html>
  );
}