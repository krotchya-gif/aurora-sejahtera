"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface GaleriItem {
  _id: string;
  judul: string;
  gambar: string;
  kategori: string;
  deskripsi?: string;
  isActive: boolean;
}

export default function GaleriPage() {
  const [galeriData, setGaleriData] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeKategori, setActiveKategori] = useState("Semua");
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  // Fetch galeri dari database
  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const res = await fetch("/api/galeri?isActive=true");
        const data = await res.json();
        if (data.success) {
          setGaleriData(data.data);
        }
      } catch (error) {
        console.error("Error fetching galeri:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGaleri();
  }, []);

  // Generate dynamic category list from data
  const kategoriList = ["Semua", ...Array.from(new Set(galeriData.map((item) => item.kategori)))];

  const filteredGaleri =
    activeKategori === "Semua"
      ? galeriData
      : galeriData.filter((item) => item.kategori === activeKategori);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Galeri</h1>
            <p className="text-white/90 text-lg max-w-2xl">
              Jelajahi keindahan destinasi wisata melalui koleksi foto dari perjalanan kami bersama para traveler.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Galeri</h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Jelajahi keindahan destinasi wisata melalui koleksi foto dari perjalanan kami bersama para traveler.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Kategori */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {kategoriList.map((kat) => (
            <button
              key={kat}
              onClick={() => setActiveKategori(kat)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                activeKategori === kat
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
              }`}
            >
              {kat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGaleri.map((item, index) => (
            <div
              key={item._id}
              onClick={() => setLightboxImage(index)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30" />
              <Image
                src={item.gambar}
                alt={item.judul}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="font-semibold">{item.judul}</h3>
                <p className="text-sm text-white/80">{item.kategori}</p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGaleri.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">Belum ada foto untuk kategori ini</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImage(Math.max(0, lightboxImage - 1));
            }}
            className="absolute left-4 text-white hover:text-gray-300"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filteredGaleri[lightboxImage]?.gambar || ""}
              alt={filteredGaleri[lightboxImage]?.judul || ""}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImage(Math.min(filteredGaleri.length - 1, lightboxImage + 1));
            }}
            className="absolute right-4 text-white hover:text-gray-300"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
            <h3 className="font-semibold text-lg">{filteredGaleri[lightboxImage]?.judul}</h3>
            <p className="text-white/70">{filteredGaleri[lightboxImage]?.kategori}</p>
            {filteredGaleri[lightboxImage]?.deskripsi && (
              <p className="text-sm text-white/60 mt-1">{filteredGaleri[lightboxImage]?.deskripsi}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
