"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";

const availableIcons = [
  { value: "shield", label: "Shield (Keamanan)", preview: "🛡️" },
  { value: "heart", label: "Heart (Harga/Cinta)", preview: "❤️" },
  { value: "star", label: "Star (Rating/Kualitas)", preview: "⭐" },
  { value: "users", label: "Users (Tim/Guide)", preview: "👥" },
  { value: "chat", label: "Chat (Support)", preview: "💬" },
  { value: "map", label: "Map (Itinerary)", preview: "🗺️" },
  { value: "creditCard", label: "Credit Card (Payment)", preview: "💳" },
  { value: "checkCircle", label: "Check Circle (Verified)", preview: "✅" },
];

interface FeatureFormData {
  title: string;
  description: string;
  icon: string;
  urutan: number;
  isActive: boolean;
}

export default function EditFeaturePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FeatureFormData>({
    title: "",
    description: "",
    icon: "star",
    urutan: 0,
    isActive: true,
  });

  useEffect(() => {
    if (id) {
      fetchFeature();
    }
  }, [id]);

  const fetchFeature = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/features/${id}`);
      if (!res.ok) throw new Error("Gagal memuat data feature");

      const data = await res.json();
      setFormData({
        title: data.data.title || "",
        description: data.data.description || "",
        icon: data.data.icon || "star",
        urutan: data.data.urutan || 0,
        isActive: data.data.isActive ?? true,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/features/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal mengupdate feature");
      }

      router.push("/admin/features");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <AdminHeader
          title="Edit Feature"
          subtitle="Update informasi feature unggulan"
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <AdminHeader
        title="Edit Feature"
        subtitle="Update informasi feature unggulan"
      />

      <div className="mt-6 max-w-3xl">
        <button
          onClick={() => router.back()}
          className="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: Terpercaya & Berpengalaman"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Jelaskan keunggulan ini secara detail..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon <span className="text-red-500">*</span>
            </label>
            <select
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {availableIcons.map((icon) => (
                <option key={icon.value} value={icon.value}>
                  {icon.preview} {icon.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Pilih icon yang sesuai dengan keunggulan ini
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Semakin kecil angka, semakin atas urutannya
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex items-center h-10">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Aktifkan feature ini
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
