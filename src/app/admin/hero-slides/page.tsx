"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";
import Image from "next/image";

interface HeroSlide {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  urutan: number;
  isActive: boolean;
  buttonText?: string;
  buttonLink?: string;
}

export default function AdminHeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const res = await fetch("/api/hero-slides?all=true");
      const data = await res.json();
      if (data.success) {
        setSlides(data.data);
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const slide = slides.find((s) => s._id === id);
      if (!slide) return;

      const res = await fetch(`/api/hero-slides/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...slide, isActive: !currentStatus }),
      });

      if (res.ok) {
        fetchSlides();
      }
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus slide ini?")) return;

    try {
      const res = await fetch(`/api/hero-slides/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchSlides();
      }
    } catch (error) {
      console.error("Error deleting slide:", error);
    }
  };

  if (loading) {
    return (
      <div>
        <AdminHeader title="Hero Slides" subtitle="Manage homepage hero slides" />
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
      <AdminHeader
        title="Hero Slides"
        subtitle="Manage homepage hero slides"
        action={
          <Link
            href="/admin/hero-slides/new"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Slide
          </Link>
        }
      />

      <div className="p-4 md:p-8">
        {slides.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 mb-4">Belum ada hero slide</p>
            <Link href="/admin/hero-slides/new" className="text-primary hover:underline">
              Tambah slide pertama
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {slides.map((slide) => (
              <div key={slide._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex">
                  {/* Image Preview */}
                  <div className="w-80 h-48 relative bg-gray-200 flex-shrink-0">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-800">{slide.title}</h3>
                          <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                            Urutan: {slide.urutan}
                          </span>
                          <span
                            className={`text-xs px-3 py-1 rounded-full ${
                              slide.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {slide.isActive ? "Aktif" : "Nonaktif"}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{slide.subtitle}</p>
                        {(slide.buttonText || slide.buttonLink) && (
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Button:</span> {slide.buttonText || "N/A"} →{" "}
                            {slide.buttonLink || "N/A"}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleToggleActive(slide._id, slide.isActive)}
                          className={`p-2 rounded-lg transition-colors ${
                            slide.isActive
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          }`}
                          title={slide.isActive ? "Nonaktifkan" : "Aktifkan"}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <Link
                          href={`/admin/hero-slides/${slide._id}`}
                          className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(slide._id)}
                          className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          title="Hapus"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
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
