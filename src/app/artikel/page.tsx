"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Artikel {
  _id: string;
  slug: string;
  judul: string;
  excerpt: string;
  gambar: string;
  kategori: string;
  penulis: string;
  viewCount: number;
  createdAt: string;
}

const kategoriList = [
  "Semua",
  "Tips Wisata",
  "Destinasi",
  "Kuliner",
  "Budaya",
  "Event",
];

function ArtikelContent() {
  const searchParams = useSearchParams();
  const [artikels, setArtikels] = useState<Artikel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedKategori, setSelectedKategori] = useState(searchParams.get("kategori") || "Semua");

  useEffect(() => {
    fetchArtikels();
  }, []);

  const fetchArtikels = async () => {
    try {
      const res = await fetch("/api/artikel?isPublished=true");
      const data = await res.json();
      if (data.success) {
        setArtikels(data.data);
      }
    } catch (error) {
      console.error("Error fetching artikels:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArtikels = artikels.filter((artikel) => {
    const matchSearch = artikel.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artikel.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchKategori = selectedKategori === "Semua" || artikel.kategori === selectedKategori;
    return matchSearch && matchKategori;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Filter & Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Kategori Filter */}
          <div className="flex flex-wrap gap-2">
            {kategoriList.map((kategori) => (
              <button
                key={kategori}
                onClick={() => setSelectedKategori(kategori)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedKategori === kategori
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {kategori}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-gray-600 mb-6">
        Menampilkan {filteredArtikels.length} artikel
        {selectedKategori !== "Semua" && ` dalam kategori "${selectedKategori}"`}
        {searchQuery && ` untuk pencarian "${searchQuery}"`}
      </p>

      {/* Artikel Grid */}
      {filteredArtikels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtikels.map((artikel) => (
            <Link
              key={artikel._id}
              href={`/artikel/${artikel.slug}`}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={artikel.gambar || "/images/placeholder-blog.jpg"}
                  alt={artikel.judul}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                    {artikel.kategori}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{formatDate(artikel.createdAt)}</span>
                  <span className="mx-2">•</span>
                  <span>{artikel.viewCount} views</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {artikel.judul}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {artikel.excerpt}
                </p>
                <div className="mt-4 flex items-center text-primary font-medium text-sm">
                  Baca Selengkapnya
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak ada artikel ditemukan</h3>
          <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian Anda</p>
        </div>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    </div>
  );
}

export default function ArtikelPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Artikel</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Tips perjalanan, informasi destinasi, dan cerita menarik seputar wisata Indonesia
          </p>
        </div>
      </div>

      {/* Content */}
      <Suspense fallback={<LoadingFallback />}>
        <ArtikelContent />
      </Suspense>
    </div>
  );
}
