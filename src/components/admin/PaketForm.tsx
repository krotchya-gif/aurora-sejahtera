"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

interface Itinerary {
  hari: number;
  judul: string;
  aktivitas: string[];
}

interface KotaHarga {
  kota: string;
  harga: number;
}

interface PaketFormData {
  nama: string;
  destinasi: string;
  kategori: "domestik" | "internasional" | "umroh";
  tipe: "open-trip" | "private-trip";
  harga: number;
  hargaCoret?: number;
  durasi: string;
  tanggalKeberangkatan: string[];
  kuota: number;
  sisaKuota: number;
  gambar: string;
  gambarGaleri: string[];
  deskripsi: string;
  itinerary: Itinerary[];
  fasilitas: string[];
  tidakTermasuk: string[];
  kotaKeberangkatan: KotaHarga[];
  isPromo: boolean;
  isActive: boolean;
  season: "normal" | "high";
}

interface PaketFormProps {
  initialData?: PaketFormData & { _id?: string };
  isEdit?: boolean;
}

const defaultData: PaketFormData = {
  nama: "",
  destinasi: "",
  kategori: "domestik",
  tipe: "open-trip",
  harga: 0,
  durasi: "",
  tanggalKeberangkatan: [""],
  kuota: 20,
  sisaKuota: 20,
  gambar: "",
  gambarGaleri: [],
  deskripsi: "",
  itinerary: [{ hari: 1, judul: "", aktivitas: [""] }],
  fasilitas: [""],
  tidakTermasuk: [""],
  kotaKeberangkatan: [{ kota: "", harga: 0 }],
  isPromo: false,
  isActive: true,
  season: "normal",
};

