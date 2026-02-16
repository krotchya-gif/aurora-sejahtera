/**
 * Validation schemas menggunakan Zod
 * Centralized validation untuk API routes
 */

import { z } from "zod";

/**
 * Paket Wisata Validation Schema
 */
export const paketSchema = z.object({
  nama: z.string().min(3, "Nama paket minimal 3 karakter").max(200, "Nama paket maksimal 200 karakter"),
  slug: z.string().optional(),
  destinasi: z.string().min(2, "Destinasi minimal 2 karakter"),
  kategori: z.enum(["domestik", "internasional", "umroh"], {
    errorMap: () => ({ message: "Kategori harus: domestik, internasional, atau umroh" }),
  }),
  tipe: z.enum(["open-trip", "private-trip"], {
    errorMap: () => ({ message: "Tipe harus: open-trip atau private-trip" }),
  }),
  harga: z.number().min(0, "Harga tidak boleh negatif"),
  hargaCoret: z.number().min(0, "Harga coret tidak boleh negatif").optional(),
  durasi: z.string().min(1, "Durasi harus diisi"),
  tanggalKeberangkatan: z.array(z.string()).min(1, "Minimal 1 tanggal keberangkatan"),
  kuota: z.number().int().min(1, "Kuota minimal 1 peserta"),
  sisaKuota: z.number().int().min(0, "Sisa kuota tidak boleh negatif"),
  gambar: z.string().refine(
    (val) => val === "" || val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://') || val.startsWith('data:'),
    { message: "Gambar harus berupa URL atau path yang valid" }
  ).optional().default(""),
  gambarGaleri: z.array(
    z.string().refine(
      (val) => val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://') || val.startsWith('data:'),
      { message: "Gambar galeri harus berupa URL atau path yang valid" }
    )
  ).optional().default([]),
  deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter"),
  itinerary: z.array(z.object({
    hari: z.number().int().min(1),
    judul: z.string().min(1),
    aktivitas: z.array(z.string()),
  })).optional().default([]),
  fasilitas: z.array(z.string()).optional().default([]),
  tidakTermasuk: z.array(z.string()).optional().default([]),
  kotaKeberangkatan: z.array(z.object({
    kota: z.string(),
    harga: z.number().min(0),
  })).optional().default([]),
  rating: z.number().min(0).max(5, "Rating maksimal 5").optional().default(0),
  jumlahReview: z.number().int().min(0, "Jumlah review tidak boleh negatif").optional().default(0),
  isPromo: z.boolean().optional().default(false),
  season: z.enum(["normal", "high"], {
    errorMap: () => ({ message: "Season harus: normal atau high" }),
  }).optional().default("normal"),
  isActive: z.boolean().optional().default(true),
});

/**
 * Artikel Validation Schema
 */
export const artikelSchema = z.object({
  judul: z.string().min(5, "Judul minimal 5 karakter").max(200, "Judul maksimal 200 karakter"),
  slug: z.string().optional(),
  excerpt: z.string().min(10, "Excerpt minimal 10 karakter").max(300, "Excerpt maksimal 300 karakter"),
  konten: z.string().min(50, "Konten minimal 50 karakter"),
  gambar: z.string().refine(
    (val) => val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://'),
    { message: "Gambar harus berupa URL atau path yang valid" }
  ),
  kategori: z.string().min(2, "Kategori minimal 2 karakter"),
  tags: z.array(z.string()).optional().default([]),
  penulis: z.string().min(2, "Penulis minimal 2 karakter").optional(),
  viewCount: z.number().int().min(0, "View count tidak boleh negatif").optional().default(0),
  isPublished: z.boolean().optional().default(false),
});

/**
 * Settings Validation Schema
 */
export const settingsSchema = z.object({
  namaSite: z.string().min(2, "Nama site minimal 2 karakter"),
  tagline: z.string().optional(),
  deskripsi: z.string().optional(),
  logo: z.string().url("Logo harus URL valid").optional(),
  email: z.string().email("Email tidak valid"),
  telepon: z.string().min(10, "Telepon minimal 10 digit"),
  whatsapp: z.string().regex(/^62\d{9,12}$/, "WhatsApp format: 62xxx (10-13 digit)"),
  alamat: z.string().min(10, "Alamat minimal 10 karakter"),
  googleMapsEmbed: z.string().optional(),
  aboutImage: z.string().url("About image harus URL valid").optional(),
  facebook: z.string().url("Facebook harus URL valid").optional(),
  instagram: z.string().url("Instagram harus URL valid").optional(),
  twitter: z.string().url("Twitter harus URL valid").optional(),
  youtube: z.string().url("YouTube harus URL valid").optional(),
});

/**
 * Testimonial Validation Schema
 */
export const testimonialSchema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  whatsapp: z.preprocess(
    (val) => (val === "" || !val) ? undefined : val,
    z.string().regex(/^\d{10,15}$/, "WhatsApp harus berupa angka 10-15 digit (contoh: 628123456789)").optional()
  ),
  destinasi: z.string().min(2, "Destinasi minimal 2 karakter"),
  rating: z.number().int().min(1, "Rating minimal 1").max(5, "Rating maksimal 5"),
  komentar: z.string().min(10, "Komentar minimal 10 karakter"),
  foto: z.preprocess(
    (val) => (val === "" || !val) ? undefined : val,
    z.string().refine(
      (val) => !val || val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://'),
      { message: "Foto harus berupa URL atau path yang valid" }
    ).optional()
  ),
  isApproved: z.boolean().optional().default(false),
});

/**
 * Galeri Validation Schema
 */
export const galeriSchema = z.object({
  judul: z.string().min(3, "Judul minimal 3 karakter"),
  deskripsi: z.string().optional(),
  gambar: z.string().refine(
    (val) => val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://'),
    { message: "Gambar harus berupa URL atau path yang valid" }
  ),
  kategori: z.string().min(2, "Kategori minimal 2 karakter"),
  tags: z.array(z.string()).optional().default([]),
  urutan: z.number().int().min(0, "Urutan tidak boleh negatif").optional().default(0),
  isActive: z.boolean().optional().default(true),
});

/**
 * Helper function untuk validate request body
 */
export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(", ");
      return { success: false, error: errorMessages };
    }
    return { success: false, error: "Validation error" };
  }
}
