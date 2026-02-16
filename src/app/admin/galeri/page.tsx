"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminHeader from "@/components/admin/AdminHeader";

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

export default function AdminGaleriPage() {
  const [galeris, setGaleris] = useState<Galeri[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchGaleris();
  }, []);

  const fetchGaleris = async () => {
    try {
      const res = await fetch("/api/galeri?all=true");
      const data = await res.json();

      if (data.success) {
        setGaleris(data.data);
      } else {
        setError("Gagal memuat galeri");
      }
    } catch {
      setError("Terjadi kesalahan saat memuat galeri");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus foto ini?")) return;

    setDeleteId(id);
    try {
      const res = await fetch(`/api/galeri/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setGaleris(galeris.filter((g) => g._id !== id));
      } else {
        alert("Gagal menghapus foto");
      }
    } catch {
      alert("Terjadi kesalahan");
    } finally {
      setDeleteId(null);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/galeri/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      const data = await res.json();

      if (data.success) {
        setGaleris(galeris.map((g) => (g._id === id ? { ...g, isActive: !currentStatus } : g)));
      }
    } catch {
      alert("Gagal mengubah status");
    }
  };

  return (
    <div>
      <AdminHeader title="Galeri Foto" subtitle="Kelola foto-foto galeri website" />

      <div className="p-4 md:p-8">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600">Total: {galeris.length} foto</p>
          </div>
          <Link
            href="/admin/galeri/new"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-all inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Foto
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-gray-500 mt-4">Memuat galeri...</p>
          </div>
        ) : galeris.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 bg-white rounded-xl">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 mb-4">Belum ada foto di galeri</p>
            <Link
              href="/admin/galeri/new"
              className="text-primary hover:text-primary-dark font-medium"
            >
              Tambah Foto Pertama
            </Link>
          </div>
        ) : (
          /* Galeri Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galeris.map((galeri) => (
              <div key={galeri._id} className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                {/* Image */}
                <div className="relative aspect-video bg-gray-100">
                  <Image
                    src={galeri.gambar}
                    alt={galeri.judul}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => toggleStatus(galeri._id, galeri.isActive)}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        galeri.isActive
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {galeri.isActive ? "Aktif" : "Nonaktif"}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">{galeri.judul}</h3>
                  {galeri.deskripsi && (
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">{galeri.deskripsi}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">{galeri.kategori}</span>
                    {galeri.urutan > 0 && (
                      <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded">#{galeri.urutan}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/galeri/${galeri._id}`}
                      className="flex-1 text-center bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(galeri._id)}
                      disabled={deleteId === galeri._id}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      {deleteId === galeri._id ? "..." : "Hapus"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
