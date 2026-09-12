import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Product";
import { getAuthUser } from "@/app/lib/auth";
import mongoose from "mongoose";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  context: RouteContext
) {
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

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        { status: 400 }
      );
    }

    const { status } = await request.json();

    if (!["draft", "published"].includes(status)) {
      return Response.json(
        {
          success: false,
          message: "Invalid product status",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const product = await Product.findById(id);

    if (!product) {
      return Response.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    product.status = status;

    await product.save();

    return Response.json({
      success: true,
      message:
        status === "published"
          ? "Product published successfully"
          : "Product unpublished successfully",
      product,
    });
  } catch (error) {
    console.error("Failed to update product status:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to update product status",
      },
      { status: 500 }
    );
  }
}