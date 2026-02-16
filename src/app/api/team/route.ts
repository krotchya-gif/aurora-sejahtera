import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Team } from "@/models";

// GET - List all team members
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");

    // Filter - jika all=true, ambil semua. Jika tidak, hanya yang aktif
    const filter = all === "true" ? {} : { isActive: true };

    const team = await Team.find(filter).sort({ urutan: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: team,
    });
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data team" },
      { status: 500 }
    );
  }
}

// POST - Create new team member
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { nama, posisi, foto, bio, email, telepon, urutan, isActive } = body;

    // Validation
    if (!nama || !posisi || !foto) {
      return NextResponse.json(
        { success: false, message: "Nama, posisi, dan foto wajib diisi" },
        { status: 400 }
      );
    }

    const newMember = await Team.create({
      nama,
      posisi,
      foto,
      bio,
      email,
      telepon,
      urutan: urutan || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json({
      success: true,
      message: "Team member berhasil ditambahkan",
      data: newMember,
    });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan team member" },
      { status: 500 }
    );
  }
}
