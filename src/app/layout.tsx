import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import ThemeProviderComponent from "@/components/ThemeProviderComponent";
import { ClientWrapper } from "@/components/ClientWrapper";
import { cn } from "../../lib/utils";
import Navbar from "@/components/Navbar";
import Container from "@/components/container";
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
  icons: {
    icon: { url: "/mm.png", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientWrapper>
          <ThemeProviderComponent>
            <div
              className={cn(
                "bg-gray-200 dark:bg-zinc-900 flex flex-col items-center w-full min-h-screen h-fit",
              )}
            >
              <Navbar />
              {children}
              <Container className=" bottom-0 mt-40">
                <Footer />
              </Container>
            </div>
          </ThemeProviderComponent>
        </ClientWrapper>
      </body>
    </html>
  );
}
