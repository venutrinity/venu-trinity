import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/mongodb";
import Download from "@/app/models/Download";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in .env.local");
}

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: "customer" | "admin";
    };

    const downloads = await Download.find({
      customerId: decoded.userId,
    }).sort({ purchasedAt: -1 });

    return Response.json({
      success: true,
      downloads: downloads.map((download) => ({
        id: download._id,
        productName: download.productName,
        files: download.files,
        purchasedAt: download.purchasedAt,
      })),
    });
  } catch (error) {
    console.error("Failed to load downloads:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to load downloads",
      },
      { status: 500 }
    );
  }
}