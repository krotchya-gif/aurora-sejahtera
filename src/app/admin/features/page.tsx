"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";

interface Feature {
  _id: string;
  title: string;
  description: string;
  icon: string;
  urutan: number;
  isActive: boolean;
}

const iconMap: { [key: string]: React.ReactNode } = {
  shield: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  heart: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  star: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  users: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  chat: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  map: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  creditCard: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  checkCircle: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function FeaturesAdminPage() {
  const router = useRouter();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/features?all=true");
      if (!res.ok) throw new Error("Gagal memuat data features");
      const data = await res.json();
      setFeatures(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/features/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!res.ok) throw new Error("Gagal mengubah status");

      fetchFeatures();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Terjadi kesalahan");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus feature "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/features/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus feature");

      fetchFeatures();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Terjadi kesalahan");
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <AdminHeader
          title="Features (Why Choose Us)"
          subtitle="Kelola keunggulan dan fitur unggulan di homepage"
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
          title="Features (Why Choose Us)"
          subtitle="Kelola keunggulan dan fitur unggulan di homepage"
        />
        <button
          onClick={() => router.push("/admin/features/new")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Tambah Feature
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {features.length === 0 ? (
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
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada feature</h3>
          <p className="mt-1 text-sm text-gray-500">
            Mulai dengan membuat feature unggulan pertama Anda.
          </p>
          <div className="mt-6">
            <button
              onClick={() => router.push("/admin/features/new")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Tambah Feature
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature._id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-blue-600">
                  {iconMap[feature.icon] || iconMap.star}
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    feature.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {feature.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    #{feature.urutan}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                {feature.description}
              </p>
              <div className="text-xs text-gray-500 mb-4 font-mono bg-gray-50 px-2 py-1 rounded">
                Icon: {feature.icon}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleActive(feature._id, feature.isActive)}
                  className={`flex-1 px-3 py-2 text-sm rounded transition-colors ${
                    feature.isActive
                      ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                      : "bg-green-50 text-green-700 hover:bg-green-100"
                  }`}
                >
                  {feature.isActive ? "Nonaktifkan" : "Aktifkan"}
                </button>
                <button
                  onClick={() => router.push(`/admin/features/${feature._id}`)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(feature._id, feature.title)}
                  className="px-3 py-2 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
