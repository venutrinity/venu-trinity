import { getAuthUser } from "@/app/lib/auth";

import connectDB from "@/app/lib/mongodb";
import Order from "@/app/models/Order";

export async function GET(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    await connectDB();

    /* -------------------------
       Authentication
    ------------------------- */

    const authUser = await getAuthUser();

    if (!authUser) {
      return Response.json(
        {
          success: false,
          message: "Not authenticated.",
        },
        { status: 401 }
      );
    }

    /* -------------------------
       Get order ID
    ------------------------- */

    const { id } = await context.params;

    if (!id) {
      return Response.json(
        {
          success: false,
          message: "Order ID is required.",
        },
        { status: 400 }
      );
    }

    /* -------------------------
       Find order
    ------------------------- */

    const order = await Order.findById(id).lean();

    if (!order) {
      return Response.json(
        {
          success: false,
          message: "Order not found.",
        },
        { status: 404 }
      );
    }

    /* -------------------------
       Security check
       Customer can only see
       their own order
    ------------------------- */

    if (
      authUser.role !== "admin" &&
      order.customerId?.toString() !== authUser.userId
    ) {
      return Response.json(
        {
          success: false,
          message:
            "You are not allowed to view this order.",
        },
        { status: 403 }
      );
    }

    /* -------------------------
       Return order
    ------------------------- */

    return Response.json({
      success: true,

      order: {
        id: order._id.toString(),

        orderNumber: order.orderNumber,

        customerId:
          order.customerId?.toString(),

        items: (order.items || []).map(
          (item) => ({
            productId:
              item.productId?.toString(),

            name: item.name,

            price: item.price,

            quantity: item.quantity,
          })
        ),

        subtotal: order.subtotal,

        discount: order.discount,

        totalAmount:
          order.totalAmount,

        paymentStatus:
          order.paymentStatus,

        orderStatus:
          order.orderStatus,

        paymentId:
          order.paymentId || "",

        createdAt:
          order.createdAt,

        updatedAt:
          order.updatedAt,
      },
    });
  } catch (error) {
    console.error(
      "Failed to load customer order:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Failed to load order.",
      },
      { status: 500 }
    );
  }
}