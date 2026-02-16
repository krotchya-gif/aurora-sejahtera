"use client";

import { useState, FormEvent } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function TestimonialPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(5);

  const [formData, setFormData] = useState({
    nama: "",
    whatsapp: "",
    destinasi: "",
    foto: "",
    komentar: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Prepare data - remove empty optional fields
      const submitData: Record<string, unknown> = {
        nama: formData.nama,
        destinasi: formData.destinasi,
        rating,
        komentar: formData.komentar,
      };

      // Only add whatsapp if provided and valid
      if (formData.whatsapp && formData.whatsapp.trim()) {
        // Remove any non-digit characters
        const cleanWhatsapp = formData.whatsapp.replace(/\D/g, '');

        // Validate length (10-15 digits)
        if (cleanWhatsapp.length >= 10 && cleanWhatsapp.length <= 15) {
          submitData.whatsapp = cleanWhatsapp;
        } else if (cleanWhatsapp.length > 0) {
          setError("Nomor WhatsApp harus 10-15 digit");
          setLoading(false);
          return;
        }
      }

      // Only add foto if provided
      if (formData.foto && formData.foto.trim()) {
        submitData.foto = formData.foto;
      }

      console.log("Submitting data:", submitData);

      const res = await fetch("/api/testimonial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          nama: "",
          whatsapp: "",
          destinasi: "",
          foto: "",
          komentar: "",
        });
        setRating(5);
      } else {
        // Show detailed error message
        const errorMsg = data.errors || data.message || "Gagal mengirim testimonial";
        console.error("API Error:", data);
        setError(errorMsg);
      }
    } catch (err) {
      console.error("Error submitting testimonial:", err);
      setError("Terjadi kesalahan saat mengirim testimonial");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Special handling for whatsapp field - only allow digits
    if (name === "whatsapp") {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [name]: digitsOnly,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Berikan Testimoni Anda</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Bagikan pengalaman liburan Anda bersama kami. Testimoni Anda sangat berarti untuk kami dan calon customer lainnya.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-green-900">Terima kasih!</h3>
                <p className="text-green-700 text-sm mt-1">
                  Testimonial Anda berhasil dikirim dan sedang menunggu persetujuan admin. Setelah disetujui, testimonial Anda akan tampil di website kami.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-red-900">Gagal mengirim</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor WhatsApp <span className="text-gray-500">(opsional)</span>
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary ${
                  formData.whatsapp && (formData.whatsapp.length < 10 || formData.whatsapp.length > 15)
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300'
                }`}
                placeholder="628123456789 (10-15 digit)"
                inputMode="numeric"
              />
              <p className={`mt-1 text-sm ${
                formData.whatsapp && (formData.whatsapp.length < 10 || formData.whatsapp.length > 15)
                  ? 'text-red-600'
                  : 'text-gray-500'
              }`}>
                {formData.whatsapp
                  ? `${formData.whatsapp.length} digit - ${
                      formData.whatsapp.length < 10
                        ? `minimal 10 digit (kurang ${10 - formData.whatsapp.length})`
                        : formData.whatsapp.length > 15
                        ? `maksimal 15 digit (lebih ${formData.whatsapp.length - 15})`
                        : '✓ format valid'
                    }`
                  : 'Format: angka saja tanpa spasi, minimal 10 digit'
                }
              </p>
            </div>

            {/* Destinasi/Paket */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destinasi/Paket yang Dikunjungi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="destinasi"
                value={formData.destinasi}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Contoh: Bali Paradise Tour, Raja Ampat Adventure"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <svg
                      className={`w-10 h-10 ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
                <span className="ml-2 text-gray-600 font-medium">
                  {rating} Bintang
                </span>
              </div>
            </div>

            {/* Foto Profile (Optional) */}
            <div>
              <ImageUpload
                currentUrl={formData.foto}
                onUploadComplete={(url) => {
                  setFormData({ ...formData, foto: url });
                }}
                label="Foto Profile (opsional)"
                required={false}
              />
              <p className="mt-2 text-sm text-gray-500">
                Upload foto profile Anda atau kosongkan untuk menggunakan avatar default
              </p>
            </div>

            {/* Komentar/Review */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Komentar/Review <span className="text-red-500">*</span>
              </label>
              <textarea
                name="komentar"
                value={formData.komentar}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                placeholder="Ceritakan pengalaman liburan Anda bersama kami..."
              />
              <p className="mt-1 text-sm text-gray-500">
                Minimal 10 karakter
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-semibold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim...
                </>
              ) : (
                "Kirim Testimonial"
              )}
            </button>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Catatan Penting</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Testimonial Anda akan ditinjau terlebih dahulu oleh admin sebelum ditampilkan di website</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Gunakan bahasa yang sopan dan sesuai dengan pengalaman Anda</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Nomor WhatsApp Anda tidak akan ditampilkan secara publik</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
