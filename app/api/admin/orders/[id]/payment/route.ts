import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import connectDB from "@/app/lib/mongodb";
import Order from "@/app/models/Order";
import Product from "@/app/models/Product";
import Download from "@/app/models/Download";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in .env.local");
}

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
    // Check authentication
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

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: "customer" | "admin";
    };

    // Only admins can update payment status
    if (decoded.role !== "admin") {
      return Response.json(
        {
          success: false,
          message: "Admin access required",
        },
        { status: 403 }
      );
    }

    await connectDB();

    const { id } = await context.params;

    // Validate order ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid order ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const { paymentStatus } = body;

    // Validate payment status
    const allowedStatuses = [
      "pending",
      "paid",
      "failed",
      "refunded",
    ];

    if (!allowedStatuses.includes(paymentStatus)) {
      return Response.json(
        {
          success: false,
          message: "Invalid payment status",
        },
        { status: 400 }
      );
    }

    // Find order
    const order = await Order.findById(id);

    if (!order) {
      return Response.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    // Update payment status
    order.paymentStatus = paymentStatus;

    await order.save();

    // Create download records when payment becomes paid
    if (paymentStatus === "paid") {
      for (const item of order.items) {
        const product = await Product.findById(
          item.productId
        );

        if (!product) {
          continue;
        }

        for (const file of product.files) {
          const existingDownload =
            await Download.findOne({
              customerId: order.customerId,
              orderId: order._id,
              productId: product._id,
              fileName: file.fileName,
            });

          if (existingDownload) {
            continue;
          }

          await Download.create({
            customerId: order.customerId,
            orderId: order._id,
            productId: product._id,
            productName: product.name,
            fileName: file.fileName,
            fileType: file.fileType,
            fileUrl: file.fileUrl,
            downloadCount: 0,
          });
        }
      }
    }

    return Response.json({
      success: true,
      message: "Payment status updated successfully",
      order: {
        id: order._id.toString(),
        orderNumber: order.orderNumber,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
      },
    });
  } catch (error) {
    console.error(
      "Failed to update payment status:",
      error
    );

    return Response.json(
      {
        success: false,
        message: "Failed to update payment status",
      },
      { status: 500 }
    );
  }
}