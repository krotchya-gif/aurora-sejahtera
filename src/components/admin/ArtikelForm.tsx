"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

interface ArtikelFormData {
  judul: string;
  excerpt: string;
  konten: string;
  gambar: string;
  kategori: string;
  tags: string[];
  isPublished: boolean;
}

interface ArtikelFormProps {
  initialData?: ArtikelFormData & { _id?: string };
  isEdit?: boolean;
}

const defaultData: ArtikelFormData = {
  judul: "",
  excerpt: "",
  konten: "",
  gambar: "",
  kategori: "Tips Wisata",
  tags: [],
  isPublished: false,
};

const kategoriOptions = [
  "Tips Wisata",
  "Destinasi",
  "Kuliner",
  "Budaya",
  "Event",
  "Promo",
];

export default function ArtikelForm({ initialData, isEdit = false }: ArtikelFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<ArtikelFormData>(initialData || defaultData);
  const [tagInput, setTagInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isEdit ? `/api/artikel/${initialData?._id}` : "/api/artikel";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/artikel");
        router.refresh();
      } else {
        setError(data.message || "Gagal menyimpan artikel");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul Artikel *</label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-lg"
              placeholder="Masukkan judul artikel..."
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt / Ringkasan *</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              required
              maxLength={300}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Ringkasan singkat artikel (maks 300 karakter)..."
            />
            <p className="text-sm text-gray-500 mt-1">{formData.excerpt.length}/300 karakter</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Konten Artikel *</label>
            <textarea
              name="konten"
              value={formData.konten}
              onChange={handleChange}
              rows={15}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-mono text-sm"
              placeholder="Tulis konten artikel di sini... (Mendukung HTML)"
            />
            <p className="text-sm text-gray-500 mt-2">Tip: Anda bisa menggunakan HTML untuk formatting.</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Publish</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="w-5 h-5 text-primary rounded focus:ring-primary"
              />
              <div>
                <span className="font-medium">Publish Artikel</span>
                <p className="text-sm text-gray-500">Artikel akan tampil di website</p>
              </div>
            </label>
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Kategori</h3>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {kategoriOptions.map((kat) => (
                <option key={kat} value={kat}>{kat}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Tags</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Tambah tag..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <ImageUpload
              currentUrl={formData.gambar}
              onUploadComplete={(url) => {
                setFormData({ ...formData, gambar: url });
              }}
              label="Gambar Utama"
              required={true}
            />
            <p className="text-sm text-gray-500 mt-2">
              Upload gambar atau masukkan URL gambar artikel
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : isEdit ? "Update" : "Simpan"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
