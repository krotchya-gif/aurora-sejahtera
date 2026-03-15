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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aurorasejahteratour.travel"),
  title: "Aurora Sejahtera Tour & Travel - Paket Wisata Terbaik",
  description: "Aurora Sejahtera Tour & Travel menyediakan paket wisata domestik dan internasional dengan harga terbaik. Booking sekarang!",
  keywords: "tour travel, paket wisata, liburan, domestik, internasional, aurora sejahtera",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Aurora Sejahtera Tour & Travel",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Aurora Sejahtera Tour & Travel Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora Sejahtera Tour & Travel",
    description: "Paket wisata domestik dan internasional dengan harga terbaik",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
