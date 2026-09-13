import connectDB from "@/app/lib/mongodb";
import Download from "@/app/models/Download";
import Order from "@/app/models/Order";
import Product from "@/app/models/Product";
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

    await connectDB();

    const downloads = await Download.find({
      customerId: user.userId,
    })
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({
      success: true,
      downloads,
    });
  } catch (error) {
    console.error(
      "Failed to load downloads:",
      error
    );

    return Response.json(
      {
        success: false,
        message: "Failed to load downloads",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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

    await connectDB();

    const body = await request.json();

    const { orderId } = body;

    if (!orderId) {
      return Response.json(
        {
          success: false,
          message: "Order ID is required",
        },
        { status: 400 }
      );
    }

    const order = await Order.findOne({
      _id: orderId,
      customerId: user.userId,
    });

    if (!order) {
      return Response.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    if (order.paymentStatus !== "paid") {
      return Response.json(
        {
          success: false,
          message:
            "Download is available only after payment is completed",
        },
        { status: 403 }
      );
    }

    const createdDownloads = [];

    for (const item of order.items) {
      const product = await Product.findById(
        item.productId
      );

      if (!product) {
        continue;
      }

      for (const file of product.files) {
        const existingDownload =
          await Download.findOne({
            customerId: user.userId,
            orderId: order._id,
            productId: product._id,
            fileName: file.fileName,
          });

        if (existingDownload) {
          createdDownloads.push(existingDownload);
          continue;
        }

        const download = await Download.create({
          customerId: user.userId,
          orderId: order._id,
          productId: product._id,
          productName: product.name,
          fileName: file.fileName,
          fileType: file.fileType,
          fileUrl: file.fileUrl,
          downloadCount: 0,
        });

        createdDownloads.push(download);
      }
    }

    return Response.json(
      {
        success: true,
        message: "Downloads created successfully",
        downloads: createdDownloads,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Failed to create downloads:",
      error
    );

    return Response.json(
      {
        success: false,
        message: "Failed to create downloads",
      },
      { status: 500 }
    );
  }
}