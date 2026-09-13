import { getAuthUser } from "@/app/lib/auth";
import mongoose from "mongoose";

import connectDB from "@/app/lib/mongodb";
import Order from "@/app/models/Order";
import User from "@/app/models/User";
import Product from "@/app/models/Product";

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
    // 1. Check authentication
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
    // 2. Admin only
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
    // 3. Connect MongoDB
    // --------------------------------------------------

    await connectDB();

    const { id } = await context.params;

    // --------------------------------------------------
    // 4. Find order
    // --------------------------------------------------

    let order: any = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      order = await Order.findById(id).lean();
    } else {
      order = await Order.findOne({
        orderNumber: id,
      }).lean();
    }

    if (!order) {
      return Response.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // 5. Find customer manually
    // --------------------------------------------------

    let customer: any = null;

    if (order.customerId) {
      customer = await User.findById(
        order.customerId
      )
        .select("name email phone")
        .lean();
    }

    // --------------------------------------------------
    // 6. Find products manually
    // --------------------------------------------------

    const productIds: string[] = order.items
      .map((item: any) => {
        if (!item.productId) {
          return null;
        }

        return item.productId.toString();
      })
      .filter(
        (id: string | null): id is string =>
          Boolean(id)
      );

    const uniqueProductIds: string[] = [
      ...new Set(productIds),
    ];

    const products = await Product.find({
      _id: {
        $in: uniqueProductIds,
      },
    })
      .select(
        "name slug category previewImage"
      )
      .lean();

    // --------------------------------------------------
    // 7. Create product lookup
    // --------------------------------------------------

    const productMap = new Map(
      products.map((product: any) => [
        product._id.toString(),
        product,
      ])
    );

    // --------------------------------------------------
    // 8. Prepare order items
    // --------------------------------------------------

    const items = order.items.map(
      (item: any) => {
        const productId = item.productId
          ? item.productId.toString()
          : "";

        const product =
          productMap.get(productId);

        return {
          productId,

          name:
            item.name ||
            product?.name ||
            "Product",

          price: item.price || 0,

          quantity:
            item.quantity || 1,

          product: product
            ? {
                name: product.name,
                slug: product.slug,
                category:
                  product.category,
                previewImage:
                  product.previewImage || "",
              }
            : null,
        };
      }
    );

    // --------------------------------------------------
    // 9. Return response
    // --------------------------------------------------

    return Response.json({
      success: true,

      order: {
        id: order._id.toString(),

        orderNumber:
          order.orderNumber,

        customer: customer
          ? {
              id: customer._id.toString(),
              name: customer.name || "",
              email: customer.email || "",
              phone: customer.phone || "",
            }
          : {
              id: "",
              name: "Unknown Customer",
              email: "",
              phone: "",
            },

        items,

        subtotal:
          order.subtotal || 0,

        discount:
          order.discount || 0,

        totalAmount:
          order.totalAmount || 0,

        paymentStatus:
          order.paymentStatus ||
          "pending",

        orderStatus:
          order.orderStatus ||
          "pending",

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
      "Failed to load order details:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Failed to load order details",
      },
      { status: 500 }
    );
  }
}