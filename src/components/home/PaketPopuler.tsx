"use client";

import { useState, useEffect } from "react";
import PaketCard from "@/components/ui/PaketCard";
import Link from "next/link";

const tabs = [
  { id: "semua", label: "Semua" },
  { id: "domestik", label: "Domestik" },
  { id: "internasional", label: "Internasional" },
];

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
  tipe: string;
  season: string;
  rating: number;
  jumlahReview: number;
  sisaKuota: number;
}

export default function PaketPopuler() {
  const [activeTab, setActiveTab] = useState("semua");
  const [paketList, setPaketList] = useState<Paket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const res = await fetch("/api/paket");
        const data = await res.json();
        if (data.success) {
          setPaketList(data.data);
        }
      } catch (error) {
        console.error("Error fetching paket:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaket();
  }, []);

  const filteredPaket =
    activeTab === "semua"
      ? paketList
      : paketList.filter((p) => p.kategori === activeTab);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            PAKET WISATA
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Destinasi Populer
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan paket wisata terbaik untuk liburan impian Anda bersama Aurora Sejahtera
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        ) : filteredPaket.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Belum ada paket wisata tersedia</p>
          </div>
        ) : (
          <>
            {/* Paket Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaket.slice(0, 6).map((paket) => (
                <PaketCard key={paket._id} paket={paket} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-10">
              <Link
                href="/paket"
                className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
              >
                Lihat Semua Paket
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
