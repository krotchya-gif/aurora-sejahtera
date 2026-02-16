"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";

interface Testimonial {
  _id: string;
  nama: string;
  foto: string;
  destinasi: string;
  rating: number;
  komentar: string;
  isApproved: boolean;
  createdAt: string;
}

export default function AdminTestimonialPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonial");
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, approve: boolean) => {
    try {
      const res = await fetch(`/api/testimonial/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: approve }),
      });

      if (res.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus testimonial ini?")) return;

    try {
      const res = await fetch(`/api/testimonial/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} testimonial?`)) return;

    try {
      const res = await fetch("/api/testimonial", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (res.ok) {
        setSelectedIds([]);
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Error deleting testimonials:", error);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredTestimonials.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTestimonials.map((t) => t._id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredTestimonials = testimonials.filter((t) => {
    if (filter === "pending") return !t.isApproved;
    if (filter === "approved") return t.isApproved;
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? "text-amber-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const pendingCount = testimonials.filter((t) => !t.isApproved).length;

  return (
    <div>
      <AdminHeader
        title="Kelola Testimonial"
        subtitle={`${testimonials.length} total testimonial${pendingCount > 0 ? ` (${pendingCount} menunggu persetujuan)` : ""}`}
      />

      <div className="p-4 md:p-8">
        {/* Filter & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Semua ({testimonials.length})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "pending"
                  ? "bg-amber-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "approved"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Approved ({testimonials.length - pendingCount})
            </button>
          </div>

          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Hapus {selectedIds.length} Terpilih
            </button>
          )}
        </div>

        {/* Testimonials List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow p-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
                <div className="mt-4 h-16 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak ada testimonial</h3>
            <p className="text-gray-600">
              {filter === "pending" ? "Tidak ada testimonial yang menunggu persetujuan" : "Belum ada testimonial yang masuk"}
            </p>
          </div>
        ) : (
          <>
            {/* Select All */}
            <div className="mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filteredTestimonials.length && filteredTestimonials.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <span className="text-sm text-gray-600">Pilih Semua</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTestimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className={`bg-white rounded-xl shadow overflow-hidden ${
                    !testimonial.isApproved ? "border-l-4 border-amber-400" : ""
                  }`}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(testimonial._id)}
                        onChange={() => toggleSelect(testimonial._id)}
                        className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                      />
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <img
                          src={testimonial.foto || "/images/avatar-placeholder.jpg"}
                          alt={testimonial.nama}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800">{testimonial.nama}</h3>
                        <p className="text-sm text-gray-500">{testimonial.destinasi}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(testimonial.rating)}
                          <span className="text-xs text-gray-400">{formatDate(testimonial.createdAt)}</span>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          testimonial.isApproved
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {testimonial.isApproved ? "Approved" : "Pending"}
                      </span>
                    </div>

                    {/* Comment */}
                    <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                      &ldquo;{testimonial.komentar}&rdquo;
                    </p>

                    {/* Actions */}
                    <div className="mt-4 pt-4 border-t flex gap-2">
                      {!testimonial.isApproved ? (
                        <button
                          onClick={() => handleApprove(testimonial._id, true)}
                          className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApprove(testimonial._id, false)}
                          className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
                        >
                          Unapprove
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(testimonial._id)}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
