"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";

interface ReviewData {
  _id: string;
  paketId: {
    _id: string;
    nama: string;
    slug: string;
  } | string;
  nama: string;
  whatsapp?: string;
  rating: number;
  komentar: string;
  isApproved: boolean;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews?all=true");
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setReviews(reviews.map((r) => (r._id === id ? { ...r, isApproved: !currentStatus } : r)));
      }
    } catch (error) {
      console.error("Error toggling approval:", error);
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Yakin ingin menghapus review ini?")) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setReviews(reviews.filter((r) => r._id !== id));
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (filter === "pending") return !r.isApproved;
    if (filter === "approved") return r.isApproved;
    return true;
  });

  const getPaketNama = (review: ReviewData) => {
    if (typeof review.paketId === "object" && review.paketId?.nama) {
      return review.paketId.nama;
    }
    return "-";
  };

  return (
    <div>
      <AdminHeader
        title="Ulasan Paket"
        subtitle="Kelola ulasan/review dari pengunjung"
      />

      <div className="p-4 md:p-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: "all", label: "Semua" },
          { key: "pending", label: "Menunggu" },
          { key: "approved", label: "Disetujui" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === tab.key
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
            {tab.key === "pending" && (
              <span className="ml-1.5 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {reviews.filter((r) => !r.isApproved).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-500">Tidak ada review {filter !== "all" ? `yang ${filter === "pending" ? "menunggu" : "disetujui"}` : ""}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div key={review._id} className={`bg-white rounded-xl shadow-sm p-4 md:p-6 border-l-4 ${review.isApproved ? "border-green-500" : "border-yellow-500"}`}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {review.nama.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{review.nama}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      untuk <span className="font-medium text-gray-700">{getPaketNama(review)}</span>
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm">{review.komentar}</p>

                  {review.whatsapp && (
                    <p className="text-xs text-gray-400 mt-2">WA: {review.whatsapp}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleApproval(review._id, review.isApproved)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      review.isApproved
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {review.isApproved ? "Batalkan" : "Setujui"}
                  </button>
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-sm font-medium transition-colors"
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
    </div>
  );
}
