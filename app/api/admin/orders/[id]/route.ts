import { getAuthUser } from "@/app/lib/auth";
import mongoose from "mongoose";

import connectDB from "@/app/lib/mongodb";
import Order from "@/app/models/Order";

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
    const authUser = await getAuthUser();

    if (!authUser) {
      return Response.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    // Only admins can update orders
    if (authUser.role !== "admin") {
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

    // Validate MongoDB ID
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

    const { orderStatus } = body;

    // Validate order status
    const allowedStatuses = [
      "pending",
      "processing",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      return Response.json(
        {
          success: false,
          message: "Invalid order status",
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

    // Update status
    order.orderStatus = orderStatus;

    await order.save();

    return Response.json({
      success: true,
      message: "Order status updated successfully",
      order: {
        id: order._id.toString(),
        orderNumber: order.orderNumber,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
      },
    });
  } catch (error) {
    console.error(
      "Failed to update order status:",
      error
    );

    return Response.json(
      {
        success: false,
        message: "Failed to update order status",
      },
      { status: 500 }
    );
  }
}