import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import connectDB from "@/app/lib/mongodb";
import Order from "@/app/models/Order";
import User from "@/app/models/User";

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

    if (decoded.role !== "admin") {
      return Response.json(
        {
          success: false,
          message: "Admin access required",
        },
        { status: 403 }
      );
    }

    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    const customerIds = [
      ...new Set(
        orders
          .map((order) => order.customerId?.toString())
          .filter(Boolean)
      ),
    ];

    const customers = await User.find({
      _id: { $in: customerIds },
    })
      .select("name email phone")
      .lean();

    const customerMap = new Map(
      customers.map((customer) => [
        customer._id.toString(),
        customer,
      ])
    );

    return Response.json({
      success: true,
      orders: orders.map((order) => {
        const customerId = order.customerId?.toString();
        const customer = customerId
          ? customerMap.get(customerId)
          : null;

        return {
          id: order._id.toString(),
          orderNumber: order.orderNumber,

          customer: {
            id: customer?._id?.toString() || customerId || "",
            name: customer?.name || "Unknown Customer",
            email: customer?.email || "",
            phone: customer?.phone || "",
          },

          totalAmount: order.totalAmount,
          paymentStatus: order.paymentStatus,
          orderStatus: order.orderStatus,
          createdAt: order.createdAt,
        };
      }),
    });
  } catch (error) {
    console.error("Failed to load admin orders:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to load orders",
      },
      { status: 500 }
    );
  }
}
