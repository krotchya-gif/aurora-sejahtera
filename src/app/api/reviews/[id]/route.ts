import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";
import Paket from "@/models/Paket";

// Helper: Hitung ulang rata-rata rating paket
async function recalculateRating(paketId: string) {
  const approvedReviews = await Review.find({ paketId, isApproved: true });
  const jumlahReview = approvedReviews.length;

  if (jumlahReview === 0) {
    await Paket.findByIdAndUpdate(paketId, { rating: 0, jumlahReview: 0 });
    return;
  }

  const totalRating = approvedReviews.reduce((sum, r) => sum + r.rating, 0);
  const avgRating = Math.round((totalRating / jumlahReview) * 10) / 10; // 1 decimal

  await Paket.findByIdAndUpdate(paketId, {
    rating: avgRating,
    jumlahReview,
  });
}

// PUT - Update review (approve/unapprove) - Admin only
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const review = await Review.findByIdAndUpdate(id, body, { new: true });

    if (!review) {
      return NextResponse.json(
        { success: false, message: "Review tidak ditemukan" },
        { status: 404 }
      );
    }

    // Recalculate rating paket setelah approve/unapprove
    await recalculateRating(review.paketId.toString());

    return NextResponse.json({ success: true, data: review });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { success: false, message: "Gagal update review" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus review - Admin only
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return NextResponse.json(
        { success: false, message: "Review tidak ditemukan" },
        { status: 404 }
      );
    }

    // Recalculate rating paket setelah delete
    await recalculateRating(review.paketId.toString());

    return NextResponse.json({
      success: true,
      message: "Review berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus review" },
      { status: 500 }
    );
  }
}
