import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Paket from "@/models/Paket";
import { authOptions } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/utils";
import { paketSchema, validateRequest } from "@/lib/validations";
import { checkWriteRateLimit } from "@/lib/rate-limit";

// MongoDB Query Interface for Paket
interface PaketQuery {
  slug?: string;
  kategori?: string;
  tipe?: string;
  isPromo?: boolean;
  isActive?: boolean;
}

// GET - Fetch all pakets (public)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const kategori = searchParams.get("kategori");
    const tipe = searchParams.get("tipe");
    const isPromo = searchParams.get("promo");
    const isActive = searchParams.get("active");
    const limit = searchParams.get("limit");

    // Build query
    const query: PaketQuery = {};

    // Filter by slug (for detail page)
    if (slug) {
      query.slug = slug;
    }

    if (kategori && kategori !== "semua") {
      query.kategori = kategori;
    }
    if (tipe && tipe !== "semua") {
      query.tipe = tipe;
    }
    if (isPromo === "true") {
      query.isPromo = true;
    }
    if (isActive !== "false") {
      query.isActive = true; // Default show only active
    }

    let paketQuery = Paket.find(query).sort({ createdAt: -1 });

    if (limit) {
      paketQuery = paketQuery.limit(parseInt(limit));
    }

    const pakets = await paketQuery;

    return NextResponse.json({
      success: true,
      data: pakets,
    });
  } catch (error) {
    console.error("Error fetching pakets:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch pakets" },
      { status: 500 }
    );
  }
}

// POST - Create new paket (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check rate limit untuk write operations
    const rateLimitResponse = checkWriteRateLimit(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();

    // Validate input
    const validation = validateRequest(paketSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: validation.error },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // Generate unique slug if not provided
    if (!validatedData.slug && validatedData.nama) {
      validatedData.slug = await generateUniqueSlug(Paket, validatedData.nama);
    }

    const paket = await Paket.create(validatedData);

    return NextResponse.json({
      success: true,
      message: "Paket created successfully",
      data: paket,
    });
  } catch (error) {
    console.error("Error creating paket:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create paket", error: String(error) },
      { status: 500 }
    );
  }
}
