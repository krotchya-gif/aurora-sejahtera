import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Paket from "@/models/Paket";
import { authOptions } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";

// GET - Fetch single paket by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    // Try to find by ID first, then by slug
    let paket = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      paket = await Paket.findById(id);
    }

    if (!paket) {
      paket = await Paket.findOne({ slug: id });
    }

    if (!paket) {
      return NextResponse.json(
        { success: false, message: "Paket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: paket,
    });
  } catch (error) {
    console.error("Error fetching paket:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch paket" },
      { status: 500 }
    );
  }
}

// PUT - Update paket (admin only)
export async function PUT(
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
    const body = await request.json();

    // If nama changed but slug not provided, generate new slug
    if (body.nama && !body.slug) {
      const currentPaket = await Paket.findById(id);
      if (currentPaket && currentPaket.nama !== body.nama) {
        // Generate unique slug
        let newSlug = generateSlug(body.nama);
        let counter = 1;
        let isUnique = false;

        while (!isUnique) {
          const existing = await Paket.findOne({ slug: newSlug, _id: { $ne: id } });
          if (!existing) {
            isUnique = true;
          } else {
            counter++;
            newSlug = `${generateSlug(body.nama)}-${counter}`;
          }
        }

        body.slug = newSlug;
      }
    }

    // If slug manually changed, check uniqueness
    if (body.slug) {
      const existing = await Paket.findOne({ slug: body.slug, _id: { $ne: id } });
      if (existing) {
        return NextResponse.json(
          { success: false, message: "Slug already exists" },
          { status: 400 }
        );
      }
    }

    const paket = await Paket.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!paket) {
      return NextResponse.json(
        { success: false, message: "Paket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Paket updated successfully",
      data: paket,
    });
  } catch (error) {
    console.error("Error updating paket:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update paket", error: String(error) },
      { status: 500 }
    );
  }
}

// DELETE - Delete paket (admin only)
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
    const paket = await Paket.findByIdAndDelete(id);

    if (!paket) {
      return NextResponse.json(
        { success: false, message: "Paket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Paket deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting paket:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete paket" },
      { status: 500 }
    );
  }
}
