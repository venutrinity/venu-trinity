import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Product";
import { getAuthUser } from "@/app/lib/auth";

export async function GET() {
  try {
    const user = await getAuthUser();

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    if (user.role !== "admin") {
      return Response.json(
        {
          success: false,
          message: "Admin access required",
        },
        { status: 403 }
      );
    }

    await connectDB();

    const products = await Product.find({})
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Failed to load admin products:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to load products",
      },
      { status: 500 }
    );
  }
}