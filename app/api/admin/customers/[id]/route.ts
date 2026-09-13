import { getAuthUser } from "@/app/lib/auth";
import mongoose from "mongoose";

import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";
import Order from "@/app/models/Order";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    // --------------------------------------------------
    // 1. Authentication
    // --------------------------------------------------

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

    // --------------------------------------------------
    // 2. Verify admin
    // --------------------------------------------------

    if (authUser.role !== "admin") {
      return Response.json(
        {
          success: false,
          message: "Admin access required",
        },
        { status: 403 }
      );
    }

    // --------------------------------------------------
    // 3. Connect database
    // --------------------------------------------------

    await connectDB();

    const { id } = await context.params;

    // --------------------------------------------------
    // 4. Validate customer ID
    // --------------------------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid customer ID",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 5. Find customer
    // --------------------------------------------------

    const customer = await User.findOne({
      _id: id,
      role: "customer",
    })
      .select(
        "name email phone avatar createdAt updatedAt"
      )
      .lean();

    if (!customer) {
      return Response.json(
        {
          success: false,
          message: "Customer not found",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // 6. Find customer's orders
    // --------------------------------------------------

    const orders = await Order.find({
      customerId: customer._id,
    })
      .sort({ createdAt: -1 })
      .lean();

    // --------------------------------------------------
    // 7. Calculate statistics
    // --------------------------------------------------

    const totalOrders = orders.length;

    const paidOrders = orders.filter(
      (order) =>
        order.paymentStatus === "paid"
    );

    const totalSpent = paidOrders.reduce(
      (total, order) =>
        total + order.totalAmount,
      0
    );

    const pendingOrders = orders.filter(
      (order) =>
        order.orderStatus === "pending"
    ).length;

    const processingOrders = orders.filter(
      (order) =>
        order.orderStatus === "processing"
    ).length;

    const completedOrders = orders.filter(
      (order) =>
        order.orderStatus === "completed"
    ).length;

    // --------------------------------------------------
    // 8. Prepare order history
    // --------------------------------------------------

    const orderHistory = orders.map(
      (order) => ({
        id: order._id.toString(),

        orderNumber: order.orderNumber,

        totalAmount: order.totalAmount,

        paymentStatus:
          order.paymentStatus,

        orderStatus:
          order.orderStatus,

        itemCount: order.items.reduce(
          (total, item) =>
            total + item.quantity,
          0
        ),

        products: order.items.map(
          (item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })
        ),

        createdAt: order.createdAt,

        updatedAt: order.updatedAt,
      })
    );

    // --------------------------------------------------
    // 9. Response
    // --------------------------------------------------

    return Response.json({
      success: true,

      customer: {
        id: customer._id.toString(),

        name: customer.name,

        email: customer.email,

        phone: customer.phone || "",

        avatar: customer.avatar || "",

        createdAt: customer.createdAt,

        updatedAt: customer.updatedAt,

        stats: {
          totalOrders,

          totalSpent,

          pendingOrders,

          processingOrders,

          completedOrders,

          paidOrders: paidOrders.length,
        },

        orders: orderHistory,
      },
    });
  } catch (error) {
    console.error(
      "Failed to load customer details:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Failed to load customer details",
      },
      { status: 500 }
    );
  }
}