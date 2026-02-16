"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUpload from "@/components/admin/ImageUpload";
import Link from "next/link";

export default function NewHeroSlidePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: "",
    urutan: 0,
    isActive: true,
    buttonText: "",
    buttonLink: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else if (type === "number") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/hero-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/hero-slides");
        router.refresh();
      } else {
        setError(data.message || "Gagal menambahkan slide");
      }
    } catch {
      setError("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminHeader title="Tambah Hero Slide" subtitle="Buat slide baru untuk homepage" />

      <div className="p-4 md:p-8">
        <div className="max-w-3xl">
          {/* Back Button */}
          <Link
            href="/admin/hero-slides"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali
          </Link>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Jelajahi Keindahan Bali"
                required
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle <span className="text-red-500">*</span>
              </label>
              <textarea
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Pulau Dewata dengan pesona yang tak terlupakan"
                required
              />
            </div>

            {/* Image Upload */}
            <ImageUpload
              currentUrl={formData.image}
              onUploadComplete={(url) => setFormData({ ...formData, image: url })}
              label="Gambar Hero"
              required
            />

            {/* Urutan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urutan
              </label>
              <input
                type="number"
                name="urutan"
                value={formData.urutan}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <p className="text-xs text-gray-500 mt-1">
                Slide dengan urutan lebih kecil akan ditampilkan lebih dulu
              </p>
            </div>

            {/* Button Text & Link (Optional) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teks Button (Opsional)
                </label>
                <input
                  type="text"
                  name="buttonText"
                  value={formData.buttonText}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Lihat Paket"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Button (Opsional)
                </label>
                <input
                  type="text"
                  name="buttonLink"
                  value={formData.buttonLink}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="/paket"
                />
              </div>
            </div>

            {/* Status Aktif */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary rounded focus:ring-primary"
                />
                <span className="text-sm font-medium text-gray-700">Aktifkan slide ini</span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Menyimpan..." : "Simpan Slide"}
              </button>
              <Link
                href="/admin/hero-slides"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
