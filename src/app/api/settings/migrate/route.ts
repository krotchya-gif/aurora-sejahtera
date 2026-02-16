import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { authOptions } from "@/lib/auth";

// GET - Migrate Settings to add aboutImage field
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Get existing settings
    const settings = await Settings.findOne();

    if (!settings) {
      return NextResponse.json({
        success: false,
        message: "No settings found",
      });
    }

    // Check if aboutImage field exists
    if (settings.aboutImage === undefined) {
      // Add aboutImage field with default value
      settings.aboutImage = "/images/about-us.jpg";
      await settings.save();

      return NextResponse.json({
        success: true,
        message: "Settings migrated successfully! aboutImage field added.",
        data: settings,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Settings already has aboutImage field",
      data: settings,
    });
  } catch (error) {
    console.error("Error migrating settings:", error);
    return NextResponse.json(
      { success: false, message: "Migration failed", error: String(error) },
      { status: 500 }
    );
  }
}
