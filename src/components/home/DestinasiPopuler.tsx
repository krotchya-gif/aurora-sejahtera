"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Paket {
  _id: string;
  nama: string;
  destinasi: string;
  gambar: string;
  harga: number;
  durasi: string;
  slug: string;
}

interface DestinasiData {
  nama: string;
  jumlahPaket: number;
  gambar: string;
}

export default function DestinasiPopuler() {
  const [destinasiList, setDestinasiList] = useState<DestinasiData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinasi = async () => {
      try {
        const res = await fetch("/api/paket");
        const data = await res.json();

        if (data.success) {
          // Group paket by destinasi
          const destinasiMap: { [key: string]: { count: number; gambar: string } } = {};

          data.data.forEach((paket: Paket) => {
            if (paket.destinasi) {
              if (!destinasiMap[paket.destinasi]) {
                destinasiMap[paket.destinasi] = {
                  count: 0,
                  gambar: paket.gambar || "/images/placeholder.jpg"
                };
              }
              destinasiMap[paket.destinasi].count++;

              // Keep first image as thumbnail
              if (!destinasiMap[paket.destinasi].gambar || destinasiMap[paket.destinasi].gambar === "/images/placeholder.jpg") {
                destinasiMap[paket.destinasi].gambar = paket.gambar || "/images/placeholder.jpg";
              }
            }
          });

          // Convert to array and sort by count
          const destinasiArray: DestinasiData[] = Object.entries(destinasiMap).map(
            ([nama, info]) => ({
              nama,
              jumlahPaket: info.count,
              gambar: info.gambar
            })
          );

          // Sort by jumlahPaket descending
          destinasiArray.sort((a, b) => b.jumlahPaket - a.jumlahPaket);

          setDestinasiList(destinasiArray);
        }
      } catch (error) {
        console.error("Error fetching destinasi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinasi();
  }, []);

  // Don't show section if no destinasi
  if (!loading && destinasiList.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            DESTINASI
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Destinasi Favorit
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore destinasi wisata terpopuler yang bisa Anda kunjungi bersama kami
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : (
          /* Destinasi Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {destinasiList.map((destinasi) => (
              <Link
                key={destinasi.nama}
                href={`/paket?destinasi=${encodeURIComponent(destinasi.nama.toLowerCase())}`}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
                <Image
                  src={destinasi.gambar}
                  alt={destinasi.nama}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg">{destinasi.nama}</h3>
                  <p className="text-sm text-gray-300">{destinasi.jumlahPaket} Paket</p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
