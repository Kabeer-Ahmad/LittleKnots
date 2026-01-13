import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Little Knots - Handmade Crochet with Love",
  description: "Custom handmade crochet flowers, bouquets, keychains and much more. Delivering all over Pakistan 🇵🇰.",
  keywords: ["crochet", "handmade", "pakistan", "little knots", "custom orders", "knitting", "wool", "gifts"],
  openGraph: {
    title: "Little Knots",
    description: "Handmade crochet with love. Custom orders and cozy creations.",
    url: "https://littleknots.vercel.app", // Placeholder URL
    siteName: "Little Knots",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Little Knots - Handmade Crochet",
    description: "Custom handmade crochet orders and cozy creations.",
  },
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
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
