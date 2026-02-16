import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Team } from "@/models";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Get single team member
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;

    const member = await Team.findById(id);

    if (!member) {
      return NextResponse.json(
        { success: false, message: "Team member tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: member,
    });
  } catch (error) {
    console.error("Error fetching team member:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data team member" },
      { status: 500 }
    );
  }
}

// PUT - Update team member
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const { nama, posisi, foto, bio, email, telepon, urutan, isActive } = body;

    // Validation
    if (!nama || !posisi || !foto) {
      return NextResponse.json(
        { success: false, message: "Nama, posisi, dan foto wajib diisi" },
        { status: 400 }
      );
    }

    const updatedMember = await Team.findByIdAndUpdate(
      id,
      {
        nama,
        posisi,
        foto,
        bio,
        email,
        telepon,
        urutan: urutan || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
      { new: true }
    );

    if (!updatedMember) {
      return NextResponse.json(
        { success: false, message: "Team member tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Team member berhasil diupdate",
      data: updatedMember,
    });
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengupdate team member" },
      { status: 500 }
    );
  }
}

// DELETE - Delete team member
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedMember = await Team.findByIdAndDelete(id);

    if (!deletedMember) {
      return NextResponse.json(
        { success: false, message: "Team member tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Team member berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus team member" },
      { status: 500 }
    );
  }
}
