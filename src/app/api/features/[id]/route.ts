import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Feature } from "@/models";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Get single feature
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;

    const feature = await Feature.findById(id);

    if (!feature) {
      return NextResponse.json(
        { success: false, message: "Feature tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: feature,
    });
  } catch (error) {
    console.error("Error fetching feature:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data feature" },
      { status: 500 }
    );
  }
}

// PUT - Update feature
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const { title, description, icon, urutan, isActive } = body;

    // Validation
    if (!title || !description || !icon) {
      return NextResponse.json(
        { success: false, message: "Title, description, dan icon wajib diisi" },
        { status: 400 }
      );
    }

    const updatedFeature = await Feature.findByIdAndUpdate(
      id,
      {
        title,
        description,
        icon,
        urutan: urutan || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
      { new: true }
    );

    if (!updatedFeature) {
      return NextResponse.json(
        { success: false, message: "Feature tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Feature berhasil diupdate",
      data: updatedFeature,
    });
  } catch (error) {
    console.error("Error updating feature:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengupdate feature" },
      { status: 500 }
    );
  }
}

// DELETE - Delete feature
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedFeature = await Feature.findByIdAndDelete(id);

    if (!deletedFeature) {
      return NextResponse.json(
        { success: false, message: "Feature tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Feature berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting feature:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus feature" },
      { status: 500 }
    );
  }
}
