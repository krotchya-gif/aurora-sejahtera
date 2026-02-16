"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import PromoSection from "@/components/home/PromoSection";
import PaketPopuler from "@/components/home/PaketPopuler";
import DestinasiPopuler from "@/components/home/DestinasiPopuler";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonial from "@/components/home/Testimonial";
import Link from "next/link";

interface Settings {
  whatsapp: string;
}

export default function Home() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success) {
          setSettings(data.data);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Promo Section */}
      <PromoSection />

      {/* Paket Populer */}
      <PaketPopuler />

      {/* Destinasi Populer */}
      <DestinasiPopuler />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonial */}
      <Testimonial />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Untuk Liburan Impian Anda?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik untuk perjalanan Anda!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/paket"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-lg inline-flex items-center justify-center"
            >
              Lihat Paket Wisata
            </Link>
            <Link
              href={settings ? `https://wa.me/${settings.whatsapp}` : "https://wa.me/6281234567890"}
              target="_blank"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-lg inline-flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat via WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
