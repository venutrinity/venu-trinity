import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";
import Order from "@/app/models/Order";
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

    const customers = await User.find({
      role: "customer",
    })
      .select("name email phone createdAt")
      .sort({ createdAt: -1 })
      .lean();

    const customerIds = customers.map(
      (customer) => customer._id
    );

    const orderStats = await Order.aggregate([
      {
        $match: {
          customerId: {
            $in: customerIds,
          },
        },
      },
      {
        $group: {
          _id: "$customerId",
          totalOrders: {
            $sum: 1,
          },
          totalSpent: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$paymentStatus",
                    "paid",
                  ],
                },
                "$totalAmount",
                0,
              ],
            },
          },
        },
      },
    ]);

    const statsMap = new Map(
      orderStats.map((item) => [
        item._id.toString(),
        {
          totalOrders: item.totalOrders,
          totalSpent: item.totalSpent,
        },
      ])
    );

    return Response.json({
      success: true,
      customers: customers.map((customer) => {
        const stats = statsMap.get(
          customer._id.toString()
        );

        return {
          id: customer._id.toString(),
          name: customer.name,
          email: customer.email,
          phone: customer.phone || "",
          totalOrders: stats?.totalOrders || 0,
          totalSpent: stats?.totalSpent || 0,
          createdAt: customer.createdAt,
        };
      }),
    });
  } catch (error) {
    console.error(
      "Failed to load admin customers:",
      error
    );

    return Response.json(
      {
        success: false,
        message: "Failed to load customers",
      },
      { status: 500 }
    );
  }
}