"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/paket",
    label: "Paket Wisata",
    submenu: [
      { href: "/paket?kategori=domestik", label: "Domestik" },
      { href: "/paket?kategori=internasional", label: "Internasional" },
      { href: "/paket?tipe=open-trip", label: "Open Trip" },
      { href: "/paket?tipe=private-trip", label: "Private Trip" },
    ]
  },
  { href: "/galeri", label: "Galeri" },
  { href: "/artikel", label: "Blog" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/kontak", label: "Kontak" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [whatsapp, setWhatsapp] = useState("6281234567890"); // Default fallback

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success && data.data?.whatsapp) {
          setWhatsapp(data.data.whatsapp);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Aurora Sejahtera Tour & Travel"
              width={50}
              height={50}
              className="h-12 w-auto"
              priority
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary">Aurora Sejahtera</h1>
              <p className="text-xs text-gray-500">Tour & Travel</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative group"
                onMouseEnter={() => link.submenu && setActiveSubmenu(link.href)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  href={link.href}
                  className="px-4 py-2 text-gray-700 hover:text-primary font-medium transition-colors rounded-lg hover:bg-gray-50"
                >
                  {link.label}
                  {link.submenu && (
                    <svg className="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Submenu */}
                {link.submenu && activeSubmenu === link.href && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 border">
                    {link.submenu.map((sublink) => (
                      <Link
                        key={sublink.href}
                        href={sublink.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white transition-colors"
                      >
                        {sublink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => !link.submenu && setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium"
                  >
                    {link.label}
                  </Link>
                  {link.submenu && (
                    <div className="pl-6">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.href}
                          href={sublink.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-2 text-gray-600 hover:text-primary text-sm"
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                className="mx-4 mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-semibold text-center transition-all"
              >
                Hubungi Kami
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
