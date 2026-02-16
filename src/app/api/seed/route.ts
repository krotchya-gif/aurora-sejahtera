import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User, Paket, Testimonial, Settings } from "@/models";
import { hashPassword } from "@/models/User";

// Sample data untuk seeding
const samplePakets = [
  {
    slug: "bali-paradise-5d4n",
    nama: "Bali Paradise Tour",
    destinasi: "Bali",
    kategori: "domestik",
    tipe: "open-trip",
    harga: 2500000,
    hargaCoret: 3000000,
    durasi: "5 Hari 4 Malam",
    tanggalKeberangkatan: ["2025-02-15", "2025-02-22", "2025-03-01"],
    kuota: 20,
    sisaKuota: 8,
    gambar: "/images/bali-1.jpg",
    gambarGaleri: ["/images/bali-1.jpg", "/images/bali-2.jpg"],
    deskripsi: "Nikmati keindahan Pulau Dewata dengan paket tour lengkap mengunjungi tempat-tempat ikonik di Bali.",
    itinerary: [
      { hari: 1, judul: "Arrival - Kuta", aktivitas: ["Penjemputan di Bandara", "Check-in hotel", "Free time"] },
      { hari: 2, judul: "Ubud Tour", aktivitas: ["Tegallalang Rice Terrace", "Monkey Forest", "Ubud Palace"] },
      { hari: 3, judul: "Nusa Penida", aktivitas: ["Kelingking Beach", "Broken Beach", "Crystal Bay"] },
      { hari: 4, judul: "Uluwatu", aktivitas: ["GWK", "Pantai Pandawa", "Uluwatu Temple"] },
      { hari: 5, judul: "Departure", aktivitas: ["Breakfast", "Check-out", "Transfer Bandara"] },
    ],
    fasilitas: ["Hotel 4 Malam", "Transportasi AC", "Tiket Wisata", "Guide", "Breakfast"],
    tidakTermasuk: ["Tiket Pesawat", "Makan Siang & Malam", "Tips Guide"],
    kotaKeberangkatan: [
      { kota: "Jakarta", harga: 2500000 },
      { kota: "Surabaya", harga: 2300000 },
    ],
    rating: 4.8,
    jumlahReview: 124,
    isPromo: true,
    isActive: true,
    season: "normal",
  },
  {
    slug: "raja-ampat-adventure-4d3n",
    nama: "Raja Ampat Adventure",
    destinasi: "Raja Ampat",
    kategori: "domestik",
    tipe: "open-trip",
    harga: 8500000,
    hargaCoret: 9500000,
    durasi: "4 Hari 3 Malam",
    tanggalKeberangkatan: ["2025-03-10", "2025-03-17"],
    kuota: 15,
    sisaKuota: 5,
    gambar: "/images/raja-ampat-1.jpg",
    gambarGaleri: ["/images/raja-ampat-1.jpg"],
    deskripsi: "Jelajahi surga bawah laut Raja Ampat dengan keindahan alam yang tiada duanya.",
    itinerary: [
      { hari: 1, judul: "Arrival Sorong", aktivitas: ["Penjemputan", "Ferry ke Waisai", "Check-in"] },
      { hari: 2, judul: "Island Hopping", aktivitas: ["Pianemo", "Star Lagoon", "Snorkeling"] },
      { hari: 3, judul: "Diving", aktivitas: ["Arborek Village", "Manta Point"] },
      { hari: 4, judul: "Departure", aktivitas: ["Breakfast", "Ferry ke Sorong"] },
    ],
    fasilitas: ["Homestay 3 Malam", "Speedboat", "Snorkeling Gear", "Makan 3x"],
    tidakTermasuk: ["Tiket Pesawat", "Diving Equipment", "Tips"],
    kotaKeberangkatan: [
      { kota: "Jakarta", harga: 8500000 },
    ],
    rating: 4.9,
    jumlahReview: 89,
    isPromo: true,
    isActive: true,
    season: "high",
  },
  {
    slug: "japan-sakura-7d6n",
    nama: "Japan Sakura Festival",
    destinasi: "Jepang",
    kategori: "internasional",
    tipe: "open-trip",
    harga: 25000000,
    hargaCoret: 28000000,
    durasi: "7 Hari 6 Malam",
    tanggalKeberangkatan: ["2025-03-25", "2025-04-01"],
    kuota: 20,
    sisaKuota: 3,
    gambar: "/images/japan-1.jpg",
    gambarGaleri: ["/images/japan-1.jpg"],
    deskripsi: "Saksikan keindahan bunga Sakura di Jepang! Tour lengkap Tokyo, Osaka, Kyoto.",
    itinerary: [
      { hari: 1, judul: "Jakarta - Tokyo", aktivitas: ["Penerbangan ke Tokyo", "Check-in hotel"] },
      { hari: 2, judul: "Tokyo", aktivitas: ["Asakusa Temple", "Tokyo Skytree", "Shibuya"] },
      { hari: 3, judul: "Mt. Fuji", aktivitas: ["Mt. Fuji 5th Station", "Lake Ashi"] },
      { hari: 4, judul: "Kyoto", aktivitas: ["Shinkansen ke Kyoto", "Fushimi Inari"] },
      { hari: 5, judul: "Kyoto - Nara", aktivitas: ["Kinkakuji", "Arashiyama", "Nara Deer Park"] },
      { hari: 6, judul: "Osaka", aktivitas: ["Osaka Castle", "Dotonbori"] },
      { hari: 7, judul: "Departure", aktivitas: ["Breakfast", "Transfer Kansai Airport"] },
    ],
    fasilitas: ["Hotel 6 Malam", "JR Pass", "Transport", "Guide Bahasa Indonesia"],
    tidakTermasuk: ["Tiket Pesawat", "Makan", "Tips", "Travel Insurance"],
    kotaKeberangkatan: [
      { kota: "Jakarta", harga: 25000000 },
    ],
    rating: 4.9,
    jumlahReview: 78,
    isPromo: true,
    isActive: true,
    season: "high",
  },
];

const sampleTestimonials = [
  {
    nama: "Rina Susanti",
    foto: "/images/testimonial-1.jpg",
    destinasi: "Bali Paradise Tour",
    rating: 5,
    komentar: "Pengalaman liburan yang luar biasa! Guide ramah dan informatif.",
    isApproved: true,
  },
  {
    nama: "Budi Pratama",
    foto: "/images/testimonial-2.jpg",
    destinasi: "Japan Sakura Festival",
    rating: 5,
    komentar: "Trip ke Jepang yang sangat berkesan. Sakura-nya indah banget!",
    isApproved: true,
  },
];

export async function GET() {
  try {
    await dbConnect();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL || "admin@aurorasejahtera.com" });

    if (!existingAdmin) {
      // Create admin user with hashed password
      const plainPassword = process.env.ADMIN_PASSWORD || "admin123";
      const hashedPass = await hashPassword(plainPassword);

      await User.create({
        name: "Administrator",
        email: process.env.ADMIN_EMAIL || "admin@aurorasejahtera.com",
        password: hashedPass,
        role: "admin",
      });
    }

    // Seed pakets if empty
    const paketCount = await Paket.countDocuments();
    if (paketCount === 0) {
      await Paket.insertMany(samplePakets);
    }

    // Seed testimonials if empty
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.insertMany(sampleTestimonials);
    }

    // Seed settings if empty
    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      await Settings.create({});
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      data: {
        adminCreated: !existingAdmin,
        paketsSeeded: paketCount === 0,
        testimonialsSeeded: testimonialCount === 0,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to seed database", error: String(error) },
      { status: 500 }
    );
  }
}
