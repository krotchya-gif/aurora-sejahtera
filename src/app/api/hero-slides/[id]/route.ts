import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { HeroSlide } from "@/models";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Get single hero slide
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;

    const slide = await HeroSlide.findById(id);

    if (!slide) {
      return NextResponse.json(
        { success: false, message: "Hero slide tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: slide,
    });
  } catch (error) {
    console.error("Error fetching hero slide:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data hero slide" },
      { status: 500 }
    );
  }
}

// PUT - Update hero slide
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const { title, subtitle, image, urutan, isActive, buttonText, buttonLink } = body;

    // Validation
    if (!title || !subtitle || !image) {
      return NextResponse.json(
        { success: false, message: "Title, subtitle, dan image wajib diisi" },
        { status: 400 }
      );
    }

    const updatedSlide = await HeroSlide.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        image,
        urutan: urutan || 0,
        isActive: isActive !== undefined ? isActive : true,
        buttonText,
        buttonLink,
      },
      { new: true }
    );

    if (!updatedSlide) {
      return NextResponse.json(
        { success: false, message: "Hero slide tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Hero slide berhasil diupdate",
      data: updatedSlide,
    });
  } catch (error) {
    console.error("Error updating hero slide:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengupdate hero slide" },
      { status: 500 }
    );
  }
}

// DELETE - Delete hero slide
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedSlide = await HeroSlide.findByIdAndDelete(id);

    if (!deletedSlide) {
      return NextResponse.json(
        { success: false, message: "Hero slide tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Hero slide berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting hero slide:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus hero slide" },
      { status: 500 }
    );
  }
}
