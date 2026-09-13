import { getAuthUser } from "@/app/lib/auth";
import connectDB from "@/app/lib/mongodb";
import Invoice from "@/app/models/Invoice";

export async function GET() {
  try {
    await connectDB();

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

    const invoices = await Invoice.find({
      customerId: authUser.userId,
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