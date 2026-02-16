/**
 * Utility functions untuk aplikasi Aurora Sejahtera
 */

/**
 * Generate URL-friendly slug dari string
 * @param text - Text yang akan diconvert ke slug
 * @returns URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Format angka ke format Rupiah
 * @param amount - Jumlah angka
 * @returns String format Rupiah
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format tanggal ke format Indonesia
 * @param date - Date object atau string date
 * @returns String format tanggal Indonesia
 */
export function formatTanggal(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dateObj);
}

/**
 * Truncate text dengan ellipsis
 * @param text - Text yang akan di-truncate
 * @param maxLength - Panjang maksimal
 * @returns Text yang sudah di-truncate
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Validasi apakah string adalah email yang valid
 * @param email - Email string
 * @returns Boolean valid atau tidak
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validasi apakah string adalah nomor WhatsApp yang valid (Indonesia)
 * @param phone - Nomor telepon
 * @returns Boolean valid atau tidak
 */
export function isValidWhatsApp(phone: string): boolean {
  // Format: 62812345678 (tanpa +, 10-13 digit setelah 62)
  const waRegex = /^62\d{9,12}$/;
  return waRegex.test(phone);
}

/**
 * Mongoose Model Interface untuk slug check
 */
interface MongooseModel {
  findOne(query: { slug: string; _id?: { $ne: string } }): Promise<unknown>;
}

/**
 * Generate unique slug dengan check database
 * @param Model - Mongoose model (Paket atau Artikel)
 * @param baseText - Text base untuk slug
 * @returns Promise<string> - Unique slug
 */
export async function generateUniqueSlug(Model: MongooseModel, baseText: string): Promise<string> {
  let slug = generateSlug(baseText);
  let counter = 1;
  let isUnique = false;

  while (!isUnique) {
    const existing = await Model.findOne({ slug });
    if (!existing) {
      isUnique = true;
    } else {
      counter++;
      slug = `${generateSlug(baseText)}-${counter}`;
    }
  }

  return slug;
}
