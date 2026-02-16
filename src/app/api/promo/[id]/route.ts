import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Promo } from "@/models";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Get single promo
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;

    const promo = await Promo.findById(id);

    if (!promo) {
      return NextResponse.json(
        { success: false, message: "Promo tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: promo,
    });
  } catch (error) {
    console.error("Error fetching promo:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data promo" },
      { status: 500 }
    );
  }
}

// PUT - Update promo
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const { title, subtitle, description, backgroundImage, buttonText, buttonLink, urutan, isActive } = body;

    // Validation
    if (!title || !subtitle || !description || !backgroundImage || !buttonText || !buttonLink) {
      return NextResponse.json(
        { success: false, message: "Title, subtitle, description, backgroundImage, buttonText, dan buttonLink wajib diisi" },
        { status: 400 }
      );
    }

    const updatedPromo = await Promo.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        description,
        backgroundImage,
        buttonText,
        buttonLink,
        urutan: urutan || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
      { new: true }
    );

    if (!updatedPromo) {
      return NextResponse.json(
        { success: false, message: "Promo tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Promo berhasil diupdate",
      data: updatedPromo,
    });
  } catch (error) {
    console.error("Error updating promo:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengupdate promo" },
      { status: 500 }
    );
  }
}

// DELETE - Delete promo
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedPromo = await Promo.findByIdAndDelete(id);

    if (!deletedPromo) {
      return NextResponse.json(
        { success: false, message: "Promo tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Promo berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting promo:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus promo" },
      { status: 500 }
    );
  }
}
