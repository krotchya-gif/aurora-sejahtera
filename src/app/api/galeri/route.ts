import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Galeri from "@/models/Galeri";
import { authOptions } from "@/lib/auth";

// GET - Fetch all galeri (public shows only active)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get("kategori");
    const isActive = searchParams.get("active");
    const limit = searchParams.get("limit");
    const all = searchParams.get("all"); // For admin to see all

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (kategori) {
      query.kategori = kategori;
    }

    // If not requesting all (admin view), only show active
    if (all !== "true") {
      query.isActive = true;
    } else if (isActive === "true") {
      query.isActive = true;
    } else if (isActive === "false") {
      query.isActive = false;
    }

    let galeriQuery = Galeri.find(query).sort({ urutan: 1, createdAt: -1 });

    if (limit) {
      galeriQuery = galeriQuery.limit(parseInt(limit));
    }

    const galeris = await galeriQuery;

    return NextResponse.json({
      success: true,
      data: galeris,
    });
  } catch (error) {
    console.error("Error fetching galeri:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch galeri" },
      { status: 500 }
    );
  }
}

// POST - Create new galeri (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();

    const galeri = await Galeri.create(body);

    return NextResponse.json({
      success: true,
      message: "Galeri created successfully",
      data: galeri,
    });
  } catch (error) {
    console.error("Error creating galeri:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create galeri", error: String(error) },
      { status: 500 }
    );
  }
}
