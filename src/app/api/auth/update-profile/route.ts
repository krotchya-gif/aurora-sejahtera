import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// PUT - Update nama dan email admin
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Nama dan email harus diisi" },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { success: false, message: "Nama minimal 2 karakter" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Cek apakah email sudah dipakai user lain
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
      _id: { $ne: session.user.id },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email sudah digunakan oleh user lain" },
        { status: 409 }
      );
    }

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { name, email: email.toLowerCase() },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
      message: "Profil berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui profil" },
      { status: 500 }
    );
  }
}