export default function PaketForm({ initialData, isEdit = false }: PaketFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Merge initialData with defaultData to handle missing fields
  const mergedData: PaketFormData = initialData
    ? {
        ...defaultData,
        ...initialData,
        // Ensure arrays have default values if undefined/empty
        tanggalKeberangkatan: initialData.tanggalKeberangkatan?.length ? initialData.tanggalKeberangkatan : [""],
        gambarGaleri: initialData.gambarGaleri || [],
        itinerary: initialData.itinerary?.length ? initialData.itinerary : [{ hari: 1, judul: "", aktivitas: [""] }],
        fasilitas: initialData.fasilitas?.length ? initialData.fasilitas : [""],
        tidakTermasuk: initialData.tidakTermasuk?.length ? initialData.tidakTermasuk : [""],
        kotaKeberangkatan: initialData.kotaKeberangkatan?.length ? initialData.kotaKeberangkatan : [{ kota: "", harga: 0 }],
      }
    : defaultData;

  const [formData, setFormData] = useState<PaketFormData>(mergedData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else if (type === "number") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleArrayChange = (field: keyof PaketFormData, index: number, value: string) => {
    const arr = [...(formData[field] as string[])];
    arr[index] = value;
    setFormData({ ...formData, [field]: arr });
  };

  const addArrayItem = (field: keyof PaketFormData) => {
    const arr = [...(formData[field] as string[]), ""];
    setFormData({ ...formData, [field]: arr });
  };

  const removeArrayItem = (field: keyof PaketFormData, index: number) => {
    const arr = (formData[field] as string[]).filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: arr });
  };

  const handleItineraryChange = (index: number, field: keyof Itinerary, value: string | string[]) => {
    const itinerary = [...formData.itinerary];
    if (field === "hari") {
      itinerary[index] = { ...itinerary[index], hari: Number(value) };
    } else if (field === "aktivitas") {
      itinerary[index] = { ...itinerary[index], aktivitas: value as string[] };
    } else if (field === "judul") {
      itinerary[index] = { ...itinerary[index], judul: value as string };
    }
    setFormData({ ...formData, itinerary });
  };

  const addItinerary = () => {
    const newHari = formData.itinerary.length + 1;
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, { hari: newHari, judul: "", aktivitas: [""] }],
    });
  };

  const removeItinerary = (index: number) => {
    const itinerary = formData.itinerary.filter((_, i) => i !== index);
    setFormData({ ...formData, itinerary });
  };

  const handleKotaHargaChange = (index: number, field: keyof KotaHarga, value: string | number) => {
    const kotaKeberangkatan = [...formData.kotaKeberangkatan];
    if (field === "harga") {
      kotaKeberangkatan[index] = { ...kotaKeberangkatan[index], harga: Number(value) };
    } else if (field === "kota") {
      kotaKeberangkatan[index] = { ...kotaKeberangkatan[index], kota: value as string };
    }
    setFormData({ ...formData, kotaKeberangkatan });
  };

  const addKotaHarga = () => {
    setFormData({
      ...formData,
      kotaKeberangkatan: [...formData.kotaKeberangkatan, { kota: "", harga: formData.harga }],
    });
  };

  const removeKotaHarga = (index: number) => {
    const kotaKeberangkatan = formData.kotaKeberangkatan.filter((_, i) => i !== index);
    setFormData({ ...formData, kotaKeberangkatan });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isEdit ? `/api/paket/${initialData?._id}` : "/api/paket";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/paket");
        router.refresh();
      } else {
        setError(data.message || "Gagal menyimpan paket");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Dasar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Paket *</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destinasi *</label>
            <input
              type="text"
              name="destinasi"
              value={formData.destinasi}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="domestik">Domestik</option>
              <option value="internasional">Internasional</option>
              <option value="umroh">Umroh</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Trip</label>
            <select
              name="tipe"
              value={formData.tipe}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="open-trip">Open Trip</option>
              <option value="private-trip">Private Trip</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Durasi *</label>
            <input
              type="text"
              name="durasi"
              value={formData.durasi}
              onChange={handleChange}
              placeholder="Contoh: 5 Hari 4 Malam"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
            <select
              name="season"
              value={formData.season}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="normal">Normal Season</option>
              <option value="high">High Season</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi *</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Harga & Kuota</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Harga (Rp) *</label>
            <input
              type="number"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Harga Coret (Rp)</label>
            <input
              type="number"
              name="hargaCoret"
              value={formData.hargaCoret || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kuota</label>
            <input
              type="number"
              name="kuota"
              value={formData.kuota}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sisa Kuota</label>
            <input
              type="number"
              name="sisaKuota"
              value={formData.sisaKuota}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Kota Keberangkatan */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Harga per Kota Keberangkatan</label>
          {formData.kotaKeberangkatan.map((kota, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-2">
              <input
                type="text"
                value={kota.kota}
                onChange={(e) => handleKotaHargaChange(index, "kota", e.target.value)}
                placeholder="Nama Kota"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <input
                type="number"
                value={kota.harga}
                onChange={(e) => handleKotaHargaChange(index, "harga", e.target.value)}
                placeholder="Harga"
                className="w-full sm:w-40 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
              {formData.kotaKeberangkatan.length > 1 && (
                <button type="button" onClick={() => removeKotaHarga(index)} className="text-red-500 hover:text-red-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addKotaHarga} className="text-primary hover:text-primary-dark text-sm font-medium">
            + Tambah Kota
          </button>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Gambar</h3>
        <ImageUpload
          currentUrl={formData.gambar}
          onUploadComplete={(url) => setFormData({ ...formData, gambar: url })}
          label="Gambar Utama Paket"
        />
      </div>

      {/* Galeri Foto */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Galeri Foto</h3>
        <p className="text-sm text-gray-500 mb-4">Tambahkan beberapa foto untuk ditampilkan di halaman detail paket</p>

        {/* Grid preview foto yang sudah diupload */}
        {formData.gambarGaleri.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {formData.gambarGaleri.map((url, index) => (
              <div key={index} className="relative group">
                <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                  <img
                    src={url}
                    alt={`Galeri ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updated = formData.gambarGaleri.filter((_, i) => i !== index);
                    setFormData({ ...formData, gambarGaleri: updated });
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors sm:opacity-0 sm:group-hover:opacity-100"
                  title="Hapus foto"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Upload foto baru */}
        <ImageUpload
          currentUrl=""
          onUploadComplete={(url) => {
            if (url) {
              setFormData({ ...formData, gambarGaleri: [...formData.gambarGaleri, url] });
            }
          }}
          label="Tambah Foto Galeri"
          resetAfterUpload
        />

        {formData.gambarGaleri.length > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            {formData.gambarGaleri.length} foto dalam galeri
          </p>
        )}
      </div>

      {/* Tanggal Keberangkatan */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tanggal Keberangkatan</h3>
        {formData.tanggalKeberangkatan.map((tgl, index) => (
          <div key={index} className="flex gap-4 mb-2">
            <input
              type="date"
              value={tgl}
              onChange={(e) => handleArrayChange("tanggalKeberangkatan", index, e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {formData.tanggalKeberangkatan.length > 1 && (
              <button type="button" onClick={() => removeArrayItem("tanggalKeberangkatan", index)} className="text-red-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem("tanggalKeberangkatan")} className="text-primary hover:text-primary-dark text-sm font-medium">
          + Tambah Tanggal
        </button>
      </div>

      {/* Itinerary */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Itinerary</h3>
        {formData.itinerary.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Hari {item.hari}</h4>
              {formData.itinerary.length > 1 && (
                <button type="button" onClick={() => removeItinerary(index)} className="text-red-500 text-sm">
                  Hapus
                </button>
              )}
            </div>
            <input
              type="text"
              value={item.judul}
              onChange={(e) => handleItineraryChange(index, "judul", e.target.value)}
              placeholder="Judul hari"
              className="w-full px-4 py-2 border rounded-lg mb-2 focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <textarea
              value={item.aktivitas.join("\n")}
              onChange={(e) => handleItineraryChange(index, "aktivitas", e.target.value.split("\n"))}
              placeholder="Aktivitas (satu per baris)"
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        ))}
        <button type="button" onClick={addItinerary} className="text-primary hover:text-primary-dark text-sm font-medium">
          + Tambah Hari
        </button>
      </div>

      {/* Fasilitas */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Fasilitas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Termasuk</label>
            {formData.fasilitas.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange("fasilitas", index, e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {formData.fasilitas.length > 1 && (
                  <button type="button" onClick={() => removeArrayItem("fasilitas", index)} className="text-red-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("fasilitas")} className="text-primary hover:text-primary-dark text-sm font-medium">
              + Tambah
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tidak Termasuk</label>
            {formData.tidakTermasuk.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange("tidakTermasuk", index, e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {formData.tidakTermasuk.length > 1 && (
                  <button type="button" onClick={() => removeArrayItem("tidakTermasuk", index)} className="text-red-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("tidakTermasuk")} className="text-primary hover:text-primary-dark text-sm font-medium">
              + Tambah
            </button>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Status</h3>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
            <span>Aktif</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isPromo"
              checked={formData.isPromo}
              onChange={handleChange}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
            <span>Promo</span>
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : isEdit ? "Update Paket" : "Simpan Paket"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
