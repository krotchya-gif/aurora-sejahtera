import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Feature } from "@/models";

// GET - List all features
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");

    // Filter - jika all=true, ambil semua. Jika tidak, hanya yang aktif
    const filter = all === "true" ? {} : { isActive: true };

    const features = await Feature.find(filter).sort({ urutan: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: features,
    });
  } catch (error) {
    console.error("Error fetching features:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data feature" },
      { status: 500 }
    );
  }
}

// POST - Create new feature
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, description, icon, urutan, isActive } = body;

    // Validation
    if (!title || !description || !icon) {
      return NextResponse.json(
        { success: false, message: "Title, description, dan icon wajib diisi" },
        { status: 400 }
      );
    }

    const newFeature = await Feature.create({
      title,
      description,
      icon,
      urutan: urutan || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json({
      success: true,
      message: "Feature berhasil ditambahkan",
      data: newFeature,
    });
  } catch (error) {
    console.error("Error creating feature:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan feature" },
      { status: 500 }
    );
  }
}
