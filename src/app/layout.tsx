import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aurora Sejahtera Tour & Travel - Paket Wisata Terbaik",
  description: "Aurora Sejahtera Tour & Travel menyediakan paket wisata domestik dan internasional dengan harga terbaik. Booking sekarang!",
  keywords: "tour travel, paket wisata, liburan, domestik, internasional, aurora sejahtera",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
