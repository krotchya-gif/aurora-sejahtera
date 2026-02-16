"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PaketCard from "@/components/ui/PaketCard";

const kategoriOptions = [
  { id: "semua", label: "Semua Paket" },
  { id: "domestik", label: "Domestik" },
  { id: "internasional", label: "Internasional" },
];

const tipeOptions = [
  { id: "semua", label: "Semua Tipe" },
  { id: "open-trip", label: "Open Trip" },
  { id: "private-trip", label: "Private Trip" },
];

const sortOptions = [
  { id: "terbaru", label: "Terbaru" },
  { id: "harga-terendah", label: "Harga Terendah" },
  { id: "harga-tertinggi", label: "Harga Tertinggi" },
  { id: "rating", label: "Rating Tertinggi" },
];

interface Paket {
  _id: string;
  nama: string;
  destinasi: string;
  kategori: string;
  tipe: string;
  harga: number;
  hargaCoret?: number;
  durasi: string;
  gambar: string;
  slug: string;
  isPromo?: boolean;
  season?: string;
  rating?: number;
  jumlahReview?: number;
  sisaKuota?: number;
}

function PaketContent() {
  const searchParams = useSearchParams();
  const initialKategori = searchParams.get("kategori") || "semua";
  const initialTipe = searchParams.get("tipe") || "semua";
  const isPromo = searchParams.get("promo") === "true";

  const [kategori, setKategori] = useState(initialKategori);
  const [tipe, setTipe] = useState(initialTipe);
  const [sortBy, setSortBy] = useState("terbaru");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPromoOnly, setShowPromoOnly] = useState(isPromo);
  const [paketList, setPaketList] = useState<Paket[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync state with URL query params when URL changes
  useEffect(() => {
    const urlKategori = searchParams.get("kategori") || "semua";
    const urlTipe = searchParams.get("tipe") || "semua";
    const urlPromo = searchParams.get("promo") === "true";

    setKategori(urlKategori);
    setTipe(urlTipe);
    setShowPromoOnly(urlPromo);
  }, [searchParams]);

  // Fetch paket from database
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

  const filteredPaket = useMemo(() => {
    let result = [...paketList];

    // Filter by kategori
    if (kategori !== "semua") {
      result = result.filter((p) => p.kategori === kategori);
    }

    // Filter by tipe
    if (tipe !== "semua") {
      result = result.filter((p) => p.tipe === tipe);
    }

    // Filter promo only
    if (showPromoOnly) {
      result = result.filter((p) => p.isPromo);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.nama.toLowerCase().includes(query) ||
          p.destinasi.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case "harga-terendah":
        result.sort((a, b) => a.harga - b.harga);
        break;
      case "harga-tertinggi":
        result.sort((a, b) => b.harga - a.harga);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // terbaru - keep original order (newest first from DB)
        break;
    }

    return result;
  }, [kategori, tipe, sortBy, searchQuery, showPromoOnly, paketList]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-2xl h-48 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-80"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cari Paket
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari destinasi atau nama paket..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {kategoriOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tipe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipe Trip
            </label>
            <select
              value={tipe}
              onChange={(e) => setTipe(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {tipeOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 pt-4 border-t">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPromoOnly}
                onChange={(e) => setShowPromoOnly(e.target.checked)}
                className="w-5 h-5 text-primary rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Promo saja</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Menampilkan <span className="font-semibold">{filteredPaket.length}</span> paket wisata
        </p>
      </div>

      {/* Paket Grid */}
      {filteredPaket.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaket.map((paket) => (
            <PaketCard key={paket._id} paket={paket} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Tidak ada paket ditemukan
          </h3>
          <p className="text-gray-500">
            Coba ubah filter atau kata kunci pencarian Anda
          </p>
        </div>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        <div className="bg-gray-200 rounded-2xl h-48 mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-200 rounded-2xl h-80"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PaketPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Paket Wisata</h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Temukan paket wisata terbaik untuk liburan impian Anda. Domestik maupun internasional, kami siap menemani perjalanan Anda.
          </p>
        </div>
      </div>

      <Suspense fallback={<LoadingFallback />}>
        <PaketContent />
      </Suspense>
    </div>
  );
}
