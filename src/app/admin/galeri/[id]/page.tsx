"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUpload from "@/components/admin/ImageUpload";
import Link from "next/link";

interface Galeri {
  _id: string;
  judul: string;
  deskripsi?: string;
  gambar: string;
  kategori: string;
  tags: string[];
  isActive: boolean;
  urutan: number;
}

export default function EditGaleriPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    try {
      const res = await fetch(`/api/galeri/${resolvedParams.id}`);
      const data = await res.json();

      if (data.success) {
        const galeri: Galeri = data.data;
        setFormData({
          judul: galeri.judul,
          deskripsi: galeri.deskripsi || "",
          gambar: galeri.gambar,
          kategori: galeri.kategori,
          tags: galeri.tags.join(", "),
          isActive: galeri.isActive,
          urutan: galeri.urutan,
        });
      } else {
        setError("Galeri tidak ditemukan");
      }
    } catch {
      setError("Terjadi kesalahan saat memuat data");
    } finally {
      setLoading(false);
    }
  };

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
    setSaving(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      };

      const res = await fetch(`/api/galeri/${resolvedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/galeri");
        router.refresh();
      } else {
        setError(data.message || "Gagal mengupdate foto");
      }
    } catch {
      setError("Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <AdminHeader title="Edit Foto Galeri" subtitle="Memuat data..." />
        <div className="p-4 md:p-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title="Edit Foto Galeri" subtitle="Update informasi foto" />

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

          {/* Form - Same as new page */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
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
                required
              />
            </div>

            <ImageUpload
              currentUrl={formData.gambar}
              onUploadComplete={(url) => setFormData({ ...formData, gambar: url })}
              label="Gambar Galeri"
              required
            />

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
              />
            </div>

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
              </div>
            </div>

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

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Menyimpan..." : "Update Foto"}
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
