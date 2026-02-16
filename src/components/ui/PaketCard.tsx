import Image from "next/image";
import Link from "next/link";

// Flexible interface untuk support both database dan hardcoded data
interface PaketCardData {
  slug: string;
  nama: string;
  destinasi: string;
  kategori: string;
  harga: number;
  hargaCoret?: number;
  durasi: string;
  gambar: string;
  isPromo?: boolean;
  season?: string;
  rating?: number;
  jumlahReview?: number;
  tipe?: string;
  sisaKuota?: number;
}

interface PaketCardProps {
  paket: PaketCardData;
}

function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

export default function PaketCard({ paket }: PaketCardProps) {
  return (
    <Link href={`/paket/${paket.slug}`} className="group">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
          <Image
            src={paket.gambar}
            alt={paket.nama}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {paket.isPromo && (
              <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                PROMO
              </span>
            )}
            <span
              className={`text-white text-xs font-bold px-3 py-1 rounded-full ${
                paket.season === "high" ? "bg-pink-500" : "bg-primary"
              }`}
            >
              {paket.season === "high" ? "High Season" : "Normal Season"}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1 rounded-full capitalize">
              {paket.kategori}
            </span>
          </div>

          {/* Kuota Badge */}
          {paket.sisaKuota && paket.sisaKuota <= 5 && (
            <div className="absolute bottom-3 right-3">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Sisa {paket.sisaKuota} seat!
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Rating */}
          {paket.rating !== undefined && paket.rating > 0 && paket.jumlahReview !== undefined && paket.jumlahReview > 0 && (
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(paket.rating || 0) ? "text-accent" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500 ml-1">
                ({paket.jumlahReview} review)
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {paket.nama}
          </h3>

          {/* Destination & Duration */}
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {paket.destinasi}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {paket.durasi}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between">
            <div>
              {paket.hargaCoret !== undefined && paket.hargaCoret > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  {formatRupiah(paket.hargaCoret)}
                </span>
              )}
              <p className="text-xl font-bold text-primary">
                {formatRupiah(paket.harga)}
              </p>
              <span className="text-xs text-gray-500">/orang</span>
            </div>
            {paket.tipe && (
              <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full capitalize">
                {paket.tipe.replace("-", " ")}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
