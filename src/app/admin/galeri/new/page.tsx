"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUpload from "@/components/admin/ImageUpload";
import Link from "next/link";

export default function NewGaleriPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    gambar: "",
    kategori: "Wisata",
    tags: "",
    isActive: true,
    urutan: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      };

      const res = await fetch("/api/galeri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/galeri");
        router.refresh();
      } else {
        setError(data.message || "Gagal menambahkan foto");
      }
    } catch {
      setError("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminHeader title="Tambah Foto Galeri" subtitle="Upload foto baru ke galeri" />

      <div className="p-4 md:p-8">
        <div className="max-w-3xl">
          {/* Back Button */}
          <Link
            href="/admin/galeri"
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
            {/* Judul */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Foto <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="judul"
                value={formData.judul}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Contoh: Sunset di Pantai Kuta"
                required
              />
            </div>

            {/* Upload Gambar */}
            <ImageUpload
              currentUrl={formData.gambar}
              onUploadComplete={(url) => setFormData({ ...formData, gambar: url })}
              label="Gambar Galeri"
              required
            />

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Deskripsi singkat tentang foto ini..."
              />
            </div>

            {/* Kategori dan Urutan */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="Wisata">Wisata</option>
                  <option value="Kuliner">Kuliner</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Aktivitas">Aktivitas</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

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
                <p className="text-xs text-gray-500 mt-1">0 = default</p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="bali, pantai, sunset (pisahkan dengan koma)"
              />
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
                <span className="text-sm font-medium text-gray-700">Aktifkan foto ini</span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Menyimpan..." : "Simpan Foto"}
              </button>
              <Link
                href="/admin/galeri"
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
