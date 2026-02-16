import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Artikel from "@/models/Artikel";
import { authOptions } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/utils";
import { artikelSchema, validateRequest } from "@/lib/validations";
import { checkWriteRateLimit } from "@/lib/rate-limit";

// MongoDB Query Interface for Artikel
interface ArtikelQuery {
  kategori?: string;
  isPublished?: boolean;
}

// GET - Fetch all articles (public shows only published)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get("kategori");
    const isPublished = searchParams.get("published");
    const limit = searchParams.get("limit");
    const all = searchParams.get("all"); // For admin to see all

    // Build query
    const query: ArtikelQuery = {};

    if (kategori) {
      query.kategori = kategori;
    }

    // If not requesting all (admin view), only show published
    if (all !== "true") {
      query.isPublished = true;
    } else if (isPublished === "true") {
      query.isPublished = true;
    } else if (isPublished === "false") {
      query.isPublished = false;
    }

    let artikelQuery = Artikel.find(query).sort({ createdAt: -1 });

    if (limit) {
      artikelQuery = artikelQuery.limit(parseInt(limit));
    }

    const artikels = await artikelQuery;

    return NextResponse.json({
      success: true,
      data: artikels,
    });
  } catch (error) {
    console.error("Error fetching artikels:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch artikels" },
      { status: 500 }
    );
  }
}

// POST - Create new artikel (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check rate limit untuk write operations
    const rateLimitResponse = checkWriteRateLimit(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const session = await getServerSession(authOptions);

    if (!session || !["admin", "editor"].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    body.penulis = session.user.name || "Admin";

    // Validate input
    const validation = validateRequest(artikelSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: validation.error },
        { status: 400 }
      );
    }

    const validatedData = validation.data;
    validatedData.penulis = session.user.name || "Admin";

    // Generate unique slug if not provided
    if (!validatedData.slug && validatedData.judul) {
      validatedData.slug = await generateUniqueSlug(Artikel, validatedData.judul);
    }

    const artikel = await Artikel.create(validatedData);

    return NextResponse.json({
      success: true,
      message: "Artikel created successfully",
      data: artikel,
    });
  } catch (error) {
    console.error("Error creating artikel:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create artikel", error: String(error) },
      { status: 500 }
    );
  }
}
