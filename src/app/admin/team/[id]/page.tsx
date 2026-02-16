"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUpload from "@/components/admin/ImageUpload";
import Link from "next/link";

interface TeamMember {
  _id: string;
  nama: string;
  posisi: string;
  foto: string;
  bio?: string;
  email?: string;
  telepon?: string;
  urutan: number;
  isActive: boolean;
}

export default function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    posisi: "",
    foto: "",
    bio: "",
    email: "",
    telepon: "",
    urutan: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchMember();
  }, []);

  const fetchMember = async () => {
    try {
      const res = await fetch(`/api/team/${resolvedParams.id}`);
      const data = await res.json();

      if (data.success) {
        const member: TeamMember = data.data;
        setFormData({
          nama: member.nama,
          posisi: member.posisi,
          foto: member.foto,
          bio: member.bio || "",
          email: member.email || "",
          telepon: member.telepon || "",
          urutan: member.urutan,
          isActive: member.isActive,
        });
      } else {
        setError("Member tidak ditemukan");
      }
    } catch {
      setError("Terjadi kesalahan saat memuat data");
    } finally {
      setLoading(false);
    }
  };

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
    setSaving(true);

    try {
      const res = await fetch(`/api/team/${resolvedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/team");
        router.refresh();
      } else {
        setError(data.message || "Gagal mengupdate member");
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
        <AdminHeader title="Edit Team Member" subtitle="Memuat data..." />
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
      <AdminHeader title="Edit Team Member" subtitle="Update informasi anggota tim" />

      <div className="p-4 md:p-8">
        <div className="max-w-3xl">
          {/* Back Button */}
          <Link
            href="/admin/team"
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
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            {/* Posisi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Posisi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="posisi"
                value={formData.posisi}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            {/* Image Upload */}
            <ImageUpload
              currentUrl={formData.foto}
              onUploadComplete={(url) => setFormData({ ...formData, foto: url })}
              label="Foto"
              required
            />

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio (Opsional)
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Deskripsi singkat tentang anggota tim..."
              />
            </div>

            {/* Email & Telepon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (Opsional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telepon (Opsional)
                </label>
                <input
                  type="tel"
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

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
                Member dengan urutan lebih kecil akan ditampilkan lebih dulu
              </p>
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
                <span className="text-sm font-medium text-gray-700">Aktifkan member ini</span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Menyimpan..." : "Update Member"}
              </button>
              <Link
                href="/admin/team"
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
