"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface KotaHarga {
  kota: string;
  harga: number;
}

interface Itinerary {
  hari: number;
  judul: string;
  aktivitas: string[];
}

interface Review {
  _id: string;
  nama: string;
  rating: number;
  komentar: string;
  createdAt: string;
}

interface Paket {
  _id: string;
  slug: string;
  nama: string;
  destinasi: string;
  kategori: "domestik" | "internasional" | "umroh";
  tipe: "open-trip" | "private-trip";
  harga: number;
  hargaCoret?: number;
  durasi: string;
  tanggalKeberangkatan: string[];
  kuota: number;
  sisaKuota: number;
  gambar: string;
  gambarGaleri: string[];
  deskripsi: string;
  itinerary: Itinerary[];
  fasilitas: string[];
  tidakTermasuk: string[];
  kotaKeberangkatan: KotaHarga[];
  rating: number;
  jumlahReview: number;
  isPromo: boolean;
  season: "normal" | "high";
}

interface Settings {
  whatsapp: string;
}

export default function PaketDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [paket, setPaket] = useState<Paket | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI States
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCity, setSelectedCity] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [jumlahPeserta, setJumlahPeserta] = useState(1);

  // Review States
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewNama, setReviewNama] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewKomentar, setReviewKomentar] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    if (!slug) return;

    // Reset states saat slug berubah - ini penting!
    setLoading(true);
    setPaket(null);
    setError("");
    setSelectedImage(0);
    setActiveTab(0);
    setJumlahPeserta(1);

    const fetchData = async () => {
      try {
        // Fetch paket with cache busting
        const resPaket = await fetch(`/api/paket?slug=${slug}&t=${Date.now()}`, {
          cache: 'no-store'
        });
        const dataPaket = await resPaket.json();

        if (!dataPaket.success || dataPaket.data.length === 0) {
          setError("Paket tidak ditemukan");
          setLoading(false);
          return;
        }

        const paketData = dataPaket.data[0];
        setPaket(paketData);

        // Set default selections
        if (paketData.tanggalKeberangkatan?.length > 0) {
          setSelectedDate(paketData.tanggalKeberangkatan[0]);
        }

        // Fetch settings for WhatsApp
        const resSettings = await fetch("/api/settings");
        const dataSettings = await resSettings.json();
        if (dataSettings.success) {
          setSettings(dataSettings.data);
        }

        // Fetch reviews
        const resReviews = await fetch(`/api/reviews?paketId=${paketData._id}`);
        const dataReviews = await resReviews.json();
        if (dataReviews.success) {
          setReviews(dataReviews.data);
        }
      } catch (err) {
        console.error("Error fetching paket:", err);
        setError("Gagal memuat data paket");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const formatTanggal = (tanggal: string) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCurrentPrice = () => {
    if (!paket) return 0;
    if (paket.kotaKeberangkatan && paket.kotaKeberangkatan.length > 0) {
      return paket.kotaKeberangkatan[selectedCity]?.harga || paket.harga;
    }
    return paket.harga;
  };

  const handleBooking = () => {
    if (!paket || !settings) return;

    const currentPrice = getCurrentPrice();
    const totalPrice = currentPrice * jumlahPeserta;
    const selectedKota = paket.kotaKeberangkatan?.[selectedCity]?.kota || "";

    const message = `Halo, saya tertarik dengan paket *${paket.nama}*\n\n` +
      `📍 Destinasi: ${paket.destinasi}\n` +
      `📅 Tanggal: ${selectedDate ? formatTanggal(selectedDate) : "-"}\n` +
      `🏙️ Kota Keberangkatan: ${selectedKota || "-"}\n` +
      `👥 Jumlah Peserta: ${jumlahPeserta} orang\n` +
      `💰 Harga per orang: ${formatRupiah(currentPrice)}\n` +
      `💵 Total: ${formatRupiah(totalPrice)}\n\n` +
      `Mohon informasi lebih lanjut. Terima kasih!`;

    const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError("");

    if (!reviewNama.trim()) {
      setReviewError("Nama harus diisi");
      return;
    }
    if (reviewRating === 0) {
      setReviewError("Pilih rating terlebih dahulu");
      return;
    }
    if (reviewKomentar.trim().length < 10) {
      setReviewError("Komentar minimal 10 karakter");
      return;
    }

    setReviewSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paketId: paket?._id,
          nama: reviewNama.trim(),
          rating: reviewRating,
          komentar: reviewKomentar.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setReviewSuccess(true);
        setReviewNama("");
        setReviewRating(0);
        setReviewKomentar("");
      } else {
        setReviewError(data.message || "Gagal mengirim review");
      }
    } catch {
      setReviewError("Terjadi kesalahan, coba lagi nanti");
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Skeleton Loading */}
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-gray-300 rounded-2xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-10 bg-gray-300 rounded w-3/4"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
              <div className="h-96 bg-gray-300 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !paket) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {error || "Paket tidak ditemukan"}
          </h1>
          <Link
            href="/paket"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Kembali ke Daftar Paket
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [paket.gambar, ...(paket.gambarGaleri || [])];
  const quotaPercentage = paket.kuota > 0 ? (paket.sisaKuota / paket.kuota) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6 overflow-hidden">
          <Link href="/" className="hover:text-primary flex-shrink-0">Home</Link>
          <span className="flex-shrink-0">/</span>
          <Link href="/paket" className="hover:text-primary flex-shrink-0">Paket Wisata</Link>
          <span className="flex-shrink-0">/</span>
          <span className="text-gray-800 font-medium truncate">{paket.nama}</span>
        </nav>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1] rounded-2xl overflow-hidden mb-4">
            <img
              src={allImages[selectedImage] || paket.gambar}
              alt={paket.nama}
              className="w-full h-full object-cover"
            />
            {/* Image Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-primary ring-2 ring-primary/30" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${paket.nama} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header & Badges */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {paket.isPromo && (
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                    🔥 Promo
                  </span>
                )}
                {paket.season === "high" && (
                  <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                    ⭐ High Season
                  </span>
                )}
                <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full capitalize">
                  {paket.kategori}
                </span>
                <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full capitalize">
                  {paket.tipe.replace("-", " ")}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {paket.nama}
              </h1>

              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-600 text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="font-medium">
                    {paket.rating > 0 ? paket.rating.toFixed(1) : "Belum ada rating"}
                  </span>
                  {paket.jumlahReview > 0 && (
                    <span className="text-sm">({paket.jumlahReview} review)</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{paket.destinasi}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{paket.durasi}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Deskripsi</h2>
              <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                {paket.deskripsi}
              </div>
            </div>

            {/* Itinerary */}
            {paket.itinerary && paket.itinerary.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Itinerary</h2>
                <div className="space-y-4">
                  {/* Tabs */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {paket.itinerary.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                          activeTab === idx
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Hari {item.hari}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">
                      {paket.itinerary[activeTab]?.judul}
                    </h3>
                    <ul className="space-y-2">
                      {paket.itinerary[activeTab]?.aktivitas.map((aktivitas, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{aktivitas}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Fasilitas & Tidak Termasuk */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fasilitas */}
              {paket.fasilitas && paket.fasilitas.length > 0 && paket.fasilitas[0] !== "" && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Fasilitas</h2>
                  <ul className="space-y-2">
                    {paket.fasilitas.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tidak Termasuk */}
              {paket.tidakTermasuk && paket.tidakTermasuk.length > 0 && paket.tidakTermasuk[0] !== "" && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Tidak Termasuk</h2>
                  <ul className="space-y-2">
                    {paket.tidakTermasuk.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Review Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Ulasan Pengunjung</h2>

              {/* Daftar Reviews */}
              {reviews.length > 0 ? (
                <div className="space-y-4 mb-8">
                  {reviews.map((review) => (
                    <div key={review._id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {review.nama.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{review.nama}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString("id-ID", {
                                day: "numeric", month: "long", year: "numeric"
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm ml-13 pl-0.5">{review.komentar}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm mb-8">Belum ada ulasan untuk paket ini.</p>
              )}

              {/* Form Submit Review */}
              {reviewSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-green-800 font-medium">Terima kasih atas ulasan Anda!</p>
                  <p className="text-green-600 text-sm mt-1">Ulasan akan ditampilkan setelah disetujui admin.</p>
                  <button
                    onClick={() => setReviewSuccess(false)}
                    className="mt-3 text-sm text-primary hover:underline"
                  >
                    Tulis ulasan lagi
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4 border-t border-gray-100 pt-6">
                  <h3 className="font-medium text-gray-800">Tulis Ulasan</h3>

                  {/* Rating Stars */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          onMouseEnter={() => setReviewHover(star)}
                          onMouseLeave={() => setReviewHover(0)}
                          className="focus:outline-none"
                        >
                          <svg
                            className={`w-8 h-8 transition-colors ${
                              star <= (reviewHover || reviewRating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                      {reviewRating > 0 && (
                        <span className="text-sm text-gray-500 ml-2">
                          {reviewRating === 1 && "Kurang"}
                          {reviewRating === 2 && "Cukup"}
                          {reviewRating === 3 && "Baik"}
                          {reviewRating === 4 && "Sangat Baik"}
                          {reviewRating === 5 && "Luar Biasa"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Nama */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Nama</label>
                    <input
                      type="text"
                      value={reviewNama}
                      onChange={(e) => setReviewNama(e.target.value)}
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>

                  {/* Komentar */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Komentar</label>
                    <textarea
                      value={reviewKomentar}
                      onChange={(e) => setReviewKomentar(e.target.value)}
                      placeholder="Ceritakan pengalaman Anda..."
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">{reviewKomentar.length}/10 karakter minimum</p>
                  </div>

                  {/* Error */}
                  {reviewError && (
                    <p className="text-sm text-red-600">{reviewError}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="w-full py-2.5 bg-primary hover:bg-primary/90 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                  >
                    {reviewSubmitting ? "Mengirim..." : "Kirim Ulasan"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Sidebar - Booking Card */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                {paket.hargaCoret !== undefined && paket.hargaCoret > 0 && (
                  <div className="text-gray-500 line-through text-sm mb-1">
                    {formatRupiah(paket.hargaCoret)}
                  </div>
                )}
                <div className="text-3xl font-bold text-primary">
                  {formatRupiah(getCurrentPrice())}
                  <span className="text-base text-gray-600 font-normal">/orang</span>
                </div>
              </div>

              {/* Kuota Indicator */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Sisa Kuota</span>
                  <span className="font-semibold">
                    {paket.sisaKuota}/{paket.kuota} peserta
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      quotaPercentage > 50
                        ? "bg-green-500"
                        : quotaPercentage > 20
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${quotaPercentage}%` }}
                  ></div>
                </div>
                {paket.sisaKuota < 5 && paket.sisaKuota > 0 && (
                  <p className="text-xs text-red-600 mt-1 font-medium">
                    ⚠️ Hanya tersisa {paket.sisaKuota} tempat!
                  </p>
                )}
                {paket.sisaKuota === 0 && (
                  <p className="text-xs text-red-600 mt-1 font-medium">
                    ❌ Kuota sudah penuh
                  </p>
                )}
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                {/* Tanggal Keberangkatan */}
                {paket.tanggalKeberangkatan && paket.tanggalKeberangkatan.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Keberangkatan
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      {paket.tanggalKeberangkatan.map((tanggal, idx) => (
                        <option key={idx} value={tanggal}>
                          {formatTanggal(tanggal)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Kota Keberangkatan */}
                {paket.kotaKeberangkatan && paket.kotaKeberangkatan.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kota Keberangkatan
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      {paket.kotaKeberangkatan.map((kota, idx) => (
                        <option key={idx} value={idx}>
                          {kota.kota} - {formatRupiah(kota.harga)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Jumlah Peserta */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah Peserta
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setJumlahPeserta(Math.max(1, jumlahPeserta - 1))}
                      className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      value={jumlahPeserta}
                      onChange={(e) => setJumlahPeserta(Math.max(1, Math.min(paket.sisaKuota, Number(e.target.value))))}
                      min="1"
                      max={paket.sisaKuota}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setJumlahPeserta(Math.min(paket.sisaKuota, jumlahPeserta + 1))}
                      className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Total Harga</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatRupiah(getCurrentPrice() * jumlahPeserta)}
                    </span>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={paket.sisaKuota === 0}
                    className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {paket.sisaKuota === 0 ? "Kuota Penuh" : "Pesan via WhatsApp"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
