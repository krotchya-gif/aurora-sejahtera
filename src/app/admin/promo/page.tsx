"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import Image from "next/image";

interface Promo {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  buttonText: string;
  buttonLink: string;
  urutan: number;
  isActive: boolean;
}

export default function PromoAdminPage() {
  const router = useRouter();
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/promo?all=true");
      if (!res.ok) throw new Error("Gagal memuat data promo");
      const data = await res.json();
      setPromos(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/promo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!res.ok) throw new Error("Gagal mengubah status");

      fetchPromos();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Terjadi kesalahan");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus promo "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/promo/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus promo");

      fetchPromos();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Terjadi kesalahan");
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <AdminHeader
          title="Promo Banner"
          subtitle="Kelola banner promosi di homepage"
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-start mb-6">
        <AdminHeader
          title="Promo Banner"
          subtitle="Kelola banner promosi di homepage"
        />
        <button
          onClick={() => router.push("/admin/promo/new")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Tambah Promo
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {promos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada promo</h3>
          <p className="mt-1 text-sm text-gray-500">
            Mulai dengan membuat promo banner pertama Anda.
          </p>
          <div className="mt-6">
            <button
              onClick={() => router.push("/admin/promo/new")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Tambah Promo
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <div
              key={promo._id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gray-100">
                {promo.backgroundImage ? (
                  <Image
                    src={promo.backgroundImage}
                    alt={promo.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    promo.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {promo.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    Urutan: {promo.urutan}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {promo.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {promo.subtitle}
                </p>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {promo.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {promo.buttonText}
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="truncate">{promo.buttonLink}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleActive(promo._id, promo.isActive)}
                    className={`flex-1 px-3 py-2 text-sm rounded transition-colors ${
                      promo.isActive
                        ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                        : "bg-green-50 text-green-700 hover:bg-green-100"
                    }`}
                  >
                    {promo.isActive ? "Nonaktifkan" : "Aktifkan"}
                  </button>
                  <button
                    onClick={() => router.push(`/admin/promo/${promo._id}`)}
                    className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(promo._id, promo.title)}
                    className="px-3 py-2 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
