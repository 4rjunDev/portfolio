import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  weight: "variable",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3008";
const description =
  "An iOS studio building native SwiftUI apps at speed — social, sports, and utility products taken from a blank Xcode project to something you can put on a phone.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl.replace(/\/?$/, "/")),
  title: {
    default: "ADHD Studios — Native iOS apps, shipped fast",
    template: "%s — ADHD Studios",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "ADHD Studios",
    title: "ADHD Studios",
    description,
    images: [{ url: "og/home.png", width: 1200, height: 630, alt: "ADHD Studios — native things, shipped fast." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADHD Studios",
    description,
    images: ["og/home.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`,
          }}
        />
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
