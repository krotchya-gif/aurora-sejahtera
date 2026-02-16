import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Artikel from "@/models/Artikel";
import { authOptions } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";

// GET - Fetch single artikel by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    let artikel = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      artikel = await Artikel.findById(id);
    }

    if (!artikel) {
      artikel = await Artikel.findOne({ slug: id });
    }

    if (!artikel) {
      return NextResponse.json(
        { success: false, message: "Artikel not found" },
        { status: 404 }
      );
    }

    // Increment view count
    await Artikel.findByIdAndUpdate(artikel._id, { $inc: { viewCount: 1 } });

    return NextResponse.json({
      success: true,
      data: artikel,
    });
  } catch (error) {
    console.error("Error fetching artikel:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch artikel" },
      { status: 500 }
    );
  }
}

// PUT - Update artikel (admin/editor only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !["admin", "editor"].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    // If judul changed but slug not provided, generate new slug
    if (body.judul && !body.slug) {
      const currentArtikel = await Artikel.findById(id);
      if (currentArtikel && currentArtikel.judul !== body.judul) {
        // Generate unique slug
        let newSlug = generateSlug(body.judul);
        let counter = 1;
        let isUnique = false;

        while (!isUnique) {
          const existing = await Artikel.findOne({ slug: newSlug, _id: { $ne: id } });
          if (!existing) {
            isUnique = true;
          } else {
            counter++;
            newSlug = `${generateSlug(body.judul)}-${counter}`;
          }
        }

        body.slug = newSlug;
      }
    }

    // If slug manually changed, check uniqueness
    if (body.slug) {
      const existing = await Artikel.findOne({ slug: body.slug, _id: { $ne: id } });
      if (existing) {
        return NextResponse.json(
          { success: false, message: "Slug already exists" },
          { status: 400 }
        );
      }
    }

    const artikel = await Artikel.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!artikel) {
      return NextResponse.json(
        { success: false, message: "Artikel not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Artikel updated successfully",
      data: artikel,
    });
  } catch (error) {
    console.error("Error updating artikel:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update artikel", error: String(error) },
      { status: 500 }
    );
  }
}

// DELETE - Delete artikel (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const { id } = await params;
    const artikel = await Artikel.findByIdAndDelete(id);

    if (!artikel) {
      return NextResponse.json(
        { success: false, message: "Artikel not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Artikel deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting artikel:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete artikel" },
      { status: 500 }
    );
  }
}
