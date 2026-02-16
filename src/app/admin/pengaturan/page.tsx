"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUpload from "@/components/admin/ImageUpload";

interface Settings {
  _id: string;
  companyName: string;
  tagline: string;
  alamat: string;
  telepon: string;
  whatsapp: string;
  email: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  logoUrl: string;
  googleMapsEmbed: string;
  aboutImage: string;
}

export default function AdminPengaturanPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      console.log("\n==================== 📥 FETCHING SETTINGS FROM DATABASE ====================");
      const res = await fetch("/api/settings");
      const data = await res.json();
      console.log("🖼️ aboutImage value:", data.data?.aboutImage || "(empty)");
      console.log("📦 logoUrl value:", data.data?.logoUrl || "(empty)");
      console.table({
        aboutImage: data.data?.aboutImage || "(empty)",
        logoUrl: data.data?.logoUrl || "(empty)",
        companyName: data.data?.companyName,
      });
      if (data.success) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    // DEBUG: Log settings state before submit with table for better visibility
    console.log("\n==================== 🚀 FORM SUBMIT START ====================");
    console.log("🖼️ aboutImage in state:", settings.aboutImage);
    console.log("📦 logoUrl in state:", settings.logoUrl);
    console.table({
      aboutImage: settings.aboutImage || "(empty)",
      logoUrl: settings.logoUrl || "(empty)",
      companyName: settings.companyName,
    });

    setSaving(true);
    setMessage(null);

    try {
      const requestBody = JSON.stringify(settings);
      console.log("📤 Request body length:", requestBody.length, "characters");
      console.log("📤 Request includes aboutImage?", requestBody.includes("aboutImage"));

      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });

      const data = await res.json();

      // DEBUG: Log API response with table
      console.log("\n==================== ✅ API RESPONSE ====================");
      console.log("📸 aboutImage from API:", data.data?.aboutImage);
      console.log("🖼️ logoUrl from API:", data.data?.logoUrl);
      console.table({
        aboutImage: data.data?.aboutImage || "(empty)",
        logoUrl: data.data?.logoUrl || "(empty)",
        success: data.success,
      });

      if (data.success) {
        setMessage({ type: "success", text: "Pengaturan berhasil disimpan!" });

        // Wait 2 seconds before refresh so user can see the logs
        console.log("\n⏳ Waiting 2 seconds before refresh to show logs...");
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log("\n==================== 🔄 REFRESHING FROM DB ====================");
        await fetchSettings();
      } else {
        setMessage({ type: "error", text: data.message || "Gagal menyimpan pengaturan" });
      }
    } catch (error) {
      console.error("❌ Error saving settings:", error);
      setMessage({ type: "error", text: "Terjadi kesalahan saat menyimpan" });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!settings) return;
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div>
        <AdminHeader title="Pengaturan" subtitle="Edit informasi perusahaan" />
        <div className="p-4 md:p-8">
          <div className="bg-white rounded-xl shadow p-8 animate-pulse">
            <div className="space-y-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title="Pengaturan"
        subtitle="Edit informasi perusahaan"
      />

      <div className="p-4 md:p-8">
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            {/* Informasi Umum */}
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Informasi Umum</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Perusahaan
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={settings?.companyName || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    value={settings?.tagline || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat
                  </label>
                  <textarea
                    name="alamat"
                    value={settings?.alamat || ""}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
                <div>
                  <ImageUpload
                    currentUrl={settings?.logoUrl || ""}
                    onUploadComplete={(url) => setSettings(settings ? { ...settings, logoUrl: url } : null)}
                    label="Logo Perusahaan"
                  />
                  <p className="text-xs text-amber-600 mt-2 font-medium">
                    ⚠️ Setelah upload gambar, jangan lupa klik tombol &quot;Simpan Pengaturan&quot; di bawah!
                  </p>
                </div>
                <div>
                  <ImageUpload
                    currentUrl={settings?.aboutImage || ""}
                    onUploadComplete={(url) => {
                      console.log("\n==================== 📤 IMAGE UPLOAD COMPLETE ====================");
                      console.log("🖼️ New aboutImage URL:", url);
                      console.log("📦 BEFORE update - aboutImage:", settings?.aboutImage || "(empty)");
                      const newSettings = settings ? { ...settings, aboutImage: url } : null;
                      console.log("📦 AFTER update - aboutImage:", newSettings?.aboutImage || "(empty)");
                      console.table({
                        before: settings?.aboutImage || "(empty)",
                        after: newSettings?.aboutImage || "(empty)",
                        url: url,
                      });
                      console.log("⚠️ INGAT: Klik tombol 'Simpan Pengaturan' untuk save ke database!");
                      setSettings(newSettings);
                    }}
                    label="Gambar Halaman Tentang"
                  />
                  <p className="text-xs text-amber-600 mt-2 font-medium">
                    ⚠️ Setelah upload gambar, jangan lupa klik tombol &quot;Simpan Pengaturan&quot; di bawah!
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Google Maps Embed URL
                    </span>
                  </label>
                  <textarea
                    name="googleMapsEmbed"
                    value={settings?.googleMapsEmbed || ""}
                    onChange={handleChange}
                    rows={3}
                    placeholder='<iframe src="https://www.google.com/maps/embed?..." width="600" height="450" ...></iframe>'
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Paste Google Maps embed code dari Google Maps (Share → Embed a map)
                  </p>
                </div>
              </div>
            </div>

            {/* Kontak */}
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Informasi Kontak</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Telepon
                    </span>
                  </label>
                  <input
                    type="text"
                    name="telepon"
                    value={settings?.telepon || ""}
                    onChange={handleChange}
                    placeholder="+62 812 3456 7890"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp (tanpa +)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={settings?.whatsapp || ""}
                    onChange={handleChange}
                    placeholder="6281234567890"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={settings?.email || ""}
                    onChange={handleChange}
                    placeholder="info@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Sosial Media</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </span>
                  </label>
                  <input
                    type="url"
                    name="instagram"
                    value={settings?.instagram || ""}
                    onChange={handleChange}
                    placeholder="https://instagram.com/username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </span>
                  </label>
                  <input
                    type="url"
                    name="facebook"
                    value={settings?.facebook || ""}
                    onChange={handleChange}
                    placeholder="https://facebook.com/pagename"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                      TikTok
                    </span>
                  </label>
                  <input
                    type="url"
                    name="tiktok"
                    value={settings?.tiktok || ""}
                    onChange={handleChange}
                    placeholder="https://tiktok.com/@username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="p-6 bg-gray-50">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Simpan Pengaturan
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
