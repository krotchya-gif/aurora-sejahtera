"use client";

import { useState, useEffect } from "react";
import PaketCard from "@/components/ui/PaketCard";
import Link from "next/link";

interface Paket {
  _id: string;
  nama: string;
  destinasi: string;
  kategori: string;
  harga: number;
  hargaCoret?: number;
  durasi: string;
  gambar: string;
  deskripsi: string;
  isPromo: boolean;
  slug: string;
}

export default function PromoSection() {
  const [promoPaket, setPromoPaket] = useState<Paket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromoPaket = async () => {
      try {
        const res = await fetch("/api/paket");
        const data = await res.json();
        if (data.success) {
          // Filter paket yang isPromo: true
          const promos = data.data.filter((p: Paket) => p.isPromo);
          setPromoPaket(promos);
        }
      } catch (error) {
        console.error("Error fetching promo paket:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPromoPaket();
  }, []);

  // Jangan tampilkan section jika tidak ada promo
  if (!loading && promoPaket.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-10 w-96 bg-gray-200 rounded mx-auto mb-4"></div>
              <div className="h-6 w-full max-w-2xl bg-gray-200 rounded mx-auto"></div>
            </div>
          ) : (
            <>
              <span className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
                PROMO SPESIAL
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Penawaran Terbaik Untuk Anda
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Dapatkan harga spesial untuk paket wisata pilihan. Booking sekarang sebelum kehabisan!
              </p>
            </>
          )}
        </div>

        {/* Promo Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {promoPaket.slice(0, 4).map((paket) => (
              <PaketCard key={paket._id} paket={paket} />
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && promoPaket.length > 0 && (
          <div className="text-center mt-10">
            <Link
              href="/paket?promo=true"
              className="inline-flex items-center bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
            >
              Lihat Semua Promo
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
