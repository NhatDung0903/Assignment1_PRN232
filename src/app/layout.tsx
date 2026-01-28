import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import MobileBottomNav from "../components/MobileBottomNav";
import { ToastProvider } from "../components/Toast";
import ApiDocsPanel from "../components/ApiDocsPanel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CND Shop - Clothing E-Commerce",
  description: "A modern clothing e-commerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <NavBar />
          <div className="container mx-auto p-4 pb-20 md:pb-4">
            {children}
          </div>
          <MobileBottomNav />
          <ApiDocsPanel />
        </ToastProvider>
      </body>
    </html>
  );
}
