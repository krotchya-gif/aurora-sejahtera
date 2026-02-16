"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";

interface Artikel {
  _id: string;
  judul: string;
  kategori: string;
  penulis: string;
  isPublished: boolean;
  viewCount: number;
  createdAt: string;
}

export default function ArtikelListPage() {
  const [artikels, setArtikels] = useState<Artikel[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchArtikels = async () => {
    try {
      const res = await fetch("/api/artikel?all=true");
      const data = await res.json();
      if (data.success) {
        setArtikels(data.data);
      }
    } catch (error) {
      console.error("Error fetching artikels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtikels();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/artikel/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setArtikels(artikels.filter((a) => a._id !== id));
      } else {
        alert(data.message || "Gagal menghapus artikel");
      }
    } catch (error) {
      console.error("Error deleting artikel:", error);
      alert("Gagal menghapus artikel");
    } finally {
      setDeleting(null);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/artikel/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !currentStatus }),
      });
      const data = await res.json();

      if (data.success) {
        setArtikels(artikels.map((a) =>
          a._id === id ? { ...a, isPublished: !currentStatus } : a
        ));
      }
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <AdminHeader
        title="Artikel / Blog"
        subtitle="Kelola artikel dan blog"
      />

      <div className="p-4 md:p-8">
        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Total: {artikels.length} artikel</p>
          <Link
            href="/admin/artikel/new"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Artikel
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : artikels.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-4">Belum ada artikel</p>
              <Link
                href="/admin/artikel/new"
                className="text-primary hover:text-primary-dark font-medium"
              >
                Tulis artikel pertama
              </Link>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 font-medium text-gray-700">Judul</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-700">Kategori</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-700">Penulis</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-700">Views</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-700">Status</th>
                  <th className="text-right px-6 py-4 font-medium text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {artikels.map((artikel) => (
                  <tr key={artikel._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-1">{artikel.judul}</p>
                        <p className="text-sm text-gray-500">{formatDate(artikel.createdAt)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {artikel.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {artikel.penulis}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {artikel.viewCount}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePublish(artikel._id, artikel.isPublished)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          artikel.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {artikel.isPublished ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/artikel/${artikel._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(artikel._id)}
                          disabled={deleting === artikel._id}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Hapus"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
