import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Galeri from "@/models/Galeri";
import { authOptions } from "@/lib/auth";

// GET - Fetch single galeri by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const galeri = await Galeri.findById(id);

    if (!galeri) {
      return NextResponse.json(
        { success: false, message: "Galeri not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: galeri,
    });
  } catch (error) {
    console.error("Error fetching galeri:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch galeri" },
      { status: 500 }
    );
  }
}

// PUT - Update galeri by ID (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const galeri = await Galeri.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!galeri) {
      return NextResponse.json(
        { success: false, message: "Galeri not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Galeri updated successfully",
      data: galeri,
    });
  } catch (error) {
    console.error("Error updating galeri:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update galeri" },
      { status: 500 }
    );
  }
}

// DELETE - Delete galeri by ID (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const { id } = await params;

    const galeri = await Galeri.findByIdAndDelete(id);

    if (!galeri) {
      return NextResponse.json(
        { success: false, message: "Galeri not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Galeri deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting galeri:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete galeri" },
      { status: 500 }
    );
  }
}
