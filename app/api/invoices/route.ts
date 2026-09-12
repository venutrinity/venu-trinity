import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/mongodb";
import Invoice from "@/app/models/Invoice";

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

    const invoices = await Invoice.find({
      customerId: decoded.userId,
    }).sort({ issuedAt: -1 });

    return Response.json({
      success: true,
      invoices: invoices.map((invoice) => ({
        id: invoice._id,
        invoiceNumber: invoice.invoiceNumber,
        totalAmount: invoice.totalAmount,
        status: invoice.status,
        issuedAt: invoice.issuedAt,
      })),
    });
  } catch (error) {
    console.error("Failed to load invoices:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to load invoices",
      },
      { status: 500 }
    );
  }
}