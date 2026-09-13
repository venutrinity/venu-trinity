import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Product";
import Order from "@/app/models/Order";
import User from "@/app/models/User";
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

    const [
      productsCount,
      ordersCount,
      customersCount,
      revenueResult,
    ] = await Promise.all([
      Product.countDocuments(),

      Order.countDocuments(),

      User.countDocuments({
        role: "customer",
      }),

      Order.aggregate([
        {
          $match: {
            paymentStatus: "paid",
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),
    ]);

    const revenue =
      revenueResult.length > 0
        ? revenueResult[0].total
        : 0;

    return Response.json({
      success: true,
      stats: {
        products: productsCount,
        orders: ordersCount,
        customers: customersCount,
        revenue,
      },
    });
  } catch (error) {
    console.error(
      "Failed to load admin stats:",
      error
    );

    return Response.json(
      {
        success: false,
        message: "Failed to load admin stats",
      },
      { status: 500 }
    );
  }
}