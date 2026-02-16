import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { authOptions } from "@/lib/auth";
import { checkFormRateLimit } from "@/lib/rate-limit";
import { testimonialSchema, validateRequest } from "@/lib/validations";

// GET - Fetch all testimonials
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const isApproved = searchParams.get("isApproved");

    // Build query
    const query: Record<string, unknown> = {};
    if (isApproved !== null) {
      query.isApproved = isApproved === "true";
    }

    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST - Create new testimonial (public submission)
export async function POST(request: NextRequest) {
  try {
    // Check rate limit (10 submissions per hour)
    const rateLimitResponse = checkFormRateLimit(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    await dbConnect();

    const body = await request.json();

    // Validate input
    const validation = validateRequest(testimonialSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: validation.error },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // Prepare data for creation - exclude foto if undefined to let MongoDB use default
    const createData: Record<string, unknown> = {
      nama: validatedData.nama,
      destinasi: validatedData.destinasi,
      rating: validatedData.rating,
      komentar: validatedData.komentar,
      isApproved: false,
    };

    // Only add optional fields if they have values
    if (validatedData.whatsapp) {
      createData.whatsapp = validatedData.whatsapp;
    }
    if (validatedData.foto) {
      createData.foto = validatedData.foto;
    }

    const testimonial = await Testimonial.create(createData);

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial berhasil dikirim! Menunggu persetujuan admin.",
        data: testimonial,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create testimonial", error: String(error) },
      { status: 500 }
    );
  }
}

// DELETE - Delete multiple testimonials (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { success: false, message: "IDs array is required" },
        { status: 400 }
      );
    }

    await Testimonial.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({
      success: true,
      message: `${ids.length} testimonial(s) deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting testimonials:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete testimonials" },
      { status: 500 }
    );
  }
}
