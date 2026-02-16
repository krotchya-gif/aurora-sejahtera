import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";
import Paket from "@/models/Paket";
import { checkFormRateLimit } from "@/lib/rate-limit";

// GET - Ambil reviews berdasarkan paketId
export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const paketId = searchParams.get("paketId");
    const all = searchParams.get("all");

    // Admin: ambil semua reviews dengan populate paket
    if (all === "true") {
      const reviews = await Review.find()
        .populate("paketId", "nama slug")
        .sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: reviews });
    }

    if (!paketId) {
      return NextResponse.json(
        { success: false, message: "paketId diperlukan" },
        { status: 400 }
      );
    }

    // Public: hanya review yang sudah di-approve
    const reviews = await Review.find({ paketId, isApproved: true })
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat reviews" },
      { status: 500 }
    );
  }
}

// POST - Submit review baru (public)
export async function POST(request: Request) {
  try {
    // Rate limiting
    const rateLimitResponse = checkFormRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    await connectDB();

    const body = await request.json();
    const { paketId, nama, whatsapp, rating, komentar } = body;

    // Validasi
    if (!paketId || !nama || !rating || !komentar) {
      return NextResponse.json(
        { success: false, message: "paketId, nama, rating, dan komentar wajib diisi" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "Rating harus antara 1-5" },
        { status: 400 }
      );
    }

    if (komentar.length < 10) {
      return NextResponse.json(
        { success: false, message: "Komentar minimal 10 karakter" },
        { status: 400 }
      );
    }

    // Cek apakah paket ada
    const paket = await Paket.findById(paketId);
    if (!paket) {
      return NextResponse.json(
        { success: false, message: "Paket tidak ditemukan" },
        { status: 404 }
      );
    }

    // Buat review baru (default isApproved: false, perlu approval admin)
    const reviewData: Record<string, unknown> = {
      paketId,
      nama,
      rating: Number(rating),
      komentar,
      isApproved: false,
    };

    if (whatsapp) {
      reviewData.whatsapp = whatsapp;
    }

    const review = await Review.create(reviewData);

    return NextResponse.json(
      { success: true, data: review, message: "Review berhasil dikirim! Menunggu persetujuan admin." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengirim review" },
      { status: 500 }
    );
  }
}
