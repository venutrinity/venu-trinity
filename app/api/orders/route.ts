import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import connectDB from "@/app/lib/mongodb";
import Order from "@/app/models/Order";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in .env.local");
}

type AuthPayload = {
  userId: string;
  role: "customer" | "admin";
};

export async function GET() {
  try {
    await connectDB();

    /* -------------------------
       Authentication
    ------------------------- */

    const cookieStore = await cookies();

    const token =
      cookieStore.get("auth_token")?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Not authenticated.",
        },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      JWT_SECRET
    ) as AuthPayload;

    /* -------------------------
       Customer orders
    ------------------------- */

    const orders = await Order.find({
      customerId: decoded.userId,
    })
      .sort({ createdAt: -1 })
      .lean();

    /* -------------------------
       Return orders
    ------------------------- */

    return Response.json({
      success: true,

      orders: orders.map((order) => ({
        id: order._id.toString(),

        orderNumber: order.orderNumber,

        totalAmount:
          order.totalAmount,

        paymentStatus:
          order.paymentStatus,

        orderStatus:
          order.orderStatus,

        createdAt:
          order.createdAt,

        items: (order.items || []).map(
          (item) => ({
            productId:
              item.productId?.toString(),

            name: item.name,

            price: item.price,

            quantity: item.quantity,
          })
        ),
      })),
    });
  } catch (error) {
    console.error(
      "Failed to load customer orders:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Failed to load orders.",
      },
      { status: 500 }
    );
  }
}

/* -------------------------
   Create new order
------------------------- */

export async function POST(
  request: Request
) {
  try {
    await connectDB();

    /* -------------------------
       Authentication
    ------------------------- */

    const cookieStore = await cookies();

    const token =
      cookieStore.get("auth_token")?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Not authenticated.",
        },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      JWT_SECRET
    ) as AuthPayload;

    if (decoded.role !== "customer") {
      return Response.json(
        {
          success: false,
          message:
            "Only customers can create orders.",
        },
        { status: 403 }
      );
    }

    /* -------------------------
       Request data
    ------------------------- */

    const body = await request.json();

    const {
      productId,
      quantity = 1,
    } = body;

    if (!productId) {
      return Response.json(
        {
          success: false,
          message:
            "Product ID is required.",
        },
        { status: 400 }
      );
    }

    const Product =
      (await import("@/app/models/Product"))
        .default;

    const product =
      await Product.findById(productId).lean();

    if (!product) {
      return Response.json(
        {
          success: false,
          message: "Product not found.",
        },
        { status: 404 }
      );
    }

    if (!product.published) {
      return Response.json(
        {
          success: false,
          message:
            "This product is not available.",
        },
        { status: 400 }
      );
    }

    const safeQuantity =
      Math.max(
        1,
        Number(quantity) || 1
      );

    const subtotal =
      Number(product.price) *
      safeQuantity;

    const discount = 0;

    const totalAmount =
      subtotal - discount;

    /* -------------------------
       Create order
    ------------------------- */

    const order =
      await Order.create({
        orderNumber:
          `VT-${Date.now()}-${Math.floor(
            Math.random() * 1000
          )}`,

        customerId:
          decoded.userId,

        items: [
          {
            productId:
              product._id,

            name:
              product.name,

            price:
              product.price,

            quantity:
              safeQuantity,
          },
        ],

        subtotal,

        discount,

        totalAmount,

        paymentStatus:
          "pending",

        orderStatus:
          "pending",

        paymentId: "",
      });

    return Response.json(
      {
        success: true,

        message:
          "Order created successfully.",

        order: {
          id:
            order._id.toString(),

          orderNumber:
            order.orderNumber,

          totalAmount:
            order.totalAmount,

          paymentStatus:
            order.paymentStatus,

          orderStatus:
            order.orderStatus,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Failed to create order:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Failed to create order.",
      },
      { status: 500 }
    );
  }
}