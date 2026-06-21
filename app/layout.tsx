import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";

// Poppins - geometric sans, clean, modern, not flat-looking
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Monospace for code labels, tags, dates
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Nardi | Data & AI Engineer",
  description: "Portfolio of Nardi, a Data Engineer specialized in building scalable data systems, interactive dashboards, and AI-powered tools.",
  keywords: [
    "Nardi", "Data Engineer", "AI Engineer", "Big Data", "BigQuery", "SQL",
    "Python", "LLM", "LangChain", "RAG", "Next.js", "React", "Portfolio"
  ],
  authors: [{ name: "Nardi" }],
  creator: "Nardi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nardi-portf.vercel.app", // Ganti dengan domain asli jika sudah ada
    title: "Nardi | Data & AI Engineer",
    description: "Data Engineer specialized in building scalable data systems and AI-powered tools.",
    siteName: "Nardi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nardi | Data & AI Engineer",
    description: "Data Engineer specialized in building scalable data systems and AI-powered tools.",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
