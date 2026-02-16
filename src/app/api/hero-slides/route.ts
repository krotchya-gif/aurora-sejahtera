import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { HeroSlide } from "@/models";

// GET - List all hero slides
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");

    // Filter - jika all=true, ambil semua. Jika tidak, hanya yang aktif
    const filter = all === "true" ? {} : { isActive: true };

    const slides = await HeroSlide.find(filter).sort({ urutan: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: slides,
    });
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data hero slides" },
      { status: 500 }
    );
  }
}

// POST - Create new hero slide
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, subtitle, image, urutan, isActive, buttonText, buttonLink } = body;

    // Validation
    if (!title || !subtitle || !image) {
      return NextResponse.json(
        { success: false, message: "Title, subtitle, dan image wajib diisi" },
        { status: 400 }
      );
    }

    const newSlide = await HeroSlide.create({
      title,
      subtitle,
      image,
      urutan: urutan || 0,
      isActive: isActive !== undefined ? isActive : true,
      buttonText,
      buttonLink,
    });

    return NextResponse.json({
      success: true,
      message: "Hero slide berhasil ditambahkan",
      data: newSlide,
    });
  } catch (error) {
    console.error("Error creating hero slide:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan hero slide" },
      { status: 500 }
    );
  }
}
