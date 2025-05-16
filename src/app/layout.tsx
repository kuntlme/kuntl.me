import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import ThemeProviderComponent from "@/components/ThemeProviderComponent";
import { ClientWrapper } from "@/components/ClientWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kuntl.me",
  description: "Kuntal's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientWrapper>
        <ThemeProviderComponent>
          <div className="flex flex-col min-h-screen bg-gray-200 dark:bg-zinc-900">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProviderComponent>
        </ClientWrapper>
      </body>
    </html>
  );
}
