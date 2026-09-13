import { getAuthUser } from "@/app/lib/auth";

import connectDB from "@/app/lib/mongodb";
import Order from "@/app/models/Order";
import User from "@/app/models/User";

export async function GET() {
  try {
    await connectDB();

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
    // 3. Get orders
    // --------------------------------------------------

    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    const customerIds = [
      ...new Set(
        orders
          .map((order) =>
            order.customerId?.toString()
          )
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

    // --------------------------------------------------
    // 4. Response
    // --------------------------------------------------

    return Response.json({
      success: true,

      orders: orders.map((order) => {
        const customerId =
          order.customerId?.toString();

        const customer = customerId
          ? customerMap.get(customerId)
          : null;

        return {
          id: order._id.toString(),

          orderNumber:
            order.orderNumber,

          customer: {
            id:
              customer?._id?.toString() ||
              customerId ||
              "",

            name:
              customer?.name ||
              "Unknown Customer",

            email:
              customer?.email || "",

            phone:
              customer?.phone || "",
          },

          totalAmount:
            order.totalAmount,

          paymentStatus:
            order.paymentStatus,

          orderStatus:
            order.orderStatus,

          createdAt:
            order.createdAt,
        };
      }),
    });
  } catch (error) {
    console.error(
      "Failed to load admin orders:",
      error
    );

    return Response.json(
      {
        success: false,
        message: "Failed to load orders",
      },
      { status: 500 }
    );
  }
}