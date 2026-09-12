import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/mongodb";
import Order from "@/app/models/Order";

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

    const orders = await Order.find({
      customerId: decoded.userId,
    }).sort({ createdAt: -1 });

    return Response.json({
      success: true,
      orders: orders.map((order) => ({
        id: order._id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
      })),
    });
  } catch (error) {
    console.error("Failed to load orders:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to load orders",
      },
      { status: 500 }
    );
  }
}