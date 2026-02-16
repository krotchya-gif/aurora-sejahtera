"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";

interface Paket {
  _id: string;
  nama: string;
  destinasi: string;
  kategori: string;
  harga: number;
  isActive: boolean;
  isPromo: boolean;
  sisaKuota: number;
  kuota: number;
}

function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

export default function PaketListPage() {
  const [pakets, setPakets] = useState<Paket[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchPakets = async () => {
    try {
      const res = await fetch("/api/paket?active=all");
      const data = await res.json();
      if (data.success) {
        setPakets(data.data);
      }
    } catch (error) {
      console.error("Error fetching pakets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPakets();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus paket ini?")) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/paket/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setPakets(pakets.filter((p) => p._id !== id));
      } else {
        alert(data.message || "Gagal menghapus paket");
      }
    } catch (error) {
      console.error("Error deleting paket:", error);
      alert("Gagal menghapus paket");
    } finally {
      setDeleting(null);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/paket/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      const data = await res.json();

      if (data.success) {
        setPakets(pakets.map((p) =>
          p._id === id ? { ...p, isActive: !currentStatus } : p
        ));
      }
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Paket Wisata"
        subtitle="Kelola paket wisata yang tersedia"
      />

      <div className="p-4 md:p-8">
        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <p className="text-gray-600">Total: {pakets.length} paket</p>
          <Link
            href="/admin/paket/new"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Paket
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : pakets.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-4">Belum ada paket wisata</p>
              <Link
                href="/admin/paket/new"
                className="text-primary hover:text-primary-dark font-medium"
              >
                Tambah paket pertama
              </Link>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 font-medium text-gray-700">Nama Paket</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-700">Kategori</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-700">Harga</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-700">Kuota</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-700">Status</th>
                  <th className="text-right px-6 py-4 font-medium text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pakets.map((paket) => (
                  <tr key={paket._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">{paket.nama}</p>
                        <p className="text-sm text-gray-500">{paket.destinasi}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        paket.kategori === "domestik"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}>
                        {paket.kategori}
                      </span>
                      {paket.isPromo && (
                        <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                          Promo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {formatRupiah(paket.harga)}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {paket.sisaKuota}/{paket.kuota}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActive(paket._id, paket.isActive)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          paket.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {paket.isActive ? "Aktif" : "Nonaktif"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/paket/${paket._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(paket._id)}
                          disabled={deleting === paket._id}
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
