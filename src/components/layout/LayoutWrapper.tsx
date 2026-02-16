"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if current path is admin or login page
  const isAdminPage = pathname?.startsWith("/admin");
  const isLoginPage = pathname === "/login";

  // Don't show header/footer on admin and login pages
  if (isAdminPage || isLoginPage) {
    return <>{children}</>;
  }

  // Show header/footer on public pages
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
