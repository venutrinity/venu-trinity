import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Product";
import { getAuthUser } from "@/app/lib/auth";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({
      status: "published",
    }).sort({ createdAt: -1 });

    return Response.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Failed to load products:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to load products",
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

    const {
      name,
      slug,
      category,
      description,
      price,
      previewImage,
      files,
      status,
    } = await request.json();

    if (!name || !slug || !category || !description || price === undefined) {
      return Response.json(
        {
          success: false,
          message: "Required product fields are missing",
        },
        { status: 400 }
      );
    }

    const existingProduct = await Product.findOne({
      slug: slug.toLowerCase().trim(),
    });

    if (existingProduct) {
      return Response.json(
        {
          success: false,
          message: "A product with this slug already exists",
        },
        { status: 409 }
      );
    }
    const product = await Product.create({
        name: name.trim(),
        slug: slug.toLowerCase().trim(),
        category,
        description: description.trim(),
        price: Number(price),
        previewImage: previewImage?.trim() || "",
        files: files || [],
        status: status || "draft",
    });

    return Response.json(
      {
        success: true,
        message: "Product created successfully",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create product:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create product",
      },
      { status: 500 }
    );
  }
}