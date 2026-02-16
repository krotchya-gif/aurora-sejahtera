import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { authOptions } from "@/lib/auth";

// GET - Fetch single testimonial by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}

// PUT - Update testimonial (admin only)
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

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update testimonial", error: String(error) },
      { status: 500 }
    );
  }
}

// PATCH - Approve/Reject testimonial (admin only)
export async function PATCH(
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
    const { isApproved } = await request.json();

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { isApproved, updatedAt: new Date() },
      { new: true }
    );

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: isApproved ? "Testimonial approved" : "Testimonial rejected",
      data: testimonial,
    });
  } catch (error) {
    console.error("Error updating testimonial status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update testimonial status" },
      { status: 500 }
    );
  }
}

// DELETE - Delete single testimonial (admin only)
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
    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
