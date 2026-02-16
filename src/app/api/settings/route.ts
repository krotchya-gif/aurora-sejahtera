import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { authOptions } from "@/lib/auth";

// GET - Fetch settings (public)
export async function GET() {
  try {
    await dbConnect();

    // Get first settings document or create default
    let settings = await Settings.findOne();

    if (!settings) {
      // Create default settings if none exists
      settings = await Settings.create({});
    }

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PUT - Update settings (admin only)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();

    console.log("\n==================== 📝 API PUT REQUEST ====================");
    console.log("📦 Request body includes aboutImage?", "aboutImage" in body);
    console.log("🖼️ aboutImage value from request:", body.aboutImage || "(not provided)");
    console.log("📝 Full request body:", JSON.stringify(body, null, 2));

    // Find existing settings or create new one
    let settings = await Settings.findOne();

    if (settings) {
      console.log("\n📊 BEFORE UPDATE:");
      console.log("   Current aboutImage in DB:", settings.aboutImage || "NOT SET");
      console.log("   New aboutImage from request:", body.aboutImage || "NOT PROVIDED");

      // IMPORTANT: Merge with body to ensure all fields are updated
      // This handles new fields added to schema after document creation
      const updateData = {
        ...settings.toObject(),
        ...body,
        updatedAt: new Date(),
      };

      console.log("\n🔧 UPDATE DATA:");
      console.log("   aboutImage in updateData:", updateData.aboutImage || "NOT SET");

      settings = await Settings.findByIdAndUpdate(
        settings._id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!settings) {
        return NextResponse.json(
          { success: false, message: "Gagal update settings" },
          { status: 500 }
        );
      }

      console.log("\n✅ Settings updated successfully");
      console.log("   aboutImage AFTER save:", settings.aboutImage || "NOT SET");
      console.log("   logoUrl AFTER save:", settings.logoUrl || "NOT SET");

      // EXTRA VALIDATION: Re-fetch from DB to confirm
      const verifySettings = await Settings.findById(settings._id);
      console.log("\n🔍 VERIFICATION (re-fetch from DB):");
      console.log("   aboutImage in DB:", verifySettings?.aboutImage || "NOT IN DB!");
      console.log("   logoUrl in DB:", verifySettings?.logoUrl || "NOT IN DB!");
    } else {
      // Create new
      settings = await Settings.create(body);
      console.log("✅ Settings created successfully");
    }

    return NextResponse.json({
      success: true,
      message: "Pengaturan berhasil disimpan",
      data: settings,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update settings", error: String(error) },
      { status: 500 }
    );
  }
}
