import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Promo } from "@/models";

// GET - List all promos
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");

    // Filter - jika all=true, ambil semua. Jika tidak, hanya yang aktif
    const filter = all === "true" ? {} : { isActive: true };

    const promos = await Promo.find(filter).sort({ urutan: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: promos,
    });
  } catch (error) {
    console.error("Error fetching promos:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data promo" },
      { status: 500 }
    );
  }
}

// POST - Create new promo
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, subtitle, description, backgroundImage, buttonText, buttonLink, urutan, isActive } = body;

    // Validation
    if (!title || !subtitle || !description || !backgroundImage || !buttonText || !buttonLink) {
      return NextResponse.json(
        { success: false, message: "Title, subtitle, description, backgroundImage, buttonText, dan buttonLink wajib diisi" },
        { status: 400 }
      );
    }

    const newPromo = await Promo.create({
      title,
      subtitle,
      description,
      backgroundImage,
      buttonText,
      buttonLink,
      urutan: urutan || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json({
      success: true,
      message: "Promo berhasil ditambahkan",
      data: newPromo,
    });
  } catch (error) {
    console.error("Error creating promo:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan promo" },
      { status: 500 }
    );
  }
}
